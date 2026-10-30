import type { SkillGroup } from '@/types'

/**
 * Only skills with evidence behind them are listed: either learned and practised (see learning.ts)
 * or visible in the TravelMate AI repository (see projects.ts). No proficiency percentages.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'ai',
    title: 'AI and machine learning',
    description: 'Self-taught through free online resources, primarily YouTube.',
    items: [
      { name: 'Machine learning' },
      { name: 'Deep learning' },
      { name: 'Generative AI' },
      { name: 'Agentic AI' },
    ],
  },
  {
    id: 'agentic',
    title: 'Agentic systems',
    description: 'Applied in TravelMate AI.',
    items: [
      { name: 'LangGraph workflows', note: 'tested with mock providers and a fake model' },
      { name: 'Human-in-the-loop pauses and approvals' },
      { name: 'LLM client abstraction', note: 'OpenAI adapter built; no live call made yet' },
      { name: 'Prompt-injection testing' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    description: 'Used across the backend and frontend of my projects.',
    items: [{ name: 'Python' }, { name: 'TypeScript' }],
  },
  {
    id: 'backend',
    title: 'Backend and data',
    description: 'The TravelMate AI backend.',
    items: [
      { name: 'FastAPI' },
      { name: 'Pydantic v2' },
      { name: 'REST API design' },
      { name: 'PostgreSQL' },
      { name: 'SQLAlchemy' },
      { name: 'Alembic migrations' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'TravelMate AI prototype and this portfolio.',
    items: [
      { name: 'React' },
      { name: 'Vite' },
      { name: 'Tailwind CSS' },
      { name: 'Motion for React' },
    ],
  },
  {
    id: 'practice',
    title: 'Engineering practice',
    description: 'Quality checks that run on every change.',
    items: [
      { name: 'pytest' },
      { name: 'Vitest and Testing Library' },
      { name: 'Ruff and mypy (strict)' },
      { name: 'ESLint' },
      { name: 'GitHub Actions CI' },
      { name: 'Git and GitHub' },
    ],
  },
  {
    id: 'business',
    title: 'E-commerce and business',
    description: 'From running my own Amazon seller business.',
    items: [
      { name: 'Product research and demand analysis' },
      { name: 'Amazon marketplace operations' },
      { name: 'Amazon PPC and ad optimization' },
    ],
  },
]
