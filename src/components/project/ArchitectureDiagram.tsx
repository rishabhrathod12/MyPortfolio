import { ChevronDown } from 'lucide-react'
import { Fragment } from 'react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { ArchitectureLayer, StatusLabels } from '@/types'

/** Request flow from the interface down to storage and approvals, one layer per row. */
export function ArchitectureDiagram({
  layers,
  labels,
}: {
  layers: readonly ArchitectureLayer[]
  labels?: StatusLabels
}) {
  return (
    <ol aria-label="Architecture layers, from the interface down to storage" className="mx-auto max-w-2xl">
      {layers.map((layer, index) => (
        <Fragment key={layer.id}>
          <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-white">{layer.name}</span>
              <StatusBadge status={layer.status} labels={labels} />
            </div>
            <p className="mt-1 text-sm text-slate-400">{layer.description}</p>
          </li>
          {index < layers.length - 1 && (
            <li aria-hidden="true" className="flex justify-center py-1 text-accent-cyan/70">
              <ChevronDown size={18} />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  )
}
