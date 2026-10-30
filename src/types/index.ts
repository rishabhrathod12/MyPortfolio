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
}

export interface SkillItem {
  name: string
  /** Honest qualifier shown next to the skill, e.g. where it was applied or its current limits. */
  note?: string
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  items: readonly SkillItem[]
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
  category: string
  dates: DateRange
  summary: string
  highlights: readonly string[]
}

export interface EducationEntry {
  id: string
  degree: string
  institution: string
  dates: DateRange
}

export interface LearningTopic {
  name: string
}

export interface LearningSummary {
  heading: string
  description: string
  sources: string
  topics: readonly LearningTopic[]
  applied: string
  disclaimer: string
}

export type FeatureStatus = 'implemented' | 'prototype' | 'planned'

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

export interface Project {
  id: string
  name: string
  tagline: string
  overview: string
  problem: string
  /** Plain statement of how far the project has actually got. */
  currentState: string
  features: readonly ProjectFeature[]
  stack: readonly StackGroup[]
  architecture: readonly ArchitectureLayer[]
  /** Things that are deliberately not claimed. */
  limitations: readonly string[]
  repoUrl: string
  /** Only set when a live demo really exists. */
  demoUrl?: string
  /** ISO date the repository was last compared against this description. */
  lastReviewed: string
}

export interface ContactInfo {
  heading: string
  message: string
}
