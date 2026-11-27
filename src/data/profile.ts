import type { ContactInfo, Profile, SocialLink } from '@/types'

export const profile: Profile = {
  name: 'Rishabh Rathod',
  title: 'AI Engineer | Generative AI | LLMs | RAG | Agentic AI | Machine Learning | Deep Learning',
  location: 'India',
  heroIntro:
    'I am an AI/ML Engineer with 3+ years of experience building intelligent applications using Machine Learning, Deep Learning, Generative AI, Large Language Models, RAG, and Agentic AI. Alongside my technical career, I bring 4+ years of business and entrepreneurship experience, helping me understand real-world business problems and build practical, business-focused AI solutions.',
  photoAlt: 'Portrait of Rishabh Rathod',
  aboutParagraphs: [
    'I am an AI Engineer with 3+ years of experience building intelligent applications using Machine Learning, Generative AI, Large Language Models, RAG, and Agentic AI.',
    'My technical interests include Python, Machine Learning, Deep Learning, LLM-powered applications, AI agents, and intelligent workflow automation.',
    'I enjoy turning AI concepts into practical applications, exploring new technologies, and solving real-world problems through software.',
    'Alongside my technical career, my 4+ years of business and entrepreneurship experience has helped me develop problem-solving, analytical thinking, and business understanding.',
  ],
}

export const socialLinks: readonly SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/rishabhrathod12', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rishabh-rathod-6a199b37b/',
    icon: 'linkedin',
  },
]

export const contact: ContactInfo = {
  heading: 'Get in touch',
  message:
    'I am open to conversations about AI engineering roles and projects. You can email or call me directly, or message me on LinkedIn; my code and project history are on GitHub.',
  email: 'rishabhrathod12@gmail.com',
  phone: '+91 81093 32360',
  phoneHref: '+918109332360',
}

export const experienceHighlights: readonly { value: string; label: string }[] = [
  { value: '3+ Years', label: 'AI/ML Engineering Experience' },
  { value: '4+ Years', label: 'Business & Entrepreneurship Experience' },
]

export const heroSkills: readonly string[] = [
  'Machine Learning',
  'Deep Learning',
  'Python',
  'NLP',
  'Generative AI',
  'LLMs',
  'RAG',
  'Agentic AI',
  'LangChain / LangGraph',
  'Vector Databases',
  'SQL',
]
