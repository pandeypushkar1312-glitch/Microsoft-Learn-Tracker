import React, { useState } from 'react';
import {
  Menu,
  Shuffle,
  Smartphone,
  Monitor,
  RotateCw,
  Maximize,
  Compass,
  Award,
  Flame,
  Sparkles,
  Keyboard,
  Sun,
  Moon,
  Settings,
  LogOut,
  User,
  Zap,
  Ribbon
} from 'lucide-react';
import { DomainId, AppTheme, CareerGoal, ComputedModuleState, DomainProgressSummary } from '../types';
import { WatermarkMode } from './MicrosoftWatermarkBackground';
import { playTactileClick, playThemeSwitchSound } from '../utils/sound';
import { MicrosoftUser } from './MicrosoftLoginPage';
import { FocusTimerWidget } from './FocusTimerWidget';
import { ThemeToggle } from './ThemeToggle';
import { SideMenuDrawer } from './SideMenuDrawer';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { SettingsModal } from './SettingsModal';
import { RemixChallengeModal } from './RemixChallengeModal';

interface HeaderProps {
  isAndroidView: boolean;
  onToggleViewMode: () => void;
  totalXp: number;
  levelTitle: string;
  currentLevel: number;
  currentLevelProgress: number;
  streakDays: number;
  certificationsEarned: number;
  onReset: () => void;
  onOpenInterviewGuide: () => void;
  isHealthOk: boolean;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  onShowLevelDetails?: () => void;
  watermarkMode: WatermarkMode;
  onWatermarkModeChange: (mode: WatermarkMode) => void;
  user: MicrosoftUser | null;
  onSignOut: () => void;
  onOpenLogin?: () => void;
  onOpenTrackModal?: () => void;
  currentTrackName?: string;
  selectedDomain?: DomainId;
  onSelectDomain?: (domain: DomainId) => void;
  onClaimRemixReward?: (xpBonus: number) => void;
  activeTab?: 'path' | 'graph' | 'success' | 'coach';
  onSelectTab?: (tab: 'path' | 'graph' | 'success' | 'coach') => void;
  domainSummaries?: Record<DomainId, DomainProgressSummary>;
  allModulesWithState?: ComputedModuleState[];
  onOpenCoach?: () => void;
  onOpenModuleDrawer?: (moduleId: string) => void;
  activeGoal?: CareerGoal | null;
}

