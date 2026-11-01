import {
  BrainCircuit,
  Bot,
  ChartLine,
  ChartScatter,
  Database,
  FileSearch,
  Languages,
  MessageSquareText,
  Network,
  Sparkles,
  TextCursorInput,
} from 'lucide-react'
import type { ComponentType } from 'react'
import {
  siFastapi,
  siLangchain,
  siLanggraph,
  siModelcontextprotocol,
  siNumpy,
  siPandas,
  siPython,
  siScikitlearn,
  siTensorflow,
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
 * Logos only where the skill is a specific tool or language that has one in Simple Icons.
 * Matplotlib and Seaborn have none there, so they get a plain chart glyph, not a lookalike.
 * Concepts (machine learning,
 * RAG, prompt engineering...) and SQL, a language family, get a plain glyph instead of a borrowed logo.
 */
export const skillIcons: Record<SkillIconKey, ComponentType<IconProps>> = {
  python: brandIcon(siPython),
  langchain: brandIcon(siLangchain),
  langgraph: brandIcon(siLanggraph),
  pandas: brandIcon(siPandas),
  numpy: brandIcon(siNumpy),
  'scikit-learn': brandIcon(siScikitlearn),
  tensorflow: brandIcon(siTensorflow),
  fastapi: brandIcon(siFastapi),
  matplotlib: glyph(ChartLine),
  seaborn: glyph(ChartScatter),
  'machine-learning': glyph(BrainCircuit),
  'deep-learning': glyph(Network),
  nlp: glyph(Languages),
  mcp: brandIcon(siModelcontextprotocol),
  'generative-ai': glyph(Sparkles),
  'agentic-ai': glyph(Bot),
  llm: glyph(MessageSquareText),
  'prompt-engineering': glyph(TextCursorInput),
  rag: glyph(FileSearch),
  sql: glyph(Database),
}
