import {
  BrainCircuit,
  Bot,
  Database,
  FileSearch,
  MessageSquareText,
  Network,
  Sparkles,
  TextCursorInput,
} from 'lucide-react'
import type { ComponentType } from 'react'
import {
  siLangchain,
  siLanggraph,
  siNumpy,
  siPandas,
  siPython,
  siScikitlearn,
  type SimpleIcon,
} from 'simple-icons'
import type { SkillIconKey } from '@/types'

interface IconProps {
  className?: string
}

/** Authentic brand mark from Simple Icons (CC0), drawn in the current text colour. */
function brandIcon(icon: SimpleIcon): ComponentType<IconProps> {
  function BrandIcon({ className }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className={className}
      >
        <path d={icon.path} />
      </svg>
    )
  }
  return BrandIcon
}

/** Neutral glyph for a concept or a language with no single logo. Deliberately not a brand mark. */
function glyph(Icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>) {
  function Glyph({ className }: IconProps) {
    return <Icon className={className} aria-hidden={true} />
  }
  return Glyph
}

/**
 * Logos only where the skill is a specific tool or language that has one. Concepts (machine learning,
 * RAG, prompt engineering...) and SQL, a language family, get a plain glyph instead of a borrowed logo.
 */
export const skillIcons: Record<SkillIconKey, ComponentType<IconProps>> = {
  python: brandIcon(siPython),
  langchain: brandIcon(siLangchain),
  langgraph: brandIcon(siLanggraph),
  pandas: brandIcon(siPandas),
  numpy: brandIcon(siNumpy),
  'scikit-learn': brandIcon(siScikitlearn),
  'machine-learning': glyph(BrainCircuit),
  'deep-learning': glyph(Network),
  'generative-ai': glyph(Sparkles),
  'agentic-ai': glyph(Bot),
  llm: glyph(MessageSquareText),
  'prompt-engineering': glyph(TextCursorInput),
  rag: glyph(FileSearch),
  sql: glyph(Database),
}
