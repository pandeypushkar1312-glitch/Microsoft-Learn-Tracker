import React from 'react';
import {
  Info,
  X,
  CheckCircle2,
  Code2,
  Cpu,
  ShieldCheck,
  Server,
  Layers,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { AppTheme } from '../types';
import { playTactileClick } from '../utils/sound';

interface InterviewGuideProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: AppTheme;
}

export const InterviewGuide: React.FC<InterviewGuideProps> = ({ isOpen, onClose, theme = 'light' }) => {
  if (!isOpen) return null;
  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className={`rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border relative overflow-hidden flex flex-col max-h-[90vh] transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : theme === 'matrix'
          ? 'bg-[#0a0a0a] border-emerald-950 text-slate-200'
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between pb-4 border-b ${
          isLight ? 'border-slate-100' : 'border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
              isLight ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-950 text-indigo-300'
            }`}>
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>Technical Architecture & Interview Walkthrough</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isLight ? 'bg-indigo-100 text-indigo-800' : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                }`}>
                  Recruitment Stage 2
                </span>
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Architectural breakdown of state logic, full-stack API, and AI resilience.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-5 my-4 pr-1 text-xs leading-relaxed">
          
          {/* Phase 1 & 2: State Logic Engine */}
          <div className={`p-4 rounded-2xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm mb-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>1. Core Prerequisite Business Logic (Code-Level, Not AI)</span>
            </div>
            <p className="mb-2">
              As mandated in <strong>Phase 2</strong> of the roadmap, module states (<code>Completed</code>, <code>Available</code>, <code>Locked</code>) are computed purely through deterministic TypeScript algorithms in <code>/src/utils/engine.ts</code>:
            </p>
            <div className="bg-slate-950 text-slate-200 font-mono text-[11px] p-3 rounded-xl overflow-x-auto space-y-1 border border-slate-800">
              <div><span className="text-purple-400">if</span> (completedMap[module.id]) <span className="text-emerald-400">return 'completed';</span></div>
              <div><span className="text-purple-400">const</span> unmet = module.prerequisites.<span className="text-blue-400">filter</span>(id =&gt; !completedMap[id]);</div>
              <div><span className="text-purple-400">if</span> (unmet.length === 0) <span className="text-cyan-400">return 'available';</span></div>
              <div><span className="text-purple-400">return</span> <span className="text-slate-400">'locked' (with unmet dependencies list);</span></div>
            </div>
          </div>

          {/* Phase 3: Server-Side AI & Fallback Resilience */}
          <div className={`p-4 rounded-2xl border ${
            isLight
              ? 'bg-purple-50/70 border-purple-200 text-slate-700'
              : 'bg-purple-950/30 border-purple-800 text-purple-200'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm mb-2 ${
              isLight ? 'text-purple-900' : 'text-purple-300'
            }`}>
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>2. Server-Side AI & Strict Fallback Resilience</span>
            </div>
            <p className="mb-2">
              In accordance with <strong>Phase 3</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>
                <strong>API Key Protection:</strong> The Gemini API key remains strictly on the Express backend (<code>server.ts</code>) using <code>@google/genai</code>.
              </li>
              <li>
                <strong>Encouraging Next-Step Logic:</strong> <code>/api/explain-unlock</code> prompts Gemini Flash to provide a 1-2 sentence pedagogical rationale for newly unlocked milestones.
              </li>
              <li>
                <strong>Zero-Crash Fallback:</strong> If network timeouts or rate limits occur, the backend catches the error and serves pre-computed curriculum reasoning, never failing with 500 errors.
              </li>
            </ul>
          </div>

          {/* Phase 4 & 5: Full Stack API & State Persistence */}
          <div className={`p-4 rounded-2xl border ${
            isLight
              ? 'bg-emerald-50/70 border-emerald-200 text-slate-700'
              : 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm mb-2 ${
              isLight ? 'text-emerald-900' : 'text-emerald-300'
            }`}>
              <Server className="w-4 h-4 text-emerald-500" />
              <span>3. Full-Stack Endpoints & Persistent Progress</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono mt-2">
              <div className={`p-2 rounded-lg border ${
                isLight ? 'bg-white border-emerald-200 text-slate-800' : 'bg-slate-900 border-emerald-800/60 text-slate-200'
              }`}>
                <span className="text-blue-500 font-bold">GET</span> /api/paths
                <div className="text-[10px] text-slate-400 font-sans mt-0.5">Fetches Microsoft Learn catalog</div>
              </div>
              <div className={`p-2 rounded-lg border ${
                isLight ? 'bg-white border-emerald-200 text-slate-800' : 'bg-slate-900 border-emerald-800/60 text-slate-200'
              }`}>
                <span className="text-blue-500 font-bold">GET</span> /api/progress
                <div className="text-[10px] text-slate-400 font-sans mt-0.5">Calculates XP, streak & states</div>
              </div>
              <div className={`p-2 rounded-lg border ${
                isLight ? 'bg-white border-emerald-200 text-slate-800' : 'bg-slate-900 border-emerald-800/60 text-slate-200'
              }`}>
                <span className="text-emerald-500 font-bold">POST</span> /api/complete
                <div className="text-[10px] text-slate-400 font-sans mt-0.5">Marks done, awards XP & unlocks</div>
              </div>
              <div className={`p-2 rounded-lg border ${
                isLight ? 'bg-white border-emerald-200 text-slate-800' : 'bg-slate-900 border-emerald-800/60 text-slate-200'
              }`}>
                <span className="text-purple-500 font-bold">POST</span> /api/explain-unlock
                <div className="text-[10px] text-slate-400 font-sans mt-0.5">Calls Gemini AI next-step advisor</div>
              </div>
            </div>
          </div>

          {/* Phase 6: Visual DAG Roadmap & Android Mode */}
          <div className={`p-4 rounded-2xl border ${
            isLight
              ? 'bg-blue-50/70 border-blue-200 text-slate-700'
              : 'bg-blue-950/30 border-blue-800 text-blue-200'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm mb-2 ${
              isLight ? 'text-blue-900' : 'text-blue-300'
            }`}>
              <Smartphone className="w-4 h-4 text-blue-500" />
              <span>4. Visual Roadmap & Android Simulation</span>
            </div>
            <p>
              Includes an interactive SVG DAG tree graph with 3-tier layering and real-time dependency edges. The built-in Android device simulator enables realistic mobile navigation, touch controls, and status bar simulation.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className={`pt-3 border-t flex justify-end ${
          isLight ? 'border-slate-100' : 'border-slate-800'
        }`}>
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            Got it, thanks!
          </button>
        </div>

      </div>
    </div>
  );
};

