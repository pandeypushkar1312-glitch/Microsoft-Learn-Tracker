import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  Trash2,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ChevronRight,
  HelpCircle,
  Zap,
  BookOpen,
  Award,
  ShieldCheck,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { MicrobotMinionAvatar } from './MicrobotMinionAvatar';
import { AppTheme, DomainId, CareerGoal } from '../types';
import { playRobotChirp, playMessagePop, playTactileClick } from '../utils/sound';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
}

export interface MicrobotFloatingWidgetProps {
  theme: AppTheme;
  currentTrackId?: DomainId;
  currentTrackName?: string;
  completedCount?: number;
  totalModulesCount?: number;
  totalXp?: number;
  levelTitle?: string;
  activeGoal?: CareerGoal | null;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    role: 'model',
    text: `✨ **Hey there! In case you forgot, I am here to help you.** 😊\n\nI'm **Microbot**, your friendly and lightning-fast Microsoft Cloud & Certification AI companion.\n\nAsk me anything! I am ready to resolve all your doubts instantly:\n- 🎯 **Recommended Next Steps** tailored to your active track\n- 💡 **Explanations of Azure Concepts & Architecture** (VMs, Entra ID, OpenAI, RAG, Zero Trust, Fabric)\n- 📝 **Practice Quizzes & Exam Hacks** for AZ-900, AZ-104, AZ-305, AI-102, SC-900\n- 🚀 **Study Plans & Doubt Clearance** with clear, friendly breakdowns\n\nWhat would you like to solve or learn today?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isAiGenerated: true,
  },
];

const QUICK_PROMPTS = [
  { label: '🎯 What should I learn next?', query: 'Based on my current track and completed progress, what is the most logical next module or certification for me to pursue and why?' },
  { label: '⚖️ AZ-104 vs AZ-305 differences?', query: 'What are the main differences in scope, depth, and prerequisites between AZ-104 (Azure Administrator) and AZ-305 (Solutions Architect)?' },
  { label: '🤖 Explain Azure OpenAI & RAG', query: 'Can you explain how Retrieval-Augmented Generation (RAG) works with Azure OpenAI Service and Azure AI Search in 3 clear points?' },
  { label: '🛡️ Zero Trust Architecture rules', query: 'What are the 3 core principles of Microsoft Zero Trust security architecture and how do they apply to cloud workloads?' },
  { label: '📝 Quiz me on Microsoft Cloud!', query: 'Please give me 2 challenging multiple-choice practice questions on Microsoft Azure architecture with answer explanations.' },
  { label: '⚡ Azure Well-Architected Pillars', query: 'What are the 5 pillars of the Microsoft Azure Well-Architected Framework and why do they matter for certification exams?' },
];

export const MicrobotFloatingWidget: React.FC<MicrobotFloatingWidgetProps> = ({
  theme,
  currentTrackId = 'cloud',
  currentTrackName = 'Azure Cloud',
  completedCount = 0,
  totalModulesCount = 18,
  totalXp = 0,
  levelTitle = 'Cloud Explorer',
  activeGoal,
}) => {
  const isLight = theme === 'light';

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('microbot_chat_history');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [microbotState, setMicrobotState] = useState<'idle' | 'thinking' | 'speaking' | 'happy'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Persist chat history
  useEffect(() => {
    try {
      localStorage.setItem('microbot_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowWelcomeBubble(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    if (soundEnabled) {
      playMessagePop();
    }

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputQuery('');
    setIsLoading(true);
    setMicrobotState('thinking');

    try {
      const response = await fetch('/api/microbot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, text: m.text })),
          context: {
            currentTrack: currentTrackName,
            trackId: currentTrackId,
            completedCount,
            totalModules: totalModulesCount,
            totalXp,
            levelTitle,
            careerGoal: activeGoal,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReplyText = data.reply || 'Beep-boop! Processing complete. Let me know if you need more details!';

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAiGenerated: data.isAiGenerated ?? true,
      };

      setMessages(prev => [...prev, botMessage]);
      setMicrobotState('happy');
      if (soundEnabled) {
        playRobotChirp();
      }

      setTimeout(() => {
        setMicrobotState('idle');
      }, 2500);
    } catch (err) {
      console.warn('Failed to fetch from Microbot API:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: `🤖 **Hey there!** In case you forgot, I am here to help you! 😊\n\nI'm ready to resolve any doubts or questions on your mind about Microsoft Azure, cloud design, and certification tracks. Ask me anything and I'll break it down clearly!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAiGenerated: false,
      };
      setMessages(prev => [...prev, fallbackMsg]);
      setMicrobotState('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    playTactileClick();
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('microbot_chat_history');
    } catch {
      // ignore
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    playTactileClick();
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Helper to render markdown-like formatting simply and cleanly
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Code block lines
      if (line.startsWith('```')) {
        return null;
      }

      // Headings or Bold bullet items
      let processedLine: React.ReactNode = line;

      // Handle bold formatting **text**
      const boldParts = line.split(/(\*\*.*?\*\*)/g);
      if (boldParts.length > 1) {
        processedLine = boldParts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="font-bold text-blue-300 dark:text-cyan-300">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });
      }

      if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc my-1 leading-relaxed">
            {typeof processedLine === 'string' ? processedLine.substring(2) : processedLine}
          </li>
        );
      }

      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="ml-2 my-1.5 font-medium leading-relaxed">
            {processedLine}
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 leading-relaxed">
          {processedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. Floating Minion Trigger Widget (Bottom Right) */}
      <div
        id="microbot-floating-container"
        className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none"
      >
        {/* Welcome Tooltip / Speech Bubble (When Chat is Closed) */}
        {!isOpen && showWelcomeBubble && (
          <div
            id="microbot-welcome-bubble"
            className={`pointer-events-auto mb-3 max-w-[270px] sm:max-w-xs p-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-bounce-subtle flex items-start gap-2.5 ${
              isLight
                ? 'bg-white/95 text-slate-800 border-purple-300 shadow-purple-500/15 ring-2 ring-purple-400/20'
                : 'bg-slate-900/95 text-slate-100 border-purple-500/40 shadow-purple-500/20 ring-2 ring-purple-500/20'
            }`}
          >
            <div className="relative p-1.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-500 shrink-0 mt-0.5 border border-purple-400/30">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="flex-1 text-xs">
              <div className="font-bold flex items-center justify-between">
                <span className="text-purple-600 dark:text-purple-300 flex items-center gap-1">
                  Microbot AI
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-purple-500/20 text-purple-600 dark:text-purple-300 animate-pulse">
                    Online ⚡
                  </span>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowWelcomeBubble(false);
                  }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5 transition-colors"
                  title="Dismiss"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              
              {/* Flashing Friendly Default Message */}
              <p className="mt-1 font-medium leading-snug text-slate-800 dark:text-slate-100">
                Hey there! In case you forgot, I am here to help you. 😊
              </p>
              <p className="text-[11px] mt-0.5 text-slate-500 dark:text-slate-400">
                Ask any question or doubt — I reply promptly!
              </p>

              <button
                onClick={() => {
                  playRobotChirp();
                  setIsOpen(true);
                }}
                className="mt-2 text-[11px] font-bold text-purple-600 dark:text-purple-300 hover:underline flex items-center gap-1 cursor-pointer group"
              >
                <span>Chat with me now</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Robot Minion Button */}
        {!isOpen && (
          <button
            id="microbot-avatar-trigger-btn"
            onClick={() => {
              playRobotChirp();
              setIsOpen(true);
            }}
            className={`pointer-events-auto group relative flex items-center justify-center p-2.5 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl cursor-pointer ${
              isLight
                ? 'bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-800 text-white shadow-purple-600/35 hover:shadow-purple-600/60'
                : 'bg-gradient-to-br from-purple-950 via-slate-900 to-fuchsia-950 border-2 border-purple-400/50 shadow-purple-500/30 hover:shadow-purple-400/60'
            }`}
            title="Open Microbot AI Assistant (Click to chat or blink!)"
            aria-label="Open Microbot AI Assistant"
          >
            {/* Glowing Pulsing Aura Ring */}
            <div className="absolute -inset-1 rounded-full bg-purple-500 opacity-30 group-hover:opacity-80 blur-sm animate-pulse transition duration-1000 group-hover:duration-200" />

            {/* Microbot Robot Minion SVG with Magnified Eyes */}
            <div className="relative z-10">
              <MicrobotMinionAvatar
                state={microbotState}
                size="sm"
                trackCursor={true}
                onClick={() => {
                  playRobotChirp();
                }}
              />
            </div>

            {/* Online Green Status Badge */}
            <div className="absolute top-1 right-1 z-20 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
            </div>

            {/* Microbot Name Pill (appears on hover) */}
            <span className="absolute right-full mr-3 hidden sm:group-hover:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-slate-900/90 text-purple-200 border border-purple-500/30 shadow-lg backdrop-blur-md animate-fade-in">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              Microbot AI
            </span>
          </button>
        )}
      </div>

      {/* 2. Interactive Microbot Chat Drawer / Window */}
      {isOpen && (
        <div
          id="microbot-chat-window"
          className={`fixed z-50 transition-all duration-300 flex flex-col shadow-2xl overflow-hidden ${
            isExpanded
              ? 'inset-3 sm:inset-6 md:inset-10 rounded-2xl'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] md:w-[460px] h-[580px] max-h-[88vh] rounded-3xl'
          } ${
            isLight
              ? 'bg-white/95 text-slate-900 border border-purple-200/80 shadow-2xl shadow-purple-900/15 backdrop-blur-xl'
              : 'bg-slate-950/95 text-slate-100 border border-purple-500/40 shadow-[0_10px_50px_rgba(168,85,247,0.25)] backdrop-blur-2xl'
          }`}
        >
          {/* Header Bar */}
          <div
            id="microbot-chat-header"
            className={`px-4 py-3 border-b flex items-center justify-between select-none ${
              isLight
                ? 'bg-gradient-to-r from-purple-700 via-fuchsia-700 to-indigo-800 text-white border-purple-600'
                : 'bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 border-purple-500/30'
            }`}
          >
            {/* Robot Minion Identity & Status */}
            <div className="flex items-center gap-3">
              <div
                className="relative cursor-pointer group"
                onClick={() => {
                  playRobotChirp();
                  setMicrobotState('happy');
                  setTimeout(() => setMicrobotState('idle'), 1800);
                }}
                title="Click to interact and make Microbot blink!"
              >
                <MicrobotMinionAvatar state={microbotState} size="sm" trackCursor={true} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 group-hover:scale-125 transition-transform"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-1">
                    Microbot AI
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-200 border border-cyan-400/40">
                      v2.5
                    </span>
                  </h3>
                </div>
                <p className="text-[11px] text-cyan-100/80 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Microsoft Cloud Intelligence • Gemini 3.7
                </p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1">
              {/* Sound Toggle */}
              <button
                id="microbot-toggle-sound"
                onClick={() => {
                  playTactileClick();
                  setSoundEnabled(!soundEnabled);
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-cyan-100 transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute Robot Sound FX' : 'Enable Robot Sound FX'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-300" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Clear Chat History */}
              <button
                id="microbot-clear-chat"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-white/10 text-cyan-100 transition-colors cursor-pointer"
                title="Reset Conversation"
              >
                <Trash2 className="w-4 h-4 text-cyan-300 hover:text-red-400" />
              </button>

              {/* Expand / Minimize Window */}
              <button
                id="microbot-toggle-expand"
                onClick={() => {
                  playTactileClick();
                  setIsExpanded(!isExpanded);
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-cyan-100 transition-colors cursor-pointer hidden sm:inline-flex"
                title={isExpanded ? 'Compact View' : 'Expand View'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                id="microbot-close-btn"
                onClick={() => {
                  playTactileClick();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Minimize Microbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Context Status Strip */}
          <div
            className={`px-3.5 py-1.5 text-[11px] border-b flex items-center justify-between ${
              isLight
                ? 'bg-blue-50/80 text-blue-900 border-blue-100'
                : 'bg-slate-900/90 text-cyan-300 border-cyan-500/20'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Context:</span>
              <span className="font-bold truncate text-blue-700 dark:text-cyan-200">
                {currentTrackName}
              </span>
              <span className="text-slate-400">•</span>
              <span>{completedCount}/{totalModulesCount} Passed</span>
            </div>
            <div className="font-mono text-amber-500 dark:text-amber-400 font-bold shrink-0">
              +{totalXp} XP
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            id="microbot-messages-container"
            className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 text-xs sm:text-sm custom-scrollbar"
          >
            {messages.map((msg) => {
              const isBot = msg.role === 'model';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                >
                  {/* Bot Avatar Icon */}
                  {isBot && (
                    <div className="shrink-0 mt-0.5">
                      <div className="w-7 h-7 rounded-xl bg-blue-600/20 border border-cyan-500/40 flex items-center justify-center p-0.5">
                        <Bot className="w-4 h-4 text-cyan-400" />
                      </div>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`relative max-w-[85%] sm:max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-sm group ${
                      isBot
                        ? isLight
                          ? 'bg-slate-100 text-slate-800 border border-slate-200/80 rounded-tl-sm'
                          : 'bg-slate-900/90 text-slate-100 border border-cyan-500/30 rounded-tl-sm'
                        : isLight
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-br-sm shadow-cyan-500/10'
                    }`}
                  >
                    {/* Message Header / Role tag */}
                    {isBot && (
                      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-cyan-400/70 mb-1 font-mono">
                        <span className="font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" /> Microbot
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>
                    )}

                    {/* Formatted Text Content */}
                    <div className="prose-xs space-y-1">
                      {renderFormattedText(msg.text)}
                    </div>

                    {/* Copy action for Bot responses */}
                    {isBot && (
                      <div className="mt-2 pt-1 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Microsoft Verified</span>
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="hover:text-blue-500 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors p-0.5"
                          title="Copy text to clipboard"
                        >
                          {copiedMessageId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* AI Thinking Animation */}
            {isLoading && (
              <div className="flex items-start gap-2.5 animate-fade-in">
                <div className="shrink-0 mt-0.5">
                  <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center p-0.5">
                    <Bot className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  </div>
                </div>
                <div
                  className={`rounded-2xl rounded-tl-sm px-4 py-3 border ${
                    isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'bg-slate-900 border-cyan-500/30 text-cyan-300'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="font-semibold text-amber-400">Microbot is thinking</span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestion Pills */}
          <div
            id="microbot-quick-prompts"
            className={`px-3 py-2 border-t overflow-x-auto flex items-center gap-1.5 custom-scrollbar no-scrollbar ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-cyan-500/20'
            }`}
          >
            <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider pl-1">
              Suggestions:
            </span>
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playTactileClick();
                  handleSendMessage(prompt.query);
                }}
                disabled={isLoading}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-200 shrink-0 border cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${
                  isLight
                    ? 'bg-white hover:bg-blue-50 text-slate-700 border-slate-300 hover:border-blue-300 shadow-2xs'
                    : 'bg-slate-800/80 hover:bg-cyan-950/80 text-cyan-200 border-cyan-500/30 hover:border-cyan-400 shadow-2xs'
                }`}
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div
            id="microbot-input-bar"
            className={`p-3 border-t ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-cyan-500/30'
            }`}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask Microbot about Azure, exams, architecture..."
                  disabled={isLoading}
                  className={`w-full px-3.5 py-2.5 pr-8 rounded-xl text-xs sm:text-sm border transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-60 ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-blue-500/40 focus:border-blue-500 placeholder:text-slate-400'
                      : 'bg-slate-900 border-cyan-500/40 text-slate-100 focus:ring-cyan-400/40 focus:border-cyan-400 placeholder:text-slate-500'
                  }`}
                />
                {inputQuery && (
                  <button
                    type="button"
                    onClick={() => setInputQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className={`p-2.5 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed ${
                  isLight
                    ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-500/20'
                    : 'bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-slate-950 font-bold shadow-cyan-500/30'
                }`}
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Press <kbd className="px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Enter ↵</kbd> to send</span>
              <span className="flex items-center gap-1 text-blue-500 dark:text-cyan-400">
                <Zap className="w-3 h-3 text-amber-400" /> Powered by Gemini
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
