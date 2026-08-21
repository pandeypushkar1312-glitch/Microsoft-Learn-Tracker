import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, CircleDot, Contrast, Check } from 'lucide-react';
import { AppTheme } from '../types';
import { playThemeSwitchSound, playTactileClick } from '../utils/sound';

interface ThemeToggleProps {
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  compact?: boolean;
  showLabels?: boolean;
}

export const THEME_OPTIONS: {
  id: AppTheme;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  bgPreview: string;
}[] = [
  {
    id: 'gray',
    label: 'Neutral Grey',
    shortLabel: 'Grey',
    description: 'Soft charcoal & zinc grey background for comfortable reading',
    icon: CircleDot,
    accentColor: 'text-zinc-200 bg-zinc-700/60 border-zinc-500',
    bgPreview: 'bg-[#1E2125] border-zinc-600',
  },
  {
    id: 'dark',
    label: 'Dark Slate (Black/Navy)',
    shortLabel: 'Dark',
    description: 'Deep navy/slate black background with Azure cyan accents',
    icon: Moon,
    accentColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-400',
    bgPreview: 'bg-[#0B0F17] border-cyan-900/60',
  },
  {
    id: 'light',
    label: 'Light Azure',
    shortLabel: 'Light',
    description: 'Crisp, high-contrast daytime light background',
    icon: Sun,
    accentColor: 'text-amber-500 bg-amber-500/20 border-amber-400',
    bgPreview: 'bg-slate-100 border-slate-300',
  },
  {
    id: 'bw',
    label: 'Black & White',
    shortLabel: 'B&W',
    description: 'Stark pure black #000000 background with high-contrast white',
    icon: Contrast,
    accentColor: 'text-white bg-black border-white',
    bgPreview: 'bg-black border-white',
  },
];

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onThemeChange,
  compact = false,
  showLabels = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const currentThemeObj = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];
  const CurrentIcon = currentThemeObj.icon;

  const handleSelectTheme = (newTheme: AppTheme) => {
    playThemeSwitchSound(newTheme === 'dark' || newTheme === 'bw');
    onThemeChange(newTheme);
    setIsOpen(false);
  };

  const handleQuickCycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle between gray, dark (black), light, and bw
    const themeOrder: AppTheme[] = ['gray', 'dark', 'light', 'bw'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    playThemeSwitchSound(nextTheme === 'dark' || nextTheme === 'bw');
    onThemeChange(nextTheme);
  };

  if (compact) {
    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <div className="flex items-center gap-1">
          {/* Main Theme Menu Trigger */}
          <button
            id="theme-dropdown-trigger-btn"
            type="button"
            onClick={() => {
              playTactileClick();
              setIsOpen((prev) => !prev);
            }}
            className={`px-2.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 text-xs font-semibold ${
              theme === 'gray'
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-600 ring-1 ring-zinc-500/50'
                : theme === 'light'
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                : theme === 'bw'
                ? 'bg-black hover:bg-neutral-900 text-white border-white'
                : 'bg-[#2B2B2E] hover:bg-[#3A3A3E] text-cyan-300 border-slate-700/60'
            }`}
            title={`Active Theme: ${currentThemeObj.label}. Click to select Grey, Dark, Light, or B&W`}
            aria-label="Select Background Theme"
          >
            <CurrentIcon className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">{currentThemeObj.shortLabel}</span>
            <span className="text-[10px] opacity-70">▼</span>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
            theme === 'gray'
              ? 'bg-[#22252A]/98 border-zinc-700 text-zinc-100'
              : theme === 'bw'
              ? 'bg-black border-2 border-white text-white'
              : theme === 'light'
              ? 'bg-white/98 border-slate-200 text-slate-900 shadow-slate-300/50'
              : 'bg-slate-900/98 border-slate-700 text-slate-100'
          }`}>
            <div className="px-2.5 py-1.5 mb-1.5 border-b border-slate-700/60 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Background Theme</span>
              <span className="text-[10px] font-mono text-cyan-400">4 Modes</span>
            </div>

            <div className="space-y-1">
              {THEME_OPTIONS.map((opt) => {
                const isSelected = theme === opt.id;
                const Icon = opt.icon;

                return (
                  <button
                    key={opt.id}
                    id={`theme-select-${opt.id}`}
                    type="button"
                    onClick={() => handleSelectTheme(opt.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                      isSelected
                        ? opt.id === 'gray'
                          ? 'bg-zinc-700 text-white ring-1 ring-zinc-500 font-bold'
                          : opt.id === 'bw'
                          ? 'bg-white text-black font-extrabold'
                          : opt.id === 'light'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-blue-600 text-white font-bold'
                        : theme === 'gray'
                        ? 'hover:bg-zinc-800 text-zinc-300 hover:text-white'
                        : theme === 'bw'
                        ? 'hover:bg-neutral-900 text-neutral-300 hover:text-white'
                        : theme === 'light'
                        ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                        : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${opt.bgPreview}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          <span>{opt.label}</span>
                          {opt.id === 'gray' && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-500/40 text-zinc-200">
                              Grey
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] opacity-75 line-clamp-1 font-normal">
                          {opt.description}
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Quick Toggle Helper */}
            <div className="mt-2 pt-2 border-t border-slate-700/60 px-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>Quick switch:</span>
              <button
                type="button"
                onClick={() => {
                  handleSelectTheme(theme === 'gray' ? 'dark' : 'gray');
                }}
                className="font-bold text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                {theme === 'gray' ? 'Switch to Black' : 'Switch to Grey'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* 4-Theme Segmented Bar for desktop/settings */}
      <div
        className={`flex items-center gap-1 p-1 rounded-2xl border transition-all ${
          theme === 'light'
            ? 'bg-slate-100/90 border-slate-300/80 text-slate-800'
            : theme === 'gray'
            ? 'bg-zinc-900/90 border-zinc-700 text-zinc-200'
            : theme === 'bw'
            ? 'bg-black border-2 border-white text-white'
            : 'bg-slate-900/90 border-slate-800 text-slate-200'
        }`}
      >
        {THEME_OPTIONS.map((opt) => {
          const isSelected = theme === opt.id;
          const Icon = opt.icon;

          return (
            <button
              key={opt.id}
              id={`theme-opt-${opt.id}`}
              type="button"
              onClick={() => handleSelectTheme(opt.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? theme === 'light'
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200 font-bold'
                    : theme === 'gray'
                    ? 'bg-zinc-700 text-white shadow-sm ring-1 ring-zinc-500 font-bold'
                    : theme === 'bw'
                    ? 'bg-white text-black font-extrabold shadow-sm'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md font-bold'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  : theme === 'gray'
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                  : theme === 'bw'
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`}
              title={opt.description}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? '' : 'opacity-75'}`} />
              <span>{opt.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
