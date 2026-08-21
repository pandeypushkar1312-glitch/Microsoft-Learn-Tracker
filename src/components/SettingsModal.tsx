import React from 'react';
import { Settings, X, Moon, Sun, CircleDot, Contrast, Shield, Volume2, RotateCcw, Monitor, Sparkles, Layers, User } from 'lucide-react';
import { AppTheme } from '../types';
import { WatermarkMode } from './MicrosoftWatermarkBackground';
import { playTactileClick, playThemeSwitchSound } from '../utils/sound';
import { MicrosoftUser } from './MicrosoftLoginPage';
import { THEME_OPTIONS } from './ThemeToggle';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  watermarkMode: WatermarkMode;
  onWatermarkModeChange: (mode: WatermarkMode) => void;
  user: MicrosoftUser | null;
  onSignOut: () => void;
  onOpenLogin: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  watermarkMode,
  onWatermarkModeChange,
  user,
  onSignOut,
  onOpenLogin,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 text-slate-100 shadow-2xl p-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">Preferences & Settings</h2>
              <p className="text-xs text-slate-400">Customize learning dashboard & visual modes</p>
            </div>
          </div>
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* 1. Theme Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Visual Theme</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {THEME_OPTIONS.map((opt) => {
                const isSelected = theme === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    id={`settings-theme-${opt.id}`}
                    type="button"
                    onClick={() => {
                      playThemeSwitchSound(opt.id === 'dark' || opt.id === 'bw');
                      onThemeChange(opt.id);
                    }}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? opt.id === 'light'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
                          : opt.id === 'gray'
                          ? 'bg-zinc-700/60 text-zinc-200 border-zinc-400 ring-2 ring-zinc-400/40 shadow-sm'
                          : opt.id === 'bw'
                          ? 'bg-white text-black border-2 border-white ring-2 ring-white/60 shadow-md font-bold'
                          : 'bg-blue-600/20 text-blue-300 border-blue-500 ring-2 ring-blue-500/40 shadow-sm'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span className="text-[11px] font-bold">{opt.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Microsoft Hologram Watermark */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Microsoft Holographic Watermark</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['hologram', 'ambient', 'subtle', 'off'] as WatermarkMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    playTactileClick();
                    onWatermarkModeChange(mode);
                  }}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold capitalize border transition-all ${
                    watermarkMode === mode
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-xs'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Account Status */}
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0078D4] text-white font-bold text-xs flex items-center justify-center">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'L'}
                </div>
                <div>
                  <div className="text-xs font-bold">{user ? user.name : 'Learner (Guest)'}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{user ? user.email : 'Not signed in'}</div>
                </div>
              </div>
              {user ? (
                <button
                  onClick={() => {
                    onClose();
                    onSignOut();
                  }}
                  className="px-3 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold cursor-pointer"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenLogin();
                  }}
                  className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>

          {/* 4. Reset Progress */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Reset learning modules progress:
            </div>
            <button
              onClick={() => {
                onClose();
                onResetProgress();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-800 text-xs font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset Data
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
