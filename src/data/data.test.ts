import { contact, profile, socialLinks } from './profile'
import { education } from './education'
import { experience } from './experience'
import { learning } from './learning'
import { navItems } from './nav'
import { projects } from './projects'
import { skills } from './skills'

const allText = JSON.stringify({
  profile,
  contact,
  skills,
  experience,
  education,
  learning,
  projects,
})

describe('navigation and links', () => {
  it('has unique nav ids', () => {
    const ids = navItems.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('uses https for every social link', () => {
    for (const link of socialLinks) {
      expect(new URL(link.href).protocol).toBe('https:')
    }
  })

  it('points social links at the owner accounts', () => {
    const hrefs = socialLinks.map((link) => link.href)
    expect(hrefs).toContain('https://github.com/rishabhrathod12')
    expect(hrefs).toContain('https://www.linkedin.com/in/rishabh-rathod-6a199b37b/')
  })
})

describe('profile', () => {
  it('has the agreed identity', () => {
    expect(profile.name).toBe('Rishabh Rathod')
    expect(profile.title).toBe('AI Engineer | Generative AI | Agentic AI')
    expect(profile.location).toBe('India')
  })

  it('does not publish an email address', () => {
    expect(allText).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/)
    expect(allText).not.toMatch(/mailto:/i)
  })

  it('lists exactly the approved skills, in order, with no duplicates', () => {
    expect(skills.map((skill) => skill.name)).toEqual([
      'Python',
      'Machine Learning',
      'Deep Learning',
      'Generative AI',
      'Agentic AI',
      'Large Language Models (LLMs)',
      'LangChain',
      'LangGraph',
      'Prompt Engineering',
      'Retrieval-Augmented Generation (RAG)',
      'SQL',
      'Pandas',
      'NumPy',
      'Scikit-learn',
    ])
    expect(new Set(skills.map((skill) => skill.id)).size).toBe(skills.length)
  })
})

describe('honest background', () => {
  it('lists the Amazon business with the agreed dates', () => {
    const entry = experience[0]
    expect(experience).toHaveLength(1)
    expect(entry?.dates.display).toBe('April 2019 – March 2026')
    expect(entry?.category).toBe('Toys')
  })

  it('shows only the B.Tech with the agreed institution and years, without a branch', () => {
    expect(education).toHaveLength(1)
    const entry = education[0]
    expect(entry?.degree).toBe('Bachelor of Technology (B.Tech)')
    expect(entry?.institution).toBe('Rajiv Gandhi Proudyogiki Vishwavidyalaya')
    expect(entry?.dates.display).toBe('2014 – 2018')
    expect(JSON.stringify(education)).not.toMatch(
      /computer|electronics|mechanical|civil|electrical|information technology|specializ/i,
    )
  })

  it('describes AI knowledge as self-directed learning from YouTube', () => {
    expect(learning.sources).toMatch(/YouTube/)
    expect(learning.disclaimer).toMatch(/not a formal course or certification/)
    expect(learning.topics.map((topic) => topic.name)).toEqual([
      'Python',
      'Machine learning',
      'Deep learning',
      'Generative AI',
      'Agentic AI',
    ])
  })

  it('does not claim certifications, AI employment or revenue figures', () => {
    const withoutDisclaimer = allText.replace(learning.disclaimer, '')
    expect(withoutDisclaimer).not.toMatch(/certified|certificate|certification/i)
    expect(allText).not.toMatch(/[$₹]\s?\d|\d+\s?(%|crore|lakh)|revenue|sales of/i)
    expect(experience.map((entry) => entry.organization).join(' ')).not.toMatch(/AI/)
  })

  it('has experience and education dates in order', () => {
    for (const entry of [...experience, ...education]) {
      expect(entry.dates.start <= entry.dates.end).toBe(true)
    }
  })
})
