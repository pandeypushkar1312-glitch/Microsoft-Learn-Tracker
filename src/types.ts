export type DomainId = 'cloud' | 'ai-data' | 'security' | 'devops-app' | 'power-platform';

export type ModuleStatus = 'locked' | 'available' | 'completed';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface SkillMeasured {
  topic: string;
  weight: string;
}

export interface SubModuleOption {
  id: string;
  order: number;
  title: string;
  description: string;
  duration: string;
  xp: number;
  tags: string[];
  tasksTotal: number;
  tasksCompleted?: number;
  status?: 'completed' | 'available' | 'locked';
  learnUrl?: string;
  units?: string[];
}

export interface LearningModule {
  id: string;
  code: string;
  title: string;
  domainId: DomainId;
  level: DifficultyLevel;
  xp: number;
  duration: string;
  learnUrl: string;
  description: string;
  prerequisites: string[]; // IDs of prerequisite modules
  learningObjectives: string[];
  skillsMeasured: SkillMeasured[];
  practiceExamUrl?: string;
  iconName: string;
  tag: string;
  recommendedOrder: number;
  subModules?: SubModuleOption[];
  // Graph positioning for DAG Visual Roadmap View
  graphPos: {
    x: number;
    y: number;
    layer: number;
  };
  fallbackExplanation: string;
}

export interface DomainTrack {
  id: DomainId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  badge: string;
  certBadgeUrl?: string;
  targetRole: string;
}

export interface CompletedModuleRecord {
  completedAt: string;
  score?: number;
  notes?: string;
}

export interface CompletedTaskLogItem {
  id: string;
  moduleId: string;
  moduleCode: string;
  moduleTitle: string;
  domainId: DomainId;
  completedAt: string;
  xpAwarded: number;
  notes?: string;
}

export interface UserProgressData {
  completedModules: Record<string, CompletedModuleRecord>;
  totalXp: number;
  streakDays: number;
  certificationsEarned: number;
  lastActiveDomain: DomainId;
  completedTasksLog: CompletedTaskLogItem[];
  userNotes: Record<string, string>;
  studyGoalHours: number;
}

export interface ComputedModuleState extends LearningModule {
  status: ModuleStatus;
  unmetPrerequisites: { id: string; code: string; title: string }[];
  completedPrerequisites: { id: string; code: string; title: string }[];
  completedAt?: string;
  notes?: string;
}

export interface DomainProgressSummary {
  domainId: DomainId;
  name: string;
  totalModules: number;
  completedCount: number;
  availableCount: number;
  lockedCount: number;
  percent: number;
  earnedXp: number;
  totalXp: number;
}

export interface ProgressApiResponse {
  progress: UserProgressData;
  domainSummaries: Record<DomainId, DomainProgressSummary>;
  allModulesWithState: ComputedModuleState[];
  level: {
    currentLevel: number;
    title: string;
    nextLevelXp: number;
    currentLevelProgress: number;
  };
}

export interface ExplainUnlockResponse {
  moduleId: string;
  moduleTitle: string;
  explanation: string;
  isAiGenerated: boolean;
  keyConcepts: string[];
  estimatedHours: string;
}

export interface CareerGoal {
  trackId: DomainId;
  targetLevel: DifficultyLevel | 'All';
  studyPace: 'sprint' | 'balanced' | 'casual';
  weeklyHours: number;
  targetWeeks: number;
  targetMonths?: number;
  setAt: string;
}

export type AppTheme = 'light' | 'dark' | 'gray' | 'bw';
