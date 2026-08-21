/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Layers,
  Award,
  Bot,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { Header } from './components/Header';
import { DomainPicker } from './components/DomainPicker';
import { ModuleCard } from './components/ModuleCard';
import { VisualRoadmap } from './components/VisualRoadmap';
import { SuccessLog } from './components/SuccessLog';
import { AiExplanationModal } from './components/AiExplanationModal';
import { AiStudyCoach } from './components/AiStudyCoach';
import { InterviewGuide } from './components/InterviewGuide';
import { AndroidFrame } from './components/AndroidFrame';
import { MicrosoftWatermarkBackground, WatermarkMode } from './components/MicrosoftWatermarkBackground';
import { MicrosoftLoginPage, MicrosoftUser } from './components/MicrosoftLoginPage';
import { CertificationTrackModal } from './components/CertificationTrackModal';
import { MicrobotFloatingWidget } from './components/MicrobotFloatingWidget';
import { DailyQuestsWidget } from './components/DailyQuestsWidget';
import { ModuleSideDrawer } from './components/ModuleSideDrawer';
import { CloudPipelineStepper } from './components/CloudPipelineStepper';

import {
  DomainId,
  ComputedModuleState,
  UserProgressData,
  DomainProgressSummary,
  ExplainUnlockResponse,
  AppTheme,
  CareerGoal,
} from './types';
import { DOMAINS, LEARNING_MODULES, INITIAL_USER_PROGRESS } from './data/learningPaths';
import {
  computeAllModuleStates,
  computeDomainSummaries,
  calculateLevel,
  generateLocalUnlockExplanation
} from './utils/engine';
import { playTactileClick } from './utils/sound';

