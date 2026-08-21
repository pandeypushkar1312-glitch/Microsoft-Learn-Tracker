import { DomainTrack, LearningModule } from '../types';

export const DOMAINS: DomainTrack[] = [
  {
    id: 'cloud',
    name: 'Cloud & Infrastructure (Azure)',
    shortName: 'Azure Cloud',
    description: 'Master Azure infrastructure, compute, networking, hybrid architecture, and enterprise solution design.',
    icon: 'Cloud',
    color: 'from-blue-600 to-cyan-500',
    gradient: 'bg-blue-600',
    badge: 'Microsoft Certified: Azure',
    targetRole: 'Azure Solutions Architect / Cloud Engineer',
  },
  {
    id: 'ai-data',
    name: 'Artificial Intelligence & Data',
    shortName: 'AI & Data',
    description: 'Build modern AI solutions with Azure OpenAI, Cognitive Services, Machine Learning, Fabric, and Big Data.',
    icon: 'Brain',
    color: 'from-purple-600 to-indigo-500',
    gradient: 'bg-purple-600',
    badge: 'Microsoft Certified: Azure AI',
    targetRole: 'AI Engineer / Data Scientist / Fabric Specialist',
  },
  {
    id: 'security',
    name: 'Security, Compliance & Identity',
    shortName: 'Security',
    description: 'Safeguard enterprise clouds with Microsoft Defender, Sentinel, Entra ID (Azure AD), and zero-trust policies.',
    icon: 'ShieldCheck',
    color: 'from-emerald-600 to-teal-500',
    gradient: 'bg-emerald-600',
    badge: 'Microsoft Certified: Security',
    targetRole: 'Security Operations Analyst / Cybersec Engineer',
  },
  {
    id: 'devops-app',
    name: 'DevOps, CI/CD & Mobile App Dev',
    shortName: 'DevOps & Mobile',
    description: 'Continuous delivery with GitHub Actions, Azure Pipelines, and cross-platform Android/.NET MAUI app engineering.',
    icon: 'Smartphone',
    color: 'from-amber-600 to-orange-500',
    gradient: 'bg-amber-600',
    badge: 'Microsoft Certified: DevOps',
    targetRole: 'DevOps Engineer / Android & Cloud Developer',
  },
  {
    id: 'power-platform',
    name: 'Power Platform & Business Apps',
    shortName: 'Power Platform',
    description: 'Rapid low-code application development, automated workflows, and enterprise Power BI intelligence.',
    icon: 'Cpu',
    color: 'from-pink-600 to-rose-500',
    gradient: 'bg-pink-600',
    badge: 'Microsoft Certified: Power Platform',
    targetRole: 'Power Platform Developer / Solution Consultant',
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  // ================= CLOUD DOMAIN =================
  {
    id: 'az-900',
    code: 'AZ-900',
    title: 'Microsoft Azure Fundamentals',
    domainId: 'cloud',
    level: 'Beginner',
    xp: 900,
    duration: '8 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    description: 'Foundational knowledge of cloud services, core Azure architectural components, management tools, and governance.',
    prerequisites: [],
    learningObjectives: [
      'Understand cloud computing concepts (IaaS, PaaS, SaaS)',
      'Explore core Azure architectural components (Regions, Availability Zones)',
      'Learn Azure compute, networking, and storage primitives',
      'Understand identity, governance, compliance, and cost management'
    ],
    skillsMeasured: [
      { topic: 'Describe cloud concepts', weight: '25-30%' },
      { topic: 'Describe Azure architecture and services', weight: '35-40%' },
      { topic: 'Describe Azure management and governance', weight: '30-35%' }
    ],
    subModules: [
      {
        id: 'az-900-1',
        order: 1,
        title: 'Describe Cloud Computing Core Concepts',
        description: 'Understand shared responsibility model, IaaS, PaaS, SaaS, and public/private/hybrid cloud definitions.',
        duration: '45m',
        xp: 900,
        tags: ['Cloud Architecture', 'SaaS/PaaS/IaaS', 'Shared Responsibility'],
        tasksTotal: 3,
        tasksCompleted: 2,
        status: 'completed',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/',
        units: [
          'Introduction to Azure cloud concepts',
          'Benefits of cloud computing (High availability, Scalability, Agility)',
          'Cloud service types: IaaS vs PaaS vs SaaS comparison'
        ]
      },
      {
        id: 'az-900-2',
        order: 2,
        title: 'Azure Architecture, Regions & Compute Services',
        description: 'Explore Azure regions, availability zones, resource groups, virtual machines, containers, and serverless compute.',
        duration: '60m',
        xp: 1200,
        tags: ['Regions & AZs', 'Virtual Machines', 'Azure App Service'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-azure-architecture-services/',
        units: [
          'Azure physical infrastructure (Datacenters, Regions, Geographies)',
          'Management groups, subscriptions, and resource groups hierarchy',
          'Compute options: VMs, Containers, AKS, and Azure Functions'
        ]
      },
      {
        id: 'az-900-3',
        order: 3,
        title: 'Azure Storage & Database Fundamentals',
        description: 'Learn Azure Blob Storage, Disk Storage, Files, Azure SQL, Cosmos DB, and data redundancy strategies (LRS, GRS, ZRS).',
        duration: '50m',
        xp: 1100,
        tags: ['Blob Storage', 'Azure Files', 'Cosmos DB'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-storage-services/',
        units: [
          'Azure Storage account types & replication tiers',
          'Database offerings: Cosmos DB, Azure SQL, Azure Database for PostgreSQL',
          'File shares and migration tools (AzCopy, Azure Storage Explorer)'
        ]
      },
      {
        id: 'az-900-4',
        order: 4,
        title: 'Azure Identity, Governance, Pricing & Compliance',
        description: 'Deep dive into Microsoft Entra ID, RBAC role-based access control, Azure Policy, Cost Management, and SLA calculations.',
        duration: '65m',
        xp: 1600,
        tags: ['Microsoft Entra ID', 'Azure RBAC', 'Azure Policy'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-management-governance/',
        units: [
          'Microsoft Entra ID (Authentication, MFA, Conditional Access)',
          'Role-Based Access Control (RBAC) vs Resource Locks',
          'Azure Policy, Blueprints, and Microsoft Purview compliance tools'
        ]
      }
    ],
    iconName: 'Server',
    tag: 'Fundamental',
    recommendedOrder: 1,
    graphPos: { x: 120, y: 180, layer: 1 },
    fallbackExplanation: 'AZ-900 is the indispensable foundational gateway to all things Azure. Completing it gives you the mental model of cloud resources, global datacenters, and pricing structures required for administrative and development tracks.'
  },
  {
    id: 'az-104',
    code: 'AZ-104',
    title: 'Microsoft Azure Administrator',
    domainId: 'cloud',
    level: 'Intermediate',
    xp: 1400,
    duration: '18 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/',
    description: 'Implement, manage, and monitor identity, governance, storage, compute, and virtual networks in cloud environments.',
    prerequisites: ['az-900'],
    learningObjectives: [
      'Manage Azure identities and governance (Entra ID, RBAC, Subscriptions)',
      'Implement and manage storage accounts and Azure Files',
      'Deploy and manage Azure Virtual Machines, Containers, and App Services',
      'Configure and manage virtual networks, load balancers, and VPN gateways',
      'Monitor and maintain Azure resources with Azure Monitor and Log Analytics'
    ],
    skillsMeasured: [
      { topic: 'Manage Azure identities and governance', weight: '20-25%' },
      { topic: 'Implement and manage storage', weight: '15-20%' },
      { topic: 'Deploy and manage compute resources', weight: '20-25%' },
      { topic: 'Configure and manage virtual networking', weight: '15-20%' },
      { topic: 'Monitor and maintain resources', weight: '10-15%' }
    ],
    subModules: [
      {
        id: 'az-104-1',
        order: 1,
        title: 'Manage Identities and Governance in Azure',
        description: 'Configure Microsoft Entra users, groups, administrative units, subscription hierarchy, and RBAC roles.',
        duration: '75m',
        xp: 1400,
        tags: ['Microsoft Entra ID', 'RBAC', 'Governance'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/manage-identities-governance-azure/',
        units: ['Manage users and groups in Entra ID', 'Configure custom RBAC roles', 'Implement Azure Policy & Management Groups']
      },
      {
        id: 'az-104-2',
        order: 2,
        title: 'Implement and Manage Azure Storage',
        description: 'Configure secure storage accounts, Blob access tiers, lifecycle policies, and Azure Files shares.',
        duration: '60m',
        xp: 1300,
        tags: ['Storage Accounts', 'Blob Tiers', 'Azure Files'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/implement-manage-storage-azure/',
        units: ['Storage account security & SAS tokens', 'Blob lifecycle management rules', 'Azure File Sync configuration']
      },
      {
        id: 'az-104-3',
        order: 3,
        title: 'Deploy and Manage Azure Compute Resources',
        description: 'Provision Virtual Machines, VM Scale Sets, App Service plans, and Azure Container Instances (ACI).',
        duration: '90m',
        xp: 1600,
        tags: ['Virtual Machines', 'VM Scale Sets', 'App Service'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/deploy-manage-azure-compute-resources/',
        units: ['VM provisioning and automated extensions', 'Virtual Machine Scale Sets autoscaling', 'App Service deployment slots']
      },
      {
        id: 'az-104-4',
        order: 4,
        title: 'Configure and Manage Virtual Networking',
        description: 'Architect Virtual Networks, subnets, Network Security Groups (NSGs), Azure DNS, and Load Balancers.',
        duration: '80m',
        xp: 1500,
        tags: ['Virtual Networks', 'NSGs', 'Load Balancers'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/configure-manage-virtual-networks-azure/',
        units: ['VNet peering & routing tables', 'Network Security Groups & Application Security Groups', 'Azure Load Balancer & Application Gateway']
      }
    ],
    iconName: 'Settings',
    tag: 'Associate',
    recommendedOrder: 2,
    graphPos: { x: 380, y: 120, layer: 2 },
    fallbackExplanation: 'Having mastered the basic cloud concepts in AZ-900, AZ-104 empowers you to get hands-on with operational management, networking topology, IAM role assignments, and VM fleet provisioning.'
  },
  {
    id: 'az-204',
    code: 'AZ-204',
    title: 'Developing Solutions for Microsoft Azure',
    domainId: 'cloud',
    level: 'Intermediate',
    xp: 1500,
    duration: '20 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/',
    description: 'Design, build, test, and maintain cloud applications, serverless functions, containerized microservices, and message queues.',
    prerequisites: ['az-900'],
    learningObjectives: [
      'Develop Azure compute solutions (App Services, Azure Functions, Containers)',
      'Develop for Azure storage (Cosmos DB, Blob storage tiers)',
      'Implement Azure security (Key Vault, Managed Identities, Microsoft Graph)',
      'Monitor, troubleshoot, and optimize Azure solutions (App Insights, Redis Cache)',
      'Connect to and consume Azure services and third-party services (Event Grid, Service Bus)'
    ],
    skillsMeasured: [
      { topic: 'Develop Azure compute solutions', weight: '25-30%' },
      { topic: 'Develop for Azure storage', weight: '15-20%' },
      { topic: 'Implement Azure security', weight: '15-20%' },
      { topic: 'Monitor and troubleshoot solutions', weight: '10-15%' },
      { topic: 'Connect to and consume Azure services', weight: '20-25%' }
    ],
    subModules: [
      {
        id: 'az-204-1',
        order: 1,
        title: 'Develop Azure Compute & Serverless Solutions',
        description: 'Build Azure App Service web apps, event-driven Azure Functions, and deploy microservices to Azure Container Apps.',
        duration: '80m',
        xp: 1500,
        tags: ['App Services', 'Azure Functions', 'Container Apps'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/create-serverless-logic-with-azure-functions/',
        units: ['Azure App Service container deployment', 'Azure Functions triggers and bindings', 'Azure Container Apps microservices']
      },
      {
        id: 'az-204-2',
        order: 2,
        title: 'Develop for Azure Storage & Cosmos DB SDK',
        description: 'Interact with Cosmos DB SQL API, manage partition keys, and manipulate Blob storage metadata via SDKs.',
        duration: '70m',
        xp: 1400,
        tags: ['Cosmos DB', 'Blob Storage SDK', 'NoSQL'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/work-with-cosmos-db/',
        units: ['Cosmos DB indexing and partitioning', 'Blob client library (.NET / TypeScript)', 'Blob storage lifecycle management']
      },
      {
        id: 'az-204-3',
        order: 3,
        title: 'Implement Azure Security, Secrets & Managed Identities',
        description: 'Secure application secrets in Azure Key Vault, implement Managed Identities, and authenticate via Microsoft Identity.',
        duration: '65m',
        xp: 1300,
        tags: ['Key Vault', 'Managed Identities', 'OAuth2'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/manage-secrets-with-azure-key-vault/',
        units: ['Azure Key Vault secrets and certificates', 'User-assigned and System-assigned Managed Identities', 'Microsoft Authentication Library (MSAL)']
      },
      {
        id: 'az-204-4',
        order: 4,
        title: 'Connect & Consume Event-Driven Azure Services',
        description: 'Implement asynchronous message queues using Azure Service Bus, Event Grid pub/sub, and Azure Event Hubs.',
        duration: '75m',
        xp: 1400,
        tags: ['Event Grid', 'Service Bus', 'Event Hubs'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/choose-a-messaging-model-in-azure-to-connect-your-services/',
        units: ['Azure Service Bus queues and topics', 'Azure Event Grid event routing', 'API Management policies and rate limiting']
      }
    ],
    iconName: 'Code',
    tag: 'Associate',
    recommendedOrder: 3,
    graphPos: { x: 380, y: 260, layer: 2 },
    fallbackExplanation: 'AZ-204 bridges the gap between infrastructure and software engineering, showing you how to write code against Azure SDKs, utilize event queues, and implement token-based OAuth authorization.'
  },
  {
    id: 'az-305',
    code: 'AZ-305',
    title: 'Designing Microsoft Azure Infrastructure Solutions',
    domainId: 'cloud',
    level: 'Expert',
    xp: 2200,
    duration: '24 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/',
    description: 'Architect secure, scalable, highly available enterprise solutions across multi-region deployments, disaster recovery, and data estate.',
    prerequisites: ['az-104', 'az-204'],
    learningObjectives: [
      'Design identity, governance, and monitoring solutions',
      'Design data storage solutions (relational, non-relational, data lakes)',
      'Design business continuity solutions (DR, high availability, backup policies)',
      'Design infrastructure solutions (compute, network sizing, cost optimization)'
    ],
    skillsMeasured: [
      { topic: 'Design identity, governance, and monitoring', weight: '25-30%' },
      { topic: 'Design data storage solutions', weight: '20-25%' },
      { topic: 'Design business continuity solutions', weight: '15-20%' },
      { topic: 'Design infrastructure solutions', weight: '30-35%' }
    ],
    subModules: [
      {
        id: 'az-305-1',
        order: 1,
        title: 'Design Identity, Governance & Monitoring Solutions',
        description: 'Architect multi-tenant identity with Microsoft Entra ID, Azure Lighthouse, and enterprise-grade Azure Monitor Log Analytics workspaces.',
        duration: '90m',
        xp: 1800,
        tags: ['Entra ID Architecture', 'Azure Lighthouse', 'Log Analytics'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/design-identity-governance-monitoring-solutions/',
        units: ['Design identity hierarchies & Conditional Access', 'Design governance with Azure Policy & Management Groups', 'Architect unified monitoring and alerting pipelines']
      },
      {
        id: 'az-305-2',
        order: 2,
        title: 'Design Data Storage & Relational/Non-Relational Solutions',
        description: 'Design highly available database topologies using Azure SQL Managed Instances, globally replicated Cosmos DB, and Azure Data Lakes.',
        duration: '85m',
        xp: 1700,
        tags: ['Azure SQL Hyperscale', 'Cosmos DB Multi-Region', 'Data Lake'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/design-data-storage-solutions/',
        units: ['Evaluate relational vs non-relational storage patterns', 'Design Cosmos DB multi-master write replication', 'Design data archiving and lifecycle tiers']
      },
      {
        id: 'az-305-3',
        order: 3,
        title: 'Design Business Continuity, HA & Disaster Recovery',
        description: 'Formulate zero-data-loss RPO/RTO strategies with Azure Site Recovery, geo-redundant storage, and multi-region failovers.',
        duration: '75m',
        xp: 1600,
        tags: ['Site Recovery', 'Disaster Recovery', 'RPO / RTO'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/design-business-continuity-solutions/',
        units: ['Design automated backup policies with Recovery Services Vaults', 'Design cross-region disaster recovery for VMs and App Services', 'Architect traffic manager & Front Door global load balancing']
      },
      {
        id: 'az-305-4',
        order: 4,
        title: 'Design Infrastructure & Enterprise Landing Zones',
        description: 'Establish enterprise cloud architecture using Azure Landing Zones, Virtual WAN, ExpressRoute, and AKS container orchestration.',
        duration: '95m',
        xp: 1900,
        tags: ['Enterprise Landing Zones', 'Azure Virtual WAN', 'AKS Architecture'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/design-infrastructure-solutions/',
        units: ['Design Azure Landing Zone network architecture', 'Design hybrid connectivity with ExpressRoute and VPN Gateways', 'Design scalable containerized compute on Azure Kubernetes Service (AKS)']
      }
    ],
    iconName: 'Layers',
    tag: 'Expert',
    recommendedOrder: 4,
    graphPos: { x: 680, y: 190, layer: 3 },
    fallbackExplanation: 'As an expert-level capstone, AZ-305 synthesizes the operational depth of AZ-104 with the development insights of AZ-204 to design resilient, multi-region cloud systems capable of handling enterprise workloads.'
  },

  // ================= AI & DATA DOMAIN =================
  {
    id: 'ai-900',
    code: 'AI-900',
    title: 'Microsoft Azure AI Fundamentals',
    domainId: 'ai-data',
    level: 'Beginner',
    xp: 900,
    duration: '6 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
    description: 'Fundamental principles of machine learning, natural language processing, computer vision, and responsible generative AI.',
    prerequisites: [],
    learningObjectives: [
      'Describe Artificial Intelligence workloads and considerations',
      'Describe fundamental principles of machine learning on Azure',
      'Describe features of computer vision workloads on Azure',
      'Describe features of Natural Language Processing (NLP) workloads',
      'Describe features of generative AI workloads on Azure'
    ],
    skillsMeasured: [
      { topic: 'Describe AI workloads and considerations', weight: '15-20%' },
      { topic: 'Describe fundamental principles of ML on Azure', weight: '20-25%' },
      { topic: 'Describe computer vision workloads', weight: '15-20%' },
      { topic: 'Describe NLP workloads', weight: '15-20%' },
      { topic: 'Describe generative AI workloads', weight: '20-25%' }
    ],
    subModules: [
      {
        id: 'ai-900-1',
        order: 1,
        title: 'Describe Artificial Intelligence Workloads & Considerations',
        description: 'Understand core AI concepts, prediction models, and the 6 guiding principles of Responsible AI (Fairness, Reliability, Privacy, Inclusiveness, Transparency, Accountability).',
        duration: '45m',
        xp: 900,
        tags: ['Responsible AI', 'AI Ethics', 'Workload Types'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/',
        units: [
          'Understand fundamental AI workloads and real-world applications',
          'Explore the 6 principles of Microsoft Responsible AI standard',
          'Identify ethical considerations, bias detection, and transparency metrics'
        ]
      },
      {
        id: 'ai-900-2',
        order: 2,
        title: 'Fundamental Principles of Machine Learning on Azure',
        description: 'Explore regression, classification, clustering algorithms, and train models visually using Automated Machine Learning (AutoML) in Azure Machine Learning Studio.',
        duration: '60m',
        xp: 1200,
        tags: ['Automated ML', 'Regression & Classification', 'Azure ML Studio'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/use-automated-machine-learning/',
        units: [
          'Understand supervised vs unsupervised machine learning algorithms',
          'Explore Azure Machine Learning Studio workspaces and compute clusters',
          'Train, evaluate, and test models with no-code Automated ML'
        ]
      },
      {
        id: 'ai-900-3',
        order: 3,
        title: 'Features of Computer Vision and NLP Workloads on Azure',
        description: 'Discover image classification, object detection, OCR with Azure AI Vision, Document Intelligence, speech recognition, and sentiment analysis with Azure AI Language.',
        duration: '55m',
        xp: 1100,
        tags: ['Azure AI Vision', 'Azure AI Language', 'OCR & Document Intelligence'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/explore-computer-vision-microsoft-azure/',
        units: [
          'Image analysis, facial detection, and Optical Character Recognition (OCR)',
          'Natural Language Processing: sentiment analysis, entity extraction, and translation',
          'Azure AI Speech: speech-to-text, text-to-speech, and custom neural voice'
        ]
      },
      {
        id: 'ai-900-4',
        order: 4,
        title: 'Features of Generative AI Workloads on Azure',
        description: 'Master Large Language Models (LLMs), Azure OpenAI Service capabilities, GPT-4 prompt engineering, DALL-E image generation, and content safety filters.',
        duration: '65m',
        xp: 1400,
        tags: ['Azure OpenAI', 'GPT-4 & DALL-E', 'Prompt Engineering'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/explore-generative-ai/',
        units: [
          'Understand generative AI architecture, transformers, and tokenization',
          'Explore Azure OpenAI model deployments (GPT-4o, DALL-E 3, Embeddings)',
          'Implement effective system prompts and Azure AI Content Safety guardrails'
        ]
      }
    ],
    iconName: 'Sparkles',
    tag: 'Fundamental',
    recommendedOrder: 1,
    graphPos: { x: 120, y: 120, layer: 1 },
    fallbackExplanation: 'AI-900 provides an accessible, jargon-free overview of modern machine learning, Azure OpenAI services, and responsible AI safety practices.'
  },
  {
    id: 'dp-900',
    code: 'DP-900',
    title: 'Microsoft Azure Data Fundamentals',
    domainId: 'ai-data',
    level: 'Beginner',
    xp: 900,
    duration: '6 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/',
    description: 'Foundational concepts of relational data, non-relational storage, data warehouses, real-time analytics, and data governance.',
    prerequisites: [],
    learningObjectives: [
      'Describe core data concepts (tabular, document, graph, streaming)',
      'Identify relational data offerings on Azure (Azure SQL Database, PostgreSQL)',
      'Identify non-relational data offerings (Azure Cosmos DB, Blob Storage)',
      'Describe an analytics workload on Azure (Synapse, Databricks, Fabric, Power BI)'
    ],
    skillsMeasured: [
      { topic: 'Describe core data concepts', weight: '25-30%' },
      { topic: 'Identify relational data offerings', weight: '20-25%' },
      { topic: 'Identify non-relational data offerings', weight: '15-20%' },
      { topic: 'Describe an analytics workload', weight: '25-30%' }
    ],
    subModules: [
      {
        id: 'dp-900-1',
        order: 1,
        title: 'Explore Core Data Concepts and Storage Architecture',
        description: 'Understand structured, semi-structured, and unstructured data formats, ACID transaction guarantees, OLTP transactional vs OLAP analytical workloads.',
        duration: '45m',
        xp: 900,
        tags: ['Data Formats', 'OLTP vs OLAP', 'ACID Transactions'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/explore-core-data-concepts/',
        units: [
          'Types of core data: tabular, key-value, document, and graph structures',
          'Differences between transactional OLTP and analytical OLAP processing',
          'Data processing paradigms: batch processing vs streaming data telemetry'
        ]
      },
      {
        id: 'dp-900-2',
        order: 2,
        title: 'Explore Relational Data Offerings in Azure',
        description: 'Learn provisioning, indexing, and querying relational database services including Azure SQL Database, Azure SQL Managed Instance, and Azure Database for PostgreSQL.',
        duration: '60m',
        xp: 1200,
        tags: ['Azure SQL', 'PostgreSQL', 'Relational Schemas'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/explore-relational-data-offerings/',
        units: [
          'Azure SQL family: SQL Database, Managed Instance, and SQL on Azure VMs',
          'Open-source PaaS databases: PostgreSQL and MySQL flexible servers',
          'Basic SQL querying, normalization, indexing, and security firewall rules'
        ]
      },
      {
        id: 'dp-900-3',
        order: 3,
        title: 'Explore Non-Relational Data Offerings in Azure',
        description: 'Explore globally distributed NoSQL databases with Azure Cosmos DB multi-model APIs, Azure Blob Storage containers, Azure Data Lake Storage Gen2, and File shares.',
        duration: '50m',
        xp: 1100,
        tags: ['Azure Cosmos DB', 'Blob Storage', 'Data Lake Gen2'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/explore-non-relational-data-offerings-azure/',
        units: [
          'Azure Cosmos DB multi-model APIs (NoSQL, MongoDB, Cassandra, Gremlin, Table)',
          'Azure Blob Storage access tiers (Hot, Cool, Cold, Archive) and lifecycle management',
          'Azure Data Lake Storage Gen2 hierarchical namespace and POSIX ACL permissions'
        ]
      },
      {
        id: 'dp-900-4',
        order: 4,
        title: 'Explore Large-Scale Data Analytics and Lakehouses',
        description: 'Master data warehousing with Azure Synapse Analytics, unified lakehouses in Microsoft Fabric, Apache Spark on Azure Databricks, and interactive Power BI reports.',
        duration: '65m',
        xp: 1400,
        tags: ['Microsoft Fabric', 'Synapse Analytics', 'Power BI'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/explore-data-warehouse-analytics-azure/',
        units: [
          'Data warehouse architecture: ETL/ELT pipelines with Azure Data Factory',
          'Unified enterprise lakehouses and OneLake in Microsoft Fabric',
          'Interactive dashboards and visual data modeling with Power BI'
        ]
      }
    ],
    iconName: 'Database',
    tag: 'Fundamental',
    recommendedOrder: 2,
    graphPos: { x: 120, y: 260, layer: 1 },
    fallbackExplanation: 'All AI models depend on well-structured data. DP-900 unlocks the fundamental understanding of SQL, NoSQL, data lakes, and ETL processing.'
  },
  {
    id: 'ai-102',
    code: 'AI-102',
    title: 'Designing and Implementing a Microsoft Azure AI Solution',
    domainId: 'ai-data',
    level: 'Intermediate',
    xp: 1600,
    duration: '22 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/',
    description: 'Build enterprise AI applications using Azure OpenAI, prompt engineering, Document Intelligence, Speech, and custom vision models.',
    prerequisites: ['ai-900'],
    learningObjectives: [
      'Plan and manage Azure AI services (pricing tiers, quotas, security keys)',
      'Implement content moderation and responsible AI safety filters',
      'Implement Computer Vision, Document Intelligence, and Face recognition',
      'Implement Natural Language Processing and Question Answering solutions',
      'Implement Generative AI solutions with Azure OpenAI and prompt flow'
    ],
    skillsMeasured: [
      { topic: 'Plan and manage Azure AI services', weight: '15-20%' },
      { topic: 'Implement Computer Vision solutions', weight: '20-25%' },
      { topic: 'Implement Natural Language Processing solutions', weight: '20-25%' },
      { topic: 'Implement Knowledge Mining and Document Intelligence', weight: '15-20%' },
      { topic: 'Implement Generative AI solutions', weight: '20-25%' }
    ],
    subModules: [
      {
        id: 'ai-102-1',
        order: 1,
        title: 'Plan, Secure, and Deploy Azure AI Services',
        description: 'Provision multi-service Azure AI resources, configure Managed Identities, store API keys in Azure Key Vault, implement virtual network private endpoints, and monitor diagnostic logs.',
        duration: '75m',
        xp: 1500,
        tags: ['Azure AI Services', 'Key Vault Security', 'Private Endpoints'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/prepare-to-develop-ai-solutions/',
        units: [
          'Provision unified Azure AI multi-service accounts and manage resource quotas',
          'Authenticate applications securely with Microsoft Entra ID and Managed Identities',
          'Implement Azure Key Vault secret management and Virtual Network service endpoints'
        ]
      },
      {
        id: 'ai-102-2',
        order: 2,
        title: 'Develop Computer Vision & Document Intelligence Solutions',
        description: 'Build automated OCR extraction pipelines with Azure AI Document Intelligence, train Custom Vision image classifiers, detect objects, and analyze video frames.',
        duration: '85m',
        xp: 1600,
        tags: ['Document Intelligence', 'Custom Vision', 'OCR Extraction'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/extract-data-documents-azure-document-intelligence/',
        units: [
          'Prebuilt and custom document models with Azure AI Document Intelligence SDK',
          'Train, evaluate, and publish Custom Vision image classification models',
          'Object detection, spatial analysis, and video indexing with Azure AI Vision'
        ]
      },
      {
        id: 'ai-102-3',
        order: 3,
        title: 'Develop Natural Language Processing and Speech Solutions',
        description: 'Implement conversational AI with Conversational Language Understanding (CLU), Custom Question Answering, sentiment analysis, speech translation, and neural voice synthesis.',
        duration: '75m',
        xp: 1500,
        tags: ['Azure AI Language', 'Conversational AI', 'Speech SDK'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/build-language-understanding-model/',
        units: [
          'Build intent and entity extraction with Conversational Language Understanding (CLU)',
          'Create multi-turn knowledge bases with Custom Question Answering',
          'Synthesize audio and transcribe streams with Azure AI Speech SDK (.NET / Python / JS)'
        ]
      },
      {
        id: 'ai-102-4',
        order: 4,
        title: 'Develop Generative AI, RAG & Azure OpenAI Solutions',
        description: 'Deploy GPT-4o models with Azure OpenAI SDK, build Retrieval-Augmented Generation (RAG) with Azure AI Search vector indexing, and orchestrate evaluation pipelines in Prompt Flow.',
        duration: '90m',
        xp: 1800,
        tags: ['Azure OpenAI SDK', 'RAG & Vector Search', 'Prompt Flow'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/get-started-azure-openai/',
        units: [
          'Deploy Azure OpenAI completions, chat completions, and embedding models via SDK',
          'Implement enterprise RAG with Azure AI Search hybrid vector retrieval',
          'Orchestrate LLM pipelines, prompt evaluation, and guardrails using Azure AI Studio Prompt Flow'
        ]
      }
    ],
    iconName: 'Bot',
    tag: 'Associate',
    recommendedOrder: 3,
    graphPos: { x: 420, y: 120, layer: 2 },
    fallbackExplanation: 'Building directly upon AI-900, AI-102 takes you straight into production code: connecting to Azure OpenAI LLMs, configuring RAG with Azure AI Search, and orchestrating multimodal agents.'
  },
  {
    id: 'dp-100',
    code: 'DP-100',
    title: 'Designing and Implementing a Data Science Solution on Azure',
    domainId: 'ai-data',
    level: 'Intermediate',
    xp: 1700,
    duration: '24 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/',
    description: 'Train, evaluate, tune, and deploy machine learning models using Azure Machine Learning workspaces, MLflow, and AutoML.',
    prerequisites: ['ai-900', 'dp-900'],
    learningObjectives: [
      'Design and prepare a machine learning solution',
      'Explore data and train models using Azure Machine Learning SDK v2',
      'Prepare a model for deployment with managed online endpoints',
      'Retrain and monitor models using MLflow and automated pipelines'
    ],
    skillsMeasured: [
      { topic: 'Design and prepare a machine learning solution', weight: '20-25%' },
      { topic: 'Explore data and train models', weight: '35-40%' },
      { topic: 'Prepare a model for deployment', weight: '20-25%' },
      { topic: 'Track and monitor models', weight: '15-20%' }
    ],
    subModules: [
      {
        id: 'dp-100-1',
        order: 1,
        title: 'Design and Prepare Machine Learning Workspaces',
        description: 'Set up Azure Machine Learning workspaces, configure compute targets (Compute Instances & GPU clusters), connect datastores, and register versioned data assets.',
        duration: '75m',
        xp: 1500,
        tags: ['Azure ML Workspaces', 'GPU Compute Clusters', 'Data Assets'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/create-workspace-resources-azure-machine-learning/',
        units: [
          'Provision Azure ML workspaces, secure network perimeters, and RBAC roles',
          'Create and manage serverless compute, compute instances, and cluster auto-scaling',
          'Connect datastores (Blob, Data Lake) and create versioned ML data assets'
        ]
      },
      {
        id: 'dp-100-2',
        order: 2,
        title: 'Train and Experiment with Machine Learning Models',
        description: 'Run distributed training jobs with Python SDK v2, optimize hyperparameters with sweep jobs, run Automated ML pipelines, and log metrics in MLflow.',
        duration: '85m',
        xp: 1700,
        tags: ['Azure ML SDK v2', 'Hyperparameter Tuning', 'MLflow Tracking'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/train-models-with-python-sdk-azure-machine-learning/',
        units: [
          'Submit training jobs with Python SDK v2 command and environment definitions',
          'Track experiments, model artifacts, and parameters with MLflow integration',
          'Optimize model hyperparameters using Grid/Random/Bayesian sweep jobs'
        ]
      },
      {
        id: 'dp-100-3',
        order: 3,
        title: 'Optimize, Package, and Register Production Models',
        description: 'Register model artifacts in the Azure ML Model Registry, evaluate models using Responsible AI dashboards, assess fairness, and convert to ONNX runtime.',
        duration: '70m',
        xp: 1500,
        tags: ['Model Registry', 'Responsible AI Dashboard', 'ONNX Runtime'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/track-models-with-mlflow-azure-machine-learning/',
        units: [
          'Register and version model artifacts in Azure ML central registry',
          'Generate Responsible AI insights: model explainability, feature attribution, and error analysis',
          'Package models and optimize inference latency with ONNX format'
        ]
      },
      {
        id: 'dp-100-4',
        order: 4,
        title: 'Deploy and Monitor Real-Time and Batch Endpoints',
        description: 'Deploy models to Managed Online Endpoints with traffic-splitting blue/green rollouts, configure Batch Endpoints, and monitor data drift and telemetry.',
        duration: '80m',
        xp: 1700,
        tags: ['Managed Online Endpoints', 'Blue/Green Rollouts', 'Data Drift Detection'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/deploy-model-managed-online-endpoint/',
        units: [
          'Deploy real-time inference models to Managed Online Endpoints with autoscaling',
          'Implement blue/green canary deployments and safe traffic shifting',
          'Configure Batch Endpoints for asynchronous scoring and monitor data drift'
        ]
      }
    ],
    iconName: 'LineChart',
    tag: 'Associate',
    recommendedOrder: 4,
    graphPos: { x: 420, y: 260, layer: 2 },
    fallbackExplanation: 'With knowledge from AI-900 and DP-900, DP-100 lets you master end-to-end MLOps—from training PyTorch/Scikit-learn algorithms on GPU compute clusters to production deployment.'
  },
  {
    id: 'dp-600',
    code: 'DP-600',
    title: 'Implementing Analytics Solutions Using Microsoft Fabric',
    domainId: 'ai-data',
    level: 'Advanced',
    xp: 1900,
    duration: '20 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/',
    description: 'Build unified lakehouse and warehouse analytics using Microsoft Fabric, OneLake, Delta tables, Direct Lake Power BI, and dbt.',
    prerequisites: ['dp-900'],
    learningObjectives: [
      'Plan, implement, and manage an analytics environment in Microsoft Fabric',
      'Implement and manage data models and semantic models',
      'Explore and analyze data using Lakehouse notebooks and T-SQL',
      'Optimize DAX calculations and Direct Lake query performance'
    ],
    skillsMeasured: [
      { topic: 'Plan and manage analytics environment', weight: '10-15%' },
      { topic: 'Implement and manage data models', weight: '45-50%' },
      { topic: 'Explore and analyze data', weight: '40-45%' }
    ],
    subModules: [
      {
        id: 'dp-600-1',
        order: 1,
        title: 'Plan, Implement, and Administer Microsoft Fabric',
        description: 'Configure Microsoft Fabric capacities, workspaces, OneLake shortcuts to ADLS/AWS S3, workspace security roles, and data governance with Microsoft Purview.',
        duration: '75m',
        xp: 1700,
        tags: ['Microsoft Fabric Admin', 'OneLake Shortcuts', 'Fabric Capacity'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/get-started-fabric/',
        units: [
          'Provision and manage Fabric capacities, licensing, and workspace administration',
          'Create OneLake shortcuts to Azure Data Lake Gen2, Amazon S3, and Dataverse',
          'Configure workspace security roles, item permissions, and Purview information protection'
        ]
      },
      {
        id: 'dp-600-2',
        order: 2,
        title: 'Ingest and Transform Data with Lakehouses and Warehouses',
        description: 'Build Medallion architecture (Bronze/Silver/Gold) using Fabric Lakehouse Delta Parquet tables, Data Factory pipelines, Dataflows Gen2, and PySpark notebooks.',
        duration: '90m',
        xp: 1900,
        tags: ['Fabric Lakehouse', 'Delta Parquet Tables', 'PySpark Notebooks'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/use-apache-spark-work-files-lakehouse/',
        units: [
          'Ingest batch data with Data Factory copy activities and Dataflows Gen2',
          'Transform data with Apache Spark notebooks (PySpark / Spark SQL) into Delta tables',
          'Implement Medallion architecture, schema enforcement, and V-Order table optimization'
        ]
      },
      {
        id: 'dp-600-3',
        order: 3,
        title: 'Implement and Optimize Semantic Models with Direct Lake',
        description: 'Design star schemas, build enterprise semantic models in Power BI with Direct Lake mode, write advanced DAX measures, and optimize query memory performance.',
        duration: '85m',
        xp: 1800,
        tags: ['Direct Lake Mode', 'Advanced DAX', 'Semantic Models'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/design-power-bi-models-fabric/',
        units: [
          'Design dimensional star schemas with Fact and Dimension tables',
          'Configure Direct Lake storage mode for zero-copy high-speed reporting',
          'Author calculation groups, semi-additive DAX measures, and optimize memory paging'
        ]
      },
      {
        id: 'dp-600-4',
        order: 4,
        title: 'Analyze, Visualize, and Deploy Fabric Solutions with Git',
        description: 'Query data using Synapse Data Warehouse T-SQL endpoints, build interactive Power BI dashboard reports, manage deployment pipelines, and sync with Git repositories.',
        duration: '80m',
        xp: 1800,
        tags: ['Fabric T-SQL Endpoint', 'Git ALM Integration', 'Deployment Pipelines'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/manage-fabric-lifecycle/',
        units: [
          'Query data across tables using Synapse Data Warehouse T-SQL endpoint and Cross-DB queries',
          'Build responsive, accessible Power BI reports with visual drillthrough and tooltips',
          'Implement Fabric Application Lifecycle Management (ALM) with Git integration and deployment pipelines'
        ]
      }
    ],
    iconName: 'Share2',
    tag: 'Associate',
    recommendedOrder: 5,
    graphPos: { x: 720, y: 200, layer: 3 },
    fallbackExplanation: 'DP-600 is Microsoft’s premier certification for modern lakehouse architecture, allowing you to unify relational and streaming datasets with Fabric OneLake.'
  },

  // ================= SECURITY DOMAIN =================
  {
    id: 'sc-900',
    code: 'SC-900',
    title: 'Microsoft Security, Compliance, and Identity Fundamentals',
    domainId: 'security',
    level: 'Beginner',
    xp: 900,
    duration: '6 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/',
    description: 'Fundamental principles of Zero Trust security, Microsoft Entra ID authentication, threat protection, and compliance management.',
    prerequisites: [],
    learningObjectives: [
      'Describe security and compliance concepts (Zero Trust, Shared Responsibility)',
      'Describe identity concepts and access management capabilities in Entra ID',
      'Describe security solutions of Microsoft Defender and Sentinel',
      'Describe Microsoft Priva and Microsoft Purview compliance capabilities'
    ],
    skillsMeasured: [
      { topic: 'Describe security and compliance concepts', weight: '10-15%' },
      { topic: 'Describe Microsoft Entra capabilities', weight: '25-30%' },
      { topic: 'Describe Microsoft Security solutions', weight: '35-40%' },
      { topic: 'Describe Microsoft compliance solutions', weight: '20-25%' }
    ],
    subModules: [
      {
        id: 'sc-900-1',
        order: 1,
        title: 'Understand Fundamental Security and Compliance Concepts',
        description: 'Learn Zero Trust architecture pillars (Verify explicitly, Use least privileged access, Assume breach), CIA triad (Confidentiality, Integrity, Availability), and Shared Responsibility.',
        duration: '45m',
        xp: 900,
        tags: ['Zero Trust', 'Shared Responsibility', 'CIA Triad'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-basic-concepts-of-security-compliance-and-identity/',
        units: [
          'Understand Zero Trust core methodology and defense-in-depth principles',
          'Shared Responsibility Model between Cloud Provider and Enterprise',
          'Common cyber threat taxonomy, social engineering, and attack surfaces'
        ]
      },
      {
        id: 'sc-900-2',
        order: 2,
        title: 'Understand Microsoft Entra Identity & Access Capabilities',
        description: 'Explore Microsoft Entra ID directory services, multi-factor authentication (MFA), passwordless passkeys, Conditional Access policies, and Entra Identity Protection.',
        duration: '60m',
        xp: 1200,
        tags: ['Microsoft Entra ID', 'Conditional Access', 'MFA & Passkeys'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-basic-identity-services-and-identity-types-of-azure-ad/',
        units: [
          'Microsoft Entra identity types: user accounts, workload identities, and guest access',
          'Authentication methods: Multi-Factor Authentication, FIDO2, and Windows Hello',
          'Conditional Access engine and Microsoft Entra Identity Governance'
        ]
      },
      {
        id: 'sc-900-3',
        order: 3,
        title: 'Understand Microsoft Security & Threat Protection Solutions',
        description: 'Discover Microsoft Defender XDR (Endpoints, Identity, Cloud Apps, Office 365), Microsoft Defender for Cloud posture management, and Microsoft Sentinel SIEM/SOAR.',
        duration: '60m',
        xp: 1200,
        tags: ['Microsoft Defender XDR', 'Microsoft Sentinel', 'Cloud Security Posture'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-threat-protection-with-microsoft-365-defender/',
        units: [
          'Microsoft Defender XDR unified enterprise threat protection across domains',
          'Microsoft Defender for Cloud: Cloud Security Posture Management (CSPM)',
          'Microsoft Sentinel: cloud-native Security Information and Event Management (SIEM)'
        ]
      },
      {
        id: 'sc-900-4',
        order: 4,
        title: 'Understand Microsoft Compliance & Privacy Solutions',
        description: 'Learn data security and regulatory compliance with Microsoft Purview, Data Loss Prevention (DLP), Sensitivity labels, Information Protection, and Compliance Manager.',
        duration: '50m',
        xp: 1100,
        tags: ['Microsoft Purview', 'Data Loss Prevention', 'Compliance Manager'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-microsoft-purview-compliance-management-capabilities/',
        units: [
          'Microsoft Purview data classification, sensitivity labels, and retention policies',
          'Data Loss Prevention (DLP) across endpoints, email, and SharePoint',
          'Microsoft Purview Compliance Manager score and regulatory audit assessment'
        ]
      }
    ],
    iconName: 'Shield',
    tag: 'Fundamental',
    recommendedOrder: 1,
    graphPos: { x: 120, y: 180, layer: 1 },
    fallbackExplanation: 'SC-900 introduces Zero-Trust principles, Conditional Access, and threat mitigation models that are mandatory before configuring advanced SIEM and IAM rules.'
  },
  {
    id: 'sc-200',
    code: 'SC-200',
    title: 'Microsoft Security Operations Analyst',
    domainId: 'security',
    level: 'Intermediate',
    xp: 1500,
    duration: '18 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/',
    description: 'Mitigate threats using Microsoft Defender for Endpoint, Defender for Cloud, Microsoft Sentinel SIEM/SOAR, and Kusto Query Language (KQL).',
    prerequisites: ['sc-900'],
    learningObjectives: [
      'Mitigate threats using Microsoft Defender for Endpoint and Identity',
      'Mitigate threats using Microsoft Defender for Cloud and Servers',
      'Mitigate threats using Microsoft Sentinel (Data connectors, Analytics rules, Playbooks)',
      'Perform threat hunting using KQL (Kusto Query Language)'
    ],
    skillsMeasured: [
      { topic: 'Mitigate threats using Microsoft Defender for Endpoint', weight: '20-25%' },
      { topic: 'Mitigate threats using Microsoft Defender for Cloud', weight: '15-20%' },
      { topic: 'Mitigate threats using Microsoft Sentinel', weight: '25-30%' },
      { topic: 'Perform threat hunting with KQL', weight: '15-20%' }
    ],
    subModules: [
      {
        id: 'sc-200-1',
        order: 1,
        title: 'Mitigate Threats Using Microsoft Defender for Endpoint',
        description: 'Onboard Windows/Linux/macOS endpoints, configure Automated Investigation and Remediation (AIR), manage device groups, and respond with Live Response commands.',
        duration: '75m',
        xp: 1400,
        tags: ['Defender for Endpoint', 'Live Response', 'Endpoint Detection & Response'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/mitigate-threats-using-microsoft-defender-for-endpoint/',
        units: [
          'Onboard enterprise endpoints and configure tamper protection policies',
          'Investigate device timelines, behavioral alerts, and file quarantine actions',
          'Execute Live Response diagnostic shells and remediation scripts'
        ]
      },
      {
        id: 'sc-200-2',
        order: 2,
        title: 'Mitigate Threats Using Defender for Cloud & Identity',
        description: 'Remediate security posture recommendations in Defender for Cloud, protect multi-cloud VMs/containers, and detect compromised identities with Defender for Identity.',
        duration: '70m',
        xp: 1400,
        tags: ['Defender for Cloud', 'Defender for Identity', 'CSPM & CWPP'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/mitigate-threats-using-microsoft-defender-for-cloud/',
        units: [
          'Configure Microsoft Defender for Cloud security plans and Secure Score remediation',
          'Deploy Defender for Servers vulnerability assessments (Qualys / TVM)',
          'Detect credential theft and lateral movement with Microsoft Defender for Identity'
        ]
      },
      {
        id: 'sc-200-3',
        order: 3,
        title: 'Configure and Ingest Data into Microsoft Sentinel',
        description: 'Connect cloud and on-premise log sources with Sentinel Data Connectors, Syslog/CEF forwarders, Windows Event collection, and design Log Analytics tables.',
        duration: '80m',
        xp: 1500,
        tags: ['Microsoft Sentinel', 'Data Connectors', 'Log Analytics Workspace'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/configure-microsoft-sentinel-environment/',
        units: [
          'Provision Microsoft Sentinel workspace and design log retention tiers',
          'Deploy native Microsoft 365, Azure, AWS, and Syslog/CEF data connectors',
          'Manage Microsoft Sentinel content hub solutions and watchlist data'
        ]
      },
      {
        id: 'sc-200-4',
        order: 4,
        title: 'Perform Threat Hunting and Automation with Sentinel & KQL',
        description: 'Author advanced detection queries in Kusto Query Language (KQL), schedule Sentinel analytics alert rules, build incident workbooks, and trigger automated Logic App playbooks.',
        duration: '85m',
        xp: 1600,
        tags: ['KQL Threat Hunting', 'Scheduled Analytics Rules', 'SOAR Playbooks'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/threat-hunting-microsoft-sentinel/',
        units: [
          'Write KQL queries using search, where, extend, summarize, join, and render',
          'Configure scheduled analytics detection rules with entity mapping',
          'Automate SOAR incident triage and remediation with Azure Logic Apps playbooks'
        ]
      }
    ],
    iconName: 'Eye',
    tag: 'Associate',
    recommendedOrder: 2,
    graphPos: { x: 420, y: 110, layer: 2 },
    fallbackExplanation: 'SC-200 lets you become a front-line cyber defender, writing KQL queries to hunt threats across cloud endpoints and orchestrating automated incident responses.'
  },
  {
    id: 'sc-300',
    code: 'SC-300',
    title: 'Microsoft Identity and Access Administrator',
    domainId: 'security',
    level: 'Intermediate',
    xp: 1500,
    duration: '18 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/',
    description: 'Design, implement, and operate an organization’s identity and access management systems using Microsoft Entra ID.',
    prerequisites: ['sc-900'],
    learningObjectives: [
      'Implement identities in Microsoft Entra ID (Users, Groups, Hybrid sync)',
      'Implement authentication and access management (MFA, Conditional Access, FIDO2)',
      'Implement access management for applications (Enterprise apps, App registrations)',
      'Plan and implement identity governance (Privileged Identity Management PIM, Access Reviews)'
    ],
    skillsMeasured: [
      { topic: 'Implement identities in Microsoft Entra ID', weight: '20-25%' },
      { topic: 'Implement authentication and access management', weight: '25-30%' },
      { topic: 'Implement access management for apps', weight: '20-25%' },
      { topic: 'Plan and implement identity governance', weight: '25-30%' }
    ],
    subModules: [
      {
        id: 'sc-300-1',
        order: 1,
        title: 'Implement and Manage Identities in Microsoft Entra ID',
        description: 'Configure user and group lifecycle, hybrid directory synchronization with Microsoft Entra Connect Cloud Sync, administrative units, and custom domain names.',
        duration: '75m',
        xp: 1400,
        tags: ['Microsoft Entra Connect', 'Administrative Units', 'Directory Sync'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/implement-identities-microsoft-entra-id/',
        units: [
          'Manage user/group lifecycle and license assignment with dynamic groups',
          'Deploy and configure Microsoft Entra Connect Cloud Sync',
          'Delegate administration using Administrative Units and custom security attributes'
        ]
      },
      {
        id: 'sc-300-2',
        order: 2,
        title: 'Implement Authentication & Conditional Access Policies',
        description: 'Enforce passwordless sign-in (FIDO2 security keys, Microsoft Authenticator), self-service password reset (SSPR), user/sign-in risk policies, and Conditional Access controls.',
        duration: '80m',
        xp: 1500,
        tags: ['Passwordless FIDO2', 'Risk-Based Conditional Access', 'SSPR'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/implement-authentication-microsoft-entra-id/',
        units: [
          'Implement passwordless authentication, passkeys, and Smart Card CBA',
          'Architect granular Conditional Access policies for cloud apps and sensitive data',
          'Configure Microsoft Entra Identity Protection risk detections and automated remediation'
        ]
      },
      {
        id: 'sc-300-3',
        order: 3,
        title: 'Implement Access Management for Enterprise Applications',
        description: 'Configure SAML 2.0 and OpenID Connect Single Sign-On (SSO), app registrations, delegated & application API permissions, and Entra Application Proxy.',
        duration: '70m',
        xp: 1400,
        tags: ['SAML SSO', 'App Registrations', 'Entra App Proxy'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/implement-access-management-apps-microsoft-entra-id/',
        units: [
          'Publish SaaS applications with SAML/OIDC Single Sign-On integration',
          'Manage application consent policies, admin consent workflows, and API permissions',
          'Secure on-premises legacy web apps using Microsoft Entra Application Proxy'
        ]
      },
      {
        id: 'sc-300-4',
        order: 4,
        title: 'Plan and Implement Identity Governance & Privileged Access',
        description: 'Implement Microsoft Entra Privileged Identity Management (PIM) with JIT role elevation, recurring Access Reviews, Entitlement Management catalogs, and Lifecycle Workflows.',
        duration: '85m',
        xp: 1600,
        tags: ['Entra PIM', 'Access Reviews', 'Lifecycle Workflows'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/plan-implement-identity-governance-strategy/',
        units: [
          'Configure Privileged Identity Management (PIM) for Azure and Entra roles with approval chains',
          'Automate user onboarding and offboarding with Entra Lifecycle Workflows',
          'Create Access Packages and scheduled Access Reviews for internal and guest users'
        ]
      }
    ],
    iconName: 'Key',
    tag: 'Associate',
    recommendedOrder: 3,
    graphPos: { x: 420, y: 260, layer: 2 },
    fallbackExplanation: 'Identity is the new security perimeter. SC-300 equips you with PIM, JIT access, passwordless passkeys, and zero-trust identity lifecycle management.'
  },
  {
    id: 'az-500',
    code: 'AZ-500',
    title: 'Microsoft Azure Security Technologies',
    domainId: 'security',
    level: 'Advanced',
    xp: 2000,
    duration: '22 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/',
    description: 'Implement security controls, maintain security posture, manage identity and access, and protect data, apps, and networks in Azure.',
    prerequisites: ['sc-900', 'sc-200'],
    learningObjectives: [
      'Manage identity and access in Azure (RBAC, Managed Identities, Key Vault)',
      'Implement platform protection (NSGs, Azure Firewall, Bastion, DDoS)',
      'Manage security operations (Defender for Cloud policies, alert remediation)',
      'Secure data and applications (SQL Transparent Data Encryption, TLS, App Gateway)'
    ],
    skillsMeasured: [
      { topic: 'Manage identity and access', weight: '25-30%' },
      { topic: 'Implement platform protection', weight: '25-30%' },
      { topic: 'Manage security operations', weight: '20-25%' },
      { topic: 'Secure data and applications', weight: '20-25%' }
    ],
    subModules: [
      {
        id: 'az-500-1',
        order: 1,
        title: 'Manage Identity and Access Management in Azure',
        description: 'Configure Azure RBAC custom roles, System and User-assigned Managed Identities, Azure Key Vault HSM keys, secrets, certificates, and access policies.',
        duration: '75m',
        xp: 1800,
        tags: ['Azure RBAC', 'Managed Identities', 'Azure Key Vault'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/manage-identity-access-azure-active-directory/',
        units: [
          'Design and assign granular Azure RBAC roles and deny assignments',
          'Configure passwordless Managed Identities for Azure VMs and App Services',
          'Secure secrets, certificates, and encryption keys with Azure Key Vault and Managed HSM'
        ]
      },
      {
        id: 'az-500-2',
        order: 2,
        title: 'Implement Platform and Network Protection',
        description: 'Architect perimeter defense using Azure Firewall Premium, Network Security Groups (NSGs), Application Gateway WAF, Azure Bastion, and DDoS Protection plans.',
        duration: '90m',
        xp: 2000,
        tags: ['Azure Firewall', 'WAF & NSG', 'Azure Bastion'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/implement-platform-protection-azure/',
        units: [
          'Configure Network Security Groups, Application Security Groups, and service endpoints',
          'Deploy Azure Firewall Premium with TLS inspection and IDPS threat intelligence',
          'Provision secure administrative access via Azure Bastion and Web Application Firewall (WAF)'
        ]
      },
      {
        id: 'az-500-3',
        order: 3,
        title: 'Manage Security Operations and Cloud Posture',
        description: 'Maintain cloud compliance with Defender for Cloud posture management, Just-In-Time (JIT) VM access, container vulnerability scanning, and alert remediation.',
        duration: '80m',
        xp: 1800,
        tags: ['Defender for Cloud', 'JIT VM Access', 'Container Hardening'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/manage-security-operations-azure/',
        units: [
          'Enforce regulatory benchmarks using Microsoft Cloud Security Benchmark policies',
          'Configure Just-In-Time (JIT) VM access and adaptive application controls',
          'Harden Azure Kubernetes Service (AKS) clusters and container images'
        ]
      },
      {
        id: 'az-500-4',
        order: 4,
        title: 'Secure Data, Databases, and Application Workloads',
        description: 'Implement Azure SQL Always Encrypted, Transparent Data Encryption (TDE), storage account firewalls, Customer-Managed Keys (CMK), and TLS encryption.',
        duration: '85m',
        xp: 1900,
        tags: ['SQL Always Encrypted', 'Customer-Managed Keys', 'Storage Encryption'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/secure-data-applications-azure/',
        units: [
          'Configure Azure SQL Database TDE, dynamic data masking, and Always Encrypted',
          'Implement double encryption at rest and Customer-Managed Keys (CMK) on Azure Storage',
          'Secure web applications with Azure Front Door TLS termination and custom domain certificates'
        ]
      }
    ],
    iconName: 'Lock',
    tag: 'Associate',
    recommendedOrder: 4,
    graphPos: { x: 720, y: 180, layer: 3 },
    fallbackExplanation: 'AZ-500 combines infrastructure hardening with threat intelligence, making you the primary guardian of cloud networking, disk encryption, and perimeter firewalls.'
  },

  // ================= DEVOPS & MOBILE APP DEV DOMAIN =================
  {
    id: 'git-actions',
    code: 'GH-ACT',
    title: 'Automate Workflow with GitHub Actions & Azure',
    domainId: 'devops-app',
    level: 'Beginner',
    xp: 800,
    duration: '6 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/training/paths/automate-workflow-github-actions/',
    description: 'Build CI/CD pipelines, publish artifacts, run unit tests, and deploy multi-platform applications directly to Azure.',
    prerequisites: [],
    learningObjectives: [
      'Understand GitHub Actions triggers, runners, steps, and secrets',
      'Create automated build and test pipelines for Android and web apps',
      'Deploy containerized applications to Azure App Service and AKS',
      'Implement environment approvals and secure secret rotation'
    ],
    skillsMeasured: [
      { topic: 'Workflow triggers and runner environments', weight: '25%' },
      { topic: 'Automated testing and artifact publishing', weight: '35%' },
      { topic: 'Deployment to Azure cloud targets', weight: '40%' }
    ],
    subModules: [
      {
        id: 'git-actions-1',
        order: 1,
        title: 'Core Concepts of GitHub Actions and Workflows',
        description: 'Understand GitHub Actions workflow syntax (.github/workflows YAML), events, webhooks, jobs, steps, and GitHub-hosted vs self-hosted runners.',
        duration: '45m',
        xp: 800,
        tags: ['GitHub Actions', 'YAML Workflows', 'CI Runners'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/introduction-to-github-actions/',
        units: [
          'Understand workflow triggers (push, pull_request, workflow_dispatch)',
          'Configure matrix strategies for multi-platform environments',
          'Explore GitHub-hosted runners, self-hosted runner groups, and job dependencies'
        ]
      },
      {
        id: 'git-actions-2',
        order: 2,
        title: 'Continuous Integration, Testing, and Artifacts',
        description: 'Build automated continuous integration pipelines with automated unit testing, test reporting, code coverage, and upload-artifact / download-artifact actions.',
        duration: '55m',
        xp: 1100,
        tags: ['Automated Testing', 'Artifact Publishing', 'Build Matrix'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/build-and-publish-with-github-actions/',
        units: [
          'Run automated test suites and publish JUnit/TRX test summaries',
          'Cache npm/NuGet dependencies with actions/cache for fast builds',
          'Publish build artifacts and packages to GitHub Packages registry'
        ]
      },
      {
        id: 'git-actions-3',
        order: 3,
        title: 'Continuous Delivery & Deploying to Azure Cloud',
        description: 'Authenticate passwordless to Azure using OpenID Connect (OIDC), deploy web apps to Azure App Service, Azure Functions, and push images to Azure Container Registry.',
        duration: '60m',
        xp: 1200,
        tags: ['Azure OIDC Auth', 'Azure App Service', 'Container Deployment'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/deploy-to-azure-with-github-actions/',
        units: [
          'Configure Azure workload identity federation and passwordless OIDC login',
          'Deploy containerized applications with azure/webapps-deploy action',
          'Configure GitHub environment protection rules and required manual reviewers'
        ]
      },
      {
        id: 'git-actions-4',
        order: 4,
        title: 'Secure Workflows, Encrypted Secrets & Governance',
        description: 'Manage encrypted repository/organization secrets, integrate Dependabot automated security alerts, enable CodeQL static code analysis, and build reusable workflow templates.',
        duration: '50m',
        xp: 1000,
        tags: ['Encrypted Secrets', 'CodeQL Security', 'Reusable Workflows'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/manage-sensitive-information-github-actions/',
        units: [
          'Manage repository and organization secrets and environment variables',
          'Scan code vulnerabilities with GitHub Advanced Security and CodeQL',
          'Author modular, reusable workflows with custom composite actions'
        ]
      }
    ],
    iconName: 'GitBranch',
    tag: 'Learning Path',
    recommendedOrder: 1,
    graphPos: { x: 120, y: 120, layer: 1 },
    fallbackExplanation: 'Continuous integration is the bedrock of modern development. Learning GitHub Actions first enables you to automate your Android and cloud deployment pipelines effortlessly.'
  },
  {
    id: 'maui-android',
    code: 'MAUI-AND',
    title: 'Build Android and Cross-Platform Apps with .NET MAUI & Azure',
    domainId: 'devops-app',
    level: 'Intermediate',
    xp: 1300,
    duration: '14 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/training/paths/build-apps-with-dotnet-maui/',
    description: 'Learn to code native Android and cross-platform mobile apps using C#, XAML, MVVM pattern, local SQLite storage, and Azure REST APIs.',
    prerequisites: ['git-actions'],
    learningObjectives: [
      'Create native Android user interfaces using XAML and custom controls',
      'Implement Model-View-ViewModel (MVVM) architecture and data binding',
      'Store persistent mobile data with local SQLite and SecureStorage',
      'Consume Azure App Services and REST APIs securely in Android apps',
      'Package and sign APK/AAB bundles for Google Play distribution'
    ],
    skillsMeasured: [
      { topic: 'Android UI layout and navigation', weight: '30%' },
      { topic: 'MVVM architecture and local SQLite persistence', weight: '25%' },
      { topic: 'Azure API integration and token authentication', weight: '25%' },
      { topic: 'Mobile build pipelines and release packaging', weight: '20%' }
    ],
    subModules: [
      {
        id: 'maui-1',
        order: 1,
        title: 'Create Native Android UI with XAML',
        description: 'Design responsive layouts, adaptive grids, data templates, and touch gestures in .NET MAUI for Android devices.',
        duration: '60m',
        xp: 1200,
        tags: ['Android XAML', 'Adaptive UI', 'Touch Gestures'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/create-user-interface-dotnet-maui-xaml/',
        units: [
          'XAML page structure and views',
          'StackLayout, Grid, and FlexLayout',
          'Android styling and dark theme brushes'
        ]
      },
      {
        id: 'maui-2',
        order: 2,
        title: 'Implement MVVM & Local SQLite Persistence',
        description: 'Decouple view logic using CommunityToolkit.Mvvm, ObservableProperties, Commands, and encrypted SQLite databases.',
        duration: '75m',
        xp: 1400,
        tags: ['MVVM Pattern', 'SQLite Database', 'SecureStorage'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/store-local-data-dotnet-maui/',
        units: [
          'MVVM ObservableProperty and RelayCommand',
          'SQLite-net ORM CRUD operations',
          'Android keystore and SecureStorage token caching'
        ]
      },
      {
        id: 'maui-3',
        order: 3,
        title: 'Connect Android Apps to Azure REST Services',
        description: 'Integrate HttpClient with Azure App Services, deserialize JSON payloads, and manage offline sync queues.',
        duration: '65m',
        xp: 1300,
        tags: ['Azure App Service', 'REST APIs', 'Offline Sync'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/consume-rest-services-dotnet-maui/',
        units: [
          'HttpClient async network calls',
          'Authentication tokens with Entra ID',
          'Connectivity change listeners and offline caching'
        ]
      },
      {
        id: 'maui-4',
        order: 4,
        title: 'Build, Sign, and Release Android Apps to Google Play',
        description: 'Configure Android SDK target versions, generate cryptographic Keystore keys, optimize release bundles with R8 code shrinking, and automate Play Console publishing.',
        duration: '65m',
        xp: 1300,
        tags: ['Keystore Signing', 'Android AAB Release', 'Google Play Deploy'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/dotnet/maui/android/deployment/overview',
        units: [
          'Configure AndroidManifest.xml permissions, deep links, and package metadata',
          'Generate release Keystore signing certificates and enable R8 resource shrinking',
          'Automate Android App Bundle (.aab) builds in GitHub Actions for Google Play tracks'
        ]
      }
    ],
    iconName: 'Smartphone',
    tag: 'Learning Path',
    recommendedOrder: 2,
    graphPos: { x: 420, y: 120, layer: 2 },
    fallbackExplanation: 'Having mastered automated CI/CD workflows, building mobile apps with .NET MAUI and Azure gives you full-stack capabilities to deliver native Android user experiences backed by scalable cloud microservices.'
  },
  {
    id: 'aks-containers',
    code: 'AKS-APP',
    title: 'Deploy Cloud-Native Container Apps with Azure Kubernetes (AKS)',
    domainId: 'devops-app',
    level: 'Intermediate',
    xp: 1500,
    duration: '16 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/training/paths/intro-to-kubernetes-on-azure/',
    description: 'Containerize applications with Docker, publish images to Azure Container Registry (ACR), and orchestrate deployments in Azure Kubernetes Service (AKS).',
    prerequisites: ['git-actions'],
    learningObjectives: [
      'Build multi-stage Docker container images for microservices',
      'Manage container images in private Azure Container Registry (ACR)',
      'Deploy and scale Kubernetes pods, services, and ingress controllers in AKS',
      'Integrate automated GitOps pipelines with Azure DevOps and Helm charts'
    ],
    skillsMeasured: [
      { topic: 'Docker containerization & multi-stage builds', weight: '25%' },
      { topic: 'Azure Container Registry (ACR) security & webhooks', weight: '20%' },
      { topic: 'AKS cluster management, scaling, and pods', weight: '35%' },
      { topic: 'Helm chart packaging & GitOps automation', weight: '20%' }
    ],
    subModules: [
      {
        id: 'aks-1',
        order: 1,
        title: 'Containerize Applications with Docker & Azure Container Registry',
        description: 'Write Dockerfiles, optimize image layers, build multi-arch images, and push to Azure Container Registry.',
        duration: '60m',
        xp: 1200,
        tags: ['Docker', 'Azure Container Registry', 'Microservices'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/intro-to-docker-containers/',
        units: [
          'Multi-stage Dockerfile builds',
          'ACR authentication & RBAC roles',
          'Automated ACR build tasks'
        ]
      },
      {
        id: 'aks-2',
        order: 2,
        title: 'Orchestrate Microservices on Azure Kubernetes Service (AKS)',
        description: 'Deploy Kubernetes pods, configure ClusterIP/LoadBalancer services, ConfigMaps, and horizontal pod autoscalers.',
        duration: '75m',
        xp: 1500,
        tags: ['Kubernetes', 'AKS Cluster', 'Autoscaling'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/intro-to-azure-kubernetes-service/',
        units: [
          'AKS cluster provisioning and nodepools',
          'Kubernetes deployments and services',
          'Horizontal Pod Autoscaler (HPA)'
        ]
      },
      {
        id: 'aks-3',
        order: 3,
        title: 'Configure Ingress Controllers, TLS & Azure CNI Networking',
        description: 'Configure Azure CNI networking, Network Security Policies, Application Routing ingress with NGINX, and automate TLS certificates with cert-manager.',
        duration: '70m',
        xp: 1400,
        tags: ['Azure CNI', 'Ingress Controller', 'TLS Cert-Manager'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/aks-ingress-controller/',
        units: [
          'Azure CNI vs Kubenet networking architecture and subnet sizing',
          'Deploy NGINX Ingress Controller with automatic Let’s Encrypt TLS certificates',
          'Implement Calico / Azure Network Policies for zero-trust pod isolation'
        ]
      },
      {
        id: 'aks-4',
        order: 4,
        title: 'Implement GitOps, Helm Charts & KEDA Autoscaling',
        description: 'Package microservice manifests into reusable Helm charts, configure event-driven autoscaling with KEDA, and deploy automated GitOps synchronization via Flux.',
        duration: '75m',
        xp: 1500,
        tags: ['Helm Charts', 'KEDA Event Autoscaling', 'GitOps Flux'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/aks-app-package-management-helm/',
        units: [
          'Author Helm charts with parameterized values.yaml and chart templates',
          'Scale Kubernetes pods based on Azure Service Bus queues using KEDA',
          'Implement GitOps automated cluster state reconcilers with Flux v2 on AKS'
        ]
      }
    ],
    iconName: 'Server',
    tag: 'Associate',
    recommendedOrder: 3,
    graphPos: { x: 420, y: 260, layer: 2 },
    fallbackExplanation: 'Deploying containerized microservices to AKS and Azure Container Apps bridges the gap between client code and resilient cloud-native infrastructure.'
  },
  {
    id: 'az-400',
    code: 'AZ-400',
    title: 'Designing and Implementing Microsoft DevOps Solutions',
    domainId: 'devops-app',
    level: 'Expert',
    xp: 2200,
    duration: '26 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/',
    description: 'Combine people, process, and technologies to continuously deliver value with Git, Azure DevOps, Terraform, and Kubernetes.',
    prerequisites: ['git-actions', 'maui-android', 'aks-containers'],
    learningObjectives: [
      'Configure processes and communications (Agile, Scrum, Kanban)',
      'Design and implement source control strategies (Branching, Git flow)',
      'Design and implement build and release pipelines (YAML, canary, blue-green)',
      'Develop a security and compliance plan (Dependency scanning, SonarQube)',
      'Implement an instrumentation strategy (Site Reliability Engineering, Azure Monitor)'
    ],
    skillsMeasured: [
      { topic: 'Configure processes and communications', weight: '10-15%' },
      { topic: 'Design and implement source control', weight: '15-20%' },
      { topic: 'Design and implement build and release pipelines', weight: '40-45%' },
      { topic: 'Develop security and compliance plan', weight: '10-15%' },
      { topic: 'Implement instrumentation strategy', weight: '10-15%' }
    ],
    subModules: [
      {
        id: 'az-400-1',
        order: 1,
        title: 'Configure Processes, Communications & Source Control',
        description: 'Design agile planning boards in Azure Boards, configure Git branching policies (Trunk-based development, GitFlow), enforce pull request status checks, and manage large files with Git LFS.',
        duration: '80m',
        xp: 1700,
        tags: ['Azure Boards', 'Git Branching Policies', 'PR Gates'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/develop-git-branch-strategy-for-release-cycle/',
        units: [
          'Design Agile, Scrum, and CMMI process structures in Azure Boards',
          'Implement trunk-based branching policies and pull request quality gates',
          'Manage internal packages and upstream feeds in Azure Artifacts'
        ]
      },
      {
        id: 'az-400-2',
        order: 2,
        title: 'Design and Implement Build & CI Pipelines',
        description: 'Author multi-stage YAML pipelines in Azure Pipelines, manage variable groups and Azure Key Vault integration, deploy self-hosted agent pools, and package container images.',
        duration: '90m',
        xp: 1900,
        tags: ['Azure Pipelines YAML', 'Multi-Stage CI', 'Self-Hosted Agent Pools'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/create-multi-stage-pipeline-with-azure-pipelines/',
        units: [
          'Create multi-stage YAML build pipelines with conditions and template reuse',
          'Configure Azure virtual machine and Kubernetes self-hosted build agents',
          'Integrate secure variables and Azure Key Vault service connections'
        ]
      },
      {
        id: 'az-400-3',
        order: 3,
        title: 'Design and Implement Release & Deployment Strategies',
        description: 'Architect zero-downtime deployment patterns (Blue/Green, Canary, Ring deployments), automate Infrastructure as Code with Terraform and Bicep, and configure approval gates.',
        duration: '95m',
        xp: 2000,
        tags: ['Blue/Green & Canary', 'Infrastructure as Code', 'Terraform & Bicep'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/design-a-release-strategy/',
        units: [
          'Implement Blue/Green and progressive Canary deployment strategies',
          'Automate multi-environment infrastructure deployments with Terraform and Bicep',
          'Configure release approval gates, ServiceNow change management, and automated rollbacks'
        ]
      },
      {
        id: 'az-400-4',
        order: 4,
        title: 'Implement Security, Quality & Site Reliability Engineering (SRE)',
        description: 'Shift-left security with SonarQube static analysis, Microsoft Defender for DevOps, OWASP dependency checking, and monitor SLOs/SLAs with Azure Monitor Application Insights.',
        duration: '85m',
        xp: 1900,
        tags: ['DevSecOps', 'SonarQube & Snyk', 'SRE & Application Insights'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/implement-security-and-compliance-in-azure-devops/',
        units: [
          'Integrate SonarQube, Snyk, and Microsoft Defender for DevOps into pipelines',
          'Configure automated container image vulnerability scanning in ACR and pipelines',
          'Design telemetry dashboards, log alerts, and SRE incident response loops with Azure Monitor'
        ]
      }
    ],
    iconName: 'Infinity',
    tag: 'Expert',
    recommendedOrder: 4,
    graphPos: { x: 720, y: 180, layer: 3 },
    fallbackExplanation: 'AZ-400 is the pinnacle of engineering agility. It ties together infrastructure automation, container orchestration, shift-left security, and telemetry feedback loops.'
  },

  // ================= POWER PLATFORM DOMAIN =================
  {
    id: 'pl-900',
    code: 'PL-900',
    title: 'Microsoft Power Platform Fundamentals',
    domainId: 'power-platform',
    level: 'Beginner',
    xp: 900,
    duration: '6 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/',
    description: 'Understand the business value and product capabilities of Power Apps, Power Automate, Power BI, and Copilot Studio.',
    prerequisites: [],
    learningObjectives: [
      'Describe the business value of Microsoft Power Platform',
      'Identify foundational components (Dataverse, Connectors, AI Builder)',
      'Demonstrate capabilities of Power Apps canvas and model-driven apps',
      'Demonstrate capabilities of Power Automate cloud flows',
      'Demonstrate capabilities of Power BI data modeling and visualizations'
    ],
    skillsMeasured: [
      { topic: 'Describe business value of Power Platform', weight: '20-25%' },
      { topic: 'Identify foundational components', weight: '10-15%' },
      { topic: 'Demonstrate capabilities of Power Apps', weight: '20-25%' },
      { topic: 'Demonstrate capabilities of Power Automate', weight: '15-20%' },
      { topic: 'Demonstrate capabilities of Power BI', weight: '15-20%' }
    ],
    subModules: [
      {
        id: 'pl-900-1',
        order: 1,
        title: 'Understand Business Value and Microsoft Dataverse',
        description: 'Explore the Power Platform product suite, Microsoft Dataverse relational data architecture, standard and custom connectors, and AI Builder capabilities.',
        duration: '45m',
        xp: 900,
        tags: ['Microsoft Dataverse', 'AI Builder', 'Cloud Connectors'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/introduction-power-platform/',
        units: [
          'Overview of Power Apps, Power Automate, Power BI, Power Pages, and Copilot Studio',
          'Microsoft Dataverse tables, relationships, business rules, and security roles',
          'Prebuilt AI models and custom document processing with AI Builder'
        ]
      },
      {
        id: 'pl-900-2',
        order: 2,
        title: 'Build Interactive Apps with Microsoft Power Apps',
        description: 'Build responsive canvas apps with Power Fx formulas, galleries, forms, and create data-driven model-driven applications and external Power Pages portals.',
        duration: '60m',
        xp: 1200,
        tags: ['Power Apps Canvas', 'Model-Driven Apps', 'Power Fx'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/introduction-power-apps/',
        units: [
          'Create canvas apps connecting to SharePoint, Excel, and Dataverse sources',
          'Build model-driven apps with custom forms, views, and dashboards',
          'Publish secure public web experiences using Microsoft Power Pages'
        ]
      },
      {
        id: 'pl-900-3',
        order: 3,
        title: 'Automate Processes with Microsoft Power Automate',
        description: 'Design automated cloud flows, instant button flows, scheduled background jobs, and approval workflows integrated with Microsoft Teams and Outlook.',
        duration: '55m',
        xp: 1100,
        tags: ['Power Automate', 'Cloud Flows', 'Approval Workflows'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/introduction-power-automate/',
        units: [
          'Create automated trigger flows and handle complex branching conditions',
          'Implement multi-level approval workflows in Microsoft Teams and Outlook',
          'Explore Desktop flows (Robotic Process Automation / RPA) for legacy systems'
        ]
      },
      {
        id: 'pl-900-4',
        order: 4,
        title: 'Analyze Business Data with Power BI & Copilot Studio',
        description: 'Clean data with Power Query, model relationships, author DAX calculations, build interactive reports in Power BI, and create conversational chatbots with Copilot Studio.',
        duration: '60m',
        xp: 1200,
        tags: ['Power BI Reports', 'DAX Measures', 'Copilot Studio'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/introduction-power-bi/',
        units: [
          'Transform data with Power Query and design relational data schemas',
          'Author DAX calculations and publish interactive dashboard visuals',
          'Build custom generative AI agents and bots using Microsoft Copilot Studio'
        ]
      }
    ],
    iconName: 'Zap',
    tag: 'Fundamental',
    recommendedOrder: 1,
    graphPos: { x: 120, y: 180, layer: 1 },
    fallbackExplanation: 'PL-900 introduces low-code rapid app prototyping, automated trigger flows, and Dataverse entity modeling for citizen developers and enterprise consultants.'
  },
  {
    id: 'pl-100',
    code: 'PL-100',
    title: 'Microsoft Power Platform App Maker',
    domainId: 'power-platform',
    level: 'Intermediate',
    xp: 1400,
    duration: '16 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/power-platform-app-maker/',
    description: 'Design and create business solutions with Power Apps canvas apps, model-driven forms, automated approval flows, and Copilot.',
    prerequisites: ['pl-900'],
    learningObjectives: [
      'Design business solutions and Dataverse schemas',
      'Create responsive canvas apps with Power Fx formulas',
      'Create model-driven apps and business process flows',
      'Build automated cloud flows and scheduled batch jobs in Power Automate'
    ],
    skillsMeasured: [
      { topic: 'Design business solutions', weight: '20-25%' },
      { topic: 'Create Power Apps', weight: '45-50%' },
      { topic: 'Create Power Automate flows', weight: '15-20%' },
      { topic: 'Implement AI Builder models', weight: '10-15%' }
    ],
    subModules: [
      {
        id: 'pl-100-1',
        order: 1,
        title: 'Design Business Solutions & Dataverse Data Models',
        description: 'Design relational Dataverse data models, create custom tables, configure choice columns, calculated and rollup fields, and implement business rules for form validation.',
        duration: '70m',
        xp: 1300,
        tags: ['Dataverse Architecture', 'Business Rules', 'Relational Models'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/create-tables-dataverse/',
        units: [
          'Create custom Dataverse tables and configure 1:N and N:N relationships',
          'Create calculated and rollup columns with automated aggregation formulas',
          'Implement client-side and server-side Dataverse business rules'
        ]
      },
      {
        id: 'pl-100-2',
        order: 2,
        title: 'Create Advanced Power Apps Canvas Applications',
        description: 'Develop responsive multi-screen canvas apps, write advanced Power Fx formulas (Filter, LookUp, Collect, Patch), optimize delegation, and utilize device cameras and sensors.',
        duration: '85m',
        xp: 1500,
        tags: ['Power Fx Mastery', 'Delegation & Collections', 'Device Hardware APIs'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-canvas-apps/',
        units: [
          'Design responsive layouts with auto-layout containers (Horizontal / Vertical)',
          'Master Power Fx logic: Collections, Patch commands, and delegation optimization',
          'Leverage native device hardware: barcode scanners, GPS geolocation, and camera'
        ]
      },
      {
        id: 'pl-100-3',
        order: 3,
        title: 'Create Model-Driven Apps and Modern Pages',
        description: 'Build enterprise model-driven apps, configure main forms, views, subgrids, site map navigation, custom modern pages, and multi-stage Business Process Flows.',
        duration: '75m',
        xp: 1400,
        tags: ['Model-Driven Apps', 'Business Process Flows', 'Site Map Design'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/',
        units: [
          'Configure model-driven form components, quick view forms, and subgrids',
          'Author intuitive site map navigation and custom dashboard charts',
          'Implement guided Business Process Flows (BPF) with conditional branching'
        ]
      },
      {
        id: 'pl-100-4',
        order: 4,
        title: 'Automate Business Logic & Build AI Builder Models',
        description: 'Create multi-step automated approval workflows, implement error handling and scope blocks in Power Automate, and train custom AI Builder document and object extraction models.',
        duration: '80m',
        xp: 1500,
        tags: ['Multi-Step Approvals', 'AI Builder Models', 'Error Handling Scopes'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/get-started-with-power-automate/',
        units: [
          'Build multi-step sequential and parallel approval flows in Power Automate',
          'Implement try-catch error handling with Scope blocks and runAfter conditions',
          'Train, evaluate, and deploy custom AI Builder form processing models'
        ]
      }
    ],
    iconName: 'Layout',
    tag: 'Associate',
    recommendedOrder: 2,
    graphPos: { x: 420, y: 120, layer: 2 },
    fallbackExplanation: 'Building directly on PL-900, PL-100 empowers you to write complex Power Fx logic, customize Dataverse relationships, and deploy production apps across web and mobile.'
  },
  {
    id: 'pl-200',
    code: 'PL-200',
    title: 'Microsoft Power Platform Functional Consultant',
    domainId: 'power-platform',
    level: 'Intermediate',
    xp: 1600,
    duration: '20 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/power-platform-functional-consultant/',
    description: 'Configure Dataverse security roles, build complex business process flows, integrate with Azure services, and deploy ALM solutions.',
    prerequisites: ['pl-900'],
    learningObjectives: [
      'Configure Microsoft Dataverse (Custom tables, columns, business rules)',
      'Create apps by using Microsoft Power Apps (Canvas, Model-Driven, Pages)',
      'Create and manage logic and process automation (Classic workflows, Cloud flows)',
      'Manage solutions, application lifecycle management (ALM), and environments'
    ],
    skillsMeasured: [
      { topic: 'Configure Microsoft Dataverse', weight: '25-30%' },
      { topic: 'Create apps using Power Apps', weight: '25-30%' },
      { topic: 'Create logic and process automation', weight: '25-30%' },
      { topic: 'Manage environments and solutions', weight: '15-20%' }
    ],
    subModules: [
      {
        id: 'pl-200-1',
        order: 1,
        title: 'Configure Dataverse Security, Tables and Business Rules',
        description: 'Architect security roles with organizational hierarchies, column-level security profiles, cascading table relationships, virtual tables, and Dataverse search.',
        duration: '80m',
        xp: 1500,
        tags: ['Security Roles', 'Column-Level Security', 'Virtual Tables'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/configure-user-security-dataverse/',
        units: [
          'Design business unit hierarchies, security roles, and record-level privileges',
          'Configure column-level security profiles and virtual table data providers',
          'Configure Dataverse search indexing, relevance sorting, and duplicate detection'
        ]
      },
      {
        id: 'pl-200-2',
        order: 2,
        title: 'Create Custom Enterprise Apps with Power Apps',
        description: 'Build enterprise canvas apps with custom connectors, model-driven business rules, command bar Ribbon customizations with Power Fx, and Power Pages external portals.',
        duration: '85m',
        xp: 1600,
        tags: ['Custom Connectors', 'Command Bar Power Fx', 'Power Pages Portals'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/customize-command-bar-power-apps/',
        units: [
          'Customize model-driven command bars and button logic using Power Fx formulas',
          'Integrate OpenAPI custom connectors with OAuth2 authentication',
          'Configure Power Pages security: Web roles, table permissions, and external identity providers'
        ]
      },
      {
        id: 'pl-200-3',
        order: 3,
        title: 'Create Complex Logic, Workflows & Automations',
        description: 'Design cross-entity Business Process Flows with branching, automated child flows, Desktop flows RPA, and event-driven automation triggers.',
        duration: '75m',
        xp: 1500,
        tags: ['Business Process Flows', 'Child Flows', 'Desktop RPA'],
        tasksTotal: 3,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/build-business-process-flows/',
        units: [
          'Author multi-entity Business Process Flows and action step automations',
          'Build modular child cloud flows and manage service principal execution contexts',
          'Configure unattended Desktop flows (RPA) and gateway machines'
        ]
      },
      {
        id: 'pl-200-4',
        order: 4,
        title: 'Manage Environments, ALM Solutions & Governance',
        description: 'Manage unmanaged and managed solutions, environment variables, connection references, solution dependencies, Solution Checker quality audits, and ALM deployment pipelines.',
        duration: '80m',
        xp: 1600,
        tags: ['Managed Solutions', 'Environment Variables', 'ALM Pipelines'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/manage-solutions-power-platform/',
        units: [
          'Create unmanaged development solutions and export managed production packages',
          'Configure environment variables, connection references, and dependency tracking',
          'Run Solution Checker audits and configure Power Platform automated deployment pipelines'
        ]
      }
    ],
    iconName: 'Briefcase',
    tag: 'Associate',
    recommendedOrder: 3,
    graphPos: { x: 420, y: 260, layer: 2 },
    fallbackExplanation: 'PL-200 elevates you to an enterprise functional consultant who architects complex business processes, implements security hierarchies, and manages release pipelines.'
  },
  {
    id: 'pl-400',
    code: 'PL-400',
    title: 'Microsoft Power Platform Developer',
    domainId: 'power-platform',
    level: 'Advanced',
    xp: 2000,
    duration: '24 hrs',
    learnUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/power-platform-developer/',
    description: 'Create custom Power Apps Component Framework (PCF) controls, develop Dataverse plug-ins, write custom connectors, and integrate Azure serverless logic.',
    prerequisites: ['pl-900', 'pl-100', 'pl-200'],
    learningObjectives: [
      'Create a technical design for enterprise Power Platform solutions',
      'Configure Microsoft Dataverse (Custom APIs, business rules, virtual tables)',
      'Create and configure Power Apps Component Framework (PCF) controls using TypeScript',
      'Extend the platform with C# plug-ins, Azure Functions, and Webhooks',
      'Implement Application Lifecycle Management (ALM) with Power Platform CLI and GitHub Actions'
    ],
    skillsMeasured: [
      { topic: 'Create a technical design', weight: '10-15%' },
      { topic: 'Configure Microsoft Dataverse', weight: '15-20%' },
      { topic: 'Create Power Apps Component Framework (PCF) controls', weight: '20-25%' },
      { topic: 'Extend the platform with custom code & plug-ins', weight: '35-40%' },
      { topic: 'Develop integrations with Azure and external APIs', weight: '15-20%' }
    ],
    subModules: [
      {
        id: 'pl-400-1',
        order: 1,
        title: 'Develop Custom Code with Power Apps Component Framework (PCF)',
        description: 'Build custom interactive UI controls with TypeScript, React, ControlManifest.Input.xml, use PCF CLI tooling (pac pcf init), and test in the PCF test harness.',
        duration: '90m',
        xp: 1900,
        tags: ['TypeScript PCF', 'React UI Controls', 'Power Platform CLI'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'available',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/get-started-power-apps-component-framework/',
        units: [
          'Initialize and structure PCF projects using pac pcf init and npm',
          'Implement control lifecycle methods: init, updateView, getOutputs, and destroy',
          'Deploy PCF controls to canvas apps and model-driven forms'
        ]
      },
      {
        id: 'pl-400-2',
        order: 2,
        title: 'Develop Dataverse Plug-ins & Custom APIs',
        description: 'Write C# .NET Dataverse plug-in assemblies, intercept event pipeline execution stages (Pre-validation, Pre-operation, Post-operation), register with Plugin Registration Tool, and create Custom APIs.',
        duration: '95m',
        xp: 2000,
        tags: ['C# .NET Plug-ins', 'Event Pipeline Stages', 'Custom APIs'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/extend-power-platform-code-plugins/',
        units: [
          'Author C# plug-ins using IPlugin execution context, Target Entity, and Pre/Post images',
          'Register plug-in steps and secure/unsecure configuration in the Dataverse event pipeline',
          'Create custom Dataverse Custom APIs with request and response parameters'
        ]
      },
      {
        id: 'pl-400-3',
        order: 3,
        title: 'Develop Custom Connectors & Azure Integrations',
        description: 'Write custom API connectors with OpenAPI specifications, policy templates, authenticate with Azure Key Vault secrets, configure webhooks, and post events to Azure Service Bus.',
        duration: '85m',
        xp: 1800,
        tags: ['Custom OpenAPI Connectors', 'Azure Webhooks', 'Service Bus Integration'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/build-custom-connectors-power-platform/',
        units: [
          'Author custom connectors with Swagger / OpenAPI definitions and C# policy scripts',
          'Publish Dataverse events to Azure Service Bus topics and Azure Event Grid endpoints',
          'Integrate Azure Functions with Dataverse webhooks'
        ]
      },
      {
        id: 'pl-400-4',
        order: 4,
        title: 'Automate Enterprise ALM with Power Platform CLI & GitHub Actions',
        description: 'Automate solution unpack/pack using Power Platform CLI (pac solution), sync customizations with Git repositories, and orchestrate automated CI/CD deployment pipelines.',
        duration: '85m',
        xp: 1900,
        tags: ['pac CLI Tooling', 'GitHub Actions ALM', 'Automated CI/CD'],
        tasksTotal: 4,
        tasksCompleted: 0,
        status: 'locked',
        learnUrl: 'https://learn.microsoft.com/en-us/training/modules/alm-power-platform/',
        units: [
          'Unpack and pack solution files into human-readable XML using pac solution unpack',
          'Configure service principal authentication for unattended pipeline execution',
          'Build end-to-end ALM pipelines with Power Platform Actions for GitHub'
        ]
      }
    ],
    iconName: 'Code',
    tag: 'Associate',
    recommendedOrder: 4,
    graphPos: { x: 720, y: 180, layer: 3 },
    fallbackExplanation: 'PL-400 is the ultimate pro-dev milestone in Power Platform, teaching you how to extend standard low-code tools with TypeScript PCF components, C# plug-ins, and Azure webhooks.'
  }
];

export const INITIAL_USER_PROGRESS = {
  completedModules: {
    'az-900': {
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      score: 920,
      notes: 'Completed Microsoft Learn modules on Cloud Computing Concepts and Core Azure Services.'
    }
  },
  totalXp: 900,
  streakDays: 4,
  certificationsEarned: 1,
  lastActiveDomain: 'cloud' as const,
  completedTasksLog: [
    {
      id: 'task-init-1',
      moduleId: 'az-900',
      moduleCode: 'AZ-900',
      moduleTitle: 'Microsoft Azure Fundamentals',
      domainId: 'cloud' as const,
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      xpAwarded: 900,
      notes: 'Passed learning modules with 920/1000 score.'
    }
  ],
  userNotes: {
    'az-900': 'Remember: Availability Zones provide independent power, cooling, and networking within a region.'
  },
  studyGoalHours: 15
};
