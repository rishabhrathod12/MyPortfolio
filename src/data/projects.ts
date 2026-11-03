import type { Project } from '@/types'

/**
 * Source of truth for what is claimed about TravelMate AI. Each status was checked against the
 * repository's own notes (docs/PROJECT_CONTEXT.md, commit history) on `lastReviewed`.
 * Re-check the repository before changing a status to 'implemented'.
 */
export const projects: readonly Project[] = [
  {
    id: 'adpilot-ai',
    name: 'AdPilot AI',
    tagline:
      'A multi-agent platform for analysing Amazon PPC campaigns, built so every number is calculated by code and every action needs a human.',
    shortDescription:
      'An agentic AI platform for analysing Amazon PPC advertising, with a grounded assistant and a LangGraph agent graph. In active development, running on mock data only.',
    highlights: ['Python', 'FastAPI', 'LangGraph', 'PostgreSQL', 'React'],
    coverAlt:
      'AdPilot AI architecture sketch: a Supervisor agent above four built specialists (campaign, keyword, forecast, reporting) and three planned items (bid optimization, budget allocation, human approval).',
    categories: [
      'Agentic AI',
      'Generative AI',
      'Machine Learning',
      'Amazon PPC',
      'SaaS (long-term goal)',
    ],
    projectStatus:
      'In active development. Backend, analytics, forecasting, a grounded assistant and a first agent graph are built on mock data. Recommendations, approvals and Amazon connectivity are not.',
    overview:
      'AdPilot AI is an Amazon PPC (Sponsored Products) analysis platform that aims to act like a virtual PPC manager: it investigates campaign performance, finds wasted spend and keyword opportunities, forecasts spend and sales, and answers a seller’s questions using retrieved data and verified calculations. Any consequential campaign change is meant to need explicit human approval. The long-term goal is a multi-tenant platform for sellers, PPC managers and agencies, and the first milestones are built for that from the start, with tenant isolation in the database.',
    problem:
      'Amazon sellers often spend on advertising without enough sales, carry a high ACOS, bid on keywords that do not convert, and spend hours on manual reporting. Dashboards show history but do not say what to fix first or why. This project explores a safer design for that gap: deterministic Python for every calculation, a language model only to plan and explain, a validator that checks numbers in an answer against tool results, and a person approving anything that matters.',
    currentState:
      'In active development, on synthetic data. Work through milestone M4 (analytics, forecasting, grounded assistant) is built and tested. The multi-agent graph (M5) is partly built and one of its pre-registered checks failed. Recommendations, the approval workflow and the Amazon Ads API are not built.',
    kpis: {
      intro:
        'These are the standard PPC metrics. They are computed by tested code in the backend, never by the language model, and money is held in integer minor units.',
      items: [
        { name: 'ACOS', formula: 'Ad spend / ad-attributed sales × 100', note: 'Lower is better for a given target.' },
        { name: 'ROAS', formula: 'Ad-attributed sales / ad spend', note: 'The inverse view of ACOS.' },
        { name: 'CTR', formula: 'Clicks / impressions × 100', note: 'How often a shown ad is clicked.' },
        { name: 'CPC', formula: 'Ad spend / clicks', note: 'Average cost of a click.' },
        { name: 'CVR', formula: 'Orders / clicks × 100', note: 'How often a click ends in an order.' },
      ],
    },
    features: [
      {
        id: 'dashboard',
        title: 'PPC dashboard',
        description:
          'A React dashboard of spend, ad sales, ACOS, ROAS, orders, CTR, conversion rate and CPC with period comparison and trend charts, served by a tenant-scoped analytics API.',
        status: 'implemented',
      },
      {
        id: 'campaign-analytics',
        title: 'Campaign analytics and anomaly detection',
        description:
          'Campaign metrics, health status and budget utilisation, plus statistical anomaly detection. On held-out synthetic data it caught 8 of 10 planted drops, exactly at its pre-registered limit.',
        status: 'implemented',
      },
      {
        id: 'keyword-findings',
        title: 'Keyword and search-term findings',
        description:
          'Wasted-spend, negative-keyword and opportunity findings. Two of its pre-registered accuracy checks failed on synthetic data and are published, not adjusted.',
        status: 'implemented',
      },
      {
        id: 'forecasting',
        title: 'Spend and sales forecasting',
        description:
          'Per-series model selection by backtest (ETS, ridge, gradient boosting and baselines) with prediction intervals, stored as forecast runs. One check against a seasonal-naive baseline failed.',
        status: 'implemented',
      },
      {
        id: 'assistant',
        title: 'Grounded PPC assistant',
        description:
          'A tool-calling assistant with a pgvector knowledge base. A code-based validator checks the numbers in each answer against retrieved evidence, and it refuses to make changes.',
        status: 'implemented',
      },
      {
        id: 'reporting',
        title: 'Performance reports',
        description:
          'A deterministic performance report exported as JSON, Markdown or CSV. PDF is not built.',
        status: 'implemented',
      },
      {
        id: 'agent-graph',
        title: 'Multi-agent graph',
        description:
          'A LangGraph Supervisor with four specialists and a validator, behind an off-by-default switch. A pre-registered routing check failed on one unverified answer, and the graph matched the single assistant without beating it.',
        status: 'prototype',
      },
      {
        id: 'bid-budget',
        title: 'Bid and budget recommendations',
        description:
          'Target-ACOS bid proposals, budget reallocation and scenario simulation, each with evidence, impact and confidence. Budget use is analysed today but nothing is recommended.',
        status: 'planned',
      },
      {
        id: 'approval-center',
        title: 'Human approval center',
        description:
          'Review evidence, approve or reject proposals, and keep an audit trail. Execution stays disabled by default and gated.',
        status: 'planned',
      },
      {
        id: 'ads-api',
        title: 'Amazon Ads API integration',
        description:
          'OAuth, profile and campaign sync, report ingestion and approved changes through an AmazonAdsApiProvider. It depends on API access that has not been obtained.',
        status: 'future',
      },
    ],
    agents: {
      intro:
        'The design is a LangGraph graph in which a Supervisor plans a request and delegates to specialists, then a non-LLM validator checks the draft before it is returned. Four specialists are built today. The bid, budget, wasted-spend and strategy agents from the original vision are not built as agents: wasted spend sits inside the keyword specialist, and bid and budget logic is planned for M6.',
      items: [
        {
          id: 'supervisor',
          title: 'Supervisor',
          description:
            'Understands the request, picks specialists, and writes the final answer from validated evidence.',
          status: 'prototype',
        },
        {
          id: 'campaign-analysis',
          title: 'Campaign Analysis',
          description: 'Campaign KPIs, trends, anomalies and health. Read-only tools.',
          status: 'prototype',
        },
        {
          id: 'keyword-intelligence',
          title: 'Keyword Intelligence',
          description:
            'Keyword and search-term analysis, wasted spend, negative-keyword candidates and opportunities.',
          status: 'prototype',
        },
        {
          id: 'performance-prediction',
          title: 'Performance Prediction',
          description: 'Runs the forecasting service and reports intervals and model quality.',
          status: 'prototype',
        },
        {
          id: 'ppc-reporting',
          title: 'PPC Reporting',
          description: 'Builds the structured report from validated numbers only.',
          status: 'prototype',
        },
        {
          id: 'bid-agent',
          title: 'Bid Optimization',
          description: 'Target-ACOS bid proposals with explanations. Not built.',
          status: 'planned',
        },
        {
          id: 'budget-agent',
          title: 'Budget Allocation',
          description: 'Budget reallocation and scenario simulation. Not built.',
          status: 'planned',
        },
        {
          id: 'strategy-agent',
          title: 'Optimization Strategy',
          description:
            'Combines specialist findings into a prioritised plan for approval. Not built.',
          status: 'planned',
        },
      ],
      workflow: [
        'The seller asks a question in the chat.',
        'The Supervisor plans which specialists are needed, with a safe fallback if the plan is unusable.',
        'Specialists call read-only, tenant-scoped tools, and every result is stored as evidence with its data source (MOCK is flagged).',
        'A non-LLM validator checks that the numbers in the draft match the evidence.',
        'The answer is returned, or it says honestly that the data is insufficient. Recommendations and execution are outside this graph.',
      ],
    },
    stack: [
      { label: 'Backend', items: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'SQLAlchemy', 'Alembic'] },
      { label: 'Agentic AI', items: ['LangGraph', 'Supervisor pattern', 'Tool calling', 'Structured outputs'] },
      { label: 'Generative AI', items: ['OpenAI API (behind an LLM port)', 'RAG', 'Prompt engineering'] },
      {
        label: 'Machine Learning',
        items: ['NumPy', 'scikit-learn', 'statsmodels', 'Time-series forecasting', 'Anomaly detection'],
      },
      { label: 'Data', items: ['PostgreSQL', 'pgvector', 'Row-level security'] },
      { label: 'Frontend', items: ['React 19', 'TypeScript', 'Vite'] },
      {
        label: 'Infrastructure and quality',
        items: ['Docker', 'Docker Compose', 'GitHub Actions', 'pytest', 'Vitest', 'Ruff', 'mypy (strict)'],
      },
    ],
    capabilities: {
      intro:
        'Machine learning and generative AI each have a narrow, checkable job. Results below come from synthetic data generated by the same tool that planted the patterns, so they show the code works as designed, not accuracy on real accounts.',
      items: [
        {
          id: 'cap-forecast',
          title: 'Time-series forecasting',
          description:
            'Backtested model choice per series with intervals. Boosted trees and ridge are used where they win the backtest. XGBoost, PyTorch and Transformers are not used.',
          status: 'implemented',
        },
        {
          id: 'cap-anomaly',
          title: 'Anomaly detection',
          description:
            'Statistical evidence thresholds calibrated on a no-change process, not on the planted cases.',
          status: 'implemented',
        },
        {
          id: 'cap-nlp',
          title: 'Grounded NLP and RAG',
          description:
            'Tool-calling over analytics plus retrieval from a small glossary and guidelines base, with sanitised, length-capped passages treated as data.',
          status: 'implemented',
        },
        {
          id: 'cap-faith',
          title: 'Faithfulness validation',
          description:
            'Numbers in an answer must match tool results. It does not judge meaning, so a wrongly worded answer with correct numbers can pass.',
          status: 'implemented',
        },
        {
          id: 'cap-orchestration',
          title: 'Agent orchestration',
          description:
            'A LangGraph graph with typed state and per-run budgets. The checkpointer is deferred to the approval work in M6.',
          status: 'prototype',
        },
        {
          id: 'cap-keyword-class',
          title: 'Keyword performance classification',
          description:
            'Rule-based findings exist today. A learned classifier is not built.',
          status: 'planned',
        },
      ],
    },
    integration: {
      intro:
        'All business logic depends on an AdvertisingDataProvider port, never on a specific source, so the data source can be swapped by configuration.',
      items: [
        {
          id: 'int-mock',
          title: 'Phase 1: mock advertising data',
          description:
            'A seeded generator produces campaigns, keywords, search terms and daily history with planted scenarios. Every record carries its source and a MOCK label.',
          status: 'implemented',
        },
        {
          id: 'int-port',
          title: 'Provider port and contract tests',
          description:
            'MockAdvertisingDataProvider satisfies the port. The mock provider refuses to execute changes.',
          status: 'implemented',
        },
        {
          id: 'int-amazon',
          title: 'Phase 2: Amazon Ads API',
          description:
            'AmazonAdsApiProvider, OAuth, profile and campaign sync, and report ingestion. No Amazon connection exists or is simulated, and access has not been granted.',
          status: 'future',
        },
      ],
    },
    safety: {
      intro:
        'Agents have read-only tools and cannot write. The aim is that a language model never changes a campaign.',
      items: [
        {
          id: 'safe-exec',
          title: 'Execution disabled by default',
          description:
            'AD_EXECUTION_ENABLED is false, and startup refuses an unsafe combination. No execution path exists yet.',
          status: 'implemented',
        },
        {
          id: 'safe-tenant',
          title: 'Tenant isolation',
          description:
            'Every query is tenant-scoped, backed by Postgres row-level security and cross-tenant tests. Real sign-in is not built: a development-only header stands in, and production refuses to start with it.',
          status: 'implemented',
        },
        {
          id: 'safe-limits',
          title: 'Rate limits and cost caps',
          description:
            'API rate limiting, daily and monthly LLM spend caps, and prompt-injection controls on retrieved text.',
          status: 'implemented',
        },
        {
          id: 'safe-approval',
          title: 'Human approval and audit trail',
          description:
            'Recommendations are meant to be stored as pending, approved by an authorised person against a content hash, and logged append-only before anything runs.',
          status: 'planned',
        },
        {
          id: 'safe-oauth',
          title: 'OAuth and secure credential storage',
          description:
            'Encrypted refresh tokens and a managed auth provider, planned alongside the Ads API.',
          status: 'future',
        },
      ],
    },
    roadmap: {
      intro: 'Milestones are approved one at a time. Status is taken from the repository’s own plan.',
      items: [
        { id: 'm0-m1', title: 'M0 to M1: planning and foundation', description: 'Docs, architecture decisions, backend and frontend scaffolds, CI, Docker Compose, tenancy.', status: 'implemented' },
        { id: 'm2', title: 'M2: mock advertising data', description: 'Provider port, mock provider, seeded generator, sync job.', status: 'implemented' },
        { id: 'm3', title: 'M3: analytics and ML', description: 'KPI engine, findings, anomalies, forecasting, dashboard. Some accuracy checks failed and are recorded.', status: 'implemented' },
        { id: 'm4', title: 'M4: grounded assistant with RAG', description: 'LLM port, tools, knowledge base, faithfulness validator, chat API and UI.', status: 'implemented' },
        { id: 'm5', title: 'M5: multi-agent system', description: 'Graph, specialists, validator and reporting are built. The routing check failed and the graph does not yet beat the single assistant.', status: 'prototype' },
        { id: 'm6', title: 'M6: recommendations and approval', description: 'Bid, budget and negative-keyword proposals, approval workflow, audit log, gated execution.', status: 'planned' },
        { id: 'm7-m8', title: 'M7 to M8: evaluation and deployment', description: 'Wider testing and a hosted deployment. No hosted demo exists.', status: 'planned' },
        { id: 'm9', title: 'M9: Amazon Ads API', description: 'Starts only after access is granted.', status: 'future' },
      ],
    },
    architecture: [
      { id: 'ui', name: 'React dashboard and chat', description: 'Dashboard, trends and the assistant.', status: 'implemented' },
      { id: 'api', name: 'FastAPI layer', description: 'Tenant-scoped read-only API, errors, rate limits.', status: 'implemented' },
      { id: 'agents', name: 'LangGraph agent graph', description: 'Supervisor, specialists and validator, off by default.', status: 'prototype' },
      { id: 'analytics', name: 'Analytics and ML', description: 'KPI engine, findings, anomalies and forecasts in plain Python.', status: 'implemented' },
      { id: 'provider', name: 'AdvertisingDataProvider port', description: 'Mock provider today. Amazon provider not built.', status: 'implemented' },
      { id: 'store', name: 'PostgreSQL with pgvector', description: 'Row-level security, migrations and the knowledge base.', status: 'implemented' },
      { id: 'approvals', name: 'Approval and execution service', description: 'Not built. Execution is disabled.', status: 'planned' },
    ],
    statusLabels: { prototype: 'In Progress' },
    statusNotes: {
      implemented:
        'Built and covered by automated tests in the repository. Everything runs on mock data, and some accuracy checks failed and are recorded.',
      prototype:
        'Partly built and under development. It runs, but has not met its own pre-registered checks or is switched off by default.',
      planned: 'Designed in the repository’s documents but not built yet.',
      future: 'Depends on something outside the project, such as Amazon Ads API access.',
    },
    limitations: [
      'All data is synthetic and labelled MOCK. No Amazon account or Amazon Ads API is connected.',
      'Accuracy results come from the same generator that planted the patterns, so they do not show accuracy on real accounts.',
      'Pre-registered checks that failed: keyword waste precision (0.67 against 0.85), negative-term recall (0.64 against 0.70), account forecasts against a seasonal-naive baseline (6 of 10 against 7), and the agent graph routing check.',
      'The multi-agent graph is off by default and has not been shown to beat the single assistant.',
      'No recommendations, approvals or campaign changes exist, and there is no real authentication.',
      'Query timing and the Docker Compose stack have not been verified, and no public demo is available.',
    ],
    outcomes: [
      'Built a provider-independent backend where deterministic code does all arithmetic and a validator checks the numbers in model answers against retrieved evidence.',
      'Pre-registered evaluation criteria before scoring, used held-out seeds, and published failed checks instead of tuning them away.',
      'Designed tenant isolation, cost caps and fail-safe execution settings from the first migration, and recorded the decisions as architecture decision records.',
      'Learned where a multi-agent graph does not yet add value over a single grounded assistant, and recorded that result.',
      'No performance, savings or business-impact figures are claimed.',
    ],
    repoUrl: 'https://github.com/rishabhrathod12/AI-Ads-Autopilot',
    lastReviewed: '2026-11-03',
  },
  {
    id: 'travelmate-ai',
    name: 'TravelMate AI',
    tagline: 'An agentic AI travel planner, built to be testable and honest about its data.',
    shortDescription:
      'An agentic AI travel planner that researches transport, hotels and weather, drafts an itinerary and estimates cost. In active development, running on mock data.',
    highlights: ['Python', 'FastAPI', 'LangGraph', 'React'],
    coverAlt:
      'TravelMate AI cover artwork showing its planning workflow: intake, research, select, itinerary, cost and summary.',
    overview:
      'TravelMate AI plans trips by researching transport, hotels and weather, drafting an itinerary and estimating cost. It is built around guardrails: every value carries a label saying where it came from, money is handled in integer minor units, and booking is disabled by design. The first scenario is Indore to Goa.',
    problem:
      'Planning a trip means comparing transport, stays and weather across many sources and then turning that into a plan and a cost. AI assistants that invent prices or book without asking are risky. This project explores a safer design: deterministic code for numbers, a model only for drafting, and a person approving anything that matters.',
    currentState:
      'In active development. The backend architecture, planning workflow and API are built and tested on mock data. It does not yet use live travel data or a live AI model.',
    features: [
      {
        id: 'provenance',
        title: 'Data provenance labels',
        description:
          'Every value is labelled LIVE, CACHED_LIVE or MOCK so sample data is never mistaken for real data.',
        status: 'implemented',
      },
      {
        id: 'research-tools',
        title: 'Transport, hotel and weather research',
        description:
          'Typed read-only tools behind provider interfaces. Currently backed by mock providers with fictional options.',
        status: 'implemented',
      },
      {
        id: 'cost-estimator',
        title: 'Deterministic cost estimator',
        description:
          'Plain arithmetic over quoted amounts in integer minor units, so the model never produces a price.',
        status: 'implemented',
      },
      {
        id: 'workflow',
        title: 'LangGraph planning workflow',
        description:
          'Intake, parallel research, selection, itinerary, cost and summary steps that can pause for clarification or a choice. Tested with mock providers and a fake model.',
        status: 'implemented',
      },
      {
        id: 'api',
        title: 'Planning REST API',
        description:
          'FastAPI routes for trips, runs, selections, itinerary and cost, with structured errors, request IDs and redacted logging. It runs for a single development user and has no real authentication yet.',
        status: 'implemented',
      },
      {
        id: 'persistence',
        title: 'PostgreSQL persistence and audit trail',
        description:
          'SQLAlchemy models and Alembic migrations, with an audit table the application role cannot modify or delete from.',
        status: 'implemented',
      },
      {
        id: 'approvals',
        title: 'Booking intents and approvals',
        description:
          'Quote snapshots with content hashes and time-limited approvals. The execute step always refuses: no booking client exists.',
        status: 'implemented',
      },
      {
        id: 'frontend',
        title: 'React interface',
        description:
          'A TypeScript prototype with a chat-first planning screen, transport comparison and a clearly labelled simulated booking. It uses demo data and has not yet been connected to a live model.',
        status: 'prototype',
      },
      {
        id: 'chat-voice',
        title: 'Chat and voice planning',
        description:
          'Chat runs on a labelled development stand-in rather than a language model. The voice screen is session-only: it does not capture or play audio.',
        status: 'prototype',
      },
      {
        id: 'live-model',
        title: 'Live AI model',
        description:
          'An OpenAI plan writer and transport are built, but no real request has been sent. Switching it on needs an API key and explicit approval.',
        status: 'planned',
      },
      {
        id: 'live-data',
        title: 'Live travel data providers',
        description: 'Replace the mock providers with real transport, hotel and weather sources.',
        status: 'planned',
      },
      {
        id: 'auth',
        title: 'User authentication',
        description: 'Real sign-in to replace the single development user.',
        status: 'planned',
      },
    ],
    stack: [
      { label: 'Backend', items: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'LangGraph'] },
      { label: 'Data', items: ['PostgreSQL', 'SQLAlchemy', 'Alembic'] },
      { label: 'AI', items: ['OpenAI SDK (adapter built, not run live)'] },
      { label: 'Frontend', items: ['React 19', 'TypeScript', 'Vite'] },
      {
        label: 'Quality',
        items: ['pytest', 'Vitest', 'Ruff', 'mypy (strict)', 'ESLint', 'GitHub Actions'],
      },
    ],
    architecture: [
      {
        id: 'ui',
        name: 'React interface',
        description: 'Chat-first planning screen on demo data.',
        status: 'prototype',
      },
      {
        id: 'api',
        name: 'FastAPI layer',
        description: 'Validation, errors, request IDs and ownership checks.',
        status: 'implemented',
      },
      {
        id: 'workflow',
        name: 'LangGraph workflow',
        description: 'Intake, research, selection, itinerary, cost and summary.',
        status: 'implemented',
      },
      {
        id: 'tools',
        name: 'Research tools and providers',
        description: 'Read-only tools over provider interfaces. Mock providers today.',
        status: 'implemented',
      },
      {
        id: 'llm',
        name: 'LLM client',
        description: 'Interface with a fake model for tests and an unused OpenAI adapter.',
        status: 'prototype',
      },
      {
        id: 'persistence',
        name: 'PostgreSQL store',
        description: 'Trips, runs, itineraries and an append-only audit trail.',
        status: 'implemented',
      },
      {
        id: 'booking',
        name: 'Approval service and booking executor',
        description: 'Approvals work; the executor is disabled by design.',
        status: 'implemented',
      },
    ],
    statusNotes: {
      implemented:
        'Built and covered by automated tests in the repository. Travel data comes from mock providers and the AI model is a test double, so none of it runs on live data.',
      prototype:
        'Working but unfinished: it runs on demo data or a labelled development stand-in, not on a live AI model.',
      planned: 'Not built yet. Listed so the roadmap is visible, not as a claim.',
    },
    limitations: [
      'No live AI model call has ever been made.',
      'All travel data is mock data with fictional names.',
      'Real booking and payment are disabled and are not part of the current scope.',
      'The interface has not been tested with real users, and no public demo is available.',
    ],
    repoUrl: 'https://github.com/rishabhrathod12/TravelMate-AI',
    lastReviewed: '2026-10-30',
  },
  {
    id: 'apex-knowledge-assistant',
    name: 'Apex Knowledge Assistant',
    tagline:
      'A role-aware RAG assistant for manufacturing documents, with private employee uploads and source references.',
    shortDescription:
      'A role-aware knowledge assistant that answers questions over authorised company documents and an employee’s own PDFs, with source references. Demo on fictional sample data.',
    highlights: ['Python', 'FastAPI', 'Qdrant', 'PostgreSQL', 'Streamlit'],
    coverAlt:
      'Apex Knowledge Assistant sign-in page with two options: Employee Login and Super Admin Login.',
    overview:
      'A role-aware manufacturing knowledge assistant that helps employees ask questions over authorised company documents and their own PDFs. Super Admins manage users, departments, document access and the company knowledge library, while employees use private document chat and company knowledge Q&A with source references. It is built for a fictional company, Apex Precision Manufacturing Pvt. Ltd., using fictional sample documents.',
    problem:
      'Answers that manufacturing staff need are spread across procedures, policies and manuals, and not everyone may read every document. The goal is to let an employee ask a question in plain language and get an answer drawn only from the documents they are allowed to see, pointing to the source document, section and page.',
    currentState:
      'A working demo on fictional sample data, at supervised-pilot stage. It is not a production service: the demo is served over HTTP rather than HTTPS, and it has no real users or customers.',
    features: [
      {
        id: 'admin-overview',
        title: 'Super Admin overview',
        description:
          'Account totals (active, disabled, Super Admins, managers, employees), company and archived document counts, a per-department summary, and recent uploads and administrative activity.',
        status: 'implemented',
      },
      {
        id: 'employee-management',
        title: 'Employee management',
        description:
          'Search and filter people by name, Login ID, email, role, status and department. Edit details and assignments, disable accounts and reset passwords.',
        status: 'implemented',
      },
      {
        id: 'create-employee',
        title: 'Create employee accounts',
        description:
          'A Super Admin adds a person with a role and one or more departments. The person signs in with a Login ID and temporary password, then chooses their own. There is no self sign-up.',
        status: 'implemented',
      },
      {
        id: 'company-documents',
        title: 'Company document library',
        description:
          'Searchable, filterable list with type, version, size and indexing counts. Re-index, archive, add a new version, view history or delete a document.',
        status: 'implemented',
      },
      {
        id: 'upload-company',
        title: 'Upload and classify company documents',
        description:
          'PDF, DOCX or TXT up to 20 MB per file, with a department, document type, title, version and description, and a choice to make it visible to all employees.',
        status: 'implemented',
      },
      {
        id: 'departments',
        title: 'Departments',
        description:
          'A read-only view of the fixed department structure with employee, manager and document counts. Assignments are managed under Employee Management.',
        status: 'implemented',
      },
      {
        id: 'audit-logs',
        title: 'Audit logs',
        description:
          'Filter by action, outcome, person and date range, and review time, actor, action, outcome, subject and detail. The interface states that passwords and document text are never recorded.',
        status: 'implemented',
      },
      {
        id: 'admin-qa',
        title: 'Company knowledge Q&A for admins',
        description:
          'Ask the company documents, optionally narrowed by department, with suggested questions. Answers are designed to show the document, section and page they came from.',
        status: 'implemented',
      },
      {
        id: 'employee-dashboard',
        title: 'Employee dashboard',
        description:
          'A personal workspace showing assigned departments, document and conversation counts, quick actions, and recent conversations to reopen.',
        status: 'implemented',
      },
      {
        id: 'private-upload',
        title: 'Private PDF upload',
        description:
          'Employees upload their own PDFs (20 MB per file). Only the employee can see them, and they can be queried once their status is Ready.',
        status: 'implemented',
      },
      {
        id: 'my-documents',
        title: 'My Documents',
        description: 'A personal library listing the employee’s own uploaded documents.',
        status: 'implemented',
      },
      {
        id: 'private-chat',
        title: 'Chat with my documents',
        description:
          'Ask questions about personal PDFs. Answers are intended to identify the source document, section and page, and only the employee can see them.',
        status: 'implemented',
      },
      {
        id: 'company-knowledge',
        title: 'Company knowledge: ask or browse',
        description:
          'Ask a question or browse the company documents the employee is allowed to read, with a department filter and suggested questions on safety, machine operation, leave and inspection.',
        status: 'implemented',
      },
      {
        id: 'history',
        title: 'Conversation history',
        description:
          'Previous conversations with their last-message time, which can be reopened. Only the employee can see them.',
        status: 'implemented',
      },
      {
        id: 'access-control',
        title: 'Sign-in and role-based access',
        description:
          'Login IDs, temporary passwords with a forced change, token-based sessions, and role and department permissions. The server checks the account’s real role; choosing a portal grants nothing.',
        status: 'implemented',
      },
      {
        id: 'hybrid-retrieval',
        title: 'Hybrid search with reranking',
        description:
          'Each question is searched by meaning and by keywords, the results are merged, and a second check drops passages that are related but do not answer it. Both steps only see documents the person may read.',
        status: 'implemented',
      },
      {
        id: 'evaluation',
        title: 'Evaluation tooling',
        description:
          'A golden question set and RAGAS scoring scripts live in the repository. No results are claimed on this page.',
        status: 'implemented',
      },
      {
        id: 'web-interface',
        title: 'Web interface',
        description:
          'A Streamlit interface with Employee and Super Admin workspaces. It has not yet had a phone-layout or accessibility review.',
        status: 'prototype',
      },
      {
        id: 'https',
        title: 'HTTPS',
        description:
          'Put a TLS reverse proxy in front of the app so that passwords and tokens are encrypted in transit.',
        status: 'planned',
      },
      {
        id: 'backups',
        title: 'Scheduled off-machine backups',
        description:
          'The backup and restore procedure is written, but it is not scheduled and nothing copies backups off the machine yet.',
        status: 'planned',
      },
      {
        id: 'scale',
        title: 'More than one API worker',
        description:
          'Needs a standalone Qdrant server and a shared store for the login rate limiter, instead of the embedded vector store used today.',
        status: 'planned',
      },
    ],
    stack: [
      {
        label: 'Backend',
        items: ['Python 3.12', 'FastAPI', 'Pydantic settings', 'SQLAlchemy', 'Alembic', 'PyJWT'],
      },
      {
        label: 'Data',
        items: ['PostgreSQL (SQLite for development)', 'Qdrant (embedded local mode)'],
      },
      {
        label: 'AI',
        items: ['OpenAI embeddings (text-embedding-3-small)', 'OpenAI chat model', 'Hybrid search and reranking'],
      },
      { label: 'Documents', items: ['PyMuPDF (PDF)', 'python-docx (DOCX)', 'Plain text'] },
      { label: 'Frontend', items: ['Streamlit', 'httpx'] },
      {
        label: 'Quality',
        items: ['pytest', 'Ruff', 'mypy (strict)', 'pre-commit', 'GitHub Actions', 'RAGAS'],
      },
    ],
    architecture: [
      {
        id: 'ui',
        name: 'Streamlit interface',
        description: 'Employee and Super Admin workspaces. Calls the API over HTTP.',
        status: 'prototype',
      },
      {
        id: 'api',
        name: 'FastAPI layer',
        description: 'Sign-in, role and department checks, validation and audit logging.',
        status: 'implemented',
      },
      {
        id: 'ingestion',
        name: 'Document ingestion',
        description: 'Extracts text from PDF, DOCX and TXT, splits it into passages and embeds them.',
        status: 'implemented',
      },
      {
        id: 'retrieval',
        name: 'Retrieval',
        description:
          'Semantic and keyword search, merged and reranked, limited to documents the person may read.',
        status: 'implemented',
      },
      {
        id: 'answers',
        name: 'Answer generation',
        description:
          'A chat model answers from the retrieved passages and returns the source document, section and page, or a not-found result.',
        status: 'implemented',
      },
      {
        id: 'storage',
        name: 'Storage',
        description:
          'A relational database for accounts, documents, conversations and the audit log, a vector index, and uploaded files on disk.',
        status: 'implemented',
      },
    ],
    statusNotes: {
      implemented:
        'Built, covered by automated tests in the repository, and visible in the demo interface. The screenshots show workflows on sample data, not answer quality.',
      prototype:
        'Working but unfinished: the interface has not been reviewed on phones or for accessibility.',
      planned: 'Not done yet. Listed so the remaining gaps are visible, not as a claim.',
    },
    limitations: [
      'All company data is fictional sample data. Apex Precision Manufacturing Pvt. Ltd. is not a real client.',
      'The demo is not hardened for public use. It is served over HTTP, not HTTPS, so passwords and tokens are not encrypted in transit.',
      'It runs one API worker, because the embedded vector store allows only one process.',
      'The screenshots show interface workflows and sample records. They do not prove answer accuracy, retrieval quality, security assurance or scale.',
      'There are no real users, customers or usage figures.',
    ],
    repoUrl: 'https://github.com/rishabhrathod12/Chatbot_Apex_Industries',
    lastReviewed: '2026-11-02',
    documentAccess: {
      intro:
        'Two kinds of documents are kept apart, and a question only searches documents the person is allowed to read. In both cases answers are intended to show the source document, section and page, as the interface states.',
      columns: [
        {
          title: 'Company documents (department-authorised)',
          points: [
            'Added by a Super Admin through the upload form.',
            'Given a department, a document type, a version and a description.',
            'Can be made visible to all employees, or kept to the people in that department.',
            'Searched only by people who are authorised for them.',
            'Can be re-indexed, archived, versioned and deleted by a Super Admin.',
          ],
        },
        {
          title: 'Employee private PDFs',
          points: [
            'Uploaded by the employee, PDF only.',
            'Only that employee can see them or ask about them.',
            'Can be queried once their status is Ready.',
            'Questions are asked in a separate private chat.',
            'Conversation history is also visible only to that employee.',
          ],
        },
      ],
    },
    gallery: [
      {
        id: 'entry',
        label: 'Sign-in entry',
        description: 'One entry page that separates the two journeys.',
        shots: [
          {
            file: 'entry-sign-in',
            title: 'Shared sign-in page',
            caption:
              'Employee Login and Super Admin Login side by side. The page notes that accounts are created by a Super Admin and there is no self sign-up.',
            alt: 'Apex Knowledge Assistant sign-in page with an Employee Login card and a Super Admin Login card, and a note that there is no self sign-up.',
          },
        ],
      },
      {
        id: 'admin',
        label: 'Super Admin workflow',
        description: 'Managing people, company documents and the audit trail.',
        shots: [
          {
            file: 'admin-overview',
            title: 'Overview',
            caption:
              'Account and document totals, a department summary, and recent activity.',
            alt: 'Super Admin overview showing account totals, company and archived document counts, and a department summary table.',
          },
          {
            file: 'admin-recent-activity',
            title: 'Recent uploads and activity',
            caption:
              'Recent uploads with department, readiness, uploader and time, and recent administrative events such as uploads, re-indexing and account creation.',
            alt: 'Lower part of the Super Admin overview listing recent document uploads and recent administrative activity.',
          },
          {
            file: 'admin-employee-management',
            title: 'Employee management',
            caption:
              'Filters for name, Login ID, email, role, status and department, with actions to disable, edit and reset a password.',
            alt: 'Employee management page with search and filter controls and two sample people, each with Active status and account action buttons.',
          },
          {
            file: 'admin-create-employee',
            title: 'Create employee',
            caption:
              'A form for name, email, role and departments, with an optional Login ID and temporary password.',
            alt: 'Create employee form with fields for full name, email, role, departments, optional Login ID and temporary password.',
          },
          {
            file: 'admin-company-documents',
            title: 'Company documents',
            caption:
              'The company library with department and status filters, document details, and re-index, archive, version and delete actions.',
            alt: 'Company documents library with search and filters and a list of sample documents showing type, version, size and indexing counts.',
          },
          {
            file: 'admin-upload-company-documents',
            title: 'Upload company documents',
            caption:
              'Upload PDF, DOCX or TXT files up to 20 MB, choosing a department, document type, version and whether all employees can see it.',
            alt: 'Upload company documents form with file chooser, department, document type, company-wide visibility option, title, version and description.',
          },
          {
            file: 'admin-departments',
            title: 'Departments',
            caption: 'Employee, manager and document counts for each fixed department.',
            alt: 'Departments page summarising employee, manager and document counts for each department.',
          },
          {
            file: 'admin-audit-logs',
            title: 'Audit logs',
            caption:
              'A filterable record of who did what and whether it succeeded, such as document uploads, sign-ins and department changes.',
            alt: 'Audit logs page with action, outcome, person and date filters above a table of timestamped entries.',
          },
          {
            file: 'admin-ask-company-documents',
            title: 'Ask the company documents',
            caption:
              'A department filter, suggested questions and a chat box. Every answer is meant to show the document, section and page it came from.',
            alt: 'Ask the company documents page with a department filter, four suggested questions about safety, CNC machines, leave and inspection, and a question box.',
          },
        ],
      },
      {
        id: 'employee',
        label: 'Employee workflow',
        description: 'Private PDFs, company knowledge and saved conversations.',
        shots: [
          {
            file: 'employee-dashboard',
            title: 'Employee dashboard',
            caption:
              'A welcome panel with departments, summary cards, quick actions and recent conversations.',
            alt: 'Employee dashboard with a welcome panel, summary cards for documents and conversations, and quick action buttons.',
          },
          {
            file: 'employee-upload-pdf',
            title: 'Upload a private PDF',
            caption:
              'PDF upload with a 20 MB limit and a note that only the employee can see these documents.',
            alt: 'Upload PDF page with a file chooser, a 20 MB limit and a note that only the employee can see their uploads.',
          },
          {
            file: 'employee-my-documents',
            title: 'My Documents',
            caption:
              'The employee’s own library, shown empty with a prompt to upload a PDF.',
            alt: 'My Documents page showing an empty personal library with a prompt to use Upload PDF.',
          },
          {
            file: 'employee-chat-my-documents',
            title: 'Chat with my documents',
            caption:
              'A private chat for personal PDFs, with answers intended to name the source document, section and page.',
            alt: 'Chat with my documents page with a message box and a note that only the employee can see their personal documents.',
          },
          {
            file: 'employee-company-knowledge',
            title: 'Company knowledge',
            caption:
              'Ask a question or browse documents, with a department filter and suggested questions. Answers come only from documents the employee may see.',
            alt: 'Company knowledge page with Ask a question and Browse documents modes, a department filter and suggested questions.',
          },
          {
            file: 'employee-conversation-history',
            title: 'Conversation history',
            caption:
              'Saved conversations with their last-message time and a Read action to reopen each one.',
            alt: 'Conversation history page listing saved conversations with a Read button for each.',
          },
        ],
      },
    ],
    deploymentNotes: [
      'This is a demo, not a production service. A demo instance has been run on AWS EC2 using fictional sample data.',
      'Access to the demo is currently over HTTP, not HTTPS. Do not enter real passwords or confidential documents.',
      'No public demo link is published on this page.',
      'The repository includes a Dockerfile, a Docker Compose file (PostgreSQL, API and web interface) and written deployment notes. Adding TLS in front of the app is listed there as work still to do before real users.',
    ],
    outcomes: [
      'Built a role-aware workflow end to end: sign-in, account administration, document ingestion and indexing, retrieval, answers with source references, and an audit trail.',
      'Applied access control to retrieval as well as to the interface, so a search only covers documents the person may read.',
      'Practised evaluating a retrieval-augmented system with a golden question set and RAGAS scripts, and reading low-scoring answers by hand instead of trusting a single score.',
      'Worked with database migrations, moved from SQLite to PostgreSQL, and wrote down known gaps before sharing the project.',
      'No usage, accuracy or business-impact figures are claimed.',
    ],
  },
]
