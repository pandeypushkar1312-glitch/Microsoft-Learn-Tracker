import React, { useState } from 'react';
import { Shuffle, Sparkles, X, Trophy, ArrowRight, Zap, Target, CheckCircle2 } from 'lucide-react';
import { playSuccessChime, playTactileClick } from '../utils/sound';
import { DomainId } from '../types';
import { DOMAINS } from '../data/learningPaths';

interface RemixChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack: (trackId: DomainId) => void;
  onClaimReward?: (xpBonus: number) => void;
}

const CHALLENGES = [
  {
    title: 'Azure Cloud Speed Run',
    domain: 'cloud' as DomainId,
    desc: 'Master Microsoft Azure Fundamentals (AZ-900) core concepts and compute services in under 45 minutes.',
    xpBonus: 150,
    difficulty: 'Intermediate',
    badge: '⚡ Cloud Sprint',
  },
  {
    title: 'Generative AI Prompt Architect',
    domain: 'ai' as DomainId,
    desc: 'Engineer advanced system instructions and safety filters using Azure OpenAI and Microsoft Copilot Studio.',
    xpBonus: 200,
    difficulty: 'Advanced',
    badge: '🧠 AI Pioneer',
  },
  {
    title: 'Zero Trust Security Audit',
    domain: 'security' as DomainId,
    desc: 'Configure Microsoft Entra ID Conditional Access policies and Key Vault credential rotation.',
    xpBonus: 180,
    difficulty: 'Hard',
    badge: '🛡️ Defender',
  },
  {
    title: 'CI/CD Pipeline Accelerator',
    domain: 'devops' as DomainId,
    desc: 'Automate container image builds and Bicep infrastructure deployments via GitHub Actions.',
    xpBonus: 160,
    difficulty: 'Intermediate',
    badge: '🚀 DevOps Pro',
  },
  {
    title: 'Fabric Real-Time Stream',
    domain: 'data' as DomainId,
    desc: 'Ingest and transform high-throughput telemetry data with Microsoft Fabric and Kusto Lakehouse.',
    xpBonus: 175,
    difficulty: 'Advanced',
    badge: '📊 Data Master',
  },
];

export const RemixChallengeModal: React.FC<RemixChallengeModalProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
  onClaimReward,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);

  if (!isOpen) return null;

  const challenge = CHALLENGES[currentIdx];

  const handleShuffle = () => {
    playTactileClick();
    setIsClaimed(false);
    setCurrentIdx((prev) => (prev + 1) % CHALLENGES.length);
  };

  const handleAcceptChallenge = () => {
    playSuccessChime();
    setIsClaimed(true);
    onSelectTrack(challenge.domain);
    if (onClaimReward) onClaimReward(challenge.xpBonus);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 text-slate-100 shadow-2xl p-6 overflow-hidden">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-amber-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center text-white shadow-md">
              <Shuffle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                Daily Study Remix <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400">Randomized learning challenge with bonus XP</p>
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

        {/* Challenge Card */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 relative overflow-hidden mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-fuchsia-900/60 text-fuchsia-300 border border-fuchsia-700">
              {challenge.badge}
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-amber-400" /> +{challenge.xpBonus} XP Bonus
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-1.5">{challenge.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">{challenge.desc}</p>

          <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs">
            <span className="text-slate-400">
              Target Track:{' '}
              <strong className="text-cyan-300 capitalize">
                {DOMAINS.find((d) => d.id === challenge.domain)?.name}
              </strong>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">Difficulty: {challenge.difficulty}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" /> Re-roll Challenge
          </button>

          <button
            onClick={handleAcceptChallenge}
            disabled={isClaimed}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg ${
              isClaimed
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 hover:scale-105 active:scale-95'
            }`}
          >
            {isClaimed ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Challenge Activated!
              </>
            ) : (
              <>
                <Target className="w-4 h-4" /> Accept & Start Path
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
