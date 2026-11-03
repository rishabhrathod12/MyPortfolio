import { render, screen, within } from '@testing-library/react'
import { LazyMotion, domAnimation } from 'motion/react'
import { projects } from '@/data/projects'
import { Projects } from './Projects'

function renderProjects() {
  return render(
    <LazyMotion features={domAnimation} strict>
      <Projects />
    </LazyMotion>,
  )
}

const project = projects.find((item) => item.id === 'travelmate-ai')!

describe('Projects section (cards only)', () => {
  it('has the Featured Projects heading and one card per project', () => {
    renderProjects()
    expect(screen.getByRole('heading', { level: 2, name: 'Featured Projects' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(projects.length)
  })

  it('shows the name, cover image, short description and technology highlights', () => {
    renderProjects()
    const card = screen.getByRole('article', { name: project.name })
    expect(within(card).getByRole('heading', { level: 3, name: project.name })).toBeInTheDocument()
    expect(within(card).getByRole('img', { name: project.coverAlt })).toHaveAttribute('src')
    expect(within(card).getByText(project.shortDescription)).toBeInTheDocument()
    const highlights = within(
      within(card).getByRole('list', { name: 'Technology highlights' }),
    ).getAllByRole('listitem')
    expect(highlights.map((item) => item.textContent)).toEqual(project.highlights)
  })

  it('has a View Details link to the project page and a safe GitHub link', () => {
    renderProjects()
    const card = screen.getByRole('article', { name: project.name })
    expect(within(card).getByRole('link', { name: `View Details: ${project.name}` })).toHaveAttribute(
      'href',
      `/projects/${project.id}`,
    )
    const github = within(card).getByRole('link', { name: `${project.name} on GitHub (opens in a new tab)` })
    expect(github).toHaveAttribute('href', project.repoUrl)
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('contains only card content: no features, stack, architecture or status badges', () => {
    renderProjects()
    const section = screen.getByRole('article', { name: project.name })
    for (const feature of project.features) {
      expect(within(section).queryByText(feature.title)).toBeNull()
    }
    for (const layer of project.architecture) {
      expect(within(section).queryByText(layer.name)).toBeNull()
    }
    for (const word of ['Implemented', 'Prototype', 'Planned', 'Architecture', 'Key Features']) {
      expect(within(section).queryByText(word)).toBeNull()
    }
    expect(within(section).getAllByRole('link')).toHaveLength(2)
  })

  it('does not render a demo link because no demo exists', () => {
    renderProjects()
    expect(screen.queryByRole('link', { name: /demo/i })).toBeNull()
  })
})
