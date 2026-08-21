import React, { useState } from 'react';
import {
  X,
  Compass,
  Award,
  Layers,
  Sparkles,
  BookOpen,
  Info,
  Smartphone,
  Monitor,
  Flame,
  CheckCircle2,
  ExternalLink,
  Bot,
  CircleDot,
  Moon,
  Sun,
  Contrast,
  Settings,
  Zap,
  Target,
  FileQuestion,
  GraduationCap,
  Shield,
  Clock,
  TrendingUp,
  Cpu,
  BookMarked,
  KeyRound,
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { DomainId, AppTheme, CareerGoal, ComputedModuleState, DomainProgressSummary } from '../types';
import { DOMAINS, LEARNING_MODULES } from '../data/learningPaths';
import { playTactileClick, playThemeSwitchSound } from '../utils/sound';
import { THEME_OPTIONS } from './ThemeToggle';
import { MicrosoftUser } from './MicrosoftLoginPage';
import { WatermarkMode } from './MicrosoftWatermarkBackground';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDomain: DomainId;
  onSelectDomain: (domain: DomainId) => void;
  onOpenTrackModal: () => void;
  onOpenInterviewGuide: () => void;
  onToggleViewMode: () => void;
  isAndroidView: boolean;
  totalXp: number;
  streakDays: number;
  certificationsEarned: number;
  currentLevel?: number;
  levelTitle?: string;
  currentLevelProgress?: number;
  theme?: AppTheme;
  onThemeChange?: (theme: AppTheme) => void;
  onOpenSettings?: () => void;
  user?: MicrosoftUser | null;
  onOpenShortcuts?: () => void;
  onOpenCoach?: () => void;
  onOpenAnalytics?: () => void;
  onOpenRoadmap?: () => void;
  onOpenRemix?: () => void;
  onSelectTab?: (tab: 'path' | 'graph' | 'success' | 'coach') => void;
  activeTab?: 'path' | 'graph' | 'success' | 'coach';
  domainSummaries?: Record<DomainId, DomainProgressSummary>;
  allModulesWithState?: ComputedModuleState[];
  onSelectModule?: (moduleId: string) => void;
  watermarkMode?: WatermarkMode;
  onWatermarkModeChange?: (mode: WatermarkMode) => void;
  activeGoal?: CareerGoal | null;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({
  isOpen,
  onClose,
  selectedDomain,
  onSelectDomain,
  onOpenTrackModal,
  onOpenInterviewGuide,
  onToggleViewMode,
  isAndroidView,
  totalXp,
  streakDays,
  certificationsEarned,
  currentLevel = 2,
  levelTitle = 'Azure Solution Architect',
  currentLevelProgress = 65,
  theme = 'dark',
  onThemeChange,
  onOpenSettings,
  user,
  onOpenShortcuts,
  onOpenCoach,
  onOpenAnalytics,
  onOpenRoadmap,
  onOpenRemix,
  onSelectTab,
  activeTab = 'path',
  domainSummaries,
  allModulesWithState,
  onSelectModule,
  watermarkMode,
  onWatermarkModeChange,
  activeGoal,
}) => {
  // Navigation view mode inside drawer: 'tracks' | 'suite' | 'summary'
  const [drawerSectionTab, setDrawerSectionTab] = useState<'tracks' | 'suite' | 'summary'>('tracks');

  if (!isOpen) return null;

  const activeDomainInfo = DOMAINS.find((d) => d.id === selectedDomain);
  const activeSummary = domainSummaries ? domainSummaries[selectedDomain] : null;
  const currentModules = allModulesWithState
    ? allModulesWithState.filter((m) => m.domainId === selectedDomain)
    : [];

  const completedCount = currentModules.filter((m) => m.status === 'completed').length;
  const totalCount = currentModules.length || 4;
  const percentComplete = Math.round((completedCount / totalCount) * 100);

  // Next available module in active domain
  const nextAvailableModule = currentModules.find((m) => m.status === 'available') || currentModules[0];

  const handleNextModuleClick = () => {
    playTactileClick();
    onClose();
    if (nextAvailableModule && onSelectModule) {
      onSelectModule(nextAvailableModule.id);
    }
  };

  const getThemeDisplayLabel = (t?: string) => {
    switch (t) {
      case 'light': return 'Light Theme';
      case 'gray': return 'Charcoal Theme';
      case 'bw': return 'High-Contrast';
      default: return 'Neon Theme';
    }
  };

  const cycleTheme = () => {
    if (!onThemeChange) return;
    const themes: AppTheme[] = ['dark', 'light', 'gray', 'bw'];
    const currentTheme: AppTheme = (theme as AppTheme) || 'dark';
    const currIdx = themes.indexOf(currentTheme);
    const next: AppTheme = themes[(currIdx + 1) % themes.length] ?? 'dark';
    playThemeSwitchSound(next === 'dark' || next === 'bw');
    onThemeChange(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
        aria-label="Close navigation overlay"
      />

      {/* Drawer Content */}
      <div 
        className={`relative w-96 max-w-[90vw] h-full shadow-2xl flex flex-col justify-between z-10 border-r animate-in slide-in-from-left duration-300 select-none ${
          theme === 'gray'
            ? 'bg-[#1E2125] border-zinc-700 text-zinc-100'
            : theme === 'bw'
            ? 'bg-black border-r-2 border-white text-white'
            : theme === 'light'
            ? 'bg-slate-900 border-slate-800 text-slate-100' // High-contrast crisp sidebar matching MS Learn Dark aesthetic
            : 'bg-[#10131A] border-slate-800 text-slate-100'
        }`}
      >
        {/* Top Scrollable Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 space-y-4 custom-scrollbar">
          
          {/* 1. Header with Microsoft 4-Color Quad Tile */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-1 w-6 h-6 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#F25022] shadow-[0_0_8px_rgba(242,80,34,0.4)]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#7FBA00] shadow-[0_0_8px_rgba(127,186,0,0.4)]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#00A4EF] shadow-[0_0_8px_rgba(0,164,239,0.4)]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#FFB900] shadow-[0_0_8px_rgba(255,185,0,0.4)]" />
              </div>
              <div className="flex flex-col leading-tight">
                <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
                  <span>Microsoft</span>
                  <span className="text-[#00A4EF]">Learn</span>
                </h2>
                <p className="text-[10.5px] text-slate-400 font-medium">Path Tracker & Certification Hub</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer hover:scale-105 active:scale-95"
              title="Close Menu (Esc)"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Learner Profile & Level Progression Card */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600/80 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 border border-blue-400/40 flex items-center justify-center font-bold text-white shadow-md text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : (user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'G')}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online & Synced" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{user?.name || user?.displayName || 'Guest Learner'}</span>
                    {user?.isGuest && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 font-semibold">
                        Guest
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Level {currentLevel} ({totalXp} XP)</span>
                  </div>
                </div>
              </div>

              {/* Preferences / Settings shortcut gear */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onClose();
                  if (onOpenSettings) onOpenSettings();
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-700/70 transition-colors cursor-pointer hover:scale-110 active:scale-95"
                title="Account & Dashboard Preferences"
                aria-label="Preferences"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Level Milestone Micro-bar */}
            <div className="mt-3 pt-2.5 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-[10.5px] text-slate-400 mb-1">
                <span>Tier: <span className="text-slate-200 font-medium">{levelTitle}</span></span>
                <span className="font-mono text-cyan-300">{currentLevelProgress}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, currentLevelProgress))}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3. Navigation View Filter Pills */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700/70 text-center text-xs">
            {/* 1st Position: Tracks */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setDrawerSectionTab('tracks');
              }}
              className={`py-1.5 px-2 rounded-lg font-semibold transition-all cursor-pointer ${
                drawerSectionTab === 'tracks'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              Tracks
            </button>
            {/* 2nd Position: Study Suite */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setDrawerSectionTab('suite');
              }}
              className={`py-1.5 px-2 rounded-lg font-semibold transition-all cursor-pointer ${
                drawerSectionTab === 'suite'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              Study Suite
            </button>
            {/* 3rd Position: Summary */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setDrawerSectionTab('summary');
              }}
              className={`py-1.5 px-2 rounded-lg font-semibold transition-all cursor-pointer ${
                drawerSectionTab === 'summary'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              Summary
            </button>
          </div>

          {/* 4. Active Track Summary & Fast Resume Card */}
          {(drawerSectionTab === 'summary' || drawerSectionTab === 'tracks') && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-800/40 hover:border-blue-700/60 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{activeDomainInfo?.icon || '☁️'}</span>
                  <div>
                    <div className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">Active Learning Path</div>
                    <div className="text-xs font-bold text-white">{activeDomainInfo?.name || 'Azure Cloud Computing'}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  {completedCount}/{totalCount} Done
                </span>
              </div>

              {/* Track Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-1.5 mb-3 overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>

              {/* Next Up Action */}
              {nextAvailableModule && (
                <button
                  type="button"
                  onClick={handleNextModuleClick}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-cyan-200 text-xs font-semibold transition-all cursor-pointer hover:scale-101 active:scale-99"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Play className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 fill-cyan-400/30" />
                    <span className="truncate">Next: {nextAvailableModule.code} - {nextAvailableModule.title}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-500/40 px-1.5 py-0.5 rounded text-white flex-shrink-0 ml-1">
                    Resume
                  </span>
                </button>
              )}
            </div>
          )}

          {/* 5. Quick Stats / Tracker Metrics Grid */}
          {(drawerSectionTab === 'summary' || drawerSectionTab === 'tracks') && (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="text-[10px] text-slate-400 font-medium">Daily Streak</div>
                <div className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" /> {streakDays}d
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="text-[10px] text-slate-400 font-medium">Total XP</div>
                <div className="text-xs font-bold text-purple-300 flex items-center justify-center gap-1 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> {totalXp}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="text-[10px] text-slate-400 font-medium">Certifications</div>
                <div className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" /> {certificationsEarned}
                </div>
              </div>
            </div>
          )}

          {/* 6. STUDY SUITE & FEATURES (Matches screenshot & adds full interactive tools) */}
          {(drawerSectionTab === 'summary' || drawerSectionTab === 'suite') && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
                <span>Study Suite & Features</span>
                <span className="text-[10px] text-slate-500 font-mono">Interactive</span>
              </div>

              {/* 6.1 Microsoft Copilot AI */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onClose();
                  if (onOpenCoach) {
                    onOpenCoach();
                  } else if (onSelectTab) {
                    onSelectTab('coach');
                  }
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/70 hover:bg-slate-700/90 text-left border border-slate-700/60 hover:border-blue-500/50 transition-all cursor-pointer group hover:scale-101 active:scale-99"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-700/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Microsoft Copilot AI
                    </div>
                    <div className="text-[10.5px] text-slate-400">
                      Interactive architecture tutor & quizzes
                    </div>
                  </div>
                </div>
                <kbd className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 shadow-inner">
                  Ctrl+K
                </kbd>
              </button>

              {/* 6.2 Exam Readiness & XP */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onClose();
                  if (onOpenAnalytics) {
                    onOpenAnalytics();
                  } else if (onSelectTab) {
                    onSelectTab('success');
                  }
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/70 hover:bg-slate-700/90 text-left border border-slate-700/60 hover:border-indigo-500/50 transition-all cursor-pointer group hover:scale-101 active:scale-99"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      Exam Readiness & XP
                    </div>
                    <div className="text-[10.5px] text-slate-400">
                      Analytics, milestones & badges
                    </div>
                  </div>
                </div>
                <kbd className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 shadow-inner">
                  Ctrl+A
                </kbd>
              </button>

              {/* 6.3 Visual Branching Roadmap (DAG) */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onClose();
                  if (onOpenRoadmap) {
                    onOpenRoadmap();
                  } else if (onSelectTab) {
                    onSelectTab('graph');
                  }
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/70 hover:bg-slate-700/90 text-left border border-slate-700/60 hover:border-cyan-500/50 transition-all cursor-pointer group hover:scale-101 active:scale-99"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Visual DAG Roadmap
                    </div>
                    <div className="text-[10.5px] text-slate-400">
                      Interactive module dependency tree
                    </div>
                  </div>
                </div>
                <kbd className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 shadow-inner">
                  Ctrl+M
                </kbd>
              </button>

              {/* 6.4 Career Goal & Track Hub */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onClose();
                  onOpenTrackModal();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/70 hover:bg-slate-700/90 text-left border border-slate-700/60 hover:border-emerald-500/50 transition-all cursor-pointer group hover:scale-101 active:scale-99"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Career Goal & Milestone Track
                    </div>
                    <div className="text-[10.5px] text-slate-400">
                      {activeGoal ? activeGoal.title : 'Customize target certification path'}
                    </div>
                  </div>
                </div>
                <kbd className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 shadow-inner">
                  Ctrl+T
                </kbd>
              </button>

              {/* 6.5 Technical Architecture & Interview Guide */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onClose();
                  onOpenInterviewGuide();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/70 hover:bg-slate-700/90 text-left border border-slate-700/60 hover:border-blue-500/50 transition-all cursor-pointer group hover:scale-101 active:scale-99"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-700/60 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      Interview & Architecture Guide
                    </div>
                    <div className="text-[10.5px] text-slate-400">
                      Real-world system design & state transitions
                    </div>
                  </div>
                </div>
                <kbd className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 shadow-inner">
                  I
                </kbd>
              </button>

              {/* 6.6 Daily Remix Challenge */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onClose();
                  if (onOpenRemix) onOpenRemix();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/70 hover:bg-slate-700/90 text-left border border-slate-700/60 hover:border-amber-500/50 transition-all cursor-pointer group hover:scale-101 active:scale-99"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      Daily Remix Challenge
                    </div>
                    <div className="text-[10.5px] text-slate-400">
                      Earn bonus streak XP with randomized quizzes
                    </div>
                  </div>
                </div>
                <kbd className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 shadow-inner">
                  Ctrl+R
                </kbd>
              </button>

              {/* 6.7 Toggle Mobile / Desktop Frame */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onToggleViewMode();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/70 hover:bg-slate-700/90 text-left border border-slate-700/60 hover:border-emerald-500/50 transition-all cursor-pointer group hover:scale-101 active:scale-99"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
                    {isAndroidView ? (
                      <Monitor className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {isAndroidView ? 'Switch to Desktop Dashboard' : 'Switch to Android Simulator'}
                    </div>
                    <div className="text-[10.5px] text-slate-400">
                      {isAndroidView ? 'Expanded multi-column view' : 'Mobile touch experience'}
                    </div>
                  </div>
                </div>
                <kbd className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 shadow-inner">
                  D
                </kbd>
              </button>

              {/* 6.8 Keyboard Shortcuts */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onClose();
                  if (onOpenShortcuts) onOpenShortcuts();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/70 hover:bg-slate-700/90 text-left border border-slate-700/60 hover:border-slate-500/50 transition-all cursor-pointer group hover:scale-101 active:scale-99"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      Keyboard Shortcuts
                    </div>
                    <div className="text-[10.5px] text-slate-400">
                      Quick action command list
                    </div>
                  </div>
                </div>
                <kbd className="px-2.5 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-[11px] font-mono font-bold text-slate-300 shadow-inner">
                  ?
                </kbd>
              </button>
            </div>
          )}

          {/* 7. ALL 5 CERTIFICATION PATHS (Interactive Fast-Switcher) */}
          {(drawerSectionTab === 'summary' || drawerSectionTab === 'tracks') && (
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
                <span>Certification Tracks</span>
                <span className="text-[10px] text-slate-500 font-mono">5 Domains</span>
              </div>

              <div className="space-y-1.5">
                {DOMAINS.map((domain) => {
                  const isSelected = domain.id === selectedDomain;
                  const domSummary = domainSummaries ? domainSummaries[domain.id] : null;
                  const dDone = domSummary?.completedCount || 0;
                  const dTotal = domSummary?.totalModules || 4;
                  const dPercent = Math.round((dDone / dTotal) * 100);

                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => {
                        playTactileClick();
                        onSelectDomain(domain.id);
                        onClose();
                      }}
                      className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-blue-600 text-white font-semibold border-blue-400/50 shadow-md shadow-blue-500/20'
                          : 'bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="flex items-center gap-2 font-medium text-xs">
                          <span className="text-sm">{domain.icon}</span>
                          <span className="truncate">{domain.name}</span>
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono">
                          <span className={isSelected ? 'text-blue-100 font-bold' : 'text-slate-400'}>
                            {dDone}/{dTotal}
                          </span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                        </div>
                      </div>

                      {/* Mini track progress indicator */}
                      <div className="w-full bg-black/40 rounded-full h-1 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isSelected ? 'bg-white' : 'bg-blue-500'
                          }`}
                          style={{ width: `${dPercent}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 8. OFFICIAL MICROSOFT RESOURCES (Matches user screenshot) */}
          <div className="space-y-1.5 pt-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
              <span>Official Microsoft Resources</span>
              <span className="text-[10px] text-slate-500 font-mono">External</span>
            </div>

            <div className="space-y-1">
              <a
                href="https://learn.microsoft.com/credentials/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-cyan-300 bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <BookMarked className="w-4 h-4 text-blue-400 group-hover:text-cyan-300" />
                  <span>Microsoft Credentials & Certifications</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300" />
              </a>

              <a
                href="https://learn.microsoft.com/azure/architecture/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-cyan-300 bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
                  <span>Azure Architecture Center Reference</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300" />
              </a>

              <a
                href="https://learn.microsoft.com/azure/well-architected/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-emerald-300 bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
                  <span>Azure Well-Architected Framework (WAF)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-300" />
              </a>

              <a
                href="https://learn.microsoft.com/azure/cloud-adoption-framework/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-amber-300 bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-amber-500/40 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                  <span>Cloud Adoption Framework (CAF)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300" />
              </a>

              <a
                href="https://learn.microsoft.com/credentials/certifications/practice-assessments"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-purple-300 bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-purple-500/40 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                  <span>Microsoft Practice Assessments</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-300" />
              </a>
            </div>
          </div>

        </div>

        {/* 9. Interactive Footer with Theme Switcher & Preferences Button (Matches Screenshot) */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 backdrop-blur-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            {/* Quick Theme Toggle Button */}
            <button
              type="button"
              onClick={cycleTheme}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer hover:scale-102 active:scale-98"
              title="Click to cycle Theme (Neon / Light / Charcoal / High-Contrast)"
            >
              {theme === 'light' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : theme === 'gray' ? (
                <Contrast className="w-3.5 h-3.5 text-zinc-400" />
              ) : theme === 'bw' ? (
                <CircleDot className="w-3.5 h-3.5 text-white" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span className="truncate">{getThemeDisplayLabel(theme)}</span>
            </button>

            {/* Preferences / Settings Button */}
            <button
              id="drawer-open-preferences-btn"
              type="button"
              onClick={() => {
                playTactileClick();
                onClose();
                if (onOpenSettings) onOpenSettings();
              }}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold bg-[#0078D4] hover:bg-[#006cbd] text-white shadow-sm shadow-blue-500/30 transition-all cursor-pointer hover:scale-102 active:scale-98 flex-shrink-0"
              title="Open Preferences & Settings Modal"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Preferences</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-slate-500 font-mono px-1">
            <span>DAG Engine v2.4</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Online
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
