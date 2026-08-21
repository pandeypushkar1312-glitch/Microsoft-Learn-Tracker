import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Zap, Flame, Trophy, Gift, ArrowRight } from 'lucide-react';
import { AppTheme } from '../types';
import { playTactileClick, playSuccessChime } from '../utils/sound';

interface DailyQuestsWidgetProps {
  theme?: AppTheme;
  completedCount: number;
  streakDays: number;
  onClaimXpBonus: (xp: number) => void;
  onOpenQuiz?: () => void;
  onOpenRoadmap?: () => void;
}

interface Quest {
  id: string;
  title: string;
  xpReward: number;
  current: number;
  target: number;
  unit: string;
  claimed: boolean;
}

export const DailyQuestsWidget: React.FC<DailyQuestsWidgetProps> = ({
  theme = 'dark',
  completedCount,
  streakDays,
  onClaimXpBonus,
  onOpenQuiz,
  onOpenRoadmap,
}) => {
  const isLight = theme === 'light';

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 'quest_1',
      title: 'Complete 1 Study Module',
      xpReward: 100,
      current: Math.min(completedCount, 1),
      target: 1,
      unit: 'module',
      claimed: false,
    },
    {
      id: 'quest_2',
      title: 'Daily Streak Maintained',
      xpReward: 50,
      current: streakDays > 0 ? 1 : 0,
      target: 1,
      unit: 'day',
      claimed: false,
    },
    {
      id: 'quest_3',
      title: 'Explore Visual DAG Roadmap',
      xpReward: 75,
      current: 1,
      target: 1,
      unit: 'graph',
      claimed: false,
    },
  ]);

  const handleClaim = (questId: string, xpReward: number) => {
    playSuccessChime();
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, claimed: true } : q))
    );
    onClaimXpBonus(xpReward);
  };

  return (
    <div
      className={`w-full rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden shadow-lg ${
        isLight
          ? 'bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/90 border-blue-200/80 text-slate-800'
          : 'bg-gradient-to-r from-slate-900/95 via-indigo-950/40 to-slate-900/95 border-indigo-900/50 text-slate-100'
      }`}
    >
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Trophy className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
              <span>Daily Quests & XP Multipliers</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-extrabold border border-amber-500/30">
                +225 XP Available
              </span>
            </h3>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Complete daily micro-challenges to level up your Microsoft Learn certification standing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              isLight
                ? 'bg-amber-100/90 text-amber-900 border-amber-300'
                : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Streak: {streakDays}d Active</span>
          </div>
        </div>
      </div>

      {/* 3 Interactive Daily Quest Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quests.map((quest) => {
          const isReady = quest.current >= quest.target && !quest.claimed;
          const isClaimed = quest.claimed;

          return (
            <div
              key={quest.id}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all duration-200 ${
                isClaimed
                  ? isLight
                    ? 'bg-slate-100/60 border-slate-200 opacity-70'
                    : 'bg-slate-800/30 border-slate-800 opacity-60'
                  : isReady
                  ? isLight
                    ? 'bg-white border-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-800/80 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                  : isLight
                  ? 'bg-white/80 border-slate-200'
                  : 'bg-slate-800/50 border-slate-700/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="text-xs font-semibold leading-tight line-clamp-1">
                  {quest.title}
                </div>
                <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5 flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  +{quest.xpReward} XP
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-slate-700/40 rounded-full h-1.5 overflow-hidden mb-2.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isClaimed || isReady ? 'bg-emerald-400' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(100, (quest.current / quest.target) * 100)}%` }}
                />
              </div>

              {/* Action Button */}
              {isClaimed ? (
                <div className="w-full py-1 rounded-lg text-center text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Claimed
                </div>
              ) : isReady ? (
                <button
                  type="button"
                  onClick={() => handleClaim(quest.id, quest.xpReward)}
                  className="w-full py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 hover:scale-102 active:scale-98 transition-all cursor-pointer"
                >
                  <Gift className="w-3.5 h-3.5 animate-bounce" />
                  Claim +{quest.xpReward} XP
                </button>
              ) : (
                <div className="w-full py-1 rounded-lg text-center text-[10px] text-slate-400 flex items-center justify-center gap-1 font-medium">
                  {quest.current}/{quest.target} In progress
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
