import { StatusBadge } from '@/components/ui/StatusBadge'
import type { ProjectFeature, StatusLabels } from '@/types'

export function FeatureList({
  features,
  labels,
}: {
  features: readonly ProjectFeature[]
  labels?: StatusLabels
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {features.map((feature) => (
        <li
          key={feature.id}
          className="rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-medium text-white">{feature.title}</h3>
            <StatusBadge status={feature.status} labels={labels} />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
        </li>
      ))}
    </ul>
  )
}
