import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from './Navbar'
import { navItems } from '@/data/nav'

describe('Navbar', () => {
  it('lists every section in the primary navigation', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    for (const item of navItems) {
      expect(nav.querySelector(`a[href="#${item.id}"]`)).not.toBeNull()
    }
  })

  it('toggles the mobile menu with correct aria state', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const button = screen.getByRole('button', { name: 'Open menu' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).toBeNull()

    await user.click(button)
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument()
  })

  it('closes the menu on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus()
  })

  it('closes the menu after choosing a link', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    const mobile = screen.getByRole('navigation', { name: 'Mobile' })
    await user.click(mobile.querySelector('a[href="#about"]') as HTMLElement)
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).toBeNull()
  })
})
