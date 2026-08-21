import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Battery,
  Signal,
  MapPin,
  Compass,
  Award,
  Bot,
  Layers,
  Sparkles,
  ChevronLeft,
  LogOut,
  User
} from 'lucide-react';
import { AppTheme } from '../types';
import { playTactileClick } from '../utils/sound';
import { MicrosoftUser } from './MicrosoftLoginPage';

interface AndroidFrameProps {
  children: React.ReactNode;
  activeTab: 'path' | 'graph' | 'success' | 'coach';
  onSelectTab: (tab: 'path' | 'graph' | 'success' | 'coach') => void;
  certificationsCount: number;
  theme?: AppTheme;
  user?: MicrosoftUser | null;
  onSignOut?: () => void;
  onOpenLogin?: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  activeTab,
  onSelectTab,
  certificationsCount,
  theme = 'light',
  user,
  onSignOut,
  onOpenLogin,
}) => {
  const [currentTime, setCurrentTime] = useState('9:41');
  const isLight = theme === 'light';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center py-3 sm:py-5 px-2">
      {/* Android Device Body */}
      <div className={`w-full max-w-[440px] rounded-[48px] p-3.5 shadow-2xl border-4 transition-colors duration-300 relative overflow-hidden flex flex-col h-[850px] ${
        theme === 'bw'
          ? 'bg-black border-white ring-8 ring-neutral-900 shadow-none'
          : theme === 'gray'
          ? 'bg-[#181A1D] border-zinc-700 ring-8 ring-zinc-900/60'
          : isLight
          ? 'bg-slate-900 border-slate-700 ring-8 ring-blue-900/10'
          : 'bg-slate-950 border-slate-800 ring-8 ring-slate-900/50'
      }`}>
        
        {/* Device Volume / Power Buttons Indicator */}
        <div className="absolute -right-4 top-28 w-1 h-12 bg-slate-700 rounded-r-md"></div>
        <div className="absolute -right-4 top-44 w-1 h-20 bg-slate-700 rounded-r-md"></div>
        <div className="absolute -left-4 top-32 w-1 h-16 bg-slate-700 rounded-l-md"></div>

        {/* Screen Container */}
        <div className={`w-full h-full rounded-[36px] flex flex-col overflow-hidden relative shadow-inner transition-colors duration-300 ${
          theme === 'bw'
            ? 'bg-black text-white'
            : theme === 'gray'
            ? 'bg-[#1E2124] text-zinc-100'
            : isLight
            ? 'bg-[#F4F6F9]'
            : 'bg-[#090D16]'
        }`}>
          
          {/* Android Status Bar */}
          <div className={`h-9 px-6 flex items-center justify-between text-[11px] font-medium z-30 select-none ${
            theme === 'bw'
              ? 'bg-black text-white border-b border-neutral-800'
              : theme === 'gray'
              ? 'bg-[#181A1D] text-zinc-200 border-b border-zinc-800'
              : isLight
              ? 'bg-[#0078D4] text-white'
              : 'bg-slate-950 text-white'
          }`}>
            <span className="font-bold font-mono">{currentTime}</span>

            {/* Front Camera Punch-hole */}
            <div className="w-4 h-4 rounded-full bg-black border border-slate-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-mono">94%</span>
                <Battery className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>

          {/* Android App Bar */}
          <div className={`px-4 py-2.5 flex items-center justify-between shadow-xs z-20 transition-colors ${
            theme === 'bw'
              ? 'bg-black text-white border-b-2 border-white'
              : theme === 'gray'
              ? 'bg-[#24272B] text-zinc-100 border-b border-zinc-700'
              : isLight
              ? 'bg-[#0078D4] text-white border-b border-blue-600'
              : 'bg-slate-900 text-white border-b border-slate-800'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center p-1.5 ${
                theme === 'bw'
                  ? 'bg-white text-black'
                  : theme === 'gray'
                  ? 'bg-zinc-800 border border-zinc-700'
                  : isLight
                  ? 'bg-white shadow-xs'
                  : 'bg-slate-800 border border-slate-700'
              }`}>
                <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                  <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#F25022]" />
                  <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#7FBA00]" />
                  <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#00A4EF]" />
                  <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#FFB900]" />
                </div>
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">Learn Tracker</div>
                <div className={`text-[9px] font-mono ${
                  theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-blue-100' : 'text-cyan-400'
                }`}>Android Native Edition</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border ${
                theme === 'bw'
                  ? 'bg-white text-black border-white'
                  : theme === 'gray'
                  ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                  : isLight
                  ? 'bg-white/20 text-white border-white/30'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-800'
              }`}>
                <Award className="w-3 h-3 text-emerald-400" />
                {certificationsCount}
              </span>

              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    if (onSignOut) onSignOut();
                  }}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/20 hover:bg-rose-500/80 text-white text-[9px] font-semibold transition-all cursor-pointer border border-white/20 active:scale-95"
                  title={`Signed in as ${user.name} (${user.email}). Tap to sign out.`}
                >
                  <span className="truncate max-w-[55px]">{user.name.split(' ')[0]}</span>
                  <LogOut className="w-2.5 h-2.5 opacity-90" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    if (onOpenLogin) onOpenLogin();
                  }}
                  className="px-1.5 py-0.5 rounded-md bg-white text-[#0078D4] text-[9px] font-bold shadow-xs hover:bg-blue-50 transition-all cursor-pointer active:scale-95"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Screen Content with Cute Minion Mobile Watermark */}
          <div className="flex-1 overflow-y-auto p-3 relative">
            {/* Ambient Mobile Microsoft Quad Minion Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 select-none z-0">
              <div className="grid grid-cols-2 gap-3 p-4 relative">
                {/* Red Minion */}
                <div className="w-16 h-20 rounded-3xl bg-gradient-to-br from-[#F25022] to-[#D83B01] flex flex-col items-center justify-center relative p-1 shadow-md">
                  <div className="w-full h-2 bg-slate-900 absolute top-5" />
                  <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-slate-700 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-[#F25022]" />
                  </div>
                  <div className="mt-2 w-10 h-6 bg-red-950/80 rounded-b-xl" />
                </div>
                {/* Green Minion */}
                <div className="w-16 h-20 rounded-3xl bg-gradient-to-br from-[#7FBA00] to-[#107C41] flex flex-col items-center justify-center relative p-1 shadow-md">
                  <div className="w-full h-2 bg-slate-900 absolute top-5" />
                  <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-slate-700 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-[#7FBA00]" />
                  </div>
                  <div className="mt-2 w-10 h-6 bg-green-950/80 rounded-b-xl" />
                </div>
                {/* Blue Minion */}
                <div className="w-16 h-20 rounded-3xl bg-gradient-to-br from-[#00A4EF] to-[#0078D4] flex flex-col items-center justify-center relative p-1 shadow-md">
                  <div className="w-full h-2 bg-slate-900 absolute top-5" />
                  <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-slate-700 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-[#00A4EF]" />
                  </div>
                  <div className="mt-2 w-10 h-6 bg-blue-950/80 rounded-b-xl" />
                </div>
                {/* Yellow Minion */}
                <div className="w-16 h-20 rounded-3xl bg-gradient-to-br from-[#FFB900] to-[#FF8C00] flex flex-col items-center justify-center relative p-1 shadow-md">
                  <div className="w-full h-2 bg-slate-900 absolute top-5" />
                  <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-slate-700 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-[#FFB900]" />
                  </div>
                  <div className="mt-2 w-10 h-6 bg-yellow-950/80 rounded-b-xl" />
                </div>
              </div>
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </div>

          {/* Android Bottom Navigation Bar (Material Design 3) */}
          <div className={`border-t px-3 py-2 flex items-center justify-around z-30 shadow-lg transition-colors ${
            theme === 'bw'
              ? 'bg-black border-white text-white'
              : theme === 'gray'
              ? 'bg-[#24272B] border-zinc-700 text-zinc-300'
              : isLight
              ? 'bg-white border-slate-200 text-slate-700'
              : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}>
            <button
              onClick={() => {
                playTactileClick();
                onSelectTab('path');
              }}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === 'path'
                  ? theme === 'bw'
                    ? 'text-white font-black'
                    : isLight
                    ? 'text-blue-600 font-bold'
                    : 'text-cyan-400 font-bold'
                  : theme === 'bw'
                  ? 'text-neutral-400 hover:text-white'
                  : isLight
                  ? 'text-slate-500 hover:text-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  activeTab === 'path'
                    ? theme === 'bw'
                      ? 'bg-white text-black font-bold'
                      : theme === 'gray'
                      ? 'bg-zinc-700 text-white'
                      : isLight
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-cyan-950 text-cyan-300'
                    : ''
                }`}
              >
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[10px]">Paths</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onSelectTab('graph');
              }}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === 'graph'
                  ? theme === 'bw'
                    ? 'text-white font-black'
                    : isLight
                    ? 'text-blue-600 font-bold'
                    : 'text-cyan-400 font-bold'
                  : theme === 'bw'
                  ? 'text-neutral-400 hover:text-white'
                  : isLight
                  ? 'text-slate-500 hover:text-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  activeTab === 'graph'
                    ? theme === 'bw'
                      ? 'bg-white text-black font-bold'
                      : theme === 'gray'
                      ? 'bg-zinc-700 text-white'
                      : isLight
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-cyan-950 text-cyan-300'
                    : ''
                }`}
              >
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[10px]">Roadmap</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onSelectTab('success');
              }}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === 'success'
                  ? theme === 'bw'
                    ? 'text-white font-black'
                    : isLight
                    ? 'text-blue-600 font-bold'
                    : 'text-cyan-400 font-bold'
                  : theme === 'bw'
                  ? 'text-neutral-400 hover:text-white'
                  : isLight
                  ? 'text-slate-500 hover:text-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  activeTab === 'success'
                    ? theme === 'bw'
                      ? 'bg-white text-black font-bold'
                      : theme === 'gray'
                      ? 'bg-zinc-700 text-white'
                      : isLight
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-cyan-950 text-cyan-300'
                    : ''
                }`}
              >
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[10px]">Success</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onSelectTab('coach');
              }}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === 'coach'
                  ? theme === 'bw'
                    ? 'text-white font-black'
                    : 'text-purple-500 font-bold'
                  : theme === 'bw'
                  ? 'text-neutral-400 hover:text-white'
                  : isLight
                  ? 'text-slate-500 hover:text-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  activeTab === 'coach'
                    ? theme === 'bw'
                      ? 'bg-white text-black font-bold'
                      : theme === 'gray'
                      ? 'bg-purple-900/60 text-purple-300'
                      : 'bg-purple-100 text-purple-700'
                    : ''
                }`}
              >
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-[10px]">AI Mentor</span>
            </button>
          </div>

          {/* Android Home Navigation Gesture Bar */}
          <div className={`h-4 flex items-center justify-center pb-1 z-30 ${
            theme === 'bw' ? 'bg-black' : theme === 'gray' ? 'bg-[#24272B]' : isLight ? 'bg-white' : 'bg-slate-950'
          }`}>
            <div className={`w-28 h-1 rounded-full ${theme === 'bw' ? 'bg-white' : 'bg-slate-500'}`}></div>
          </div>

        </div>
      </div>
    </div>
  );
};
