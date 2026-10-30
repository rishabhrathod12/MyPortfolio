import { render, screen, within } from '@testing-library/react'
import { LazyMotion, domAnimation } from 'motion/react'
import { skillIcons } from '@/components/icons/skillIcons'
import { skills } from '@/data/skills'
import { Skills } from './Skills'

function renderSkills() {
  return render(
    <LazyMotion features={domAnimation} strict>
      <Skills />
    </LazyMotion>,
  )
}

describe('Skills section', () => {
  it('has a centred level-2 heading "Technical Skills"', () => {
    renderSkills()
    const heading = screen.getByRole('heading', { level: 2, name: 'Technical Skills' })
    expect(heading).toHaveClass('text-indigo-400')
    expect(heading.parentElement).toHaveClass('text-center')
  })

  it('renders one card per approved skill and nothing else', () => {
    renderSkills()
    const list = screen.getByRole('list', { name: 'Technical skills' })
    const items = within(list).getAllByRole('listitem')
    expect(items.map((item) => item.textContent)).toEqual(skills.map((skill) => skill.name))
    expect(items).toHaveLength(18)
  })

  it('has dropped the old categories and unrelated technologies', () => {
    renderSkills()
    for (const old of [
      'AI and machine learning',
      'Agentic systems',
      'Languages',
      'Backend and data',
      'Frontend',
      'Engineering practice',
      'E-commerce and business',
    ]) {
      expect(screen.queryByText(old)).toBeNull()
    }
    for (const unrelated of ['React', 'TypeScript', 'Tailwind', 'Docker', 'PostgreSQL']) {
      expect(screen.queryByText(unrelated, { exact: false })).toBeNull()
    }
  })

  it('decorates every card with a hidden icon and keeps the name as the accessible text', () => {
    renderSkills()
    const items = within(screen.getByRole('list', { name: 'Technical skills' })).getAllByRole(
      'listitem',
    )
    for (const item of items) {
      const icon = item.querySelector('svg')
      expect(icon).not.toBeNull()
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('has an icon for every skill key', () => {
    for (const skill of skills) {
      expect(skillIcons[skill.icon], `icon for ${skill.name}`).toBeDefined()
    }
  })
})
