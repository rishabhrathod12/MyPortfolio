import type { ContactInfo, Profile, SocialLink } from '@/types'

export const profile: Profile = {
  name: 'Rishabh Rathod',
  title: 'AI Engineer | Generative AI | Agentic AI',
  location: 'India',
  heroIntro:
    'I build AI applications with a focus on generative and agentic systems. I taught myself Python, machine learning and deep learning after seven years running my own e-commerce business.',
  aboutParagraphs: [
    'I am an AI engineer based in India. For seven years I ran my own Amazon seller business, where I learned product research, marketplace operations and advertising by doing the work.',
    'In parallel, I taught myself Python, machine learning, deep learning, generative AI and agentic AI through free online resources, primarily YouTube. I applied that learning in TravelMate AI, an agentic travel planner that I am building in the open on GitHub.',
    'I care about AI systems that are testable and honest about what they know. In my projects I label sample data as sample data, keep risky actions behind explicit approval, and write down what is finished and what is not.',
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
