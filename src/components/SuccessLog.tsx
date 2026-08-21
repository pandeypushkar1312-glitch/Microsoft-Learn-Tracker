import React, { useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Zap,
  Flame,
  Clock,
  Download,
  Share2,
  ExternalLink,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { UserProgressData, DomainId, AppTheme } from '../types';
import { DOMAINS, LEARNING_MODULES } from '../data/learningPaths';
import { playTactileClick, playSuccessChime } from '../utils/sound';

interface SuccessLogProps {
  progress: UserProgressData;
  onNavigateToModule: (moduleId: string, domainId: DomainId) => void;
  theme?: AppTheme;
}

export const SuccessLog: React.FC<SuccessLogProps> = ({
  progress,
  onNavigateToModule,
  theme = 'light',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterDomain, setSelectedFilterDomain] = useState<string>('all');
  const [isCopied, setIsCopied] = useState(false);
  const isLight = theme === 'light';

  const completedList = progress.completedTasksLog;

  const filteredTasks = completedList.filter((task) => {
    const matchesSearch =
      task.moduleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.notes && task.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain =
      selectedFilterDomain === 'all' || task.domainId === selectedFilterDomain;

    return matchesSearch && matchesDomain;
  });

  const totalEstimatedHours = Object.keys(progress.completedModules).reduce(
    (acc, modId) => {
      const mod = LEARNING_MODULES.find((m) => m.id === modId);
      if (!mod) return acc;
      const hours = parseInt(mod.duration, 10) || 0;
      return acc + hours;
    },
    0
  );

  const handleCopySummary = () => {
    playSuccessChime();
    const lines = [
      `🎓 Microsoft Learn Progress Portfolio`,
      `Total XP: ${progress.totalXp.toLocaleString()} XP`,
      `Certifications / Paths Completed: ${progress.certificationsEarned}`,
      `Total Estimated Study Hours: ${totalEstimatedHours} hours`,
      `Active Streak: ${progress.streakDays} days`,
      `\nCompleted Microsoft Learn Certifications:`,
      ...completedList.map(
        (t) =>
          `• [${t.moduleCode}] ${t.moduleTitle} - Completed ${new Date(
            t.completedAt
          ).toLocaleDateString()} (+${t.xpAwarded} XP)`
      ),
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const getHeroCardThemeClass = () => {
    if (theme === 'bw') {
      return 'bg-black border-2 border-white text-white shadow-none';
    }
    if (theme === 'gray') {
      return 'bg-[#24272B] border-zinc-700 text-zinc-100 shadow-xl';
    }
    if (theme === 'light') {
      return 'bg-gradient-to-br from-[#0078D4] via-[#005A9E] to-[#106EBE] text-white border-blue-600';
    }
    return 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white border-slate-700/80';
  };

  const getSectionCardThemeClass = () => {
    if (theme === 'bw') {
      return 'bg-black border-2 border-white text-white shadow-none';
    }
    if (theme === 'gray') {
      return 'bg-[#24272B] border-zinc-700 text-zinc-100 shadow-sm';
    }
    if (theme === 'light') {
      return 'bg-white border-slate-200 text-slate-900 shadow-sm';
    }
    return 'bg-slate-900 border-slate-800 text-white shadow-sm';
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Stats Card */}
      <div className={`rounded-3xl p-6 sm:p-8 shadow-xl border relative overflow-hidden transition-colors ${getHeroCardThemeClass()}`}>
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`p-2 rounded-xl border ${
                theme === 'bw'
                  ? 'bg-white text-black border-white'
                  : theme === 'gray'
                  ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                  : isLight
                  ? 'bg-white/20 text-white border-white/30'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                <Award className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                My Microsoft Learn Success & Achievements
              </h2>
            </div>
            <p className={`text-sm max-w-xl leading-relaxed ${
              theme === 'bw' ? 'text-neutral-300' : theme === 'gray' ? 'text-zinc-300' : isLight ? 'text-blue-100' : 'text-slate-300'
            }`}>
              Official record of your completed certifications, curriculum milestones,
              and earned skill badges across Azure Cloud, AI, Security, and App Engineering.
            </p>
          </div>

          {/* Export & Copy Button */}
          <button
            onClick={handleCopySummary}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              theme === 'bw'
                ? 'bg-white text-black hover:bg-neutral-200 border border-white'
                : theme === 'gray'
                ? 'bg-zinc-700 text-white hover:bg-zinc-600 border border-zinc-600'
                : isLight
                ? 'bg-white text-[#0078D4] hover:bg-blue-50 shadow-blue-900/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
            }`}
          >
            {isCopied ? (
              <>
                <Check className={`w-4 h-4 ${theme === 'bw' ? 'text-black' : 'text-emerald-600'}`} />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share & Export Portfolio</span>
              </>
            )}
          </button>
        </div>

        {/* 4-Stat Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t relative z-10 ${
          theme === 'bw' ? 'border-neutral-800' : 'border-white/20'
        }`}>
          <div className={`rounded-2xl p-3.5 border ${
            theme === 'bw'
              ? 'bg-neutral-950 border-neutral-800'
              : theme === 'gray'
              ? 'bg-zinc-800/80 border-zinc-700'
              : isLight
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-800/60 border-slate-700/50'
          }`}>
            <div className={`text-xs flex items-center gap-1.5 ${
              theme === 'bw' ? 'text-neutral-400' : theme === 'gray' ? 'text-zinc-400' : isLight ? 'text-blue-100' : 'text-slate-400'
            }`}>
              <Zap className={`w-3.5 h-3.5 ${theme === 'bw' ? 'text-white' : 'text-amber-300'}`} />
              Total XP Earned
            </div>
            <div className={`text-xl sm:text-2xl font-mono font-bold mt-1 ${
              theme === 'bw' ? 'text-white' : 'text-amber-300'
            }`}>
              {progress.totalXp.toLocaleString()}
            </div>
          </div>

          <div className={`rounded-2xl p-3.5 border ${
            theme === 'bw'
              ? 'bg-neutral-950 border-neutral-800'
              : theme === 'gray'
              ? 'bg-zinc-800/80 border-zinc-700'
              : isLight
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-800/60 border-slate-700/50'
          }`}>
            <div className={`text-xs flex items-center gap-1.5 ${
              theme === 'bw' ? 'text-neutral-400' : theme === 'gray' ? 'text-zinc-400' : isLight ? 'text-blue-100' : 'text-slate-400'
            }`}>
              <Award className={`w-3.5 h-3.5 ${theme === 'bw' ? 'text-white' : 'text-emerald-300'}`} />
              Certifications Completed
            </div>
            <div className={`text-xl sm:text-2xl font-mono font-bold mt-1 ${
              theme === 'bw' ? 'text-white' : 'text-emerald-300'
            }`}>
              {progress.certificationsEarned}
            </div>
          </div>

          <div className={`rounded-2xl p-3.5 border ${
            theme === 'bw'
              ? 'bg-neutral-950 border-neutral-800'
              : theme === 'gray'
              ? 'bg-zinc-800/80 border-zinc-700'
              : isLight
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-800/60 border-slate-700/50'
          }`}>
            <div className={`text-xs flex items-center gap-1.5 ${
              theme === 'bw' ? 'text-neutral-400' : theme === 'gray' ? 'text-zinc-400' : isLight ? 'text-blue-100' : 'text-slate-400'
            }`}>
              <Clock className={`w-3.5 h-3.5 ${theme === 'bw' ? 'text-white' : 'text-cyan-300'}`} />
              Study Hours
            </div>
            <div className={`text-xl sm:text-2xl font-mono font-bold mt-1 ${
              theme === 'bw' ? 'text-white' : 'text-cyan-300'
            }`}>
              {totalEstimatedHours} hrs
            </div>
          </div>

          <div className={`rounded-2xl p-3.5 border ${
            theme === 'bw'
              ? 'bg-neutral-950 border-neutral-800'
              : theme === 'gray'
              ? 'bg-zinc-800/80 border-zinc-700'
              : isLight
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-800/60 border-slate-700/50'
          }`}>
            <div className={`text-xs flex items-center gap-1.5 ${
              theme === 'bw' ? 'text-neutral-400' : theme === 'gray' ? 'text-zinc-400' : isLight ? 'text-blue-100' : 'text-slate-400'
            }`}>
              <Flame className={`w-3.5 h-3.5 ${theme === 'bw' ? 'text-white' : 'text-orange-300'}`} />
              Study Streak
            </div>
            <div className={`text-xl sm:text-2xl font-mono font-bold mt-1 ${
              theme === 'bw' ? 'text-white' : 'text-orange-300'
            }`}>
              {progress.streakDays} Days
            </div>
          </div>
        </div>
      </div>

      {/* Completed Certifications Gallery */}
      <div className={`rounded-3xl p-6 border shadow-sm transition-colors ${getSectionCardThemeClass()}`}>
        <h3 className={`text-base font-bold mb-4 flex items-center gap-2 ${
          theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
        }`}>
          <Award className={`w-4 h-4 ${theme === 'bw' ? 'text-white' : 'text-blue-600'}`} />
          Earned Credential Badges & Milestone Passes
        </h3>

        {Object.keys(progress.completedModules).length === 0 ? (
          <div className={`text-center py-8 text-xs ${
            theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            No certifications completed yet. Complete modules in the learning path to unlock credentials!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {Object.keys(progress.completedModules).map((moduleId) => {
              const module = LEARNING_MODULES.find((m) => m.id === moduleId);
              if (!module) return null;
              const record = progress.completedModules[moduleId];
              const domain = DOMAINS.find((d) => d.id === module.domainId);

              return (
                <div
                  key={moduleId}
                  className={`p-4 rounded-2xl border flex flex-col justify-between transition-all hover:scale-[1.01] ${
                    theme === 'bw'
                      ? 'border-2 border-white bg-black text-white'
                      : theme === 'gray'
                      ? 'border-zinc-700 bg-[#1F2226] text-zinc-100'
                      : isLight
                      ? 'border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white'
                      : 'border-emerald-900/60 bg-slate-800/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                        theme === 'bw'
                          ? 'bg-white text-black border-white'
                          : theme === 'gray'
                          ? 'bg-zinc-800 text-emerald-400 border-zinc-700'
                          : isLight
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      }`}>
                        {module.code}
                      </span>
                      <span className={`text-[10px] font-mono ${
                        theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {new Date(record.completedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className={`text-sm font-bold leading-snug ${
                      theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {module.title}
                    </h4>
                    <p className={`text-[11px] mt-1 ${
                      theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      Track: {domain?.shortName}
                    </p>
                  </div>

                  <div className={`mt-3 pt-2.5 border-t flex items-center justify-between ${
                    theme === 'bw' ? 'border-neutral-800' : isLight ? 'border-emerald-100' : 'border-slate-700'
                  }`}>
                    <span className={`text-xs font-mono font-bold ${
                      theme === 'bw' ? 'text-white' : 'text-emerald-600'
                    }`}>
                      +{module.xp} XP
                    </span>
                    <a
                      href={module.learnUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playTactileClick}
                      className={`text-xs flex items-center gap-1 font-semibold ${
                        theme === 'bw' ? 'text-white underline' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <span>Verify on MS Learn</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Filterable Completed Tasks History Log */}
      <div className={`rounded-3xl p-6 border shadow-sm transition-colors ${getSectionCardThemeClass()}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className={`text-base font-bold flex items-center gap-2 ${
              theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <Calendar className={`w-4 h-4 ${theme === 'bw' ? 'text-white' : 'text-blue-600'}`} />
              Completed Task Timeline Log
            </h3>
            <p className={`text-xs mt-0.5 ${
              theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Chronological ledger of completed curriculum milestones and study submissions.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'bw'
                    ? 'border-neutral-700 bg-neutral-900 text-white'
                    : theme === 'gray'
                    ? 'border-zinc-700 bg-zinc-800 text-zinc-100'
                    : isLight
                    ? 'border-slate-200 bg-slate-50 focus:bg-white text-slate-900'
                    : 'border-slate-700 bg-slate-800 focus:bg-slate-700 text-white'
                }`}
              />
            </div>

            <select
              value={selectedFilterDomain}
              onChange={(e) => {
                playTactileClick();
                setSelectedFilterDomain(e.target.value);
              }}
              className={`text-xs rounded-xl border py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'bw'
                  ? 'border-neutral-700 bg-neutral-900 text-white'
                  : theme === 'gray'
                  ? 'border-zinc-700 bg-zinc-800 text-zinc-100'
                  : isLight
                  ? 'border-slate-200 bg-slate-50 text-slate-700'
                  : 'border-slate-700 bg-slate-800 text-slate-200'
              }`}
            >
              <option value="all">All Domains</option>
              {DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.shortName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Task Items Table / List */}
        {filteredTasks.length === 0 ? (
          <div className={`text-center py-10 text-xs ${
            theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-400' : 'text-slate-500'
          }`}>
            No completed tasks match the current search filters.
          </div>
        ) : (
          <div className={`divide-y ${
            theme === 'bw' ? 'divide-neutral-800' : isLight ? 'divide-slate-100' : 'divide-slate-800'
          }`}>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl px-2.5 transition-colors ${
                  theme === 'bw'
                    ? 'hover:bg-neutral-900'
                    : isLight ? 'hover:bg-slate-50/70' : 'hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    theme === 'bw'
                      ? 'bg-white text-black'
                      : isLight
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-emerald-950 text-emerald-400'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold text-xs ${
                        theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {task.moduleCode}
                      </span>
                      <span className={`text-xs font-semibold ${
                        theme === 'bw' ? 'text-neutral-200' : isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        {task.moduleTitle}
                      </span>
                    </div>
                    {task.notes && (
                      <p className={`text-xs italic mt-0.5 ${
                        theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        "{task.notes}"
                      </p>
                    )}
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Completed: {new Date(task.completedAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-lg border ${
                    theme === 'bw'
                      ? 'text-white bg-black border-white'
                      : isLight
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
                  }`}>
                    +{task.xpAwarded} XP
                  </span>
                  <button
                    onClick={() => {
                      playTactileClick();
                      onNavigateToModule(task.moduleId, task.domainId);
                    }}
                    className={`text-xs font-bold cursor-pointer hover:underline ${
                      theme === 'bw' ? 'text-white' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    View in Path
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
