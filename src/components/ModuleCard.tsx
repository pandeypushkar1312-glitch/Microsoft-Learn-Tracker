import React from 'react';
import {
  CheckCircle2,
  Lock,
  Sparkles,
  Clock,
  Award,
  Layers,
  ArrowRight,
  AlertTriangle,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { ComputedModuleState, AppTheme } from '../types';
import { playTactileClick } from '../utils/sound';

interface ModuleCardProps {
  module: ComputedModuleState;
  onSelect: (module: ComputedModuleState) => void;
  theme?: AppTheme;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onSelect,
  theme = 'dark',
}) => {
  const isCompleted = module.status === 'completed';
  const isAvailable = module.status === 'available';
  const isLocked = module.status === 'locked';
  const isLight = theme === 'light';

  const getLevelBadgeClass = (level: string) => {
    if (theme === 'bw') {
      return 'bg-black text-white border-white';
    }
    if (theme === 'gray') {
      switch (level) {
        case 'Beginner':
          return 'bg-emerald-950/40 text-emerald-300 border-emerald-700';
        case 'Intermediate':
          return 'bg-blue-950/40 text-blue-300 border-blue-700';
        case 'Advanced':
          return 'bg-purple-950/40 text-purple-300 border-purple-700';
        case 'Expert':
          return 'bg-amber-950/40 text-amber-300 border-amber-700';
        default:
          return 'bg-zinc-800 text-zinc-300 border-zinc-700';
      }
    }
    if (theme === 'light') {
      switch (level) {
        case 'Beginner':
          return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Intermediate':
          return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'Advanced':
          return 'bg-purple-50 text-purple-700 border-purple-200';
        case 'Expert':
          return 'bg-amber-50 text-amber-700 border-amber-200';
        default:
          return 'bg-slate-100 text-slate-700 border-slate-200';
      }
    } else {
      switch (level) {
        case 'Beginner':
          return 'bg-emerald-950/60 text-emerald-300 border-emerald-800';
        case 'Intermediate':
          return 'bg-blue-950/60 text-blue-300 border-blue-800';
        case 'Advanced':
          return 'bg-purple-950/60 text-purple-300 border-purple-800';
        case 'Expert':
          return 'bg-amber-950/60 text-amber-300 border-amber-800';
        default:
          return 'bg-slate-800 text-slate-300 border-slate-700';
      }
    }
  };

  const subModuleCount = module.subModules?.length || 4;

  const getCardThemeClasses = () => {
    if (theme === 'bw') {
      if (isCompleted) return 'bg-black border-2 border-white text-white shadow-none';
      if (isAvailable) return 'bg-black border-2 border-white text-white ring-2 ring-white/50 shadow-none';
      return 'bg-neutral-950 border border-neutral-800 text-neutral-400 opacity-60';
    }
    if (theme === 'gray') {
      if (isCompleted) return 'bg-[#1C2C24] border-emerald-800/80 shadow-md text-zinc-100 hover:border-emerald-600';
      if (isAvailable) return 'bg-[#252830] border-zinc-600 shadow-md text-zinc-100 hover:border-blue-400';
      return 'bg-[#1C1E22] border-zinc-800 opacity-75 text-zinc-400 hover:border-zinc-700';
    }
    if (theme === 'light') {
      if (isCompleted) return 'bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 border-emerald-300 shadow-xs hover:border-emerald-400 hover:shadow-md text-slate-800';
      if (isAvailable) return 'bg-white border-blue-300 shadow-md shadow-blue-500/5 hover:border-blue-400 hover:shadow-lg text-slate-800';
      return 'bg-slate-50/80 border-slate-200 opacity-90 hover:border-slate-300 text-slate-700';
    }
    // dark
    if (isCompleted) return 'bg-[#0f1d2e] border-emerald-900/80 shadow-lg shadow-emerald-950/20 hover:border-emerald-700 text-slate-100';
    if (isAvailable) return 'bg-[#18181B] border-slate-700/80 shadow-md hover:border-blue-500/80 hover:shadow-blue-500/10 text-slate-100';
    return 'bg-[#121214]/90 border-slate-800/80 opacity-80 hover:border-slate-700 text-slate-400';
  };

  return (
    <div
      onClick={() => {
        playTactileClick();
        onSelect(module);
      }}
      className={`rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer group hover:scale-[1.01] active:scale-[0.99] ${getCardThemeClasses()}`}
    >
      {/* Top Accent Strip */}
      <div
        className={`h-1.5 w-full ${
          theme === 'bw'
            ? isCompleted || isAvailable ? 'bg-white' : 'bg-neutral-800'
            : isCompleted
            ? 'bg-emerald-500'
            : isAvailable
            ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400'
            : 'bg-slate-600/40'
        }`}
      />

      <div className="p-4 sm:p-5">
        {/* Header Row: Code, Level, Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-wide border ${
                isCompleted
                  ? theme === 'bw'
                    ? 'bg-white text-black border-white'
                    : theme === 'light'
                    ? 'bg-emerald-100/80 text-emerald-800 border-emerald-300'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : isAvailable
                  ? theme === 'bw'
                    ? 'bg-black text-white border-white'
                    : theme === 'light'
                    ? 'bg-blue-100/80 text-blue-800 border-blue-300'
                    : 'bg-cyan-950/80 text-cyan-300 border-cyan-800'
                  : theme === 'bw'
                  ? 'bg-neutral-900 text-neutral-400 border-neutral-800'
                  : theme === 'light'
                  ? 'bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {module.code}
            </span>

            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getLevelBadgeClass(
                module.level
              )}`}
            >
              {module.level}
            </span>

            <span className={`text-[11px] flex items-center gap-1 font-mono ${
              theme === 'bw' ? 'text-neutral-400' : theme === 'light' ? 'text-slate-500' : 'text-slate-400'
            }`}>
              <Clock className="w-3 h-3" />
              {module.duration}
            </span>

            <span className={`text-[11px] font-bold flex items-center gap-0.5 ${
              theme === 'bw' ? 'text-white' : 'text-amber-400'
            }`}>
              <Sparkles className="w-3 h-3" />
              +{module.xp} XP
            </span>
          </div>

          {/* Status Indicator Badge */}
          <div>
            {isCompleted ? (
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                theme === 'bw'
                  ? 'bg-white text-black border border-white'
                  : theme === 'light'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs'
                  : 'bg-emerald-950/90 text-emerald-300 border border-emerald-800 shadow-xs'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </span>
            ) : isAvailable ? (
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                theme === 'bw'
                  ? 'bg-black text-white border border-white animate-pulse'
                  : theme === 'light'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300 animate-pulse'
                  : 'bg-cyan-950/80 text-cyan-300 border border-cyan-700 animate-pulse'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Available to Start
              </span>
            ) : (
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                theme === 'bw'
                  ? 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                  : theme === 'light'
                  ? 'bg-slate-200 text-slate-700 border border-slate-300'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                <Lock className="w-3.5 h-3.5" />
                Locked
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-3">
          <h3 className={`text-base sm:text-lg font-bold leading-snug transition-colors flex items-center justify-between gap-2 ${
            theme === 'bw'
              ? 'text-white hover:underline'
              : theme === 'light'
              ? 'text-slate-900 group-hover:text-blue-600'
              : 'text-white group-hover:text-blue-400'
          }`}>
            <span>{module.title}</span>
            <ChevronRight className="w-4 h-4 opacity-75 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </h3>
          <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
            theme === 'bw' ? 'text-neutral-300' : theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {module.description}
          </p>
        </div>

        {/* Prerequisite Status Banner */}
        {isLocked && module.unmetPrerequisites.length > 0 && (
          <div className={`mb-3 p-2.5 rounded-xl border text-xs ${
            isLight
              ? 'bg-amber-50/90 border-amber-200/80 text-amber-900'
              : 'bg-amber-950/30 border-amber-800/60 text-amber-200'
          }`}>
            <div className="font-semibold flex items-center gap-1.5 mb-1">
              <AlertTriangle className={`w-3.5 h-3.5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
              <span>Prerequisites Required to Unlock:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] font-medium pl-1">
              {module.unmetPrerequisites.map((prereq) => (
                <li key={prereq.id}>
                  <span className="font-mono font-bold">{prereq.code}</span>: {prereq.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isCompleted && module.completedAt && (
          <div className={`mb-3 p-2.5 rounded-xl border text-xs flex items-center justify-between ${
            isLight
              ? 'bg-emerald-100/60 border-emerald-200 text-emerald-900'
              : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
          }`}>
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              Completed on {new Date(module.completedAt).toLocaleDateString()}
            </span>
            <span className={`font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>
              +{module.xp} XP Earned
            </span>
          </div>
        )}

        {/* Sub-modules Overview & Drawer Trigger Footer */}
        <div className={`flex flex-wrap items-center justify-between gap-2 pt-3 border-t ${
          isLight ? 'border-slate-100' : 'border-slate-800/80'
        }`}>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium">
              {subModuleCount} Microsoft Learn Learning Paths available
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
            <span>Explore Options & Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
