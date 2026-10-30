import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

const variants = {
  primary: 'bg-gradient-to-r from-accent-blue to-accent-cyan text-ink-950 hover:brightness-110',
  secondary: 'border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10',
}

/** Link styled as a button. Every call-to-action here navigates, so it is always an anchor. */
export function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  )
}