export default function App() {
  // Theme State (Light vs Dark)
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('mslearn_theme');
    if (saved === 'dark' || saved === 'midnight' || saved === 'matrix') return 'dark';
    return 'light';
  });

  // Microsoft Watermark Mode State
  const [watermarkMode, setWatermarkMode] = useState<WatermarkMode>(() => {
    return (localStorage.getItem('mslearn_watermark_mode') as WatermarkMode) || 'hologram';
  });

  useEffect(() => {
    localStorage.setItem('mslearn_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('mslearn_watermark_mode', watermarkMode);
  }, [watermarkMode]);

  // Application State
  const [progress, setProgress] = useState<UserProgressData>(INITIAL_USER_PROGRESS);
  const [domainSummaries, setDomainSummaries] = useState<Record<DomainId, DomainProgressSummary>>(() => {
    const computed = computeAllModuleStates(LEARNING_MODULES, INITIAL_USER_PROGRESS.completedModules);
    return computeDomainSummaries(computed);
  });
  const [allModulesWithState, setAllModulesWithState] = useState<ComputedModuleState[]>(() => {
    return computeAllModuleStates(LEARNING_MODULES, INITIAL_USER_PROGRESS.completedModules);
  });

  const [selectedDomain, setSelectedDomain] = useState<DomainId>('cloud');
  const [activeGoal, setActiveGoal] = useState<CareerGoal | null>(() => {
    try {
      const saved = localStorage.getItem('mslearn_career_goal');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedDrawerModuleId, setSelectedDrawerModuleId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'path' | 'graph' | 'success' | 'coach'>('path');
  const [isAndroidView, setIsAndroidView] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'available' | 'locked'>('all');

  const handleSelectTrackAndGoal = (trackId: DomainId, goal?: CareerGoal) => {
    setSelectedDomain(trackId);
    if (goal) {
      setActiveGoal(goal);
      try {
        localStorage.setItem('mslearn_career_goal', JSON.stringify(goal));
      } catch {
        // ignore
      }
    }
  };

  // Modals & Drawers
  const [isInterviewGuideOpen, setIsInterviewGuideOpen] = useState(false);
  const [aiCoachModal, setAiCoachModal] = useState<{
    isOpen: boolean;
    selectedModule: ComputedModuleState | null;
  }>({
    isOpen: false,
    selectedModule: null,
  });

  const [aiExplanationModal, setAiExplanationModal] = useState<{
    isOpen: boolean;
    isLoading: boolean;
    data: ExplainUnlockResponse | null;
    learnUrl?: string;
  }>({
    isOpen: false,
    isLoading: false,
    data: null,
    learnUrl: undefined,
  });

  const [isHealthOk, setIsHealthOk] = useState(false);

  const isLight = theme === 'light';

  // 1. Initial Data Fetch from Backend API
  const loadProgressFromApi = async () => {
    try {
      const res = await fetch('/api/progress');
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
        setDomainSummaries(data.domainSummaries);
        setAllModulesWithState(data.allModulesWithState);
        setIsHealthOk(true);
      }
    } catch (err) {
      console.warn('Using local fallback state for progress:', err);
      // Local fallback computation
      const computed = computeAllModuleStates(LEARNING_MODULES, progress.completedModules);
      setAllModulesWithState(computed);
      setDomainSummaries(computeDomainSummaries(computed));
    }
  };

  useEffect(() => {
    loadProgressFromApi();
  }, []);

  // Microsoft User Authentication State (Persisted in localStorage)
  const [currentUser, setCurrentUser] = useState<MicrosoftUser | null>(() => {
    const saved = localStorage.getItem('mslearn_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(() => {
    // If no user is logged in, show Microsoft login gate on startup
    return !localStorage.getItem('mslearn_user');
  });

  const handleLoginSuccess = (user: MicrosoftUser) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    localStorage.setItem('mslearn_user', JSON.stringify(user));
  };

  const handleSignOut = () => {
    playTactileClick();
    setCurrentUser(null);
    localStorage.removeItem('mslearn_user');
    setIsLoginModalOpen(true);
  };

  const handleOpenLogin = () => {
    playTactileClick();
    setIsLoginModalOpen(true);
  };

  // Level & XP calculations
  const levelInfo = calculateLevel(progress.totalXp);

  // 2. Mark Module Complete Action (Calls backend API & checks newly unlocked modules)
  const handleCompleteModule = async (moduleId: string, score = 1000, notes?: string) => {
    try {
      const res = await fetch('/api/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, score, notes }),
      });

      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
        setDomainSummaries(data.domainSummaries);
        setAllModulesWithState(data.allModulesWithState);

        // If a new module was unlocked, automatically prompt AI next-step explanation!
        if (data.newlyUnlockedModules && data.newlyUnlockedModules.length > 0) {
          const firstUnlocked = data.newlyUnlockedModules[0];
          handleExplainUnlock(firstUnlocked.id);
        }
      }
    } catch (err) {
      console.warn('API error during complete, falling back locally:', err);
      // Fallback local update
      const updatedCompleted = {
        ...progress.completedModules,
        [moduleId]: {
          completedAt: new Date().toISOString(),
          score,
          notes: notes || 'Completed module.',
        },
      };
      const mod = LEARNING_MODULES.find((m) => m.id === moduleId);
      const xpAdd = mod?.xp || 500;

      const updatedProgress: UserProgressData = {
        ...progress,
        completedModules: updatedCompleted,
        totalXp: progress.totalXp + xpAdd,
        certificationsEarned: progress.certificationsEarned + 1,
        completedTasksLog: [
          {
            id: `task-${Date.now()}`,
            moduleId,
            moduleCode: mod?.code || moduleId,
            moduleTitle: mod?.title || moduleId,
            domainId: mod?.domainId || 'cloud',
            completedAt: new Date().toISOString(),
            xpAwarded: xpAdd,
            notes,
          },
          ...progress.completedTasksLog,
        ],
      };

      setProgress(updatedProgress);
      const computed = computeAllModuleStates(LEARNING_MODULES, updatedProgress.completedModules);
      setAllModulesWithState(computed);
      setDomainSummaries(computeDomainSummaries(computed));
    }
  };

  // 3. Uncomplete / Revert Module
  const handleUncompleteModule = async (moduleId: string) => {
    try {
      const res = await fetch('/api/uncomplete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId }),
      });
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
        setDomainSummaries(data.domainSummaries);
        setAllModulesWithState(data.allModulesWithState);
      }
    } catch (err) {
      console.warn('Uncomplete fallback locally:', err);
    }
  };

  // 4. Reset Progress
  const handleResetProgress = async () => {
    if (!window.confirm('Reset all progress back to initial state?')) return;
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
        setDomainSummaries(data.domainSummaries);
        setAllModulesWithState(data.allModulesWithState);
      }
    } catch (err) {
      console.warn('Reset error, resetting locally');
      setProgress(INITIAL_USER_PROGRESS);
      const computed = computeAllModuleStates(LEARNING_MODULES, INITIAL_USER_PROGRESS.completedModules);
      setAllModulesWithState(computed);
      setDomainSummaries(computeDomainSummaries(computed));
    }
  };

  // 5. Explain Unlock via Server-Side Gemini AI
  const handleExplainUnlock = async (moduleId: string) => {
    const targetModule = LEARNING_MODULES.find((m) => m.id === moduleId);
    setAiExplanationModal({
      isOpen: true,
      isLoading: true,
      data: null,
      learnUrl: targetModule?.learnUrl,
    });

    try {
      const res = await fetch('/api/explain-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiExplanationModal({
          isOpen: true,
          isLoading: false,
          data,
          learnUrl: targetModule?.learnUrl,
        });
      }
    } catch (err) {
      console.warn('Error fetching AI explanation, using strict local fallback:', err);
      if (targetModule) {
        setAiExplanationModal({
          isOpen: true,
          isLoading: false,
          data: {
            moduleId: targetModule.id,
            moduleTitle: `${targetModule.code} - ${targetModule.title}`,
            explanation: generateLocalUnlockExplanation(targetModule, targetModule.prerequisites),
            isAiGenerated: false,
            keyConcepts: targetModule.skillsMeasured.map((s) => s.topic),
            estimatedHours: targetModule.duration,
          },
          learnUrl: targetModule.learnUrl,
        });
      }
    }
  };

  // 6. Save Study Notes
  const handleSaveNote = async (moduleId: string, note: string) => {
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, note }),
      });
      setProgress((prev) => ({
        ...prev,
        userNotes: { ...prev.userNotes, [moduleId]: note },
      }));
    } catch (err) {
      console.warn('Notes save error:', err);
    }
  };

  // Filter current domain modules
  const currentDomainModules = allModulesWithState.filter((m) => m.domainId === selectedDomain);
  const filteredModules = currentDomainModules.filter((m) => {
    const matchesSearch =
      m.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.description.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || m.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeDomainInfo = DOMAINS.find((d) => d.id === selectedDomain);

  // Render Core Tabs Content
  const renderTabContent = (isMobileMode = false) => {
    switch (activeTab) {
      case 'graph':
        return (
          <VisualRoadmap
            modules={allModulesWithState}
            selectedDomain={selectedDomain}
            onSelectModule={(mod) => {
              playTactileClick();
              setSelectedDrawerModuleId(mod.id);
            }}
            onExplainUnlock={handleExplainUnlock}
            theme={theme}
          />
        );

      case 'success':
        return (
          <SuccessLog
            progress={progress}
            onNavigateToModule={(modId, domainId) => {
              playTactileClick();
              setSelectedDomain(domainId);
              setActiveTab('path');
            }}
            theme={theme}
          />
        );

      case 'coach':
        return (
          <div className={`rounded-3xl p-6 border shadow-sm space-y-6 transition-colors ${
            theme === 'gray'
              ? 'bg-[#24272B] border-zinc-700 text-zinc-100'
              : theme === 'bw'
              ? 'bg-black border-2 border-white text-white'
              : isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-slate-900 border-slate-800 text-white'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                theme === 'gray'
                  ? 'bg-zinc-800 text-purple-300 border border-zinc-700'
                  : theme === 'bw'
                  ? 'bg-white text-black border border-white'
                  : isLight ? 'bg-purple-100 text-purple-700' : 'bg-purple-950 text-purple-300'
              }`}>
                <Bot className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className={`text-base font-bold ${
                  theme === 'gray' ? 'text-zinc-100' : theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  AI Certification Coach & Learning Assistant
                </h3>
                <p className={`text-xs ${
                  theme === 'gray' ? 'text-zinc-400' : theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Powered by server-side Gemini Flash. Select a module below to generate exam practice questions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentDomainModules.map((m) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer hover:scale-102 ${
                    theme === 'gray'
                      ? 'border-zinc-700 hover:border-purple-500/50 hover:bg-[#1E2024] bg-[#1E2125]'
                      : theme === 'bw'
                      ? 'border-white bg-black hover:bg-neutral-900 text-white'
                      : isLight
                      ? 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 bg-white'
                      : 'border-slate-800 hover:border-purple-800 hover:bg-purple-950/20 bg-slate-800/40'
                  }`}
                >
                  <div>
                    <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                      theme === 'gray'
                        ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                        : theme === 'bw'
                        ? 'bg-white text-black font-extrabold'
                        : isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {m.code}
                    </span>
                    <h4 className={`text-xs font-bold mt-1 line-clamp-1 ${
                      theme === 'gray' ? 'text-zinc-100' : theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {m.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      playTactileClick();
                      setAiCoachModal({ isOpen: true, selectedModule: m });
                    }}
                    className={`mt-3 w-full py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all hover:scale-102 active:scale-98 ${
                      theme === 'bw'
                        ? 'bg-white text-black font-bold'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Practice Quiz & Strategy</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'path':
      default:
        return (
          <div className="space-y-4">
            {/* Domain Overview Banner */}
            {activeDomainInfo && (
              <div className={`p-4 rounded-2xl border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors ${
                theme === 'gray'
                  ? 'bg-[#24272B] border-zinc-700 text-zinc-100 shadow-md'
                  : theme === 'bw'
                  ? 'bg-black border-2 border-white text-white'
                  : isLight
                  ? 'bg-white border-slate-200/90'
                  : 'bg-slate-900 border-slate-800'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wide ${
                      theme === 'bw' ? 'text-white' : 'text-blue-500'
                    }`}>
                      Active Track
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className={`text-xs font-semibold ${
                      theme === 'gray' ? 'text-zinc-300' : theme === 'bw' ? 'text-white' : isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {activeDomainInfo.badge}
                    </span>
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold mt-0.5 ${
                    theme === 'gray' ? 'text-zinc-100' : theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {activeDomainInfo.name}
                  </h3>
                  <p className={`text-xs mt-0.5 ${
                    theme === 'gray' ? 'text-zinc-400' : theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {activeDomainInfo.description}
                  </p>
                </div>

                {/* Quick Filters */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Filter modules..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className={`pl-8 pr-2.5 py-1 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-44 ${
                        theme === 'gray'
                          ? 'border-zinc-700 bg-zinc-800/80 text-zinc-100 focus:bg-zinc-800'
                          : theme === 'bw'
                          ? 'border-white bg-black text-white focus:bg-black'
                          : isLight
                          ? 'border-slate-200 bg-slate-50 focus:bg-white text-slate-900'
                          : 'border-slate-700 bg-slate-800 text-white'
                      }`}
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      playTactileClick();
                      setStatusFilter(e.target.value as any);
                    }}
                    className={`text-xs rounded-xl border py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                      theme === 'gray'
                        ? 'border-zinc-700 bg-zinc-800 text-zinc-200'
                        : theme === 'bw'
                        ? 'border-white bg-black text-white'
                        : isLight
                        ? 'border-slate-200 bg-slate-50 text-slate-700'
                        : 'border-slate-700 bg-slate-800 text-slate-200'
                    }`}
                  >
                    <option value="all">All States</option>
                    <option value="available">Available</option>
                    <option value="completed">Completed</option>
                    <option value="locked">Locked</option>
                  </select>
                </div>
              </div>
            )}

            {/* 🚀 4-Step Animated Connection Pipeline for AI & Data, Security, DevOps, Mobile Power Platform & Azure */}
            <CloudPipelineStepper
              selectedDomain={selectedDomain}
              onSelectDomain={(dom) => {
                playTactileClick();
                setSelectedDomain(dom);
              }}
              modules={allModulesWithState}
              onSelectModule={(mod) => setSelectedDrawerModuleId(mod.id)}
              theme={theme}
            />

            {/* Daily Quests & XP Multipliers Widget */}
            <DailyQuestsWidget
              theme={theme}
              completedCount={progress.completedModules.length}
              streakDays={progress.streakDays}
              onClaimXpBonus={(bonus) => {
                setProgress((prev) => ({
                  ...prev,
                  totalXp: prev.totalXp + bonus,
                }));
              }}
              onOpenQuiz={() => {
                const firstModule = currentDomainModules[0];
                if (firstModule) {
                  setAiCoachModal({ isOpen: true, selectedModule: firstModule });
                }
              }}
              onOpenRoadmap={() => setActiveTab('graph')}
            />

            {/* List of Modules */}
            <div className="space-y-3.5">
              {filteredModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onSelect={(mod) => setSelectedDrawerModuleId(mod.id)}
                  theme={theme}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative ${
      theme === 'gray'
        ? 'bg-[#1E2125] text-zinc-100'
        : theme === 'bw'
        ? 'bg-black text-white'
        : isLight
        ? 'bg-slate-100/90 text-slate-900'
        : 'bg-[#0B0F17] text-slate-100'
    }`}>
      
      {/* 🚀 Unique Microsoft 4-Quadrant Hologram & Ambient Watermark System */}
      <MicrosoftWatermarkBackground
        selectedDomain={selectedDomain}
        theme={theme}
        mode={watermarkMode}
      />

      {/* Top Application Header */}
      <Header
        isAndroidView={isAndroidView}
        onToggleViewMode={() => {
          playTactileClick();
          setIsAndroidView(!isAndroidView);
        }}
        totalXp={progress.totalXp}
        levelTitle={levelInfo.title}
        currentLevel={levelInfo.currentLevel}
        currentLevelProgress={levelInfo.currentLevelProgress}
        streakDays={progress.streakDays}
        certificationsEarned={progress.certificationsEarned}
        onReset={handleResetProgress}
        onOpenInterviewGuide={() => {
          playTactileClick();
          setIsInterviewGuideOpen(true);
        }}
        isHealthOk={isHealthOk}
        theme={theme}
        onThemeChange={setTheme}
        watermarkMode={watermarkMode}
        onWatermarkModeChange={setWatermarkMode}
        user={currentUser}
        onSignOut={handleSignOut}
        onOpenLogin={handleOpenLogin}
        onOpenTrackModal={() => {
          playTactileClick();
          setIsTrackModalOpen(true);
        }}
        currentTrackName={DOMAINS.find((d) => d.id === selectedDomain)?.name || 'Azure Practitioner'}
        selectedDomain={selectedDomain}
        onSelectDomain={(dom) => {
          playTactileClick();
          setSelectedDomain(dom);
        }}
        onClaimRemixReward={(bonus) => {
          setProgress((prev) => ({
            ...prev,
            totalXp: prev.totalXp + bonus,
          }));
        }}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          playTactileClick();
          setActiveTab(tab);
        }}
        domainSummaries={domainSummaries}
        allModulesWithState={allModulesWithState}
        onOpenCoach={() => {
          const firstMod = currentDomainModules[0];
          if (firstMod) {
            setAiCoachModal({ isOpen: true, selectedModule: firstMod });
          }
        }}
        onOpenModuleDrawer={(moduleId) => setSelectedDrawerModuleId(moduleId)}
        activeGoal={activeGoal}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        
        {isAndroidView ? (
          /* ================= ANDROID DEVICE SHOWCASE MODE ================= */
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5 border ${
                isLight
                  ? 'text-blue-600 bg-blue-50 border-blue-200'
                  : 'text-cyan-400 bg-cyan-950/60 border-cyan-800'
              }`}>
                <Sparkles className="w-3 h-3 text-blue-500" />
                Live Android Simulator View (Material Design 3)
              </span>
              <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Interact with the mobile layout using touch-optimized navigation and Android controls.
              </p>
            </div>

            <AndroidFrame
              activeTab={activeTab}
              onSelectTab={(tab) => {
                playTactileClick();
                setActiveTab(tab);
              }}
              certificationsCount={progress.certificationsEarned}
              theme={theme}
              user={currentUser}
              onSignOut={handleSignOut}
              onOpenLogin={handleOpenLogin}
            >
              {/* Domain Picker inside Android Frame */}
              <div className="mb-3">
                <DomainPicker
                  selectedDomain={selectedDomain}
                  onSelectDomain={(dom) => {
                    playTactileClick();
                    setSelectedDomain(dom);
                  }}
                  domainSummaries={domainSummaries}
                  onOpenTrackModal={() => {
                    playTactileClick();
                    setIsTrackModalOpen(true);
                  }}
                  activeGoal={activeGoal}
                  theme={theme}
                />
              </div>

              {renderTabContent(true)}
            </AndroidFrame>
          </div>
        ) : (
          /* ================= FULL-SCREEN DESKTOP / WEB DASHBOARD MODE ================= */
          <div className="space-y-6">
            
            {/* Domain Picker Bar */}
            <DomainPicker
              selectedDomain={selectedDomain}
              onSelectDomain={(dom) => {
                playTactileClick();
                setSelectedDomain(dom);
              }}
              domainSummaries={domainSummaries}
              onOpenTrackModal={() => {
                playTactileClick();
                setIsTrackModalOpen(true);
              }}
              activeGoal={activeGoal}
              theme={theme}
            />

            {/* Desktop Navigation Tabs */}
            <div className={`flex items-center justify-between border-b pb-3 ${
              theme === 'gray'
                ? 'border-zinc-700'
                : theme === 'bw'
                ? 'border-white'
                : isLight
                ? 'border-slate-200'
                : 'border-slate-800'
            }`}>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    playTactileClick();
                    setActiveTab('path');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-102 active:scale-98 ${
                    activeTab === 'path'
                      ? theme === 'bw'
                        ? 'bg-white text-black font-extrabold shadow-sm'
                        : theme === 'gray'
                        ? 'bg-zinc-700 text-white shadow-sm ring-1 ring-zinc-500 font-bold'
                        : 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : theme === 'gray'
                      ? 'bg-[#24272B] text-zinc-300 hover:bg-zinc-700/60 border border-zinc-700'
                      : theme === 'bw'
                      ? 'bg-black text-neutral-300 hover:text-white border border-neutral-700'
                      : isLight
                      ? 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Sequential Learning Path</span>
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    setActiveTab('graph');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-102 active:scale-98 ${
                    activeTab === 'graph'
                      ? theme === 'bw'
                        ? 'bg-white text-black font-extrabold shadow-sm'
                        : theme === 'gray'
                        ? 'bg-zinc-700 text-white shadow-sm ring-1 ring-zinc-500 font-bold'
                        : 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : theme === 'gray'
                      ? 'bg-[#24272B] text-zinc-300 hover:bg-zinc-700/60 border border-zinc-700'
                      : theme === 'bw'
                      ? 'bg-black text-neutral-300 hover:text-white border border-neutral-700'
                      : isLight
                      ? 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Visual Branching Roadmap (DAG)</span>
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    setActiveTab('success');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-102 active:scale-98 ${
                    activeTab === 'success'
                      ? theme === 'bw'
                        ? 'bg-white text-black font-extrabold shadow-sm'
                        : theme === 'gray'
                        ? 'bg-zinc-700 text-white shadow-sm ring-1 ring-zinc-500 font-bold'
                        : 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : theme === 'gray'
                      ? 'bg-[#24272B] text-zinc-300 hover:bg-zinc-700/60 border border-zinc-700'
                      : theme === 'bw'
                      ? 'bg-black text-neutral-300 hover:text-white border border-neutral-700'
                      : isLight
                      ? 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>My Success & Completed Tasks</span>
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    setActiveTab('coach');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-102 active:scale-98 ${
                    activeTab === 'coach'
                      ? theme === 'bw'
                        ? 'bg-white text-black font-extrabold shadow-sm'
                        : theme === 'gray'
                        ? 'bg-purple-800 text-white shadow-sm ring-1 ring-purple-500 font-bold'
                        : 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                      : theme === 'gray'
                      ? 'bg-[#24272B] text-zinc-300 hover:bg-zinc-700/60 border border-zinc-700'
                      : theme === 'bw'
                      ? 'bg-black text-neutral-300 hover:text-white border border-neutral-700'
                      : isLight
                      ? 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  <span>AI Study Mentor</span>
                </button>
              </div>

              <div className={`hidden lg:flex items-center gap-2 text-xs font-mono ${
                theme === 'gray' ? 'text-zinc-400' : theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <span>Domain: {activeDomainInfo?.shortName}</span>
                <span>•</span>
                <span>{filteredModules.length} Modules in View</span>
              </div>
            </div>

            {/* Active Tab View Body */}
            {renderTabContent(false)}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`border-t py-4 mt-auto transition-colors relative z-10 ${
        theme === 'gray'
          ? 'border-zinc-700 bg-[#1E2125]/95 backdrop-blur-xs text-zinc-400'
          : theme === 'bw'
          ? 'border-white bg-black text-white'
          : isLight
          ? 'border-slate-200 bg-white/90 backdrop-blur-xs text-slate-500'
          : 'border-slate-800 bg-slate-900/90 backdrop-blur-xs text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {/* Mini Microsoft Quad Logo */}
            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
              <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#F25022]" />
              <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#7FBA00]" />
              <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#00A4EF]" />
              <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#FFB900]" />
            </div>
            <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
              Microsoft Learning Path Tracker
            </span>
            <span>•</span>
            <span>Android Showcase & Web Dashboard</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Watermark Selector */}
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="opacity-60">Watermark:</span>
              <div className={`flex rounded-lg p-0.5 border ${isLight ? 'border-slate-200 bg-slate-100' : 'border-slate-800 bg-slate-800/80'}`}>
                {(['hologram', 'ambient', 'subtle', 'off'] as WatermarkMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      playTactileClick();
                      setWatermarkMode(mode);
                    }}
                    className={`px-2 py-0.5 rounded capitalize text-[10px] font-semibold transition-all cursor-pointer ${
                      watermarkMode === mode
                        ? isLight
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-blue-500 text-white shadow-xs'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                playTactileClick();
                setIsInterviewGuideOpen(true);
              }}
              className="text-blue-500 hover:underline font-medium cursor-pointer"
            >
              Technical Architecture Walkthrough
            </button>
            <a
              href="https://learn.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline opacity-80 hover:opacity-100"
            >
              learn.microsoft.com
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <AiExplanationModal
        isOpen={aiExplanationModal.isOpen}
        onClose={() => setAiExplanationModal((prev) => ({ ...prev, isOpen: false }))}
        isLoading={aiExplanationModal.isLoading}
        explanationData={aiExplanationModal.data}
        learnUrl={aiExplanationModal.learnUrl}
        theme={theme}
      />

      <AiStudyCoach
        isOpen={aiCoachModal.isOpen}
        onClose={() => setAiCoachModal({ isOpen: false, selectedModule: null })}
        selectedModule={aiCoachModal.selectedModule}
        theme={theme}
      />

      <InterviewGuide
        isOpen={isInterviewGuideOpen}
        onClose={() => setIsInterviewGuideOpen(false)}
        theme={theme}
      />

      {/* Interactive Certification Track & Career Goal Hub Modal */}
      <CertificationTrackModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        currentTrackId={selectedDomain}
        onSelectTrack={handleSelectTrackAndGoal}
        domainSummaries={domainSummaries}
        activeGoal={activeGoal}
        theme={theme}
      />

      {/* Mandatory Microsoft Account Login Gate */}
      <MicrosoftLoginPage
        isOpen={isLoginModalOpen}
        onLogin={handleLoginSuccess}
        onClose={() => setIsLoginModalOpen(false)}
        theme={theme}
      />

      {/* Interactive Microbot Robot Minion AI Assistant (Bottom-Right Floating Widget & Intelligent Hub) */}
      <MicrobotFloatingWidget
        theme={theme}
        currentTrackId={selectedDomain}
        currentTrackName={DOMAINS.find((d) => d.id === selectedDomain)?.name}
        completedCount={Object.keys(progress.completedModules).length}
        totalModulesCount={allModulesWithState.length}
        totalXp={progress.totalXp}
        levelTitle={calculateLevel(progress.totalXp).title}
        activeGoal={activeGoal}
      />

      {/* 🚀 Microsoft Learn Animated Side Window Drawer for Modules & Sub-Options */}
      <ModuleSideDrawer
        module={allModulesWithState.find((m) => m.id === selectedDrawerModuleId) || null}
        isOpen={!!selectedDrawerModuleId}
        onClose={() => setSelectedDrawerModuleId(null)}
        onComplete={handleCompleteModule}
        onUncomplete={handleUncompleteModule}
        onExplainUnlock={handleExplainUnlock}
        onOpenQuiz={(mod) => {
          playTactileClick();
          setAiCoachModal({ isOpen: true, selectedModule: mod });
        }}
        onSaveNote={handleSaveNote}
        userNote={selectedDrawerModuleId ? progress.userNotes[selectedDrawerModuleId] : ''}
        theme={theme}
      />


    </div>
  );
}


