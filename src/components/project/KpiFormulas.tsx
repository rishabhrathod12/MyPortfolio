import { GlassCard } from '@/components/ui/GlassCard'
import type { KpiFormula } from '@/types'

export function KpiFormulas({ intro, items }: { intro: string; items: readonly KpiFormula[] }) {
  return (
    <div className="space-y-5">
      <p className="max-w-3xl leading-relaxed text-slate-300">{intro}</p>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((kpi) => (
          <GlassCard key={kpi.name}>
            <dt className="font-semibold text-white">{kpi.name}</dt>
            <dd className="mt-2 font-mono text-sm text-accent-cyan">{kpi.formula}</dd>
            <dd className="mt-2 text-sm text-slate-400">{kpi.note}</dd>
          </GlassCard>
        ))}
      </dl>
    </div>
  )
}
