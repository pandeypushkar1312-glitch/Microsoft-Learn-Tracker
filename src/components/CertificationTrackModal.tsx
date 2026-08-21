import React, { useState } from 'react';
import {
  Compass,
  X,
  Cloud,
  Brain,
  ShieldCheck,
  Smartphone,
  Cpu,
  Check,
  Sparkles,
  Award,
  Zap,
  Clock,
  Calendar,
  ArrowRight,
  Target,
  Flame,
  Plus,
  Minus,
  Timer,
  SlidersHorizontal,
} from 'lucide-react';
import { DomainId, AppTheme, CareerGoal, DifficultyLevel, DomainProgressSummary } from '../types';
import { DOMAINS, LEARNING_MODULES } from '../data/learningPaths';
import { playTactileClick, playSuccessChime } from '../utils/sound';

interface CertificationTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrackId: DomainId;
  onSelectTrack: (trackId: DomainId, goal?: CareerGoal) => void;
  domainSummaries: Record<DomainId, DomainProgressSummary>;
  activeGoal?: CareerGoal | null;
  theme?: AppTheme;
}

interface TrackMetaConfig {
  certCount: number;
  moduleCount: number;
  highlightCert: string;
  recommendedFirstModule: string;
  tags: string[];
}

const TRACK_METAS: Record<DomainId, TrackMetaConfig> = {
  cloud: {
    certCount: 4,
    moduleCount: 18,
    highlightCert: 'AZ-305 Solutions Architect',
    recommendedFirstModule: 'AZ-900 Fundamentals',
    tags: ['Architecture', 'Compute', 'Hybrid Cloud'],
  },
  'ai-data': {
    certCount: 4,
    moduleCount: 14,
    highlightCert: 'AI-102 & DP-600 Fabric',
    recommendedFirstModule: 'AI-900 AI Fundamentals',
    tags: ['Generative AI', 'Azure OpenAI', 'Fabric Analytics'],
  },
  security: {
    certCount: 3,
    moduleCount: 11,
    highlightCert: 'SC-100 Cybersecurity Architect',
    recommendedFirstModule: 'SC-900 Security Fundamentals',
    tags: ['Zero Trust', 'Sentinel', 'Entra ID'],
  },
  'devops-app': {
    certCount: 3,
    moduleCount: 10,
    highlightCert: 'AZ-400 DevOps Engineer',
    recommendedFirstModule: 'AZ-400 DevOps Strategies',
    tags: ['CI/CD Pipelines', 'GitHub Actions', '.NET Cloud'],
  },
  'power-platform': {
    certCount: 3,
    moduleCount: 9,
    highlightCert: 'PL-300 & PL-500 Power BI',
    recommendedFirstModule: 'PL-900 Power Platform',
    tags: ['Low-Code', 'Power Apps', 'Power Automate'],
  },
};

