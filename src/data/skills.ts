import type { Skill } from '@/types'

/**
 * The approved skill list, in display order. Nothing else is shown as a skill.
 * `icon` is only a key: which glyph or logo it draws is decided in components/icons/skillIcons.tsx.
 */
export const skills: readonly Skill[] = [
  { id: 'python', name: 'Python', icon: 'python' },
  { id: 'machine-learning', name: 'Machine Learning', icon: 'machine-learning' },
  { id: 'deep-learning', name: 'Deep Learning', icon: 'deep-learning' },
  { id: 'generative-ai', name: 'Generative AI', icon: 'generative-ai' },
  { id: 'agentic-ai', name: 'Agentic AI', icon: 'agentic-ai' },
  { id: 'llm', name: 'Large Language Models (LLMs)', icon: 'llm' },
  { id: 'langchain', name: 'LangChain', icon: 'langchain' },
  { id: 'langgraph', name: 'LangGraph', icon: 'langgraph' },
  { id: 'prompt-engineering', name: 'Prompt Engineering', icon: 'prompt-engineering' },
  { id: 'rag', name: 'Retrieval-Augmented Generation (RAG)', icon: 'rag' },
  { id: 'sql', name: 'SQL', icon: 'sql' },
  { id: 'pandas', name: 'Pandas', icon: 'pandas' },
  { id: 'numpy', name: 'NumPy', icon: 'numpy' },
  { id: 'scikit-learn', name: 'Scikit-learn', icon: 'scikit-learn' },
  { id: 'matplotlib', name: 'Matplotlib', icon: 'matplotlib' },
  { id: 'seaborn', name: 'Seaborn', icon: 'seaborn' },
  { id: 'tensorflow', name: 'TensorFlow', icon: 'tensorflow' },
  { id: 'fastapi', name: 'FastAPI', icon: 'fastapi' },
]
