import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap, Volume2, VolumeX, Sparkles, ChevronDown } from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../utils/sound';

interface FocusTimerWidgetProps {
  theme?: string;
  onSessionComplete?: () => void;
}

export const FocusTimerWidget: React.FC<FocusTimerWidgetProps> = ({ theme, onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 minutes default
  const [totalDuration, setTotalDuration] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      playSuccessChime();
      if (onSessionComplete) onSessionComplete();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onSessionComplete]);

  // Global Space hotkey listener when not in input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;
      if (e.code === 'KeyP' || (e.altKey && e.code === 'KeyF')) {
        e.preventDefault();
        toggleTimer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  const toggleTimer = () => {
    playTactileClick();
    setIsActive((prev) => !prev);
  };

  const setTimerPreset = (minutes: number, newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    playTactileClick();
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(minutes * 60);
    setTotalDuration(minutes * 60);
    setIsDropdownOpen(false);
  };

  const resetTimer = () => {
    playTactileClick();
    setIsActive(false);
    setTimeLeft(totalDuration);
    setIsDropdownOpen(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Pill Badge matching screenshot */}
      <div
        className="flex items-center rounded-full bg-[#18181B]/90 hover:bg-[#27272A] border border-slate-700/70 text-slate-200 shadow-inner transition-all duration-200 cursor-pointer overflow-hidden group select-none"
      >
        {/* Main interactive timer pill */}
        <button
          type="button"
          onClick={toggleTimer}
          className="flex items-center gap-2 pl-3 pr-2 py-1 text-xs font-mono font-medium hover:text-white transition-colors"
          title={isActive ? 'Click to Pause Focus Timer' : 'Click to Start 25:00 Focus Timer'}
        >
          {/* Glowing Status Dot */}
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse'
                : 'bg-slate-400 group-hover:bg-slate-300'
            }`}
          />
          <span className="font-semibold tracking-wider text-[11px] sm:text-xs">
            {formattedTime}
          </span>
          <span className="text-[10px] font-sans uppercase font-bold text-slate-400 group-hover:text-slate-300">
            {mode === 'focus' ? 'Focus' : 'Break'}
          </span>
        </button>

        {/* Dropdown Chevron */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playTactileClick();
            setIsDropdownOpen((prev) => !prev);
          }}
          className="pr-2.5 pl-1 py-1 text-slate-400 hover:text-white transition-colors border-l border-slate-700/50"
          title="Timer presets and settings"
        >
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Preset Popup Dropdown */}
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl p-3 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 text-slate-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Focus Pomodoro
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {isActive ? 'Running' : 'Paused'}
            </span>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setTimerPreset(25, 'focus')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                mode === 'focus' && totalDuration === 25 * 60
                  ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-blue-400" /> 25m Deep Focus
              </span>
              <span className="text-[10px] font-mono opacity-70">25:00</span>
            </button>

            <button
              onClick={() => setTimerPreset(15, 'focus')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                mode === 'focus' && totalDuration === 15 * 60
                  ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> 15m Sprint
              </span>
              <span className="text-[10px] font-mono opacity-70">15:00</span>
            </button>

            <button
              onClick={() => setTimerPreset(5, 'shortBreak')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                mode === 'shortBreak'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5 text-emerald-400" /> 5m Short Break
              </span>
              <span className="text-[10px] font-mono opacity-70">05:00</span>
            </button>
          </div>

          <div className="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={resetTimer}
              className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button
              onClick={toggleTimer}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-[11px] font-semibold transition-colors ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              {isActive ? <><Pause className="w-3 h-3" /> Pause</> : <><Play className="w-3 h-3" /> Start</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
