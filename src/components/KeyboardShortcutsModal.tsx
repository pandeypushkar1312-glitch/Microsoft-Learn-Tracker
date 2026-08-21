import React from 'react';
import { Command, X, Sparkles, Zap, Laptop, Compass, Moon, MessageSquare, BookOpen, RotateCcw } from 'lucide-react';
import { playTactileClick } from '../utils/sound';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: string;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'T / C', desc: 'Open Career Track & Goal Hub', icon: Compass, category: 'Navigation' },
    { key: 'P / Space', desc: 'Start / Pause Focus Timer', icon: Zap, category: 'Focus' },
    { key: 'D', desc: 'Toggle Android Mobile / Desktop Simulator', icon: Laptop, category: 'View' },
    { key: 'M', desc: 'Toggle Dark / Light Theme', icon: Moon, category: 'View' },
    { key: 'A', desc: 'Open Microbot AI Study Coach', icon: MessageSquare, category: 'AI' },
    { key: 'I', desc: 'Open Interview Architecture Guide', icon: BookOpen, category: 'Learn' },
    { key: 'R', desc: 'Generate Daily Remix Challenge', icon: Sparkles, category: 'Study' },
    { key: 'Esc', desc: 'Close any active modal or drawer', icon: X, category: 'General' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 text-slate-100 shadow-2xl p-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Command className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">Keyboard Shortcuts</h2>
              <p className="text-xs text-slate-400">Power user keybindings for Microsoft Learn TrackR</p>
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

        {/* List of shortcuts */}
        <div className="grid grid-cols-1 gap-2.5">
          {shortcuts.map((sc, idx) => {
            const Icon = sc.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-medium text-slate-200">{sc.desc}</span>
                </div>
                <kbd className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 font-mono text-[11px] font-bold text-cyan-300 shadow-inner">
                  {sc.key}
                </kbd>
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tip: Press keys anywhere outside text inputs</span>
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
