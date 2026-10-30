import { useSyncExternalStore } from 'react'
import { projects } from '@/data/projects'

export type Route =
  | { name: 'home' }
  | { name: 'project'; slug: string }
  | { name: 'not-found' }

export const projectPath = (slug: string): string => `/projects/${slug}`

/** Pure: maps a URL path to a route. Unknown paths and unknown project slugs are `not-found`. */
export function parseRoute(
  pathname: string,
  slugs: readonly string[] = projects.map((project) => project.id),
): Route {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (path === '/') return { name: 'home' }
  const match = /^\/projects\/([^/]+)$/.exec(path)
  const slug = match?.[1]
  if (slug && slugs.includes(slug)) return { name: 'project', slug }
  return { name: 'not-found' }
}

const NAVIGATE_EVENT = 'app:navigate'

let lastNavigation: 'push' | 'pop' = 'push'

/** Back and forward are left to the browser, which restores the scroll position itself. */
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    lastNavigation = 'pop'
  })
}

export function wasLastNavigationPush(): boolean {
  return lastNavigation === 'push'
}

export function navigate(to: string): void {
  const url = new URL(to, window.location.href)
  lastNavigation = 'push'
  window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('popstate', onChange)
  window.addEventListener(NAVIGATE_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(NAVIGATE_EVENT, onChange)
  }
}

export function usePathname(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => '/',
  )
}

export function useRoute(): Route {
  return parseRoute(usePathname())
}
