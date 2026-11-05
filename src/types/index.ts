export interface NavItem {
  id: string
  label: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin'
}

export interface Profile {
  name: string
  title: string
  location: string
  heroIntro: string
  aboutParagraphs: readonly string[]
  /** Meaningful alternative text for the portrait shown in the About section. */
  photoAlt: string
}

/** Keys of the icons the Skills section can draw. The drawing lives in components/icons/skillIcons.tsx. */
export type SkillIconKey =
  | 'python'
  | 'machine-learning'
  | 'deep-learning'
  | 'nlp'
  | 'mcp'
  | 'generative-ai'
  | 'agentic-ai'
  | 'llm'
  | 'langchain'
  | 'langgraph'
  | 'prompt-engineering'
  | 'rag'
  | 'sql'
  | 'pandas'
  | 'numpy'
  | 'scikit-learn'
  | 'matplotlib'
  | 'seaborn'
  | 'tensorflow'
  | 'fastapi'

export interface Skill {
  id: string
  name: string
  icon: SkillIconKey
}

/** Dates are ISO year-month so they can be sorted and validated; `display` is what the UI shows. */
export interface DateRange {
  start: string
  end: string
  display: string
}

export interface ExperienceEntry {
  id: string
  role: string
  organization: string
  dates: DateRange
  summary: string
}

export interface EducationEntry {
  id: string
  degree: string
  institution: string
  dates: DateRange
}

export interface FocusTopic {
  name: string
}

export interface TechnicalFocus {
  heading: string
  topics: readonly FocusTopic[]
}

/** `future` is for work that depends on something outside the project, such as external API access. */
export type FeatureStatus = 'implemented' | 'prototype' | 'planned' | 'future'

/** Per-project wording for a status, for example showing `prototype` as "In Progress". */
export type StatusLabels = Partial<Record<FeatureStatus, string>>

export interface ProjectFeature {
  id: string
  title: string
  description: string
  status: FeatureStatus
}

export interface ArchitectureLayer {
  id: string
  name: string
  description: string
  status: FeatureStatus
}

export interface StackGroup {
  label: string
  items: readonly string[]
}

export interface ProjectScreenshot {
  /** File name (without extension) in src/assets/projects/<project id>/, mapped in components/project/covers.ts. */
  file: string
  title: string
  caption: string
  alt: string
}

export interface ScreenshotGroup {
  id: string
  label: string
  description: string
  shots: readonly ProjectScreenshot[]
}

/** One side of a comparison, for example company documents versus personal uploads. */
export interface ComparisonColumn {
  title: string
  points: readonly string[]
}

/** A titled group of status-labelled items, with a short introduction. */
export interface ProjectSection {
  intro: string
  items: readonly ProjectFeature[]
}

export interface AgentSection extends ProjectSection {
  /** Plain steps describing how a request moves through the agents. */
  workflow: readonly string[]
}

export interface KpiFormula {
  name: string
  formula: string
  note: string
}

export interface Project {
  /** Also the URL slug: the detail page lives at /projects/<id>. */
  id: string
  name: string
  tagline: string
  /** One or two sentences for the card on the main page. */
  shortDescription: string
  /** A few technology names for the card. The full stack is on the detail page only. */
  highlights: readonly string[]
  /** Alt text for the cover image (the image itself is mapped in components/project/covers.ts). */
  coverAlt: string
  overview: string
  problem: string
  /** Plain statement of how far the project has actually got. */
  currentState: string
  features: readonly ProjectFeature[]
  stack: readonly StackGroup[]
  architecture: readonly ArchitectureLayer[]
  /** What each status means for this project, shown on the detail page. `future` is optional. */
  statusNotes: Record<'implemented' | 'prototype' | 'planned', string> &
    Partial<Record<'future', string>>
  /** Optional wording for statuses on this project's pages. Defaults are in components/ui/StatusBadge.tsx. */
  statusLabels?: StatusLabels
  /** Optional category tags and one-line state, shown in the detail page hero. */
  categories?: readonly string[]
  projectStatus?: string
  /** Things that are deliberately not claimed. */
  limitations: readonly string[]
  repoUrl: string
  /** Only set when a live demo really exists. */
  demoUrl?: string
  /** ISO date the repository was last compared against this description. */
  lastReviewed: string
  /** Optional case-study sections. A project without them shows the standard page only. */
  documentAccess?: { intro: string; columns: readonly ComparisonColumn[] }
  gallery?: readonly ScreenshotGroup[]
  /** Clearly labelled demo deployment notes. */
  deploymentNotes?: readonly string[]
  /** What was built and learned, with no invented metrics. */
  outcomes?: readonly string[]
  /** Optional case-study sections for a multi-agent project. */
  kpis?: { intro: string; items: readonly KpiFormula[] }
  agents?: AgentSection
  capabilities?: ProjectSection
  integration?: ProjectSection
  safety?: ProjectSection
  roadmap?: ProjectSection
}

export interface ContactInfo {
  heading: string
  message: string
  email: string
  /** Display format, for example "+91 81093 32360". */
  phone: string
  /** Digits with country code, used for the tel: link. */
  phoneHref: string
}
