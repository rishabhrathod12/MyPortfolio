import type { Project } from '@/types'

/**
 * Source of truth for what is claimed about TravelMate AI. Each status was checked against the
 * repository's own notes (docs/PROJECT_CONTEXT.md, commit history) on `lastReviewed`.
 * Re-check the repository before changing a status to 'implemented'.
 */
export const projects: readonly Project[] = [
  {
    id: 'travelmate-ai',
    name: 'TravelMate AI',
    tagline: 'An agentic AI travel planner, built to be testable and honest about its data.',
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
    limitations: [
      'No live AI model call has ever been made.',
      'All travel data is mock data with fictional names.',
      'Real booking and payment are disabled and are not part of the current scope.',
      'The interface has not been tested with real users, and no public demo is available.',
    ],
    repoUrl: 'https://github.com/rishabhrathod12/TravelMate-AI',
    lastReviewed: '2026-10-30',
  },
]
