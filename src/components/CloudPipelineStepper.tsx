import React, { useState, useEffect } from 'react';
import {
  Server,
  Settings,
  Code,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  ChevronRight,
  Zap,
  Info,
  ShieldCheck,
  Brain,
  Database,
  Bot,
  LineChart,
  Share2,
  Shield,
  Key,
  Eye,
  GitBranch,
  Smartphone,
  Infinity,
  Layout,
  Briefcase,
  Cpu,
  Compass,
  Check
} from 'lucide-react';
import { ComputedModuleState, AppTheme, DomainId } from '../types';
import { playTactileClick } from '../utils/sound';

interface CloudPipelineStepperProps {
  modules: ComputedModuleState[];
  onSelectModule: (module: ComputedModuleState) => void;
  selectedDomain?: DomainId;
  onSelectDomain?: (domain: DomainId) => void;
  theme?: AppTheme;
}

interface StepDefinition {
  stepNumber: number;
  id: string;
  code: string;
  shortTitle: string;
  roleTitle: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  badge: string;
}

interface PipelineConfig {
  domainId: DomainId;
  tabLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  headerAccent: string;
  themeGradientLight: string;
  themeGradientDark: string;
  borderColorLight: string;
  borderColorDark: string;
  progressionNote: string;
  totalXpText: string;
  steps: StepDefinition[];
}

