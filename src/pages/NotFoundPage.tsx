import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { usePageMeta } from '@/hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta('Page not found | Rishabh Rathod', 'This page does not exist.')
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-4xl font-bold text-white outline-none"
      >
        Page not found
      </h1>
      <p className="mt-3 text-slate-300">The page you are looking for does not exist.</p>
      <Button href="/" className="mt-6">
        Back to the portfolio
      </Button>
    </Container>
  )
}
