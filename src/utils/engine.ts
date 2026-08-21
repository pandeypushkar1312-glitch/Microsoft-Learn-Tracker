import {
  DomainId,
  DomainProgressSummary,
  LearningModule,
  ModuleStatus,
  ComputedModuleState,
  UserProgressData
} from '../types';
import { DOMAINS, LEARNING_MODULES } from '../data/learningPaths';

/**
 * Core Business Logic:
 * Computes whether a specific module is 'completed', 'available', or 'locked'
 * strictly using code-level prerequisite validation (not AI).
 */
export function computeModuleState(
  module: LearningModule,
  completedMap: Record<string, any>,
  allModulesMap: Map<string, LearningModule>
): ComputedModuleState {
  const isCompleted = Boolean(completedMap[module.id]);

  const unmetPrerequisites: { id: string; code: string; title: string }[] = [];
  const completedPrerequisites: { id: string; code: string; title: string }[] = [];

  for (const prereqId of module.prerequisites) {
    const prereqModule = allModulesMap.get(prereqId);
    const prereqCode = prereqModule?.code || prereqId;
    const prereqTitle = prereqModule?.title || prereqId;

    if (completedMap[prereqId]) {
      completedPrerequisites.push({ id: prereqId, code: prereqCode, title: prereqTitle });
    } else {
      unmetPrerequisites.push({ id: prereqId, code: prereqCode, title: prereqTitle });
    }
  }

  let status: ModuleStatus;
  if (isCompleted) {
    status = 'completed';
  } else if (unmetPrerequisites.length === 0) {
    status = 'available';
  } else {
    status = 'locked';
  }

  return {
    ...module,
    status,
    unmetPrerequisites,
    completedPrerequisites,
    completedAt: completedMap[module.id]?.completedAt,
    notes: completedMap[module.id]?.notes,
  };
}

/**
 * Computes state for all modules in the catalog.
 */
export function computeAllModuleStates(
  modules: LearningModule[],
  completedMap: Record<string, any>
): ComputedModuleState[] {
  const allModulesMap = new Map<string, LearningModule>();
  modules.forEach(m => allModulesMap.set(m.id, m));

  return modules.map(m => computeModuleState(m, completedMap, allModulesMap));
}

/**
 * Summarizes progress per domain track.
 */
export function computeDomainSummaries(
  computedModules: ComputedModuleState[]
): Record<DomainId, DomainProgressSummary> {
  const summaries: Partial<Record<DomainId, DomainProgressSummary>> = {};

  for (const domain of DOMAINS) {
    const domainModules = computedModules.filter(m => m.domainId === domain.id);
    const totalModules = domainModules.length;
    const completedCount = domainModules.filter(m => m.status === 'completed').length;
    const availableCount = domainModules.filter(m => m.status === 'available').length;
    const lockedCount = domainModules.filter(m => m.status === 'locked').length;

    const totalXp = domainModules.reduce((acc, m) => acc + m.xp, 0);
    const earnedXp = domainModules
      .filter(m => m.status === 'completed')
      .reduce((acc, m) => acc + m.xp, 0);

    const percent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

    summaries[domain.id] = {
      domainId: domain.id,
      name: domain.name,
      totalModules,
      completedCount,
      availableCount,
      lockedCount,
      percent,
      earnedXp,
      totalXp,
    };
  }

  return summaries as Record<DomainId, DomainProgressSummary>;
}

/**
 * Computes User Level and Rank Title based on XP.
 */
export function calculateLevel(totalXp: number) {
  const baseLevelXp = 1000;
  const level = Math.floor(totalXp / baseLevelXp) + 1;
  const nextLevelXp = level * baseLevelXp;
  const prevLevelXp = (level - 1) * baseLevelXp;
  const currentLevelProgress = Math.min(
    100,
    Math.max(0, Math.round(((totalXp - prevLevelXp) / baseLevelXp) * 100))
  );

  let title = 'Cloud Novice';
  if (level >= 8) title = 'Master Cloud Architect';
  else if (level >= 6) title = 'Enterprise Specialist';
  else if (level >= 4) title = 'Senior Cloud Engineer';
  else if (level >= 3) title = 'Associate Practitioner';
  else if (level >= 2) title = 'Certified Explorer';

  return {
    currentLevel: level,
    title,
    nextLevelXp,
    currentLevelProgress,
  };
}

/**
 * Helper to generate an intelligent fallback explanation for unlocking a module
 * when the external AI service is unreachable or rate-limited.
 */
export function generateLocalUnlockExplanation(
  module: LearningModule,
  completedPrereqs: string[]
): string {
  if (module.fallbackExplanation) {
    return module.fallbackExplanation;
  }
  const prereqText = completedPrereqs.length > 0
    ? `Having completed ${completedPrereqs.join(', ')}, `
    : `As a foundational course, `;
  return `${prereqText}${module.code} (${module.title}) is your ideal next step to gain hands-on expertise in ${module.skillsMeasured.map(s => s.topic).join(', ')}.`;
}