const PIPELINE_CONFIGS: Record<DomainId, PipelineConfig> = {
  'ai-data': {
    domainId: 'ai-data',
    tabLabel: 'AI and Data',
    title: 'Microsoft AI & Data 4-Step Engineering Pipeline',
    subtitle: 'From foundational AI & machine learning to generative LLMs, prompt engineering, and modern Microsoft Fabric lakehouse analytics.',
    badge: 'AI & Data Sequential Pipeline',
    icon: Brain,
    headerAccent: 'from-purple-500 to-indigo-500',
    themeGradientLight: 'from-slate-50 via-purple-50/40 to-indigo-50/50',
    themeGradientDark: 'from-[#14121F] via-[#1B162B] to-[#12141A]',
    borderColorLight: 'border-purple-200/80',
    borderColorDark: 'border-purple-900/60',
    progressionNote: 'Step 1 (AI-900) unlocks Step 2 (DP-100) and Step 3 (AI-102). Completing them unlocks the modern enterprise lakehouse capstone Step 4 (DP-600 Fabric).',
    totalXpText: 'Total Path XP: +6,100 XP',
    steps: [
      {
        stepNumber: 1,
        id: 'ai-900',
        code: 'AI-900',
        shortTitle: 'Azure AI Fundamentals',
        roleTitle: 'Core AI & ML Foundations',
        description: 'Machine learning concepts, computer vision, natural language processing & responsible generative AI safety.',
        icon: Sparkles,
        accentColor: 'from-purple-500 to-indigo-500',
        badge: 'Step 1: AI Foundation',
      },
      {
        stepNumber: 2,
        id: 'dp-100',
        code: 'DP-100',
        shortTitle: 'Azure Data Scientist',
        roleTitle: 'MLOps & Model Training',
        description: 'Azure Machine Learning SDK v2, automated ML, GPU training clusters, MLflow & model endpoint deployment.',
        icon: LineChart,
        accentColor: 'from-blue-500 to-indigo-600',
        badge: 'Step 2: Data Science & ML',
      },
      {
        stepNumber: 3,
        id: 'ai-102',
        code: 'AI-102',
        shortTitle: 'Azure AI Engineer',
        roleTitle: 'Generative AI & LLM Solutions',
        description: 'Azure OpenAI Service, prompt flow, RAG with Azure AI Search, Document Intelligence & conversational bots.',
        icon: Bot,
        accentColor: 'from-indigo-500 to-purple-600',
        badge: 'Step 3: GenAI & LLMs',
      },
      {
        stepNumber: 4,
        id: 'dp-600',
        code: 'DP-600',
        shortTitle: 'Fabric Analytics Engineer',
        roleTitle: 'Modern Data Lakehouse Capstone',
        description: 'Microsoft Fabric OneLake, Delta parquet tables, semantic data modeling, Direct Lake & high-performance DAX.',
        icon: Share2,
        accentColor: 'from-amber-500 to-pink-500',
        badge: 'Step 4: Lakehouse Capstone',
      },
    ],
  },
  security: {
    domainId: 'security',
    tabLabel: 'Security',
    title: 'Microsoft Security, Compliance & Identity 4-Step Pipeline',
    subtitle: 'Establish Zero Trust identity governance, hunt threats with Defender & Sentinel SIEM, and harden enterprise cloud perimeters.',
    badge: 'Security Sequential Pipeline',
    icon: ShieldCheck,
    headerAccent: 'from-emerald-500 to-teal-500',
    themeGradientLight: 'from-slate-50 via-emerald-50/40 to-teal-50/50',
    themeGradientDark: 'from-[#101A16] via-[#14231E] to-[#12141A]',
    borderColorLight: 'border-emerald-200/80',
    borderColorDark: 'border-emerald-900/60',
    progressionNote: 'Step 1 (SC-900) unlocks Step 2 (SC-300 IAM) and Step 3 (SC-200 SecOps). Completing them unlocks the advanced cloud security engineering capstone Step 4 (AZ-500).',
    totalXpText: 'Total Path XP: +5,900 XP',
    steps: [
      {
        stepNumber: 1,
        id: 'sc-900',
        code: 'SC-900',
        shortTitle: 'Security & Identity Fundamentals',
        roleTitle: 'Zero-Trust Gateway',
        description: 'Zero Trust principles, Microsoft Entra ID authentication, threat protection & Microsoft Purview compliance.',
        icon: Shield,
        accentColor: 'from-emerald-500 to-teal-500',
        badge: 'Step 1: Security Gateway',
      },
      {
        stepNumber: 2,
        id: 'sc-300',
        code: 'SC-300',
        shortTitle: 'Identity & Access Administrator',
        roleTitle: 'IAM & Governance Specialist',
        description: 'Entra ID hybrid sync, Conditional Access policies, PIM privileged identity, passwordless FIDO2 & app access.',
        icon: Key,
        accentColor: 'from-teal-500 to-cyan-600',
        badge: 'Step 2: Identity & IAM',
      },
      {
        stepNumber: 3,
        id: 'sc-200',
        code: 'SC-200',
        shortTitle: 'Security Operations Analyst',
        roleTitle: 'Threat Hunting & SIEM/SOAR',
        description: 'Microsoft Defender for Endpoint/Cloud, Sentinel SIEM/SOAR automated playbooks & KQL threat hunting queries.',
        icon: Eye,
        accentColor: 'from-blue-600 to-indigo-600',
        badge: 'Step 3: Threat Hunting',
      },
      {
        stepNumber: 4,
        id: 'az-500',
        code: 'AZ-500',
        shortTitle: 'Azure Security Technologies',
        roleTitle: 'Cloud Security Engineering Capstone',
        description: 'Virtual network firewalls, Bastion, SQL transparent data encryption, Key Vault HSMs & cloud perimeter defense.',
        icon: Lock,
        accentColor: 'from-amber-500 to-rose-500',
        badge: 'Step 4: Security Capstone',
      },
    ],
  },
  'devops-app': {
    domainId: 'devops-app',
    tabLabel: 'DevOps',
    title: 'Microsoft DevOps & Mobile Engineering 4-Step Pipeline',
    subtitle: 'From automated GitHub Actions CI/CD and native Android .NET MAUI development to Kubernetes container delivery and enterprise DevOps.',
    badge: 'DevOps Sequential Pipeline',
    icon: Infinity,
    headerAccent: 'from-amber-500 to-orange-500',
    themeGradientLight: 'from-slate-50 via-amber-50/40 to-orange-50/50',
    themeGradientDark: 'from-[#1A1612] via-[#241C16] to-[#12141A]',
    borderColorLight: 'border-amber-200/80',
    borderColorDark: 'border-amber-900/60',
    progressionNote: 'Step 1 (GH-ACT) unlocks Step 2 (MAUI-AND) and Step 3 (AKS-APP). Completing them unlocks the enterprise DevOps engineering capstone Step 4 (AZ-400).',
    totalXpText: 'Total Path XP: +5,800 XP',
    steps: [
      {
        stepNumber: 1,
        id: 'git-actions',
        code: 'GH-ACT',
        shortTitle: 'GitHub Actions & Azure CI/CD',
        roleTitle: 'CI/CD Automation Gateway',
        description: 'GitHub Actions triggers, reusable YAML workflows, automated test matrices, and secure secret rotation.',
        icon: GitBranch,
        accentColor: 'from-amber-500 to-orange-500',
        badge: 'Step 1: CI/CD Foundations',
      },
      {
        stepNumber: 2,
        id: 'maui-android',
        code: 'MAUI-AND',
        shortTitle: 'Android & .NET MAUI Apps',
        roleTitle: 'Mobile Android Engineering',
        description: 'Native Android XAML UI, MVVM architecture, local SQLite persistence & secure Azure REST API consumption.',
        icon: Smartphone,
        accentColor: 'from-blue-500 to-cyan-500',
        badge: 'Step 2: Mobile App Dev',
      },
      {
        stepNumber: 3,
        id: 'aks-containers',
        code: 'AKS-APP',
        shortTitle: 'Container Apps & Kubernetes (AKS)',
        roleTitle: 'Cloud Native & Microservices',
        description: 'Docker containerization, private Azure Container Registry (ACR), and scalable Kubernetes pod deployments in AKS.',
        icon: Server,
        accentColor: 'from-indigo-500 to-purple-600',
        badge: 'Step 3: Kubernetes Delivery',
      },
      {
        stepNumber: 4,
        id: 'az-400',
        code: 'AZ-400',
        shortTitle: 'Microsoft DevOps Solutions',
        roleTitle: 'Enterprise DevOps Solutions Capstone',
        description: 'Advanced multi-stage release pipelines, Git branching strategy, blue-green canary deployments & shift-left security.',
        icon: Infinity,
        accentColor: 'from-red-500 to-rose-600',
        badge: 'Step 4: DevOps Capstone',
      },
    ],
  },
  'power-platform': {
    domainId: 'power-platform',
    tabLabel: 'Mobile Power Platform',
    title: 'Microsoft Power Platform & Mobile Apps 4-Step Pipeline',
    subtitle: 'From rapid low-code fundamentals to responsive mobile canvas apps, automated enterprise workflows, and pro-code PCF extensibility.',
    badge: 'Mobile Power Platform Pipeline',
    icon: Zap,
    headerAccent: 'from-pink-500 to-rose-500',
    themeGradientLight: 'from-slate-50 via-pink-50/40 to-rose-50/50',
    themeGradientDark: 'from-[#1C1217] via-[#26141D] to-[#12141A]',
    borderColorLight: 'border-pink-200/80',
    borderColorDark: 'border-pink-900/60',
    progressionNote: 'Step 1 (PL-900) unlocks Step 2 (PL-100) and Step 3 (PL-200). Completing them unlocks the full-stack pro-developer capstone Step 4 (PL-400).',
    totalXpText: 'Total Path XP: +5,900 XP',
    steps: [
      {
        stepNumber: 1,
        id: 'pl-900',
        code: 'PL-900',
        shortTitle: 'Power Platform Fundamentals',
        roleTitle: 'Low-Code Core Gateway',
        description: 'Power Apps, Power Automate cloud flows, Power BI dashboards, Copilot Studio & Dataverse foundational concepts.',
        icon: Zap,
        accentColor: 'from-pink-500 to-rose-500',
        badge: 'Step 1: Low-Code Core',
      },
      {
        stepNumber: 2,
        id: 'pl-100',
        code: 'PL-100',
        shortTitle: 'Power Platform App Maker',
        roleTitle: 'Mobile & Canvas App Maker',
        description: 'Responsive canvas apps with Power Fx formulas, mobile camera/GPS bindings & automated approval flows.',
        icon: Layout,
        accentColor: 'from-rose-500 to-purple-500',
        badge: 'Step 2: Mobile App Maker',
      },
      {
        stepNumber: 3,
        id: 'pl-200',
        code: 'PL-200',
        shortTitle: 'Power Platform Consultant',
        roleTitle: 'Enterprise Process Automation',
        description: 'Dataverse relational schemas, security roles, multi-step business process flows & ALM environment management.',
        icon: Briefcase,
        accentColor: 'from-purple-500 to-indigo-600',
        badge: 'Step 3: Enterprise Automation',
      },
      {
        stepNumber: 4,
        id: 'pl-400',
        code: 'PL-400',
        shortTitle: 'Power Platform Developer',
        roleTitle: 'Full-Stack Pro-Developer Capstone',
        description: 'Custom Power Apps Component Framework (PCF) TypeScript controls, C# Dataverse plug-ins & Azure Function webhooks.',
        icon: Code,
        accentColor: 'from-amber-500 to-orange-500',
        badge: 'Step 4: Pro-Dev Capstone',
      },
    ],
  },
  cloud: {
    domainId: 'cloud',
    tabLabel: 'Azure Cloud',
    title: 'Microsoft Azure Cloud & Infrastructure 4-Step Pipeline',
    subtitle: 'Master foundational cloud concepts in Step 1, scale operations in Step 2, develop cloud code in Step 3, and architect multi-region systems in Step 4.',
    badge: 'Azure Cloud Sequential Pipeline',
    icon: Server,
    headerAccent: 'from-blue-500 to-cyan-500',
    themeGradientLight: 'from-slate-50 via-blue-50/40 to-indigo-50/50',
    themeGradientDark: 'from-[#12141A] via-[#161B26] to-[#12141A]',
    borderColorLight: 'border-blue-200/80',
    borderColorDark: 'border-indigo-900/60',
    progressionNote: 'Step 1 (AZ-900) unlocks Step 2 (AZ-104) and Step 3 (AZ-204). Completing Step 2 & 3 unlocks the Expert Capstone Step 4 (AZ-305).',
    totalXpText: 'Total Path XP: +6,800 XP',
    steps: [
      {
        stepNumber: 1,
        id: 'az-900',
        code: 'AZ-900',
        shortTitle: 'Azure Fundamentals',
        roleTitle: 'Foundational Gateway',
        description: 'Cloud core concepts, virtualization, shared responsibility, SLA & pricing',
        icon: Server,
        accentColor: 'from-blue-500 to-cyan-500',
        badge: 'Step 1: Core Foundation',
      },
      {
        stepNumber: 2,
        id: 'az-104',
        code: 'AZ-104',
        shortTitle: 'Azure Administrator',
        roleTitle: 'Infrastructure Operations',
        description: 'Entra ID, RBAC governance, Virtual Machines, VNets & Blob storage',
        icon: Settings,
        accentColor: 'from-indigo-500 to-blue-600',
        badge: 'Step 2: Operations & Admin',
      },
      {
        stepNumber: 3,
        id: 'az-204',
        code: 'AZ-204',
        shortTitle: 'Developer Solutions',
        roleTitle: 'Cloud Application Dev',
        description: 'Serverless Functions, Cosmos DB SDK, Key Vault security & Service Bus queues',
        icon: Code,
        accentColor: 'from-purple-500 to-indigo-600',
        badge: 'Step 3: Cloud Development',
      },
      {
        stepNumber: 4,
        id: 'az-305',
        code: 'AZ-305',
        shortTitle: 'Infrastructure Solutions',
        roleTitle: 'Expert Solutions Architect',
        description: 'Multi-region Landing Zones, high-availability DR, enterprise data estate & compliance',
        icon: Layers,
        accentColor: 'from-amber-500 to-orange-500',
        badge: 'Step 4: Architect Capstone',
      },
    ],
  },
};

