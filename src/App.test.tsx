import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { contact, profile, socialLinks } from '@/data/profile'
import { education } from '@/data/education'
import { experience } from '@/data/experience'
import { focus } from '@/data/focus'
import { navItems } from '@/data/nav'
import { projects } from '@/data/projects'

const project = projects[0]!

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  document.title = 'Rishabh Rathod | AI Engineer'
})

describe('App', () => {
  it('renders the site owner name as the single main heading', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
  })

  it('renders a section for every nav item so anchors resolve', () => {
    const { container } = render(<App />)
    for (const item of navItems) {
      expect(container.querySelector(`section#${item.id}`)).not.toBeNull()
    }
  })

  it('orders the page: identity, skills, projects, introduction, focus, experience, education, contact', () => {
    const { container } = render(<App />)
    const ids = Array.from(container.querySelectorAll('main > section')).map((section) => section.id)
    expect(ids).toEqual([
      'top',
      'skills',
      'projects',
      'about',
      'focus',
      'experience',
      'education',
      'contact',
    ])
    expect(navItems.map((item) => item.id)).toEqual(ids.slice(1))
  })

  it('offers a skip link to the main content', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
  })
})

describe('Hero', () => {
  it('shows the title, intro and both calls to action', () => {
    render(<App />)
    const hero = screen.getByRole('region', { name: 'Introduction' })
    expect(within(hero).getByText(profile.title)).toBeInTheDocument()
    expect(within(hero).getByText(profile.heroIntro)).toBeInTheDocument()
    expect(within(hero).getByRole('link', { name: /View Projects/ })).toHaveAttribute(
      'href',
      '#projects',
    )
    expect(within(hero).getByRole('link', { name: 'Contact Me' })).toHaveAttribute(
      'href',
      '#contact',
    )
  })

  it('links to GitHub and LinkedIn in a new tab safely', () => {
    render(<App />)
    const hero = screen.getByRole('region', { name: 'Introduction' })
    for (const link of socialLinks) {
      const anchor = within(hero).getByRole('link', { name: `${link.label} (opens in a new tab)` })
      expect(anchor).toHaveAttribute('href', link.href)
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})

describe('content sections', () => {
  it('renders the About paragraphs and fact card', () => {
    render(<App />)
    for (const paragraph of profile.aboutParagraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
    expect(screen.getByText('At a glance')).toBeInTheDocument()
  })

  it('shows the profile photo with meaningful alt text in the About section', () => {
    render(<App />)
    const about = screen.getByRole('region', { name: 'About' })
    const photo = within(about).getByRole('img', { name: profile.photoAlt })
    expect(photo).toHaveAttribute('src')
    expect(photo.getAttribute('src')).toMatch(/profile.*.jpg/)
    expect(photo).toHaveAttribute('width', '600')
    expect(photo).toHaveAttribute('height', '600')
  })

  it('renders the technical focus topics under the new heading', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Technical Focus & Areas of Interest' })
    const items = within(section).getAllByRole('listitem')
    expect(items.map((item) => item.textContent)).toEqual(focus.topics.map((topic) => topic.name))
    expect(screen.queryByText(/self-directed/i)).toBeNull()
  })

  it('keeps the Amazon experience short: title, dates and one sentence', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Professional Experience' })
    for (const entry of experience) {
      expect(within(section).getByRole('heading', { name: entry.role })).toBeInTheDocument()
      expect(within(section).getByText(entry.dates.display)).toBeInTheDocument()
      expect(within(section).getByText(entry.summary)).toBeInTheDocument()
    }
    expect(within(section).queryAllByRole('listitem')).toHaveLength(experience.length)
  })

  it('renders the education entry', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Education' })
    for (const entry of education) {
      expect(within(section).getByRole('heading', { name: entry.degree })).toBeInTheDocument()
      expect(within(section).getByText(entry.institution)).toBeInTheDocument()
      expect(within(section).getByText(entry.dates.display)).toBeInTheDocument()
    }
  })

  it('renders contact links to GitHub and LinkedIn and no email link', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: contact.heading })
    for (const link of socialLinks) {
      expect(
        within(section).getByRole('link', { name: `${link.label} (opens in a new tab)` }),
      ).toHaveAttribute('href', link.href)
    }
    expect(section.querySelector('a[href^="mailto:"]')).toBeNull()
  })

  it('has no empty links', () => {
    const { container } = render(<App />)
    for (const anchor of container.querySelectorAll('a')) {
      expect(anchor.getAttribute('href')).toMatch(/^(#\S+|\/projects\/\S+|https:\/\/\S+)$/)
    }
  })
})

describe('project navigation', () => {
  it('keeps project detail off the main page', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Featured Projects' })
    for (const heading of ['Key Features', 'Technology Stack', 'Architecture Overview']) {
      expect(screen.queryByRole('heading', { name: heading })).toBeNull()
    }
    for (const feature of project.features) {
      expect(within(section).queryByText(feature.title)).toBeNull()
    }
    for (const layer of project.architecture) {
      expect(within(section).queryByText(layer.name)).toBeNull()
    }
  })

  it('opens the project details page from the card and returns with the back link', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: `View Details: ${project.name}` }))

    expect(window.location.pathname).toBe(`/projects/${project.id}`)
    expect(screen.getByRole('heading', { level: 1, name: project.name })).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Introduction' })).toBeNull()
    expect(document.title).toBe(`${project.name} | Rishabh Rathod`)
    expect(screen.getByRole('heading', { level: 1, name: project.name })).toHaveFocus()

    await user.click(screen.getByRole('link', { name: /Back to projects/ }))

    expect(window.location.pathname).toBe('/')
    expect(window.location.hash).toBe('#projects')
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
    expect(document.title).toBe('Rishabh Rathod | AI Engineer')
  })

  it('points the navbar at home-page sections while on a detail page', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: `View Details: ${project.name}` }))

    const nav = screen.getByRole('navigation', { name: 'Primary' })
    for (const item of navItems) {
      expect(nav.querySelector(`a[href="/#${item.id}"]`)).not.toBeNull()
    }
  })

  it('shows a not-found page for an unknown address', () => {
    window.history.replaceState(null, '', '/projects/does-not-exist')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to the portfolio' })).toHaveAttribute('href', '/')
  })

  it('opens a project details page directly from its address', () => {
    window.history.replaceState(null, '', `/projects/${project.id}`)
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: project.name })).toBeInTheDocument()
  })
})
