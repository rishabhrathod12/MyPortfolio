import { render, screen, within } from '@testing-library/react'
import App from './App'
import { contact, profile, socialLinks } from '@/data/profile'
import { education } from '@/data/education'
import { experience } from '@/data/experience'
import { learning } from '@/data/learning'
import { navItems } from '@/data/nav'
import { skillGroups } from '@/data/skills'

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

  it('renders every skill group and skill', () => {
    render(<App />)
    const skills = screen.getByRole('region', { name: 'Technical skills' })
    for (const group of skillGroups) {
      expect(within(skills).getByRole('heading', { name: group.title })).toBeInTheDocument()
      for (const item of group.items) {
        expect(within(skills).getAllByText(item.name, { exact: false }).length).toBeGreaterThan(0)
      }
    }
  })

  it('renders the Amazon experience with its dates and highlights', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Professional experience' })
    for (const entry of experience) {
      expect(within(section).getByRole('heading', { name: entry.role })).toBeInTheDocument()
      expect(within(section).getByText(entry.dates.display)).toBeInTheDocument()
      for (const highlight of entry.highlights) {
        expect(within(section).getByText(highlight)).toBeInTheDocument()
      }
    }
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

  it('renders the self-directed learning disclaimer', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: learning.heading })
    expect(within(section).getByText(learning.disclaimer)).toBeInTheDocument()
    for (const topic of learning.topics) {
      expect(within(section).getByText(topic.name)).toBeInTheDocument()
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
      expect(anchor.getAttribute('href')).toMatch(/^(#\S+|https:\/\/\S+)$/)
    }
  })
})
