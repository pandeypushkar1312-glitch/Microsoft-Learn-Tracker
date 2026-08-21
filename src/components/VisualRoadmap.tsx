import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  ExternalLink,
  ChevronRight,
  Zap,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { ComputedModuleState, DomainId, AppTheme } from '../types';
import { playTactileClick } from '../utils/sound';

interface VisualRoadmapProps {
  modules: ComputedModuleState[];
  selectedDomain: DomainId;
  onSelectModule: (module: ComputedModuleState) => void;
  onExplainUnlock: (moduleId: string) => void;
  theme?: AppTheme;
}

export const VisualRoadmap: React.FC<VisualRoadmapProps> = ({
  modules,
  selectedDomain,
  onSelectModule,
  onExplainUnlock,
  theme = 'light',
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const isLight = theme === 'light';

  const domainModules = modules.filter((m) => m.domainId === selectedDomain);

  // Group modules by layer / tier
  const layer1 = domainModules.filter((m) => m.graphPos.layer === 1);
  const layer2 = domainModules.filter((m) => m.graphPos.layer === 2);
  const layer3 = domainModules.filter((m) => m.graphPos.layer === 3);

  const handleZoomIn = () => {
    playTactileClick();
    setZoomLevel((prev) => Math.min(1.4, prev + 0.1));
  };
  const handleZoomOut = () => {
    playTactileClick();
    setZoomLevel((prev) => Math.max(0.7, prev - 0.1));
  };
  const handleResetZoom = () => {
    playTactileClick();
    setZoomLevel(1);
  };

  const selectedModule = domainModules.find((m) => m.id === selectedNodeId);

  const getRoadmapContainerClass = () => {
    if (theme === 'bw') {
      return 'bg-black border-2 border-white text-white shadow-none';
    }
    if (theme === 'gray') {
      return 'bg-[#24272B] border-zinc-700 text-zinc-100 shadow-xl';
    }
    if (theme === 'light') {
      return 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50';
    }
    return 'bg-slate-900 border-slate-800 text-white shadow-xl';
  };

  return (
    <div className={`w-full rounded-3xl p-4 sm:p-6 border transition-colors duration-300 relative overflow-hidden ${getRoadmapContainerClass()}`}>
      
      {/* Top Header & Graph Controls */}
      <div className={`flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b ${
        theme === 'bw' ? 'border-neutral-800' : isLight ? 'border-slate-100' : 'border-slate-800'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${
              theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${
                theme === 'bw' ? 'bg-white' : isLight ? 'bg-blue-600' : 'bg-cyan-400'
              } animate-ping`}></span>
              Visual Learning Dependency Graph
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
              theme === 'bw'
                ? 'bg-white text-black border-white'
                : theme === 'gray'
                ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                : isLight
                ? 'bg-blue-50 text-[#0078D4] border-blue-200'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
            }`}>
              Interactive DAG
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${
            theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Click nodes to inspect prerequisites, exam weights, and AI readiness recommendations.
          </p>
        </div>

        {/* Legend & Zoom Tools */}
        <div className="flex items-center gap-3">
          <div className={`hidden md:flex items-center gap-3 text-xs px-3 py-1.5 rounded-xl border ${
            theme === 'bw'
              ? 'bg-black border-neutral-700 text-white'
              : theme === 'gray'
              ? 'bg-zinc-800 border-zinc-700 text-zinc-300'
              : isLight
              ? 'bg-slate-50 border-slate-200 text-slate-600'
              : 'bg-slate-800/80 border-slate-700 text-slate-300'
          }`}>
            <span className={`flex items-center gap-1 font-semibold ${
              theme === 'bw' ? 'text-white' : 'text-emerald-500'
            }`}>
              <span className={`w-2 h-2 rounded-full ${theme === 'bw' ? 'bg-white' : 'bg-emerald-500'}`}></span> Completed
            </span>
            <span className={`flex items-center gap-1 font-semibold ${
              theme === 'bw' ? 'text-neutral-300' : isLight ? 'text-blue-600' : 'text-cyan-400'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                theme === 'bw' ? 'bg-white' : isLight ? 'bg-blue-600' : 'bg-cyan-400'
              } animate-pulse`}></span> Available
            </span>
            <span className="flex items-center gap-1 text-slate-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span> Locked
            </span>
          </div>

          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            theme === 'bw'
              ? 'bg-black border-neutral-700'
              : theme === 'gray'
              ? 'bg-zinc-800 border-zinc-700'
              : isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'
          }`}>
            <button
              onClick={handleZoomOut}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                theme === 'bw'
                  ? 'text-neutral-400 hover:text-white'
                  : isLight ? 'text-slate-600 hover:bg-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className={`px-2 py-1 text-[11px] font-mono cursor-pointer ${
                theme === 'bw'
                  ? 'text-white'
                  : isLight ? 'text-slate-700 hover:text-black' : 'text-slate-300 hover:text-white'
              }`}
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                theme === 'bw'
                  ? 'text-neutral-400 hover:text-white'
                  : isLight ? 'text-slate-600 hover:bg-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Roadmap Container */}
      <div className="overflow-x-auto pb-4 pt-2">
        <div
          className="min-w-[760px] transition-transform duration-200 origin-top-left"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Layer Headers */}
          <div className="grid grid-cols-3 gap-6 mb-4 text-center">
            <div className={`border rounded-xl py-1.5 text-xs font-bold ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
            }`}>
              Tier 1: Foundational Core
            </div>
            <div className={`border rounded-xl py-1.5 text-xs font-bold ${
              isLight
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-slate-800/60 border-slate-700/60 text-blue-300'
            }`}>
              Tier 2: Associate & Engineering
            </div>
            <div className={`border rounded-xl py-1.5 text-xs font-bold ${
              isLight
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-slate-800/60 border-slate-700/60 text-amber-300'
            }`}>
              Tier 3: Expert & Architecture
            </div>
          </div>

          {/* Graph Columns Grid */}
          <div className="grid grid-cols-3 gap-8 relative items-start">
            
            {/* Tier 1 Column */}
            <div className="space-y-4">
              {layer1.map((mod) => (
                <RoadmapNode
                  key={mod.id}
                  module={mod}
                  isSelected={selectedNodeId === mod.id}
                  theme={theme}
                  onSelect={() => {
                    playTactileClick();
                    setSelectedNodeId(mod.id);
                    onSelectModule(mod);
                  }}
                  onExplainUnlock={onExplainUnlock}
                />
              ))}
            </div>

            {/* Tier 2 Column */}
            <div className="space-y-4">
              {layer2.map((mod) => (
                <RoadmapNode
                  key={mod.id}
                  module={mod}
                  isSelected={selectedNodeId === mod.id}
                  theme={theme}
                  onSelect={() => {
                    playTactileClick();
                    setSelectedNodeId(mod.id);
                    onSelectModule(mod);
                  }}
                  onExplainUnlock={onExplainUnlock}
                />
              ))}
            </div>

            {/* Tier 3 Column */}
            <div className="space-y-4">
              {layer3.map((mod) => (
                <RoadmapNode
                  key={mod.id}
                  module={mod}
                  isSelected={selectedNodeId === mod.id}
                  theme={theme}
                  onSelect={() => {
                    playTactileClick();
                    setSelectedNodeId(mod.id);
                    onSelectModule(mod);
                  }}
                  onExplainUnlock={onExplainUnlock}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Selected Node Inspector Footer Banner */}
      {selectedModule && (
        <div className={`mt-6 p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn ${
          isLight
            ? 'bg-slate-50 border-slate-200'
            : theme === 'matrix'
            ? 'bg-[#111111] border-emerald-900'
            : 'bg-slate-800/90 border-slate-700'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded border ${
                isLight
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-blue-950/60 text-blue-300 border-blue-800'
              }`}>
                {selectedModule.code}
              </span>
              <h4 className={`font-bold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {selectedModule.title}
              </h4>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  selectedModule.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-600'
                    : selectedModule.status === 'available'
                    ? 'bg-blue-500/20 text-blue-600'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {selectedModule.status.toUpperCase()}
              </span>
            </div>
            <p className={`text-xs mt-1 max-w-2xl line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {selectedModule.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playTactileClick();
                onExplainUnlock(selectedModule.id);
              }}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Next? (AI)</span>
            </button>
            <a
              href={selectedModule.learnUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTactileClick}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
            >
              <span>Open on MS Learn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

interface RoadmapNodeProps {
  module: ComputedModuleState;
  isSelected: boolean;
  onSelect: () => void;
  onExplainUnlock: (moduleId: string) => void;
  theme?: AppTheme;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({
  module,
  isSelected,
  onSelect,
  onExplainUnlock,
  theme = 'light',
}) => {
  const isCompleted = module.status === 'completed';
  const isAvailable = module.status === 'available';
  const isLocked = module.status === 'locked';
  const isLight = theme === 'light';

  const getNodeThemeClass = () => {
    if (theme === 'bw') {
      if (isCompleted) return 'bg-black border-2 border-white text-white shadow-none';
      if (isAvailable) return 'bg-black border-2 border-white text-white ring-1 ring-white/60';
      return 'bg-neutral-950 border border-neutral-800 text-neutral-400 opacity-60';
    }
    if (theme === 'gray') {
      if (isCompleted) return 'bg-[#1C2C24] border-emerald-800/80 text-zinc-100 shadow-md';
      if (isAvailable) return 'bg-[#2B2D31] border-zinc-600 text-zinc-100 shadow-md hover:border-blue-400';
      return 'bg-[#1E2024] border-zinc-800/80 text-zinc-400 opacity-75';
    }
    if (theme === 'light') {
      if (isCompleted) return 'bg-emerald-50/50 border-emerald-300 text-slate-800';
      if (isAvailable) return 'bg-white border-blue-300 shadow-sm hover:border-blue-400 text-slate-900';
      return 'bg-slate-50 border-slate-200 opacity-70 text-slate-600';
    }
    // dark
    if (isCompleted) return 'bg-emerald-950/30 border-emerald-700 text-slate-100';
    if (isAvailable) return 'bg-slate-800/90 border-blue-500/80 shadow-md shadow-blue-500/10 text-white';
    return 'bg-slate-900/80 border-slate-800 opacity-65 text-slate-300';
  };

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
        isSelected
          ? theme === 'bw' ? 'ring-2 ring-white scale-[1.02]' : 'ring-2 ring-blue-500 scale-[1.02] shadow-lg'
          : 'hover:scale-[1.01]'
      } ${getNodeThemeClass()}`}
    >
      {/* Node status top */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
              theme === 'bw'
                ? 'bg-black text-white border-white'
                : isCompleted
                ? isLight
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : isAvailable
                ? isLight
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-blue-950 text-blue-400 border-blue-800'
                : 'bg-slate-200 text-slate-600 border-slate-300'
            }`}
          >
            {module.code}
          </span>
          <span className={`text-[11px] font-semibold ${
            theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {module.level}
          </span>
        </div>

        {isCompleted ? (
          <CheckCircle2 className={`w-4 h-4 ${theme === 'bw' ? 'text-white' : 'text-emerald-500'}`} />
        ) : isAvailable ? (
          <span className={`w-2.5 h-2.5 rounded-full ${theme === 'bw' ? 'bg-white' : 'bg-blue-500'} animate-ping`}></span>
        ) : (
          <Lock className="w-3.5 h-3.5 text-slate-400" />
        )}
      </div>

      <h4 className={`text-sm font-bold leading-snug line-clamp-1 transition-colors ${
        theme === 'bw'
          ? 'text-white group-hover:underline'
          : isLight ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'
      }`}>
        {module.title}
      </h4>

      <p className={`text-[11px] line-clamp-2 mt-1 ${
        theme === 'bw' ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-400'
      }`}>
        {module.description}
      </p>

      {/* Prerequisite Tags */}
      {module.prerequisites.length > 0 && (
        <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10px] ${
          theme === 'bw' ? 'border-neutral-800 text-neutral-400' : isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'
        }`}>
          <span>Requires:</span>
          <span className={`font-mono font-bold ${
            theme === 'bw' ? 'text-white' : isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            {module.prerequisites.join(', ').toUpperCase()}
          </span>
        </div>
      )}

      {/* Reward XP */}
      <div className="mt-2 flex items-center justify-between text-[11px]">
        <span className={`font-mono font-bold flex items-center gap-1 ${
          theme === 'bw' ? 'text-white' : 'text-amber-500'
        }`}>
          <Zap className="w-3 h-3" />
          +{module.xp} XP
        </span>
        <span className={theme === 'bw' ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'}>{module.duration}</span>
      </div>
    </div>
  );
};
