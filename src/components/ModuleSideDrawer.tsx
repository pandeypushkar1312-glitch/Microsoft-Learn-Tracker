import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Lock,
  ExternalLink,
  Sparkles,
  Clock,
  Zap,
  Award,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Layers,
  ChevronRight,
  ChevronDown,
  CheckSquare,
  Square,
  FileText,
  AlertTriangle,
  Flame,
  ArrowRight,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ComputedModuleState, AppTheme, SubModuleOption } from '../types';
import { playTactileClick, playSuccessChime } from '../utils/sound';

interface ModuleSideDrawerProps {
  module: ComputedModuleState | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (moduleId: string, score?: number, notes?: string) => Promise<void>;
  onUncomplete: (moduleId: string) => Promise<void>;
  onExplainUnlock: (moduleId: string) => void;
  onOpenQuiz: (module: ComputedModuleState) => void;
  onSaveNote: (moduleId: string, note: string) => void;
  userNote?: string;
  theme?: AppTheme;
  onToggleSubTask?: (moduleId: string, subModuleId: string, taskIndex: number) => void;
}

export const ModuleSideDrawer: React.FC<ModuleSideDrawerProps> = ({
  module,
  isOpen,
  onClose,
  onComplete,
  onUncomplete,
  onExplainUnlock,
  onOpenQuiz,
  onSaveNote,
  userNote = '',
  theme = 'dark',
}) => {
  const [activeTab, setActiveTab] = useState<'paths' | 'skills' | 'notes'>('paths');
  const [expandedSubId, setExpandedSubId] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [completedSubTasks, setCompletedSubTasks] = useState<Record<string, boolean[]>>({});

  useEffect(() => {
    if (module) {
      setNoteText(userNote || module.notes || '');
      // Initialize sub-tasks state
      const initialTasks: Record<string, boolean[]> = {};
      if (module.subModules) {
        module.subModules.forEach((sub) => {
          const completedCount = sub.tasksCompleted || (module.status === 'completed' ? sub.tasksTotal : 0);
          initialTasks[sub.id] = Array.from({ length: sub.tasksTotal }, (_, i) => i < completedCount);
        });
      }
      setCompletedSubTasks(initialTasks);
    }
  }, [module, userNote]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !module) return null;

  const isCompleted = module.status === 'completed';
  const isAvailable = module.status === 'available';
  const isLocked = module.status === 'locked';
  const isLight = theme === 'light';

  const handleCompleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompleting || isLocked) return;

    setIsCompleting(true);
    playSuccessChime();
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 70,
        spread: 70,
        origin: { x, y },
        colors: ['#0078D4', '#00A4EF', '#10B981', '#F59E0B', '#8B5CF6'],
      });

      await onComplete(module.id, 950, noteText);
    } finally {
      setIsCompleting(false);
    }
  };

  const toggleTask = (subId: string, taskIdx: number) => {
    playTactileClick();
    setCompletedSubTasks((prev) => {
      const current = prev[subId] || [];
      const updated = [...current];
      updated[taskIdx] = !updated[taskIdx];
      return { ...prev, [subId]: updated };
    });
  };

  const handleSaveNote = () => {
    playTactileClick();
    onSaveNote(module.id, noteText);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none font-sans">
      {/* 1. Backdrop Overlay */}
      <div
        onClick={() => {
          playTactileClick();
          onClose();
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* 2. Side Drawer Sliding Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          className={`w-screen max-w-2xl transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right flex flex-col shadow-2xl ${
            theme === 'bw'
              ? 'bg-black text-white border-l-2 border-white'
              : theme === 'gray'
              ? 'bg-[#1E2124] text-zinc-100 border-l border-zinc-700'
              : isLight
              ? 'bg-[#F8FAFC] text-slate-800 border-l border-slate-200'
              : 'bg-[#18181B] text-slate-100 border-l border-slate-800'
          }`}
        >
          
          {/* ================= DRAWER TOP HEADER ================= */}
          <div
            className={`p-5 border-b sticky top-0 z-20 backdrop-blur-md flex items-start justify-between gap-4 ${
              theme === 'bw'
                ? 'bg-black/95 border-neutral-800 text-white'
                : theme === 'gray'
                ? 'bg-[#24272B]/95 border-zinc-700 shadow-md text-zinc-100'
                : isLight
                ? 'bg-white/95 border-slate-200 shadow-xs text-slate-800'
                : 'bg-[#202024]/95 border-slate-800 shadow-md text-slate-100'
            }`}
          >
            <div className="flex items-start gap-3.5">
              {/* Microsoft 4-Color Quad Logo */}
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6 mt-1 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#F25022]" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#7FBA00]" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#00A4EF]" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#FFB900]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border ${
                      theme === 'bw'
                        ? 'bg-white text-black border-white'
                        : theme === 'gray'
                        ? 'bg-zinc-800 text-zinc-200 border-zinc-600'
                        : isLight
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-blue-950/80 text-cyan-300 border-blue-800'
                    }`}
                  >
                    {module.code}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                      theme === 'bw'
                        ? 'bg-black text-white border-white'
                        : theme === 'gray'
                        ? 'bg-zinc-800 text-emerald-400 border-zinc-600'
                        : isLight
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                    }`}
                  >
                    {module.level}
                  </span>

                  <span className={`text-xs flex items-center gap-1 font-mono ${theme === 'bw' ? 'text-neutral-300' : 'text-slate-400'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    {module.duration}
                  </span>

                  <span className={`text-xs font-bold flex items-center gap-1 ${theme === 'bw' ? 'text-white' : 'text-amber-400'}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    +{module.xp} XP
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold tracking-tight leading-snug">
                  {module.title}
                </h2>
                <p className={`text-xs mt-1 leading-relaxed ${
                  theme === 'bw' ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {module.description}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              className={`p-2 rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 flex-shrink-0 ${
                theme === 'bw'
                  ? 'bg-black border border-white text-white hover:bg-white hover:text-black'
                  : theme === 'gray'
                  ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Close window (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ================= ACTION TOOLBAR ================= */}
          <div
            className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-2.5 ${
              theme === 'bw'
                ? 'bg-black border-neutral-800'
                : theme === 'gray'
                ? 'bg-[#181A1D] border-zinc-700'
                : isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#1C1C1F] border-slate-800/80'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              {/* 1. Mark Complete / Reset Status */}
              {isAvailable && (
                <button
                  type="button"
                  onClick={handleCompleteClick}
                  disabled={isCompleting}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    theme === 'bw'
                      ? 'bg-white text-black border-2 border-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Complete</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    theme === 'bw' ? 'bg-black text-white' : 'bg-emerald-800/70'
                  }`}>
                    +{module.xp} XP
                  </span>
                </button>
              )}

              {isCompleted && (
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    onUncomplete(module.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    theme === 'bw'
                      ? 'bg-black text-white border border-white hover:bg-white hover:text-black'
                      : isLight
                      ? 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200'
                      : 'bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700'
                  }`}
                  title="Mark this certification module as incomplete"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Status</span>
                </button>
              )}

              {/* 2. Official Microsoft Learn Link */}
              <a
                href={module.learnUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTactileClick}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  theme === 'bw'
                    ? 'bg-black text-white border border-neutral-700 hover:border-white'
                    : theme === 'gray'
                    ? 'bg-zinc-800 text-blue-400 border border-zinc-700 hover:bg-zinc-700'
                    : isLight
                    ? 'bg-blue-50 hover:bg-blue-100 text-[#0078D4] border border-blue-200'
                    : 'bg-blue-950/60 hover:bg-blue-900/80 text-cyan-300 border border-blue-800'
                }`}
                title="Open official certification track on Microsoft Learn"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Microsoft Learn</span>
              </a>

              {/* 3. Why Next? (AI Assistant Reasoning) */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onExplainUnlock(module.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  theme === 'bw'
                    ? 'bg-black text-white border border-neutral-700 hover:border-white'
                    : theme === 'gray'
                    ? 'bg-zinc-800 text-purple-300 border border-zinc-700 hover:bg-zinc-700'
                    : isLight
                    ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-800'
                }`}
                title="Ask Gemini AI why this is your logical career next step"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Why Next? (AI)</span>
              </button>

              {/* 4. AI Quiz Practice */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  onOpenQuiz(module);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  theme === 'bw'
                    ? 'bg-black text-white border border-neutral-700 hover:border-white'
                    : theme === 'gray'
                    ? 'bg-zinc-800 text-amber-300 border border-zinc-700 hover:bg-zinc-700'
                    : isLight
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-800'
                }`}
                title="Generate practice quiz questions with AI Mentor"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Quiz</span>
              </button>
            </div>

            {/* Navigation Tabs (Paths / Skills / Notes) */}
            <div className={`flex items-center gap-1 p-0.5 rounded-xl border ${
              theme === 'bw'
                ? 'bg-black border-neutral-700'
                : theme === 'gray'
                ? 'bg-zinc-800 border-zinc-700'
                : 'bg-slate-800/40 border-slate-700/50'
            }`}>
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  setActiveTab('paths');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'paths'
                    ? theme === 'bw'
                      ? 'bg-white text-black font-extrabold'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Options ({module.subModules?.length || 4})
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  setActiveTab('skills');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'skills'
                    ? theme === 'bw'
                      ? 'bg-white text-black font-extrabold'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Skills
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  setActiveTab('notes');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? theme === 'bw'
                      ? 'bg-white text-black font-extrabold'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Notes
              </button>
            </div>
          </div>

          {/* ================= DRAWER MAIN BODY ================= */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Prerequisite Alert if Locked */}
            {isLocked && module.unmetPrerequisites.length > 0 && (
              <div
                className={`p-3.5 rounded-2xl border text-xs ${
                  isLight
                    ? 'bg-amber-50/90 border-amber-200 text-amber-900'
                    : 'bg-amber-950/40 border-amber-800/70 text-amber-200'
                }`}
              >
                <div className="font-bold flex items-center gap-2 mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Prerequisites Required to Unlock:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs font-medium pl-1">
                  {module.unmetPrerequisites.map((prereq) => (
                    <li key={prereq.id}>
                      <span className="font-mono font-bold">{prereq.code}</span>: {prereq.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* TAB 1: OFFICIAL MICROSOFT LEARN LEARNING PATHS / OPTIONS (THE 4 CARDS) */}
            {activeTab === 'paths' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>Microsoft Learn Learning Paths ({module.subModules?.length || 4} Parts)</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">Click any option to view syllabus</span>
                </div>

                <div className="space-y-3">
                  {module.subModules?.map((sub, idx) => {
                    const taskStates = completedSubTasks[sub.id] || [];
                    const completedTasksCount = taskStates.filter(Boolean).length;
                    const isSubExpanded = expandedSubId === sub.id;
                    const isSubCompleted = completedTasksCount === sub.tasksTotal || isCompleted;

                    return (
                      <div
                        key={sub.id}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isSubCompleted
                            ? isLight
                              ? 'bg-emerald-50/60 border-emerald-200 shadow-xs'
                              : 'bg-emerald-950/20 border-emerald-800/60 shadow-xs'
                            : isLight
                            ? 'bg-white border-slate-200 shadow-xs hover:border-blue-300'
                            : 'bg-[#202024] border-slate-800 shadow-sm hover:border-slate-700'
                        }`}
                      >
                        {/* Option Main Header Bar */}
                        <div
                          onClick={() => {
                            playTactileClick();
                            setExpandedSubId(isSubExpanded ? null : sub.id);
                          }}
                          className="p-4 cursor-pointer flex items-start justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            {/* Order Number / Status Pill */}
                            <div
                              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${
                                isSubCompleted
                                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                                  : isAvailable
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {isSubCompleted ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <span>{sub.order}</span>
                              )}
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                                    isSubCompleted
                                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                      : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                  }`}
                                >
                                  {isSubCompleted ? 'COMPLETED' : 'AVAILABLE'}
                                </span>

                                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {sub.duration}
                                </span>

                                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-0.5">
                                  <Sparkles className="w-3 h-3" />
                                  +{sub.xp} XP
                                </span>
                              </div>

                              <h4 className="text-sm font-bold leading-snug">
                                {sub.title}
                              </h4>
                              <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                                {sub.description}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1.5 mt-2.5">
                                {sub.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                                      isLight
                                        ? 'bg-slate-100 text-slate-600 border border-slate-200'
                                        : 'bg-slate-800 text-slate-300 border border-slate-700/60'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Status & Action */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span className="text-[11px] font-mono text-slate-400 font-bold">
                              {completedTasksCount}/{sub.tasksTotal} Tasks
                            </span>

                            {sub.learnUrl && (
                              <a
                                href={sub.learnUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playTactileClick();
                                }}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 shadow-xs hover:scale-105 active:scale-95 transition-all"
                              >
                                <span>Open</span>
                                <ArrowRight className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Expandable Sub-module Units & Interactive Tasks Checklist */}
                        {isSubExpanded && (
                          <div
                            className={`p-4 border-t space-y-3 ${
                              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-slate-800'
                            }`}
                          >
                            <div className="text-xs font-bold flex items-center justify-between">
                              <span className="text-slate-400 uppercase tracking-wider text-[10px]">
                                Interactive Micro-Tasks & Units
                              </span>
                              <span className="text-[11px] text-emerald-400 font-mono">
                                Check off to track hands-on practice
                              </span>
                            </div>

                            <div className="space-y-2">
                              {sub.units?.map((unit, uIdx) => {
                                const isChecked = taskStates[uIdx] || isSubCompleted;
                                return (
                                  <div
                                    key={uIdx}
                                    onClick={() => toggleTask(sub.id, uIdx)}
                                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                                      isChecked
                                        ? isLight
                                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                          : 'bg-emerald-950/40 border-emerald-800/70 text-emerald-200'
                                        : isLight
                                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 text-xs font-medium">
                                      {isChecked ? (
                                        <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                      ) : (
                                        <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                      )}
                                      <span>{unit}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                                      Unit {uIdx + 1}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: SKILLS MEASURED & CURRICULUM WEIGHTS */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border bg-slate-800/30 border-slate-700/60 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Official Certification Exam Weight Breakdown</span>
                  </h3>

                  <div className="space-y-2.5">
                    {module.skillsMeasured.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span>{skill.topic}</span>
                          <span className="font-mono text-cyan-400 font-bold">{skill.weight}</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                            style={{
                              width: skill.weight.includes('-')
                                ? `${parseInt(skill.weight.split('-')[1]) * 2}%`
                                : '30%',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl border bg-slate-800/30 border-slate-700/60 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Core Learning Objectives
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {module.learningObjectives.map((obj, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: PERSONAL STUDY NOTES SCRATCHPAD */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Learner Scratchpad & Key Takeaways</span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleSaveNote}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>

                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Record your architectural insights, CLI commands, or key exam pointers for this module..."
                  rows={10}
                  className={`w-full p-3.5 rounded-2xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans leading-relaxed ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-[#202024] border-slate-700 text-slate-200'
                  }`}
                />
              </div>
            )}

          </div>

          {/* ================= DRAWER FOOTER ================= */}
          <div
            className={`p-4 border-t flex items-center justify-between gap-3 text-xs ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#18181B] border-slate-800'
            }`}
          >
            <span className="text-slate-400 flex items-center gap-1">
              <span>Prerequisites:</span>
              <strong className="text-slate-200">
                {module.prerequisites.length > 0 ? module.prerequisites.join(', ').toUpperCase() : 'None (Gateway)'}
              </strong>
            </span>

            <button
              type="button"
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              Done & Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
