import React from 'react';
import {
  Sparkles,
  X,
  BookOpen,
  Clock,
  ArrowRight,
  ExternalLink,
  Bot,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { ExplainUnlockResponse, AppTheme } from '../types';
import { playTactileClick } from '../utils/sound';

interface AiExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  explanationData: ExplainUnlockResponse | null;
  learnUrl?: string;
  theme?: AppTheme;
}

export const AiExplanationModal: React.FC<AiExplanationModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  explanationData,
  learnUrl,
  theme = 'light',
}) => {
  if (!isOpen) return null;
  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className={`rounded-3xl max-w-lg w-full p-6 shadow-2xl border relative overflow-hidden animate-scaleUp transition-colors ${
        isLight
          ? 'bg-white border-slate-200'
          : theme === 'matrix'
          ? 'bg-[#0a0a0a] border-emerald-950 text-white'
          : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        
        {/* Top Gradient Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={() => {
            playTactileClick();
            onClose();
          }}
          className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors cursor-pointer ${
            isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs ${
            isLight ? 'bg-purple-100 text-purple-700' : 'bg-purple-950 text-purple-300'
          }`}>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                AI Next-Step Advisor
              </h3>
              {explanationData?.isAiGenerated ? (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1 ${
                  isLight
                    ? 'bg-purple-100 text-purple-800 border-purple-200'
                    : 'bg-purple-950 text-purple-300 border-purple-800'
                }`}>
                  <Bot className="w-3 h-3" />
                  Gemini AI
                </span>
              ) : (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                  isLight
                    ? 'bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  Prerequisite Engine
                </span>
              )}
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Why this unlocked certification is your logical next move
            </p>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="py-8 text-center space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Consulting server-side Gemini AI for curriculum insights...
            </p>
          </div>
        ) : explanationData ? (
          <div className="space-y-4">
            
            {/* Target Certification Title */}
            <div className={`p-3 rounded-2xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
            }`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider block mb-0.5 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Target Certification
              </span>
              <div className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {explanationData.moduleTitle}
              </div>
            </div>

            {/* AI Explanation Box */}
            <div className={`p-4 rounded-2xl border text-sm leading-relaxed relative ${
              isLight
                ? 'bg-gradient-to-br from-purple-50/80 via-indigo-50/40 to-blue-50/60 border-purple-200 text-slate-800'
                : 'bg-gradient-to-br from-purple-950/40 via-indigo-950/20 to-blue-950/30 border-purple-800/60 text-slate-200'
            }`}>
              <div className="font-semibold text-xs text-purple-400 mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>Pedagogical Analysis & Progression Rationale:</span>
              </div>
              <p className="font-medium italic">
                "{explanationData.explanation}"
              </p>
            </div>

            {/* Key Concepts List */}
            {explanationData.keyConcepts && explanationData.keyConcepts.length > 0 && (
              <div>
                <span className={`text-xs font-semibold flex items-center gap-1.5 mb-2 ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}>
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  Key Skills You Will Master:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {explanationData.keyConcepts.map((concept, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                        isLight
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated Duration */}
            {explanationData.estimatedHours && (
              <div className={`text-xs flex items-center gap-1.5 pt-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated completion time: </span>
                <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                  {explanationData.estimatedHours}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className={`pt-3 border-t flex items-center justify-between gap-3 ${
              isLight ? 'border-slate-100' : 'border-slate-800'
            }`}>
              <button
                onClick={() => {
                  playTactileClick();
                  onClose();
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Close
              </button>

              {learnUrl && (
                <a
                  href={learnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playTactileClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Launch on Microsoft Learn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        ) : (
          <div className="py-6 text-center text-slate-500 text-xs">
            No explanation available.
          </div>
        )}

      </div>
    </div>
  );
};
