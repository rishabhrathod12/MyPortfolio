import type { FeatureStatus, StatusLabels } from '@/types'
import { Badge } from './Badge'

export const statusLabels: Record<FeatureStatus, string> = {
  implemented: 'Implemented',
  prototype: 'Prototype',
  planned: 'Planned',
  future: 'Future',
}

/** The label for a status, using a project's own wording when it has one. */
export function labelFor(status: FeatureStatus, overrides?: StatusLabels): string {
  return overrides?.[status] ?? statusLabels[status]
}

export function StatusBadge({
  status,
  labels,
}: {
  status: FeatureStatus
  labels?: StatusLabels
}) {
  return <Badge tone={status}>{labelFor(status, labels)}</Badge>
}
