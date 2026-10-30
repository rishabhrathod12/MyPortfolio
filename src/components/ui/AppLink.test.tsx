import { fireEvent, render, screen } from '@testing-library/react'
import { AppLink } from './AppLink'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

describe('AppLink', () => {
  it('navigates inside the app on a plain click without reloading', () => {
    render(<AppLink href="/projects/travelmate-ai">Details</AppLink>)
    const notPrevented = fireEvent.click(screen.getByRole('link', { name: 'Details' }))
    expect(notPrevented).toBe(false)
    expect(window.location.pathname).toBe('/projects/travelmate-ai')
  })

  it('leaves modified clicks to the browser so "open in new tab" works', () => {
    render(<AppLink href="/projects/travelmate-ai">Details</AppLink>)
    const link = screen.getByRole('link', { name: 'Details' })
    for (const modifier of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { button: 1 }]) {
      expect(fireEvent.click(link, modifier)).toBe(true)
    }
    expect(window.location.pathname).toBe('/')
  })

  it('leaves external links alone', () => {
    render(<AppLink href="https://github.com/rishabhrathod12">GitHub</AppLink>)
    expect(fireEvent.click(screen.getByRole('link', { name: 'GitHub' }))).toBe(true)
    expect(window.location.pathname).toBe('/')
  })

  it('leaves same-page hash links to the browser', () => {
    render(<AppLink href="#about">About</AppLink>)
    expect(fireEvent.click(screen.getByRole('link', { name: 'About' }))).toBe(true)
  })

  it('leaves links that open a new tab alone', () => {
    render(
      <AppLink href="/projects/travelmate-ai" target="_blank">
        New tab
      </AppLink>,
    )
    expect(fireEvent.click(screen.getByRole('link', { name: 'New tab' }))).toBe(true)
    expect(window.location.pathname).toBe('/')
  })

  it('takes the user home when a hash link is used from another page', () => {
    window.history.replaceState(null, '', '/projects/travelmate-ai')
    render(<AppLink href="/#projects">Back</AppLink>)
    expect(fireEvent.click(screen.getByRole('link', { name: 'Back' }))).toBe(false)
    expect(window.location.pathname).toBe('/')
    expect(window.location.hash).toBe('#projects')
  })
})
