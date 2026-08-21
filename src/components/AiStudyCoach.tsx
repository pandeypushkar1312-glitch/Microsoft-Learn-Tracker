import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  X,
  Send,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Zap
} from 'lucide-react';
import { ComputedModuleState, AppTheme } from '../types';
import { playTactileClick } from '../utils/sound';

interface AiStudyCoachProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModule: ComputedModuleState | null;
  theme?: AppTheme;
}

export const AiStudyCoach: React.FC<AiStudyCoachProps> = ({
  isOpen,
  onClose,
  selectedModule,
  theme = 'light',
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'sprint' | 'ask'>('quiz');
  const [customQuestion, setCustomQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseContent, setResponseContent] = useState<string | null>(null);
  const isLight = theme === 'light';

  if (!isOpen) return null;

  const handleGenerate = async (mode: 'quiz' | 'study-plan' | 'ask', customText?: string) => {
    setIsLoading(true);
    setResponseContent(null);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: selectedModule?.id,
          mode,
          question: customText || customQuestion,
        }),
      });
      const data = await res.json();
      setResponseContent(data.answer || 'Study response generated.');
    } catch (err) {
      setResponseContent(
        'Tip: Make sure to review the official Microsoft Learn study guide and practice tests for this module.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className={`rounded-3xl max-w-xl w-full p-6 shadow-2xl border relative overflow-hidden flex flex-col max-h-[90vh] transition-colors ${
        theme === 'bw'
          ? 'bg-black border-2 border-white text-white shadow-none'
          : theme === 'gray'
          ? 'bg-[#24272B] border-zinc-700 text-zinc-100'
          : isLight
          ? 'bg-white border-slate-200 text-slate-900'
          : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        
        {/* Modal Header */}
        <div className={`flex items-center justify-between pb-3.5 border-b ${
          theme === 'bw' ? 'border-neutral-800' : isLight ? 'border-slate-100' : 'border-slate-800'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
              theme === 'bw'
                ? 'bg-white text-black border border-white'
                : theme === 'gray'
                ? 'bg-zinc-800 text-purple-300 border border-zinc-700'
                : isLight ? 'bg-purple-100 text-purple-700' : 'bg-purple-950 text-purple-300'
            }`}>
              <Bot className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className={`text-base font-bold flex items-center gap-2 ${
                theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>AI Certification Study Coach</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  theme === 'bw'
                    ? 'bg-white text-black border border-white'
                    : isLight ? 'bg-purple-100 text-purple-800' : 'bg-purple-950 text-purple-300 border border-purple-800'
                }`}>
                  Gemini Flash
                </span>
              </h3>
              <p className={`text-xs ${
                theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {selectedModule
                  ? `Focusing on ${selectedModule.code}: ${selectedModule.title}`
                  : 'Microsoft Learn Knowledge Assistant'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              theme === 'bw'
                ? 'text-neutral-400 hover:text-white'
                : isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 my-3.5">
          <button
            onClick={() => {
              playTactileClick();
              setActiveTab('quiz');
              handleGenerate('quiz');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-102 active:scale-98 ${
              activeTab === 'quiz'
                ? theme === 'bw'
                  ? 'bg-white text-black font-bold'
                  : 'bg-purple-600 text-white shadow-sm'
                : theme === 'bw'
                ? 'bg-black text-neutral-400 border border-neutral-800 hover:text-white'
                : theme === 'gray'
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                : isLight
                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Practice Quiz</span>
          </button>

          <button
            onClick={() => {
              playTactileClick();
              setActiveTab('sprint');
              handleGenerate('study-plan');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-102 active:scale-98 ${
              activeTab === 'sprint'
                ? theme === 'bw'
                  ? 'bg-white text-black font-bold'
                  : 'bg-purple-600 text-white shadow-sm'
                : theme === 'bw'
                ? 'bg-black text-neutral-400 border border-neutral-800 hover:text-white'
                : theme === 'gray'
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                : isLight
                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Study Sprint</span>
          </button>

          <button
            onClick={() => {
              playTactileClick();
              setActiveTab('ask');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-102 active:scale-98 ${
              activeTab === 'ask'
                ? theme === 'bw'
                  ? 'bg-white text-black font-bold'
                  : 'bg-purple-600 text-white shadow-sm'
                : theme === 'bw'
                ? 'bg-black text-neutral-400 border border-neutral-800 hover:text-white'
                : theme === 'gray'
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                : isLight
                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Ask Mentor</span>
          </button>
        </div>

        {/* Response Body Area */}
        <div className={`flex-1 overflow-y-auto p-4 rounded-2xl border text-xs leading-relaxed min-h-[200px] ${
          theme === 'bw'
            ? 'bg-neutral-950 border-neutral-800 text-white'
            : theme === 'gray'
            ? 'bg-[#1E2024] border-zinc-700 text-zinc-200'
            : isLight
            ? 'bg-slate-50 border-slate-200 text-slate-800'
            : 'bg-slate-800/80 border-slate-700 text-slate-200'
        }`}>
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center py-10 gap-3 text-slate-400">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Generating tailored guidance with AI...</span>
            </div>
          ) : responseContent ? (
            <div className="whitespace-pre-wrap font-sans">
              {responseContent}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-8 text-slate-400 text-center">
              <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
              <span>Click a tab above to generate quiz questions or study advice!</span>
            </div>
          )}
        </div>

        {/* Custom Question Input (for 'ask' tab) */}
        {activeTab === 'ask' && (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="E.g., What is the difference between Availability Sets and Availability Zones?"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate('ask', customQuestion)}
              className={`flex-1 px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isLight
                  ? 'border-slate-300 bg-white text-slate-900'
                  : 'border-slate-700 bg-slate-800 text-white'
              }`}
            />
            <button
              onClick={() => {
                playTactileClick();
                handleGenerate('ask', customQuestion);
              }}
              disabled={isLoading || !customQuestion.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] ${
          isLight ? 'border-slate-100 text-slate-400' : 'border-slate-800 text-slate-500'
        }`}>
          <span>Grounded in Microsoft Learn official objectives</span>
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className={`font-semibold cursor-pointer ${
              isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