export const Header: React.FC<HeaderProps> = ({
  isAndroidView,
  onToggleViewMode,
  totalXp,
  levelTitle,
  currentLevel,
  currentLevelProgress,
  streakDays,
  certificationsEarned,
  onReset,
  onOpenInterviewGuide,
  isHealthOk,
  theme,
  onThemeChange,
  onShowLevelDetails,
  watermarkMode,
  onWatermarkModeChange,
  user,
  onSignOut,
  onOpenLogin,
  onOpenTrackModal,
  currentTrackName = 'Azure Practitioner',
  selectedDomain = 'cloud',
  onSelectDomain,
  onClaimRemixReward,
  activeTab = 'path',
  onSelectTab,
  domainSummaries,
  allModulesWithState,
  onOpenCoach,
  onOpenModuleDrawer,
  activeGoal,
}) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRemixOpen, setIsRemixOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleFullscreen = () => {
    playTactileClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleToggleTheme = () => {
    const nextTheme: AppTheme = theme === 'light' ? 'dark' : 'light';
    playThemeSwitchSound(nextTheme === 'dark');
    onThemeChange(nextTheme);
  };

  return (
    <div className="relative z-40 w-full select-none font-sans">
      {/* Sleek, High-Precision Microsoft Learn Header Bar */}
      <header className={`w-full backdrop-blur-md px-3 sm:px-6 py-2.5 transition-all ${
        theme === 'light'
          ? 'bg-white/95 text-slate-900 border-b border-slate-200 shadow-sm'
          : theme === 'gray'
          ? 'bg-[#282B30]/95 text-zinc-100 border-b border-zinc-700 shadow-md'
          : theme === 'bw'
          ? 'bg-black text-white border-b-2 border-white shadow-none'
          : 'bg-[#1E1E20]/95 text-slate-100 border-b border-slate-800 shadow-xl'
      }`}>
        <div className="max-w-[1750px] mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          
          {/* ================= LEFT GROUP: Menu + MS Logo + Title + Change Track ================= */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setIsSideMenuOpen(true);
              }}
              className="p-2 rounded-xl bg-[#2B2B2E] hover:bg-[#3A3A3E] text-slate-200 hover:text-white border border-slate-700/60 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
              title="Open Navigation Menu & Certification Tracks (☰)"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Microsoft 4-Color Quad Tile Logo with subtle animated glow */}
            <div
              onClick={() => {
                playTactileClick();
                if (onOpenTrackModal) onOpenTrackModal();
              }}
              className="grid grid-cols-2 gap-0.5 w-5 h-5 cursor-pointer flex-shrink-0 hover:scale-110 transition-transform duration-200 group"
              title="Microsoft Learn Path Tracker - Click to view tracks"
            >
              <div className="w-2.2 h-2.2 rounded-[1.5px] bg-[#F25022] group-hover:shadow-[0_0_8px_rgba(242,80,34,0.7)] transition-shadow" />
              <div className="w-2.2 h-2.2 rounded-[1.5px] bg-[#7FBA00] group-hover:shadow-[0_0_8px_rgba(127,186,0,0.7)] transition-shadow" />
              <div className="w-2.2 h-2.2 rounded-[1.5px] bg-[#00A4EF] group-hover:shadow-[0_0_8px_rgba(0,164,239,0.7)] transition-shadow" />
              <div className="w-2.2 h-2.2 rounded-[1.5px] bg-[#FFB900] group-hover:shadow-[0_0_8px_rgba(255,185,0,0.7)] transition-shadow" />
            </div>

            {/* Branding Title */}
            <div className="flex flex-col leading-tight">
              <div className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1">
                <span>Microsoft</span>
                <span className="text-[#00A4EF] drop-shadow-[0_0_8px_rgba(0,164,239,0.4)]">Learn</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">Path Tracker</span>
            </div>

            {/* Change Track Pill Button */}
            {onOpenTrackModal && (
              <button
                type="button"
                id="header-change-track-btn"
                onClick={() => {
                  playTactileClick();
                  onOpenTrackModal();
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#132D4B] hover:bg-[#0078D4] text-[#38BDF8] hover:text-white border border-[#0078D4]/60 hover:border-[#0078D4] transition-all duration-200 cursor-pointer text-xs font-semibold hover:scale-105 active:scale-95 shadow-xs ml-1 group"
                title="Change Certification Track & Career Goals (Hotkeys: T / C)"
              >
                <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                <span>Change Track</span>
              </button>
            )}
          </div>

          {/* ================= CENTER GROUP: Badges & Focus Timer ================= */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center my-1 sm:my-0">
            
            {/* 1. Focus Timer Pill Widget (25:00 Focus with glowing pulse) */}
            <FocusTimerWidget theme={theme} />

            {/* 2. Active Track Pill (e.g. Azure Practitioner) with shimmer */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                if (onOpenTrackModal) onOpenTrackModal();
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#0078D4] to-[#00A4EF] hover:from-[#005A9E] hover:to-[#0078D4] text-white transition-all duration-200 cursor-pointer text-xs font-bold shadow-md shadow-blue-500/25 hover:scale-105 active:scale-95 border border-blue-400/30"
              title="Current Active Track: Click to switch"
            >
              <Award className="w-3.5 h-3.5 text-white" />
              <span>{currentTrackName || 'Azure Practitioner'}</span>
            </button>

            {/* 3. Streak Pill (e.g. 4d with animated flame) */}
            <div
              onClick={() => {
                playTactileClick();
                if (onShowLevelDetails) onShowLevelDetails();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#451A03] to-[#78350F] border border-amber-500/60 text-amber-300 text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform shadow-xs shadow-amber-900/30"
              title={`${streakDays} Day Continuous Learning Streak (Click for details)`}
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-bounce" />
              <span>{streakDays}d</span>
            </div>

            {/* 4. XP Pill (e.g. 900 XP) */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                if (onShowLevelDetails) onShowLevelDetails();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#312E81] border border-indigo-500/60 text-indigo-200 hover:text-white text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform shadow-xs shadow-indigo-900/30"
              title={`${totalXp} Total XP Points (Click for Level Milestones)`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>{totalXp}</span>
            </button>

            {/* 5. Daily Remix Challenge Quick Pill */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setIsRemixOpen(true);
              }}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#27272A] hover:bg-[#3F3F46] text-slate-200 hover:text-white border border-slate-700/60 transition-all cursor-pointer font-medium text-xs hover:scale-105 active:scale-95 shadow-xs"
              title="Daily Study Remix & Bonus XP"
            >
              <Shuffle className="w-3 h-3 text-cyan-400" />
              <span>Remix</span>
            </button>

            {/* 6. Device View Toggle Quick Pill */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                onToggleViewMode();
              }}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer font-medium text-xs hover:scale-105 active:scale-95 shadow-xs ${
                isAndroidView
                  ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/30'
                  : 'bg-[#27272A] hover:bg-[#3F3F46] text-slate-200 hover:text-white border-slate-700/60'
              }`}
              title="Toggle Android Device Simulator vs Full Desktop Canvas (Hotkey: D)"
            >
              <Smartphone className="w-3 h-3 text-emerald-400" />
              <span>{isAndroidView ? 'Mobile View' : 'Device'}</span>
            </button>
          </div>

          {/* ================= RIGHT GROUP: Shortcuts + Theme + Settings + Learner Profile ================= */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            
            {/* Keyboard Shortcuts Button */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setIsShortcutsOpen(true);
              }}
              className="p-1.5 rounded-xl bg-[#2B2B2E] hover:bg-[#3A3A3E] text-slate-300 hover:text-white border border-slate-700/60 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
              title="Keyboard Shortcuts Cheat Sheet (⌨️)"
            >
              <Keyboard className="w-4 h-4" />
            </button>

            {/* Multi-Theme Selector / Quick Toggle */}
            <ThemeToggle
              theme={theme}
              onThemeChange={onThemeChange}
              compact
            />

            {/* Learner Profile Pill Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  setIsProfileMenuOpen((prev) => !prev);
                }}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-[#18181B] hover:bg-[#27272A] border border-slate-700/80 text-left transition-all cursor-pointer hover:scale-105 active:scale-95 group shadow-sm"
                title={user ? `Signed in as ${user.name} (${user.email})` : 'Learner Account - Click to sign in or view options'}
              >
                {/* Circular Avatar with Glowing Border */}
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-blue-500 p-[1.5px] flex-shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.4)]">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
                    {user?.name ? (
                      user.name.charAt(0).toUpperCase()
                    ) : (
                      <span className="text-emerald-400 text-[10px] font-black">L</span>
                    )}
                  </div>
                </div>

                {/* Two-Line Text Block (Learner / Sign in or Name) */}
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {user ? user.name.split(' ')[0] : 'Learner'}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">
                    {user ? 'Active' : 'Sign in'}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl p-2.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 text-slate-200">
                  <div className="px-2.5 py-2 mb-1.5 border-b border-slate-800">
                    <div className="text-xs font-bold text-white">
                      {user ? user.name : 'Guest Learner'}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      {user ? user.email : 'Local state only'}
                    </div>
                  </div>

                  {user ? (
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onSignOut();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign out
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        if (onOpenLogin) onOpenLogin();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                    >
                      <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                        <div className="w-1.2 h-1.2 bg-[#F25022]" />
                        <div className="w-1.2 h-1.2 bg-[#7FBA00]" />
                        <div className="w-1.2 h-1.2 bg-[#00A4EF]" />
                        <div className="w-1.2 h-1.2 bg-[#FFB900]" />
                      </div>
                      Sign in with Microsoft
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* ================= MODALS & DRAWERS ================= */}

      {/* Hamburger Navigation Drawer */}
      <SideMenuDrawer
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        selectedDomain={selectedDomain}
        onSelectDomain={(dom) => {
          if (onSelectDomain) onSelectDomain(dom);
        }}
        onOpenTrackModal={() => {
          if (onOpenTrackModal) onOpenTrackModal();
        }}
        onOpenInterviewGuide={onOpenInterviewGuide}
        onToggleViewMode={onToggleViewMode}
        isAndroidView={isAndroidView}
        totalXp={totalXp}
        streakDays={streakDays}
        certificationsEarned={certificationsEarned}
        currentLevel={currentLevel}
        levelTitle={levelTitle}
        currentLevelProgress={currentLevelProgress}
        theme={theme}
        onThemeChange={onThemeChange}
        onOpenSettings={() => setIsSettingsOpen(true)}
        user={user}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenCoach={onOpenCoach}
        onOpenAnalytics={() => {
          if (onSelectTab) onSelectTab('success');
        }}
        onOpenRoadmap={() => {
          if (onSelectTab) onSelectTab('graph');
        }}
        onOpenRemix={() => setIsRemixOpen(true)}
        onSelectTab={onSelectTab}
        activeTab={activeTab}
        domainSummaries={domainSummaries}
        allModulesWithState={allModulesWithState}
        onSelectModule={onOpenModuleDrawer}
        watermarkMode={watermarkMode}
        onWatermarkModeChange={onWatermarkModeChange}
        activeGoal={activeGoal}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        theme={theme}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onThemeChange={onThemeChange}
        watermarkMode={watermarkMode}
        onWatermarkModeChange={onWatermarkModeChange}
        user={user}
        onSignOut={onSignOut}
        onOpenLogin={() => {
          if (onOpenLogin) onOpenLogin();
        }}
        onResetProgress={onReset}
      />

      {/* Daily Remix Challenge Modal */}
      <RemixChallengeModal
        isOpen={isRemixOpen}
        onClose={() => setIsRemixOpen(false)}
        onSelectTrack={(trackId) => {
          if (onSelectDomain) onSelectDomain(trackId);
        }}
        onClaimReward={onClaimRemixReward}
      />

    </div>
  );
};