export const CertificationTrackModal: React.FC<CertificationTrackModalProps> = ({
  isOpen,
  onClose,
  currentTrackId,
  onSelectTrack,
  domainSummaries,
  activeGoal,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const isGray = theme === 'gray';
  const isBw = theme === 'bw';

  // Selection states
  const [selectedTrack, setSelectedTrack] = useState<DomainId>(activeGoal?.trackId || currentTrackId);
  const [selectedPace, setSelectedPace] = useState<'sprint' | 'balanced' | 'casual'>(activeGoal?.studyPace || 'balanced');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'All'>(activeGoal?.targetLevel || 'All');
  const [selectedTimeline, setSelectedTimeline] = useState<number>(activeGoal?.targetMonths || 3);
  const [isAddingCustomTimeline, setIsAddingCustomTimeline] = useState<boolean>(
    Boolean(activeGoal?.targetMonths && ![1, 3, 5].includes(activeGoal.targetMonths))
  );
  const [customMonths, setCustomMonths] = useState<number>(
    activeGoal?.targetMonths && ![1, 3, 5].includes(activeGoal.targetMonths) ? activeGoal.targetMonths : 2
  );

  if (!isOpen) return null;

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

  const currentDomainObj = DOMAINS.find((d) => d.id === selectedTrack) || DOMAINS[0];
  const trackMeta = TRACK_METAS[selectedTrack] || TRACK_METAS.cloud;
  const currentSummary = domainSummaries[selectedTrack] || {
    totalModules: 4,
    completedCount: 0,
    totalXp: 5000,
    earnedXp: 0,
    percent: 0,
  };

  // Modules belonging to this track
  const trackModules = LEARNING_MODULES.filter((m) => m.domainId === selectedTrack);
  const totalTrackXp = trackModules.reduce((acc, m) => acc + m.xp, 0);

  // Pace calculations
  const paceConfig = {
    sprint: { hours: 12, weeks: 4, label: 'Fast-Track Sprint', timeStr: '12-15 hrs/wk • ~4 to 6 Weeks' },
    balanced: { hours: 6, weeks: 8, label: 'Balanced Progression', timeStr: '5-8 hrs/wk • ~8 to 10 Weeks' },
    casual: { hours: 3, weeks: 14, label: 'Flexible Self-Paced', timeStr: '2-4 hrs/wk • ~14 to 18 Weeks' },
  }[selectedPace];

  const handleApply = () => {
    playSuccessChime();
    const effectiveMonths = isAddingCustomTimeline ? customMonths : selectedTimeline;
    const newGoal: CareerGoal = {
      trackId: selectedTrack,
      targetLevel: selectedLevel,
      studyPace: selectedPace,
      weeklyHours: paceConfig.hours,
      targetWeeks: effectiveMonths * 4,
      targetMonths: effectiveMonths,
      setAt: new Date().toISOString(),
    };

    onSelectTrack(selectedTrack, newGoal);
    onClose();
  };

  return (
    <div
      id="certification-track-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playTactileClick();
          onClose();
        }
      }}
    >
      <div
        id="certification-track-modal-container"
        className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col my-auto transition-all duration-200 max-h-[90vh] ${
          isGray
            ? 'bg-[#22252A] text-zinc-100 border-zinc-700 shadow-2xl'
            : isBw
            ? 'bg-black text-white border-2 border-white'
            : isLight
            ? 'bg-white text-slate-900 border-slate-200 shadow-2xl shadow-blue-950/20'
            : 'bg-[#0F141C] text-slate-100 border-slate-800 shadow-2xl shadow-black/90'
        }`}
      >
        {/* Clean Header */}
        <div
          className={`px-6 py-4.5 border-b flex items-center justify-between ${
            isGray
              ? 'bg-[#1E2125] border-zinc-700/80'
              : isBw
              ? 'bg-black border-b-2 border-white'
              : isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-[#131924] border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isBw
                  ? 'bg-white text-black'
                  : 'bg-blue-600 text-white shadow-sm'
              }`}
            >
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Select Learning Track
              </h2>
              <p className={`text-xs ${isGray ? 'text-zinc-400' : isBw ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Choose your focus domain and study pace
              </p>
            </div>
          </div>

          <button
            id="close-cert-modal-btn"
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
              isGray
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                : isBw
                ? 'bg-black hover:bg-neutral-900 text-white border-white'
                : isLight
                ? 'bg-white hover:bg-slate-100 text-slate-500 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Section 1: Tracks */}
          <div>
            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${
                isGray ? 'text-zinc-400' : isBw ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Learning Tracks
              </span>
              <span className={`text-[11px] ${
                isGray ? 'text-zinc-400' : isBw ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {DOMAINS.length} Tracks Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DOMAINS.map((domain) => {
                const isSelected = selectedTrack === domain.id;
                const meta = TRACK_METAS[domain.id] || TRACK_METAS.cloud;
                const summary = domainSummaries[domain.id] || { percent: 0, completedCount: 0, totalModules: meta.moduleCount };

                return (
                  <div
                    key={domain.id}
                    onClick={() => {
                      playTactileClick();
                      setSelectedTrack(domain.id);
                    }}
                    className={`relative text-left p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? isBw
                          ? 'bg-white text-black border-white ring-2 ring-white font-semibold'
                          : isGray
                          ? 'bg-[#1E2125] border-blue-500 ring-2 ring-blue-500/40 shadow-md'
                          : isLight
                          ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/30 shadow-sm'
                          : 'bg-[#161F2E] border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                        : isBw
                        ? 'bg-black hover:bg-neutral-900 border-neutral-800 text-white'
                        : isGray
                        ? 'bg-[#1A1D21] hover:bg-[#1E2125] border-zinc-800 text-zinc-200'
                        : isLight
                        ? 'bg-slate-50/70 hover:bg-white border-slate-200 text-slate-800'
                        : 'bg-[#121722]/80 hover:bg-[#161C2A] border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? isBw
                                ? 'bg-black text-white'
                                : 'bg-blue-600 text-white'
                              : isGray
                              ? 'bg-zinc-800 text-zinc-300'
                              : isLight
                              ? 'bg-slate-200 text-slate-700'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {getDomainIcon(domain.icon, 'w-4 h-4')}
                        </div>
                        <div>
                          <h3 className={`font-bold text-sm leading-tight ${
                            isSelected && isBw ? 'text-black' : ''
                          }`}>
                            {domain.name}
                          </h3>
                          <span className={`text-[11px] ${
                            isSelected && isBw
                              ? 'text-neutral-700'
                              : isGray
                              ? 'text-zinc-400'
                              : isLight
                              ? 'text-slate-500'
                              : 'text-slate-400'
                          }`}>
                            {meta.highlightCert}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isBw ? 'bg-black text-white' : 'bg-blue-600 text-white'
                        }`}>
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className={`pt-2 mt-1 border-t flex items-center justify-between text-[11px] ${
                      isSelected && isBw
                        ? 'border-neutral-300 text-neutral-800'
                        : isGray
                        ? 'border-zinc-800 text-zinc-400'
                        : isLight
                        ? 'border-slate-200 text-slate-500'
                        : 'border-slate-800/80 text-slate-400'
                    }`}>
                      <span>{meta.certCount} Certs • {meta.moduleCount} Modules</span>
                      <span className="font-medium">{summary.completedCount > 0 ? `${summary.completedCount} Done` : 'Ready'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Study Pace (Cleaned up - sentences removed as requested) */}
          <div>
            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${
                isGray ? 'text-zinc-400' : isBw ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Study Pace
              </span>
              <span className={`text-[11px] ${
                isGray ? 'text-zinc-400' : isBw ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Estimated timeline
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'sprint',
                  title: 'Fast-Track Sprint',
                  timeStr: '12-15 hrs/wk • ~4 to 6 Weeks',
                  tag: 'High Velocity',
                  icon: Flame,
                },
                {
                  id: 'balanced',
                  title: 'Balanced Progression',
                  timeStr: '5-8 hrs/wk • ~8 to 10 Weeks',
                  tag: 'Recommended',
                  icon: Clock,
                },
                {
                  id: 'casual',
                  title: 'Flexible Self-Paced',
                  timeStr: '2-4 hrs/wk • ~14 to 18 Weeks',
                  tag: 'Casual',
                  icon: Calendar,
                },
              ].map((pace) => {
                const isSelected = selectedPace === pace.id;
                const PaceIcon = pace.icon;

                return (
                  <button
                    key={pace.id}
                    onClick={() => {
                      playTactileClick();
                      setSelectedPace(pace.id as 'sprint' | 'balanced' | 'casual');
                    }}
                    type="button"
                    className={`text-left p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? isBw
                          ? 'bg-white text-black border-white ring-2 ring-white font-semibold'
                          : isGray
                          ? 'bg-[#1E2125] border-amber-500 ring-2 ring-amber-500/30'
                          : isLight
                          ? 'bg-amber-50/60 border-amber-500 ring-2 ring-amber-500/30'
                          : 'bg-[#181D26] border-amber-500 ring-2 ring-amber-500/30'
                        : isBw
                        ? 'bg-black hover:bg-neutral-900 border-neutral-800 text-white'
                        : isGray
                        ? 'bg-[#1A1D21] hover:bg-[#1E2125] border-zinc-800 text-zinc-300'
                        : isLight
                        ? 'bg-slate-50/70 hover:bg-white border-slate-200 text-slate-700'
                        : 'bg-[#121722]/80 hover:bg-[#161C2A] border-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? isBw
                                ? 'bg-black text-white'
                                : 'bg-amber-500 text-white'
                              : isGray
                              ? 'bg-zinc-800 text-zinc-400'
                              : isLight
                              ? 'bg-slate-200 text-slate-600'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <PaceIcon className="w-3.5 h-3.5" />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? isBw
                                ? 'bg-neutral-200 text-black'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : isGray
                              ? 'bg-zinc-800 text-zinc-400'
                              : isLight
                              ? 'bg-slate-200/80 text-slate-600'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {pace.tag}
                        </span>
                      </div>
                      
                      <div className={`font-bold text-xs sm:text-sm ${isSelected && isBw ? 'text-black' : ''}`}>
                        {pace.title}
                      </div>
                      
                      <div className={`text-xs font-mono font-bold mt-0.5 ${
                        isSelected && isBw
                          ? 'text-neutral-900 font-extrabold'
                          : 'text-amber-500'
                      }`}>
                        {pace.timeStr}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Target Timeline */}
          <div>
            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${
                isGray ? 'text-zinc-400' : isBw ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Target Timeline
              </span>
              <span className={`text-[11px] ${
                isGray ? 'text-zinc-400' : isBw ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {isAddingCustomTimeline ? `Custom: ${customMonths} Month${customMonths > 1 ? 's' : ''}` : `${selectedTimeline} Month${selectedTimeline > 1 ? 's' : ''} target`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { months: 1, label: '1 month', sub: '~4 Weeks' },
                { months: 3, label: '3 months', sub: '~12 Weeks' },
                { months: 5, label: '5 months', sub: '~20 Weeks' },
              ].map((tl) => {
                const isSelected = !isAddingCustomTimeline && selectedTimeline === tl.months;

                return (
                  <button
                    key={tl.months}
                    onClick={() => {
                      playTactileClick();
                      setIsAddingCustomTimeline(false);
                      setSelectedTimeline(tl.months);
                    }}
                    type="button"
                    className={`text-left p-3 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? isBw
                          ? 'bg-white text-black border-white ring-2 ring-white font-semibold'
                          : isGray
                          ? 'bg-[#1E2125] border-cyan-500 ring-2 ring-cyan-500/30'
                          : isLight
                          ? 'bg-cyan-50/60 border-cyan-600 ring-2 ring-cyan-500/30'
                          : 'bg-[#141F2B] border-cyan-500 ring-2 ring-cyan-500/30'
                        : isBw
                        ? 'bg-black hover:bg-neutral-900 border-neutral-800 text-white'
                        : isGray
                        ? 'bg-[#1A1D21] hover:bg-[#1E2125] border-zinc-800 text-zinc-300'
                        : isLight
                        ? 'bg-slate-50/70 hover:bg-white border-slate-200 text-slate-700'
                        : 'bg-[#121722]/80 hover:bg-[#161C2A] border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? isBw
                              ? 'bg-black text-white'
                              : 'bg-cyan-600 text-white'
                            : isGray
                            ? 'bg-zinc-800 text-zinc-400'
                            : isLight
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Timer className="w-3 h-3" />
                      </div>
                      {isSelected && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                          isBw ? 'bg-neutral-200 text-black' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        }`}>
                          Active
                        </span>
                      )}
                    </div>
                    <div className={`font-bold text-xs sm:text-sm ${isSelected && isBw ? 'text-black' : ''}`}>
                      {tl.label}
                    </div>
                    <div className={`text-[10px] font-mono mt-0.5 ${
                      isSelected && isBw ? 'text-neutral-800' : isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {tl.sub}
                    </div>
                  </button>
                );
              })}

              {/* Add Timeline Button / Card */}
              <button
                onClick={() => {
                  playTactileClick();
                  setIsAddingCustomTimeline(true);
                }}
                type="button"
                className={`text-left p-3 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                  isAddingCustomTimeline
                    ? isBw
                      ? 'bg-white text-black border-white ring-2 ring-white font-semibold'
                      : isGray
                      ? 'bg-[#1E2125] border-cyan-500 ring-2 ring-cyan-500/30'
                      : isLight
                      ? 'bg-cyan-50/60 border-cyan-600 ring-2 ring-cyan-500/30'
                      : 'bg-[#141F2B] border-cyan-500 ring-2 ring-cyan-500/30'
                    : isBw
                    ? 'bg-black hover:bg-neutral-900 border-dashed border-neutral-700 text-white'
                    : isGray
                    ? 'bg-[#1A1D21] hover:bg-[#1E2125] border-dashed border-zinc-700 text-zinc-300'
                    : isLight
                    ? 'bg-slate-50/70 hover:bg-white border-dashed border-slate-300 text-slate-700'
                    : 'bg-[#121722]/80 hover:bg-[#161C2A] border-dashed border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      isAddingCustomTimeline
                        ? isBw
                          ? 'bg-black text-white'
                          : 'bg-cyan-600 text-white'
                        : isGray
                        ? 'bg-zinc-800 text-zinc-400'
                        : isLight
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Plus className="w-3 h-3" />
                  </div>
                  {isAddingCustomTimeline && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isBw ? 'bg-neutral-200 text-black' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      Custom
                    </span>
                  )}
                </div>
                <div className={`font-bold text-xs sm:text-sm ${isAddingCustomTimeline && isBw ? 'text-black' : ''}`}>
                  {isAddingCustomTimeline ? `${customMonths} Month${customMonths > 1 ? 's' : ''}` : 'Add Timeline'}
                </div>
                <div className={`text-[10px] font-mono mt-0.5 ${
                  isAddingCustomTimeline && isBw ? 'text-neutral-800' : isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {isAddingCustomTimeline ? `~${customMonths * 4} Weeks` : 'Custom Horizon'}
                </div>
              </button>
            </div>

            {/* Interactive Custom Timeline Controller when Add Timeline is active */}
            {isAddingCustomTimeline && (
              <div
                id="custom-timeline-interactive-card"
                className={`mt-3 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 animate-in fade-in slide-in-from-top-2 ${
                  isBw
                    ? 'bg-neutral-900 border-2 border-white text-white'
                    : isGray
                    ? 'bg-[#1E2125] border-zinc-700 text-zinc-200'
                    : isLight
                    ? 'bg-cyan-50/70 border-cyan-200 text-slate-900'
                    : 'bg-[#141E2C] border-cyan-800/80 text-slate-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isBw ? 'bg-white text-black' : 'bg-cyan-500 text-white'
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Custom Study Horizon</div>
                      <div
                        className={`text-[11px] font-mono ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        Target: ~{customMonths * 4} weeks ({customMonths} month{customMonths > 1 ? 's' : ''})
                      </div>
                    </div>
                  </div>

                  {/* Stepper with +/- buttons and direct numeric input */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      type="button"
                      id="custom-timeline-decrease-btn"
                      onClick={() => {
                        playTactileClick();
                        setCustomMonths((prev) => Math.max(1, prev - 1));
                      }}
                      disabled={customMonths <= 1}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                        isBw
                          ? 'bg-white text-black hover:bg-neutral-200'
                          : isGray
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                          : isLight
                          ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs'
                          : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800'
                      }`}
                      title="Decrease months"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center">
                      <input
                        id="custom-timeline-months-input"
                        type="number"
                        min={1}
                        max={36}
                        value={customMonths}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val)) {
                            setCustomMonths(Math.max(1, Math.min(36, val)));
                          }
                        }}
                        className={`w-14 text-center py-1 rounded-xl text-sm font-bold font-mono border focus:outline-none focus:ring-2 ${
                          isBw
                            ? 'bg-black text-white border-white focus:ring-white'
                            : isGray
                            ? 'bg-zinc-900 text-white border-zinc-700 focus:ring-cyan-500'
                            : isLight
                            ? 'bg-white text-slate-900 border-slate-300 focus:ring-cyan-600'
                            : 'bg-slate-900 text-cyan-300 border-cyan-800 focus:ring-cyan-400'
                        }`}
                      />
                      <span className="ml-1.5 text-xs font-semibold opacity-70">months</span>
                    </div>

                    <button
                      type="button"
                      id="custom-timeline-increase-btn"
                      onClick={() => {
                        playTactileClick();
                        setCustomMonths((prev) => Math.min(36, prev + 1));
                      }}
                      disabled={customMonths >= 36}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                        isBw
                          ? 'bg-white text-black hover:bg-neutral-200'
                          : isGray
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                          : isLight
                          ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs'
                          : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800'
                      }`}
                      title="Increase months"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Range Slider for fast scrubbing */}
                <div className="pt-3">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-60 mb-1">
                    <span>1 mo</span>
                    <span>6 mo</span>
                    <span>12 mo</span>
                    <span>18 mo</span>
                    <span>24 mo</span>
                  </div>
                  <input
                    id="custom-timeline-slider"
                    type="range"
                    min={1}
                    max={24}
                    value={Math.min(customMonths, 24)}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        setCustomMonths(val);
                      }
                    }}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                {/* Quick-Pick Preset Duration Chips */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 mr-1">
                    Quick Pick:
                  </span>
                  {[2, 4, 6, 8, 10, 12, 18, 24].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        playTactileClick();
                        setCustomMonths(m);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        customMonths === m
                          ? isBw
                            ? 'bg-white text-black'
                            : 'bg-cyan-600 text-white shadow-xs scale-105'
                          : isGray
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/60'
                          : isLight
                          ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-between gap-3 ${
            isGray
              ? 'bg-[#1E2125] border-zinc-700/80 text-zinc-300'
              : isBw
              ? 'bg-black border-t-2 border-white text-white'
              : isLight
              ? 'bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#131924] border-slate-800 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 text-xs">
            <span className={`font-semibold ${isBw ? 'text-white' : 'text-blue-400'}`}>
              {currentDomainObj.name}
            </span>
            <span className="opacity-40">•</span>
            <span className="font-mono text-[11px] opacity-75">
              {isAddingCustomTimeline ? `${customMonths}m Horizon` : `${selectedTimeline}m Target`}
            </span>
            <span className="opacity-40">•</span>
            <span className="font-mono text-[11px] opacity-75">
              +{totalTrackXp.toLocaleString()} XP
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="cancel-track-btn"
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              type="button"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isGray
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                  : isBw
                  ? 'bg-black hover:bg-neutral-900 text-white border-white'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              Cancel
            </button>

            <button
              id="set-active-career-goal-btn"
              onClick={handleApply}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 ${
                isBw
                  ? 'bg-white hover:bg-neutral-200 text-black font-extrabold'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
              }`}
            >
              <span>Apply Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
