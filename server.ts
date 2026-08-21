import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { DOMAINS, LEARNING_MODULES, INITIAL_USER_PROGRESS } from './src/data/learningPaths';
import {
  computeAllModuleStates,
  computeDomainSummaries,
  calculateLevel,
  generateLocalUnlockExplanation
} from './src/utils/engine';
import { UserProgressData } from './src/types';

// In-memory persistent state (seeded with initial progress)
let userProgress: UserProgressData = JSON.parse(JSON.stringify(INITIAL_USER_PROGRESS));

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (err) {
      console.warn('Warning: Failed to initialize GoogleGenAI client:', err);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ================= API ROUTES =================

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      modulesCount: LEARNING_MODULES.length,
      domainsCount: DOMAINS.length,
      timestamp: new Date().toISOString()
    });
  });

  // 2. Fetch Domain Paths & Modules Catalog
  app.get('/api/paths', (req, res) => {
    res.json({
      domains: DOMAINS,
      modules: LEARNING_MODULES,
    });
  });

  // 3. Fetch User Progress and Computed States
  app.get('/api/progress', (req, res) => {
    const computedModules = computeAllModuleStates(
      LEARNING_MODULES,
      userProgress.completedModules
    );
    const domainSummaries = computeDomainSummaries(computedModules);
    const levelInfo = calculateLevel(userProgress.totalXp);

    res.json({
      progress: userProgress,
      domainSummaries,
      allModulesWithState: computedModules,
      level: levelInfo,
    });
  });

  // 4. Mark Module Complete (Core Business Logic Execution)
  app.post('/api/complete', (req, res) => {
    const { moduleId, score, notes } = req.body;

    const module = LEARNING_MODULES.find(m => m.id === moduleId);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Capture previous state to detect newly unlocked modules
    const prevComputedModules = computeAllModuleStates(
      LEARNING_MODULES,
      userProgress.completedModules
    );
    const prevLockedIds = new Set(
      prevComputedModules.filter(m => m.status === 'locked').map(m => m.id)
    );

    // If not already completed, award XP and record task log
    const wasAlreadyCompleted = Boolean(userProgress.completedModules[moduleId]);
    if (!wasAlreadyCompleted) {
      userProgress.completedModules[moduleId] = {
        completedAt: new Date().toISOString(),
        score: score ? Number(score) : 1000,
        notes: notes || `Completed via Microsoft Learn curriculum.`,
      };

      userProgress.totalXp += module.xp;
      userProgress.certificationsEarned += 1;
      userProgress.lastActiveDomain = module.domainId;

      // Add to log
      userProgress.completedTasksLog.unshift({
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        moduleId: module.id,
        moduleCode: module.code,
        moduleTitle: module.title,
        domainId: module.domainId,
        completedAt: new Date().toISOString(),
        xpAwarded: module.xp,
        notes: notes || undefined,
      });
    }

    // Recompute state with updated completions
    const updatedComputedModules = computeAllModuleStates(
      LEARNING_MODULES,
      userProgress.completedModules
    );
    const domainSummaries = computeDomainSummaries(updatedComputedModules);
    const levelInfo = calculateLevel(userProgress.totalXp);

    // Identify newly unlocked modules
    const newlyUnlockedModules = updatedComputedModules.filter(
      m => prevLockedIds.has(m.id) && m.status === 'available'
    );

    res.json({
      success: true,
      message: `Congratulations! ${module.code} marked as complete. +${module.xp} XP awarded!`,
      progress: userProgress,
      domainSummaries,
      allModulesWithState: updatedComputedModules,
      level: levelInfo,
      newlyUnlockedModules,
    });
  });

  // 5. Uncomplete / Revert Module
  app.post('/api/uncomplete', (req, res) => {
    const { moduleId } = req.body;
    const module = LEARNING_MODULES.find(m => m.id === moduleId);

    if (module && userProgress.completedModules[moduleId]) {
      userProgress.totalXp = Math.max(0, userProgress.totalXp - module.xp);
      userProgress.certificationsEarned = Math.max(0, userProgress.certificationsEarned - 1);
      delete userProgress.completedModules[moduleId];
      userProgress.completedTasksLog = userProgress.completedTasksLog.filter(
        t => t.moduleId !== moduleId
      );
    }

    const updatedComputedModules = computeAllModuleStates(
      LEARNING_MODULES,
      userProgress.completedModules
    );
    const domainSummaries = computeDomainSummaries(updatedComputedModules);
    const levelInfo = calculateLevel(userProgress.totalXp);

    res.json({
      success: true,
      progress: userProgress,
      domainSummaries,
      allModulesWithState: updatedComputedModules,
      level: levelInfo,
    });
  });

  // 6. Reset Progress
  app.post('/api/reset', (req, res) => {
    userProgress = JSON.parse(JSON.stringify(INITIAL_USER_PROGRESS));
    const computedModules = computeAllModuleStates(
      LEARNING_MODULES,
      userProgress.completedModules
    );
    const domainSummaries = computeDomainSummaries(computedModules);
    const levelInfo = calculateLevel(userProgress.totalXp);

    res.json({
      success: true,
      message: 'Progress successfully reset.',
      progress: userProgress,
      domainSummaries,
      allModulesWithState: computedModules,
      level: levelInfo,
    });
  });

  // 7. Save Note for Module
  app.post('/api/notes', (req, res) => {
    const { moduleId, note } = req.body;
    if (!moduleId) {
      return res.status(400).json({ error: 'Missing moduleId' });
    }
    userProgress.userNotes[moduleId] = note;
    if (userProgress.completedModules[moduleId]) {
      userProgress.completedModules[moduleId].notes = note;
    }
    res.json({ success: true, notes: userProgress.userNotes });
  });

  // 8. Server-Side AI Integration: Explain Why Newly Unlocked Module is the Logical Next Move
  app.post('/api/explain-unlock', async (req, res) => {
    const { moduleId } = req.body;
    const module = LEARNING_MODULES.find(m => m.id === moduleId);

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Gather completed prerequisites
    const completedPrereqTitles = module.prerequisites
      .map(pid => {
        const prereq = LEARNING_MODULES.find(m => m.id === pid);
        return prereq ? `${prereq.code}: ${prereq.title}` : pid;
      });

    // Fallback explanation generator
    const fallbackText = generateLocalUnlockExplanation(module, completedPrereqTitles);

    const client = getGeminiClient();
    if (!client) {
      return res.json({
        moduleId: module.id,
        moduleTitle: `${module.code} - ${module.title}`,
        explanation: fallbackText,
        isAiGenerated: false,
        keyConcepts: module.skillsMeasured.map(s => s.topic),
        estimatedHours: module.duration,
      });
    }

    try {
      const prompt = `You are a Microsoft Certified Senior Learning Architect and Career Mentor.
The user is progressing through the Microsoft Learn curriculum.
They have unlocked the following target certification/module:
Target Module: ${module.code} (${module.title})
Domain: ${module.domainId}
Level: ${module.level}
Prerequisites already completed: ${completedPrereqTitles.length > 0 ? completedPrereqTitles.join(', ') : 'None (Foundational starting point)'}
Skills Measured: ${module.skillsMeasured.map(s => `${s.topic} (${s.weight})`).join('; ')}

Requirement:
Write a concise, 1-2 sentence encouraging explanation of WHY this newly unlocked step is the logical next move and how it builds directly upon their completed foundations.
Be empowering, clear, professional, and directly focused on practical skills. Do not use generic filler words.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      const explanation = response.text?.trim() || fallbackText;

      return res.json({
        moduleId: module.id,
        moduleTitle: `${module.code} - ${module.title}`,
        explanation,
        isAiGenerated: true,
        keyConcepts: module.skillsMeasured.map(s => s.topic),
        estimatedHours: module.duration,
      });
    } catch (error: any) {
      console.warn('Gemini API call failed, safely utilizing strict fallback response:', error?.message);
      return res.json({
        moduleId: module.id,
        moduleTitle: `${module.code} - ${module.title}`,
        explanation: fallbackText,
        isAiGenerated: false,
        keyConcepts: module.skillsMeasured.map(s => s.topic),
        estimatedHours: module.duration,
      });
    }
  });

  // 9. AI Study Advisor & Quiz Mentor
  app.post('/api/ai-advisor', async (req, res) => {
    const { moduleId, question, mode } = req.body;
    const module = LEARNING_MODULES.find(m => m.id === moduleId);

    const client = getGeminiClient();
    if (!client) {
      return res.json({
        answer: module
          ? `For ${module.code} (${module.title}), focus deeply on: ${module.skillsMeasured.map(s => s.topic).join(', ')}. Review the Microsoft Learn modules and hands-on sandbox labs.`
          : 'Keep advancing through your prerequisites to build practical expertise across Microsoft Cloud, AI, and Security services.',
        isAiGenerated: false
      });
    }

    try {
      let prompt = '';
      if (mode === 'quiz' && module) {
        prompt = `Generate 2 high-yield multiple-choice practice questions for the Microsoft certification ${module.code}: ${module.title}. Include question, 4 choices (A, B, C, D), correct answer, and a 1-sentence explanation why based on Microsoft Learn documentation.`;
      } else if (mode === 'study-plan' && module) {
        prompt = `Create a quick 3-step study sprint strategy for passing ${module.code}: ${module.title} (${module.duration} total estimate), focusing on the highest-weight skills: ${module.skillsMeasured.map(s => `${s.topic} (${s.weight})`).join(', ')}.`;
      } else {
        prompt = `Answer this Microsoft Learn student question clearly in 2-3 concise sentences: "${question || 'How should I best prepare for Microsoft Certifications?'}"`;
      }

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      return res.json({
        answer: response.text?.trim() || 'Keep advancing through Microsoft Learn modules to build mastery.',
        isAiGenerated: true
      });
    } catch (err: any) {
      console.warn('Gemini Advisor fallback:', err?.message);
      return res.json({
        answer: module
          ? `Review key objectives for ${module.code}: ${module.learningObjectives.slice(0, 3).join('. ')}.`
          : 'Continue systematically working through your unlocked learning paths.',
        isAiGenerated: false
      });
    }
  });

  // 10. Dedicated Microbot AI Intelligent Assistant Chat Endpoint
  app.post('/api/microbot-chat', async (req, res) => {
    const { messages, context } = req.body;
    const lastUserMessage = Array.isArray(messages) && messages.length > 0
      ? messages[messages.length - 1].text
      : 'Hello Microbot!';

    const client = getGeminiClient();

    // Context details
    const contextPrompt = context
      ? `User Context:
- Active Domain: ${context.currentTrack || 'Azure Cloud'}
- Completed Modules: ${context.completedCount || 0} / ${context.totalModules || 18}
- Total XP: ${context.totalXp || 0} XP (Rank: ${context.levelTitle || 'Cloud Initiate'})
- Active Goal: ${context.careerGoal ? JSON.stringify(context.careerGoal) : 'General Cloud Advancement'}`
      : '';

    if (!client) {
      // High-IQ offline smart knowledge engine fallback for common queries
      const queryLower = lastUserMessage.toLowerCase();
      let fallbackReply = '';

      if (queryLower.includes('az-104') || queryLower.includes('administrator')) {
        fallbackReply = `**AZ-104: Microsoft Azure Administrator** is the foundational core for all Azure engineers!\n\n- **Core Focus Areas**:\n  1. Manage Azure Identities & Governance (Entra ID, RBAC, Subscriptions)\n  2. Implement & Manage Storage (Blob storage, lifecycle management, Azure Files)\n  3. Deploy & Manage Azure Compute Resources (VMs, App Services, Container Instances, AKS)\n  4. Configure & Manage Virtual Networking (VNet peering, NSGs, Azure Bastion, DNS)\n  5. Monitor & Maintain Azure Resources (Azure Monitor, Log Analytics, Alerts)\n\n💡 **Microbot Pro-Tip**: Practice ARM/Bicep deployments and PowerShell scripts in the Azure Sandbox before taking the exam!`;
      } else if (queryLower.includes('az-305') || queryLower.includes('architect')) {
        fallbackReply = `**AZ-305: Designing Microsoft Azure Infrastructure Solutions** validates enterprise-grade cloud architecture skills.\n\n- **Key Architecture Domains**:\n  - Design identity, governance, and monitoring solutions\n  - Design data storage solutions (Cosmos DB consistency models, SQL vs NoSQL)\n  - Design business continuity & disaster recovery (RTO/RPO, GRS, Site Recovery)\n  - Design infrastructure solutions (Compute sizing, Hub-Spoke VNet topologies)\n\n⭐ **Prerequisite Route**: Complete **AZ-104** first to officially earn the *Azure Solutions Architect Expert* credential badge!`;
      } else if (queryLower.includes('ai-900') || queryLower.includes('ai-102') || queryLower.includes('artificial intelligence') || queryLower.includes('ai')) {
        fallbackReply = `**Microsoft AI Certification Pathways**:\n\n1. **AI-900: Azure AI Fundamentals** — Perfect starting point covering Computer Vision, Natural Language Processing (NLP), Azure OpenAI fundamentals, and Responsible AI principles.\n2. **AI-102: Azure AI Engineer Associate** — Production implementation of Cognitive Services, Azure OpenAI models, semantic search, Custom Vision, and document intelligence pipelines.\n\n🚀 **Next Action**: Try creating an Azure OpenAI resource in the portal and testing prompt completions with temperature & top_p parameters!`;
      } else if (queryLower.includes('sc-900') || queryLower.includes('security') || queryLower.includes('cybersecurity')) {
        fallbackReply = `**Microsoft Security & Zero Trust Architecture**:\n\n- **SC-900 / SC-100 Framework**:\n  1. **Verify Explicitly**: Always authenticate and authorize based on all available data points (Identity, location, device health).\n  2. **Use Least Privilege Access**: Just-In-Time (JIT) and Just-Enough-Access (JEA) with Privileged Identity Management (PIM).\n  3. **Assume Breach**: Segment access, end-to-end encryption, and real-time threat detection with **Microsoft Sentinel** & **Defender for Cloud**.`;
      } else if (queryLower.includes('roadmap') || queryLower.includes('next') || queryLower.includes('start') || queryLower.includes('goal')) {
        fallbackReply = `Here is your optimized **Microsoft Cloud Mastery Roadmap**:\n\n1. **Phase 1: Foundations** → Complete **AZ-900 / SC-900** to solidify cloud governance, SLA calculations, and global infrastructure.\n2. **Phase 2: Associate Core** → Advance through **AZ-104 (Admin)** or **AI-102 (AI Engineer)**.\n3. **Phase 3: Expert Capstone** → Graduate to **AZ-305 (Solutions Architect)** or **AZ-400 (DevOps Engineer)**.\n\n🎯 Click the **"Choose Certification Track"** button at the top to configure your custom study sprint!`;
      } else {
        fallbackReply = `Beep-boop! 🤖 I am **Microbot**, your dedicated Microsoft Cloud & Certification AI Assistant.\n\nI can help you with:\n- **Certification Strategy**: Study roadmaps for AZ-900, AZ-104, AZ-305, AI-102, SC-900, DP-600, etc.\n- **Architecture Patterns**: Hub-and-Spoke networks, Zero Trust identity, Serverless vs Containers, and Cosmos DB partitioning.\n- **Practice Quizzes**: Test your knowledge on any Azure service or exam topic.\n- **Troubleshooting**: Explaining complex cloud services simply and logically.\n\nWhat topic would you like to explore today?`;
      }

      return res.json({
        reply: fallbackReply,
        isAiGenerated: false,
        model: 'microbot-kernel-v1',
      });
    }

    try {
      const systemInstruction = `You are Microbot, a super-fast, warm, friendly, and enthusiastic AI robot assistant for Microsoft Learn and Microsoft Cloud learners!

Your Personality & Tone:
- 🌟 Friendly, supportive, encouraging, and welcoming at all times. Use warm greetings and clear, positive language.
- ⚡ Fast & Prompt: Be concise, clear, and direct without unnecessary fluff, while thoroughly resolving every doubt, question, or confusion the user has.
- 💡 Expert Microsoft Knowledge: Answer questions on Azure (AZ-900, AZ-104, AZ-305, AZ-400), AI (AI-900, AI-102, Azure OpenAI, RAG), Security (SC-900, SC-100, Zero Trust, Entra ID, Sentinel), Data & Analytics (DP-600, Fabric, Cosmos DB, Synapse), and DevOps with crisp examples, bullet points, and actionable tips.
- 🤝 Supportive Mentor: Whenever a user has doubts, acknowledge them warmly, break down complex concepts into digestible points, and provide immediate clarity.

${contextPrompt}`;

      // Build conversation contents
      const conversationHistory = (messages || []).map((m: { role: string; text: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      if (conversationHistory.length === 0) {
        conversationHistory.push({
          role: 'user',
          parts: [{ text: lastUserMessage }],
        });
      }

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: conversationHistory as any,
        config: {
          systemInstruction,
          temperature: 0.5,
          maxOutputTokens: 600,
        },
      });

      const reply = response.text?.trim() || 'Hey there! 😊 I am right here with you! Let me know what question or topic you want to tackle next!';

      return res.json({
        reply,
        isAiGenerated: true,
        model: 'gemini-2.5-flash',
      });
    } catch (error: any) {
      console.warn('Microbot Gemini API error, falling back to local brain:', error?.message);
      return res.json({
        reply: `🤖 **Hey there!** In case you forgot, I am here to help you!\n\nI'm ready to answer any question on Microsoft Cloud, Azure architecture, exams, and study roadmaps. Ask me anything and let's master it together! 🚀`,
        isAiGenerated: false,
        model: 'microbot-fallback-core',
      });
    }
  });

  // ================= VITE / STATIC MIDDLEWARE =================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Microsoft Learn Path Tracker server listening on port ${PORT}`);
  });
}

startServer();
