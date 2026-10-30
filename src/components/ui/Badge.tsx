import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'neutral' | 'implemented' | 'prototype' | 'planned'

const tones: Record<Tone, string> = {
  neutral: 'border-white/10 bg-white/5 text-slate-300',
  implemented: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  prototype: 'border-blue-400/30 bg-blue-400/10 text-blue-300',
  planned: 'border-slate-500/40 bg-slate-500/10 text-slate-300',
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}
