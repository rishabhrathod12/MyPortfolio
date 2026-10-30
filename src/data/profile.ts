import type { ContactInfo, Profile, SocialLink } from '@/types'

export const profile: Profile = {
  name: 'Rishabh Rathod',
  title: 'AI Engineer | Generative AI | Agentic AI | Machine Learning | Deep Learning',
  location: 'India',
  heroIntro:
    'I build intelligent applications with Generative AI, large language models and AI agents, turning AI concepts into practical software.',
  photoAlt: 'Portrait of Rishabh Rathod',
  aboutParagraphs: [
    'I am an AI Engineer focused on building intelligent applications using Generative AI, Large Language Models, and Agentic AI.',
    'My technical interests include Python, Machine Learning, Deep Learning, LLM-powered applications, AI agents, and intelligent workflow automation.',
    'I enjoy turning AI concepts into practical applications, exploring new technologies, and solving real-world problems through software.',
    'Alongside my technical journey, my experience in entrepreneurship has helped me develop problem-solving, analytical thinking, and business understanding.',
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
    'I am open to conversations about AI engineering roles and projects. The best way to reach me is a message on LinkedIn; my code and project history are on GitHub.',
}
