import type { FeatureStatus } from '@/types'
import { Badge } from './Badge'

export const statusLabels: Record<FeatureStatus, string> = {
  implemented: 'Implemented',
  prototype: 'Prototype',
  planned: 'Planned',
}

export function StatusBadge({ status }: { status: FeatureStatus }) {
  return <Badge tone={status}>{statusLabels[status]}</Badge>
}
