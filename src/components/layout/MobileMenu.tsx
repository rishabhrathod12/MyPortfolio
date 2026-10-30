import type { NavItem } from '@/types'
import { AppLink } from '@/components/ui/AppLink'
import { cn } from '@/lib/cn'

interface MobileMenuProps {
  id: string
  items: readonly NavItem[]
  /** "" on the home page, "/" elsewhere so links lead back to a section of the home page. */
  hrefPrefix: string
  activeId: string | null
  onNavigate: () => void
}

export function MobileMenu({ id, items, hrefPrefix, activeId, onNavigate }: MobileMenuProps) {
  return (
    <nav id={id} aria-label="Mobile" className="border-t border-white/10 bg-ink-950/95 md:hidden">
      <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
        {items.map((item) => (
          <li key={item.id}>
            <AppLink
              href={`${hrefPrefix}#${item.id}`}
              onClick={onNavigate}
              aria-current={activeId === item.id ? 'true' : undefined}
              className={cn(
                'block rounded-md px-3 py-3 text-base text-slate-300 hover:bg-white/5 hover:text-white',
                activeId === item.id && 'text-accent-cyan',
              )}
            >
              {item.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
