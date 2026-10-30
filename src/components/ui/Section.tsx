import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: string
  title: string
  eyebrow?: string
  children?: ReactNode
  className?: string
}

export function Section({ id, title, eyebrow, children, className }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('scroll-mt-20 py-16 md:py-24', className)}
    >
      <Container>
        <header className="mb-10 md:mb-14">
          {eyebrow && (
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-cyan">
              {eyebrow}
            </p>
          )}
          <h2
            id={headingId}
            className="text-3xl font-semibold tracking-tight text-white md:text-4xl"
          >
            {title}
          </h2>
        </header>
        {children}
      </Container>
    </section>
  )
}
