import type { ReactNode } from 'react'
import * as m from 'motion/react-m'

/** Fades and lifts content in once as it enters the viewport. Honors reduced-motion via MotionConfig. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  )
}
