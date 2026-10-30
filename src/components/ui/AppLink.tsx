import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { navigate } from '@/lib/router'

/**
 * A normal anchor that navigates inside the app without a page reload. It only takes over plain
 * left-clicks on same-origin links to another path, so middle-click, Ctrl/Cmd-click, "open in new
 * tab", external links and same-page `#hash` links keep their native behaviour.
 */
export function AppLink({ onClick, href, target, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented || !href) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (target && target !== '_self') return

    const url = new URL(href, window.location.href)
    if (url.origin !== window.location.origin) return
    if (url.pathname === window.location.pathname && url.hash) return

    event.preventDefault()
    navigate(href)
  }

  return (
    <a href={href} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
