import { render, screen, within } from '@testing-library/react'
import { LazyMotion, domAnimation } from 'motion/react'
import { projects } from '@/data/projects'
import { formatIsoDate } from '@/lib/format'
import { ProjectDetailPage } from './ProjectDetailPage'

const project = projects[0]!

function renderPage() {
  return render(
    <LazyMotion features={domAnimation} strict>
      <ProjectDetailPage project={project} />
    </LazyMotion>,
  )
}

const SECTION_HEADINGS = [
  'Project Overview',
  'Problem Statement',
  'Key Features',
  'Technology Stack',
  'Architecture Overview',
  'Implementation Status',
  'Limitations and Future Scope',
  'GitHub Repository',
]

describe('ProjectDetailPage', () => {
  it('has the project name as the single h1 and a link back to the projects section', () => {
    renderPage()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1, name: project.name })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Back to projects/ })).toHaveAttribute('href', '/#projects')
  })

  it('shows the eight required sections in order', () => {
    renderPage()
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings).toEqual(SECTION_HEADINGS)
  })

  it('shows the overview, problem statement and stack from the data', () => {
    renderPage()
    expect(screen.getByText(project.overview)).toBeInTheDocument()
    expect(screen.getByText(project.problem)).toBeInTheDocument()
    for (const group of project.stack) {
      expect(screen.getByText(group.label)).toBeInTheDocument()
      for (const item of group.items) expect(screen.getByText(item)).toBeInTheDocument()
    }
  })

  it('labels every feature with its real status and keeps unbuilt ones as Planned', () => {
    renderPage()
    const section = screen.getByRole('region', { name: 'Key Features' })
    for (const feature of project.features) {
      const card = within(section).getByRole('heading', { name: feature.title }).closest('li')!
      const label = feature.status[0]!.toUpperCase() + feature.status.slice(1)
      expect(within(card).getByText(label)).toBeInTheDocument()
    }
    const liveModel = within(section).getByRole('heading', { name: 'Live AI model' }).closest('li')!
    expect(within(liveModel).getByText('Planned')).toBeInTheDocument()
  })

  it('lists the architecture layers in order', () => {
    renderPage()
    const diagram = screen.getByRole('list', { name: /Architecture layers/ })
    const names = within(diagram)
      .getAllByRole('listitem')
      .map((item) => item.textContent ?? '')
      .filter((text) => text !== '')
    expect(names).toHaveLength(project.architecture.length)
    project.architecture.forEach((layer, index) => expect(names[index]).toContain(layer.name))
  })

  it('groups features by implementation status and states the review date', () => {
    renderPage()
    const section = screen.getByRole('region', { name: 'Implementation Status' })
    for (const [status, label] of [
      ['implemented', 'Implemented'],
      ['prototype', 'Prototype'],
      ['planned', 'Planned'],
    ] as const) {
      const list = within(section).getByRole('list', { name: `${label} features` })
      const expected = project.features.filter((f) => f.status === status).map((f) => f.title)
      expect(within(list).getAllByRole('listitem').map((li) => li.textContent)).toEqual(expected)
      expect(within(section).getByText(project.statusNotes[status])).toBeInTheDocument()
    }
    expect(within(section).getByText(formatIsoDate(project.lastReviewed), { exact: false })).toBeInTheDocument()
  })

  it('lists limitations and the planned items as future scope', () => {
    renderPage()
    const section = screen.getByRole('region', { name: 'Limitations and Future Scope' })
    for (const limitation of project.limitations) {
      expect(within(section).getByText(limitation)).toBeInTheDocument()
    }
    for (const feature of project.features.filter((f) => f.status === 'planned')) {
      expect(within(section).getByText(`${feature.title}.`)).toBeInTheDocument()
    }
  })

  it('links to the GitHub repository safely, and has no demo link', () => {
    renderPage()
    const links = screen
      .getAllByRole('link', { name: /GitHub|repository/i })
      .filter((a) => a.getAttribute('href') === project.repoUrl)
    expect(links.length).toBeGreaterThanOrEqual(2)
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    expect(screen.queryByRole('link', { name: /demo/i })).toBeNull()
  })

  it('updates the page title and restores it on leaving', () => {
    document.title = 'Home title'
    const { unmount } = renderPage()
    expect(document.title).toBe(`${project.name} | Rishabh Rathod`)
    unmount()
    expect(document.title).toBe('Home title')
  })
})
