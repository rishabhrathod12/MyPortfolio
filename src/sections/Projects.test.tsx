import { render, screen, within } from '@testing-library/react'
import { LazyMotion, domAnimation } from 'motion/react'
import { projects } from '@/data/projects'
import { formatIsoDate } from '@/lib/format'
import { Projects } from './Projects'

function renderProjects() {
  return render(
    <LazyMotion features={domAnimation} strict>
      <Projects />
    </LazyMotion>,
  )
}

const project = projects[0]!

describe('Projects section', () => {
  it('shows the TravelMate AI project with its tagline and current state', () => {
    renderProjects()
    expect(screen.getByRole('heading', { name: project.name })).toBeInTheDocument()
    expect(screen.getByText(project.tagline)).toBeInTheDocument()
    expect(screen.getByText(project.currentState, { exact: false })).toBeInTheDocument()
  })

  it('links to the GitHub repository in a new tab', () => {
    renderProjects()
    const link = screen.getByRole('link', { name: /TravelMate AI on GitHub/ })
    expect(link).toHaveAttribute('href', project.repoUrl)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not render a demo button because no demo exists', () => {
    renderProjects()
    expect(screen.queryByRole('link', { name: /demo/i })).toBeNull()
  })

  it('renders overview, problem, features, stack, architecture and limitations', () => {
    renderProjects()
    for (const title of [
      'Overview',
      'The problem',
      'Key features',
      'Technology stack',
      'Architecture overview',
      'What this project does not claim',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
    expect(screen.getByText(project.overview)).toBeInTheDocument()
    expect(screen.getByText(project.problem)).toBeInTheDocument()
    for (const limitation of project.limitations) {
      expect(screen.getByText(limitation)).toBeInTheDocument()
    }
  })

  it('labels every feature with its status and keeps planned features as Planned', () => {
    renderProjects()
    for (const feature of project.features) {
      const heading = screen.getByRole('heading', { name: feature.title })
      const card = heading.closest('li')!
      const label = feature.status[0]!.toUpperCase() + feature.status.slice(1)
      expect(within(card).getByText(label)).toBeInTheDocument()
    }
    const liveModel = screen.getByRole('heading', { name: 'Live AI model' }).closest('li')!
    expect(within(liveModel).getByText('Planned')).toBeInTheDocument()
  })

  it('lists every architecture layer in order', () => {
    renderProjects()
    const diagram = screen.getByRole('list', { name: /Architecture layers/ })
    const names = within(diagram)
      .getAllByRole('listitem')
      .map((item) => item.textContent ?? '')
      .filter((text) => text !== '')
    expect(names).toHaveLength(project.architecture.length)
    project.architecture.forEach((layer, index) => {
      expect(names[index]).toContain(layer.name)
    })
  })

  it('shows when the repository was last reviewed', () => {
    renderProjects()
    expect(screen.getByText(formatIsoDate(project.lastReviewed), { exact: false })).toBeInTheDocument()
  })
})

describe('formatIsoDate', () => {
  it('formats independent of time zone', () => {
    expect(formatIsoDate('2026-10-30')).toBe('30 October 2026')
  })
})
