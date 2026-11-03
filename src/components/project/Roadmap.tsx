import { StatusBadge } from '@/components/ui/StatusBadge'
import type { ProjectSection, StatusLabels } from '@/types'

/** Milestones in order, with their real status. */
export function Roadmap({ section, labels }: { section: ProjectSection; labels?: StatusLabels }) {
  return (
    <div className="space-y-5">
      <p className="max-w-3xl leading-relaxed text-slate-300">{section.intro}</p>
      <ol aria-label="Milestones" className="space-y-4 border-l border-white/10 pl-5">
        {section.items.map((item) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[1.62rem] top-2 h-2 w-2 rounded-full bg-accent-cyan"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-medium text-white">{item.title}</h3>
              <StatusBadge status={item.status} labels={labels} />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