// Ordered list of the requested domain options
const ORDERED_PIPELINE_DOMAINS: DomainId[] = [
  'ai-data',
  'security',
  'devops-app',
  'power-platform',
  'cloud',
];

export const CloudPipelineStepper: React.FC<CloudPipelineStepperProps> = ({
  modules,
  onSelectModule,
  selectedDomain = 'cloud',
  onSelectDomain,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  // Active domain inside stepper can be synced or selected
  const [activePipelineDomain, setActivePipelineDomain] = useState<DomainId>(selectedDomain);

  useEffect(() => {
    if (selectedDomain && PIPELINE_CONFIGS[selectedDomain]) {
      setActivePipelineDomain(selectedDomain);
    }
  }, [selectedDomain]);

  const handleTabClick = (domainId: DomainId) => {
    playTactileClick();
    setActivePipelineDomain(domainId);
    if (onSelectDomain) {
      onSelectDomain(domainId);
    }
  };

  const currentConfig = PIPELINE_CONFIGS[activePipelineDomain] || PIPELINE_CONFIGS.cloud;

  // Map state to step definition
  const getModuleState = (id: string): ComputedModuleState | undefined => {
    return modules.find((m) => m.id === id);
  };

  const getContainerThemeClasses = () => {
    if (theme === 'bw') {
      return 'bg-black border-2 border-white text-white';
    }
    if (theme === 'gray') {
      return 'bg-[#24272B] border-zinc-700 text-zinc-100 shadow-xl';
    }
    if (theme === 'light') {
      return `bg-gradient-to-br ${currentConfig.themeGradientLight} ${currentConfig.borderColorLight} text-slate-800`;
    }
    return `bg-gradient-to-br ${currentConfig.themeGradientDark} ${currentConfig.borderColorDark} text-slate-100`;
  };

  return (
    <div
      id="four-step-sequential-pipeline-container"
      className={`w-full rounded-2xl p-4 sm:p-5 border transition-all duration-300 relative overflow-hidden shadow-xl mb-6 ${getContainerThemeClasses()}`}
    >
      {/* Decorative Ambient Glow */}
      {theme !== 'bw' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Top Interface: 4-Option Pipeline Selector Tabs */}
      <div className="mb-4 relative z-10">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${
            theme === 'bw' ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Select Specialization Pipeline Interface:
          </span>
          <span className={`text-[11px] font-semibold hidden sm:inline-flex items-center gap-1 ${
            theme === 'bw' ? 'text-white' : 'text-blue-400'
          }`}>
            <span className="animate-pulse">●</span> Click tabs to switch 4-step sequence
          </span>
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 rounded-xl border ${
          theme === 'bw'
            ? 'bg-black border-2 border-white'
            : theme === 'gray'
            ? 'bg-[#1E2124] border-zinc-700 shadow-inner'
            : isLight
            ? 'bg-white/80 border-slate-200 shadow-xs'
            : 'bg-slate-900/80 border-slate-800 shadow-inner'
        }`}>
          {ORDERED_PIPELINE_DOMAINS.map((domId) => {
            const config = PIPELINE_CONFIGS[domId];
            const isTabActive = activePipelineDomain === domId;
            const Icon = config.icon;

            return (
              <button
                key={domId}
                id={`pipeline-tab-${domId}`}
                type="button"
                onClick={() => handleTabClick(domId)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  isTabActive
                    ? theme === 'bw'
                      ? 'bg-white text-black font-extrabold shadow-sm'
                      : theme === 'gray'
                      ? 'bg-zinc-700 text-white font-bold shadow-md ring-1 ring-zinc-500'
                      : isLight
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-500 font-bold scale-[1.02]'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/40 ring-1 ring-cyan-400 font-bold scale-[1.02]'
                    : theme === 'bw'
                    ? 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    : theme === 'gray'
                    ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    : isLight
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isTabActive ? (theme === 'bw' ? 'text-black' : 'text-white') : 'opacity-70'}`} />
                <span className="truncate">{config.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header with Explanation of 4-Step Connection */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10 pt-1">
        <div className="flex items-center gap-3">
          {/* Microsoft Quad Logo */}
          <div className="grid grid-cols-2 gap-0.5 w-6 h-6 flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-[1px] bg-[#F25022]" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-[#7FBA00]" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-[#00A4EF]" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-[#FFB900]" />
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
              <span>{currentConfig.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold whitespace-nowrap border ${
                theme === 'bw'
                  ? 'bg-white text-black border-white'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
              }`}>
                4-Step Sequential Pipeline
              </span>
            </h3>
            <p className={`text-xs mt-0.5 max-w-3xl leading-relaxed ${
              theme === 'bw' ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {currentConfig.subtitle}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-2 text-xs font-semibold ${
          theme === 'bw' ? 'text-white' : 'text-blue-400'
        }`}>
          <span className="animate-pulse">●</span>
          <span>Click any step to view syllabus & test skills</span>
        </div>
      </div>

      {/* Animated 4-Step Interactive Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative z-10">
        {currentConfig.steps.map((step, idx) => {
          const modState = getModuleState(step.id);
          const isCompleted = modState?.status === 'completed';
          const isAvailable = modState?.status === 'available';
          const isLocked = modState?.status === 'locked' || (!modState && idx > 0);
          const Icon = step.icon;

          const getStepCardThemeClass = () => {
            if (theme === 'bw') {
              if (isCompleted) return 'bg-black border-2 border-white text-white shadow-none';
              if (isAvailable) return 'bg-black border-2 border-white text-white ring-2 ring-white/50';
              return 'bg-neutral-950 border border-neutral-800 text-neutral-400 opacity-60';
            }
            if (theme === 'gray') {
              if (isCompleted) return 'bg-[#1C2C24] border-emerald-800/80 shadow-md text-zinc-100 hover:border-emerald-600';
              if (isAvailable) return 'bg-[#2B2D31] border-zinc-600 shadow-md text-zinc-100 hover:border-blue-400';
              return 'bg-[#1E2024] border-zinc-800/80 opacity-75 text-zinc-400 hover:border-zinc-700';
            }
            if (theme === 'light') {
              if (isCompleted) return 'bg-emerald-50/80 border-emerald-300 shadow-md shadow-emerald-500/10 hover:border-emerald-400 text-slate-800';
              if (isAvailable) return 'bg-white border-blue-300 shadow-md shadow-blue-500/10 hover:border-blue-500 text-slate-800';
              return 'bg-slate-100/70 border-slate-200 opacity-80 hover:border-slate-300 text-slate-600';
            }
            // dark
            if (isCompleted) return 'bg-emerald-950/30 border-emerald-700/60 shadow-md shadow-emerald-950/20 hover:border-emerald-500 text-slate-100';
            if (isAvailable) return 'bg-[#1C202C] border-blue-500/60 shadow-lg shadow-blue-500/10 hover:border-blue-400 text-slate-100';
            return 'bg-slate-900/60 border-slate-800/80 opacity-75 hover:border-slate-700 text-slate-400';
          };

          return (
            <div key={step.id} className="relative flex flex-col">
              {/* Connector Arrow for Desktop (Between Steps 1->2, 2->3, 3->4) */}
              {idx < currentConfig.steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-all duration-300 ${
                      theme === 'bw'
                        ? 'bg-black text-white border-white'
                        : isCompleted
                        ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                        : isLight
                        ? 'bg-white text-slate-400 border-slate-200'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Step Card */}
              <div
                id={`pipeline-step-card-${step.id}`}
                onClick={() => {
                  playTactileClick();
                  if (modState) {
                    onSelectModule(modState);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full cursor-pointer group hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden ${getStepCardThemeClass()}`}
              >
                {/* Top Accent Gradient Bar */}
                <div
                  className={`h-1 w-full absolute top-0 left-0 transition-all duration-300 ${
                    theme === 'bw'
                      ? isCompleted || isAvailable ? 'bg-white' : 'bg-neutral-800'
                      : isCompleted
                      ? 'bg-emerald-400'
                      : isAvailable
                      ? `bg-gradient-to-r ${step.accentColor}`
                      : 'bg-slate-700/40'
                  }`}
                />

                <div>
                  {/* Step Badge & Status */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider font-mono border ${
                        theme === 'bw'
                          ? 'bg-black text-white border-white'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : isAvailable
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      Step {step.stepNumber}
                    </span>

                    {/* Status Pill */}
                    {isCompleted ? (
                      <span className={`flex items-center gap-1 text-[10px] font-bold ${
                        theme === 'bw' ? 'text-white' : 'text-emerald-400'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Done
                      </span>
                    ) : isAvailable ? (
                      <span className={`flex items-center gap-1 text-[10px] font-bold ${
                        theme === 'bw' ? 'text-white' : 'text-blue-400'
                      } animate-pulse`}>
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        Active
                      </span>
                    ) : (
                      <span className={`flex items-center gap-1 text-[10px] font-semibold ${
                        theme === 'bw' ? 'text-neutral-500' : 'text-slate-400'
                      }`}>
                        <Lock className="w-3 h-3" />
                        Locked
                      </span>
                    )}
                  </div>

                  {/* Icon & Code */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        theme === 'bw'
                          ? isCompleted || isAvailable ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-400 border border-neutral-700'
                          : isCompleted
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                          : isAvailable
                          ? `bg-gradient-to-tr ${step.accentColor} text-white shadow-md shadow-blue-500/20`
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <span className={`text-xs font-mono font-black tracking-wide block truncate ${
                        theme === 'bw' ? 'text-white' : 'text-blue-400'
                      }`}>
                        {step.code}
                      </span>
                      <h4 className={`text-xs sm:text-sm font-bold leading-tight line-clamp-1 transition-colors ${
                        theme === 'bw' ? 'text-white' : isLight ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'
                      }`}>
                        {step.shortTitle}
                      </h4>
                    </div>
                  </div>

                  {/* Role Title Subtitle */}
                  <div className={`text-[11px] font-semibold mb-1.5 flex items-center gap-1 truncate ${
                    theme === 'bw' ? 'text-neutral-400' : 'text-indigo-400'
                  }`}>
                    <span>{step.roleTitle}</span>
                  </div>

                  {/* Description */}
                  <p className={`text-[11px] line-clamp-2 leading-relaxed mb-3 ${
                    theme === 'bw' ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {step.description}
                  </p>
                </div>

                {/* Card Action Trigger */}
                <div
                  className={`pt-2.5 border-t flex items-center justify-between text-[11px] font-bold ${
                    theme === 'bw'
                      ? 'border-neutral-800 text-white'
                      : isLight
                      ? 'border-slate-200/80 text-blue-600'
                      : 'border-slate-800 text-cyan-400'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span>Explore Step {step.stepNumber}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Connection Flow Explanation Bar */}
      <div
        className={`mt-4 p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
          theme === 'bw'
            ? 'bg-black border-2 border-white text-white'
            : theme === 'gray'
            ? 'bg-[#1E2124] border-zinc-700 text-zinc-200'
            : isLight
            ? 'bg-blue-100/60 border-blue-200 text-blue-900'
            : 'bg-blue-950/40 border-blue-800/60 text-blue-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <Info className={`w-4 h-4 flex-shrink-0 ${theme === 'bw' ? 'text-white' : 'text-blue-400'}`} />
          <span>
            <strong>Progression Pathway:</strong> {currentConfig.progressionNote}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[11px] px-2 py-0.5 rounded font-mono font-bold ${
            theme === 'bw' ? 'bg-white text-black' : 'bg-blue-500/20'
          }`}>
            {currentConfig.totalXpText}
          </span>
        </div>
      </div>
    </div>
  );
};

export const SequentialPipelineStepper = CloudPipelineStepper;
