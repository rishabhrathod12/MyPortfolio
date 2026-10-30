import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: string
  title: string
  eyebrow?: string
  children?: ReactNode
  className?: string
  /** Defaults to left. Centre is opt-in so existing sections keep their layout. */
  align?: 'left' | 'center'
  /** Replaces the default white heading colour. */
  titleClassName?: string
}

export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
  align = 'left',
  titleClassName = 'text-white',
}: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('scroll-mt-20 py-16 md:py-24', className)}
    >
      <Container>
        <header className={cn('mb-10 md:mb-14', align === 'center' && 'text-center')}>
          {eyebrow && (
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-cyan">
              {eyebrow}
            </p>
          )}
          <h2 id={headingId} className={cn('text-3xl font-semibold tracking-tight md:text-4xl', titleClassName)}>
            {title}
          </h2>
        </header>
        {children}
      </Container>
    </section>
  )
}
