import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/data/nav'
import { profile } from '@/data/profile'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/cn'
import { MobileMenu } from './MobileMenu'

const MENU_ID = 'mobile-menu'
const sectionIds = navItems.map((item) => item.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="text-base font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-cyan"
        >
          {profile.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm text-slate-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-accent-cyan',
                    activeId === item.id && 'text-accent-cyan',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={MENU_ID}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-md p-2 text-slate-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-accent-cyan md:hidden"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <MobileMenu
          id={MENU_ID}
          items={navItems}
          activeId={activeId}
          onNavigate={() => setOpen(false)}
        />
      )}
    </header>
  )
}
