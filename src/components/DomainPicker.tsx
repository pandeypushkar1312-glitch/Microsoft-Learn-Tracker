import React from 'react';
import {
  Cloud,
  Brain,
  ShieldCheck,
  Smartphone,
  Cpu,
  CheckCircle2,
  Sparkles,
  Compass,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { DomainId, DomainTrack, DomainProgressSummary, AppTheme, CareerGoal } from '../types';
import { DOMAINS } from '../data/learningPaths';
import { playTactileClick } from '../utils/sound';

interface DomainPickerProps {
  selectedDomain: DomainId;
  onSelectDomain: (id: DomainId) => void;
  domainSummaries: Record<DomainId, DomainProgressSummary>;
  onOpenTrackModal?: () => void;
  activeGoal?: CareerGoal | null;
  theme?: AppTheme;
}

export const DomainPicker: React.FC<DomainPickerProps> = ({
  selectedDomain,
  onSelectDomain,
  domainSummaries,
  onOpenTrackModal,
  activeGoal,
  theme = 'light',
}) => {
  const isLight = theme === 'light';

  const getDomainIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className={className} />;
      case 'Brain':
        return <Brain className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Smartphone':
        return <Smartphone className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const getCardClasses = (isSelected: boolean) => {
    if (theme === 'bw') {
      return isSelected
        ? 'bg-white text-black border-2 border-white shadow-md font-bold'
        : 'bg-black text-neutral-300 border-2 border-neutral-800 hover:border-white';
    }
    if (theme === 'gray') {
      return isSelected
        ? 'bg-zinc-700 text-white border-zinc-400 shadow-md ring-2 ring-zinc-400/40'
        : 'bg-[#282B30] text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:bg-[#303338]';
    }
    if (theme === 'light') {
      return isSelected
        ? 'bg-[#0078D4] text-white border-[#0078D4] shadow-lg shadow-blue-500/20 ring-2 ring-blue-400/40'
        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 shadow-xs';
    }
    // dark
    return isSelected
      ? 'bg-slate-800 text-white border-cyan-500 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-500/40'
      : 'bg-slate-800/60 text-slate-300 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800 shadow-xs';
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h2 className={`text-xs sm:text-sm font-bold tracking-tight flex items-center gap-2 ${
            theme === 'bw' ? 'text-white' : isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            <span>Microsoft Learning Tracks</span>
            <span className={`text-[11px] font-normal ${
              theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              (Click to switch specialization domain)
            </span>
          </h2>
        </div>

        {onOpenTrackModal && (
          <button
            id="open-cert-track-modal-btn"
            onClick={() => {
              playTactileClick();
              onOpenTrackModal();
            }}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
              theme === 'bw'
                ? 'bg-black text-white border-white hover:bg-neutral-900'
                : theme === 'gray'
                ? 'bg-zinc-800 text-zinc-200 border-zinc-600 hover:bg-zinc-700'
                : isLight
                ? 'bg-blue-50/90 hover:bg-blue-100 text-blue-700 border-blue-200 shadow-blue-200/40'
                : 'bg-blue-950/80 hover:bg-blue-900 text-cyan-300 border-blue-800/80 shadow-black/40'
            }`}
            title="Open Interactive Certification Track Hub"
          >
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>Choose Certification Track</span>
            <ArrowRight className="w-3 h-3 opacity-70" />
          </button>
        )}
      </div>

      {/* Domain Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {DOMAINS.map((domain) => {
          const isSelected = selectedDomain === domain.id;
          const summary = domainSummaries[domain.id];
          const percent = summary ? summary.percent : 0;
          const completed = summary ? summary.completedCount : 0;
          const total = summary ? summary.totalModules : 0;

          return (
            <button
              key={domain.id}
              onClick={() => {
                playTactileClick();
                onSelectDomain(domain.id);
              }}
              className={`text-left p-3 rounded-2xl border transition-all duration-200 relative overflow-hidden group flex flex-col justify-between cursor-pointer hover:scale-[1.02] active:scale-95 ${getCardClasses(
                isSelected
              )}`}
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex items-start justify-between w-full mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? isLight
                        ? 'bg-white/20 text-white'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : isLight
                      ? 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                      : 'bg-slate-700/60 text-slate-400 group-hover:text-white'
                  }`}
                >
                  {getDomainIcon(domain.icon, 'w-4 h-4')}
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? isLight
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-900 text-cyan-200 border border-slate-700'
                      : isLight
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-slate-700/60 text-slate-300'
                  }`}
                >
                  {completed}/{total} Done
                </span>
              </div>

              {/* Title & Target Role */}
              <div>
                <div
                  className={`font-bold text-xs leading-snug line-clamp-1 ${
                    isSelected ? 'text-white' : isLight ? 'text-slate-900' : 'text-slate-100'
                  }`}
                >
                  {domain.shortName}
                </div>
                <div
                  className={`text-[10px] line-clamp-1 mt-0.5 ${
                    isSelected
                      ? isLight
                        ? 'text-blue-100'
                        : 'text-slate-300'
                      : isLight
                      ? 'text-slate-500'
                      : 'text-slate-400'
                  }`}
                >
                  {domain.targetRole}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2.5 w-full">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className={isSelected ? (isLight ? 'text-blue-100' : 'text-slate-300') : 'text-slate-400'}>
                    Progress
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      percent === 100
                        ? 'text-emerald-400'
                        : isSelected
                        ? 'text-white'
                        : isLight
                        ? 'text-blue-600'
                        : 'text-cyan-400'
                    }`}
                  >
                    {percent}%
                  </span>
                </div>
                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden ${
                    isSelected
                      ? isLight
                        ? 'bg-blue-900/40'
                        : 'bg-slate-900'
                      : isLight
                      ? 'bg-slate-100'
                      : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percent === 100
                        ? 'bg-emerald-400'
                        : isSelected
                        ? isLight
                          ? 'bg-white'
                          : 'bg-cyan-400'
                        : 'bg-blue-600'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
