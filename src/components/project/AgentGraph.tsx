import { GitFork } from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { AgentSection, ProjectFeature, StatusLabels } from '@/types'

function AgentCard({ agent, labels }: { agent: ProjectFeature; labels?: StatusLabels }) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-white">{agent.title}</h3>
        <StatusBadge status={agent.status} labels={labels} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{agent.description}</p>
    </li>
  )
}

/** The Supervisor on top, the specialists it delegates to below, and the request flow as numbered steps. */
export function AgentGraph({ section, labels }: { section: AgentSection; labels?: StatusLabels }) {
  const [supervisor, ...specialists] = section.items
  return (
    <div className="space-y-6">
      <p className="max-w-3xl leading-relaxed text-slate-300">{section.intro}</p>
      <ul aria-label="Agents" className="space-y-3">
        {supervisor && <AgentCard agent={supervisor} labels={labels} />}
        <li aria-hidden="true" className="flex justify-center text-accent-cyan/70">
          <GitFork size={18} className="rotate-180" />
        </li>
        <li>
          <ul className="grid gap-4 md:grid-cols-2">
            {specialists.map((agent) => (
              <AgentCard key={agent.id} agent={agent} labels={labels} />
            ))}
          </ul>
        </li>
      </ul>
      <div>
        <h3 className="mb-3 font-semibold text-white">How a request flows</h3>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300 marker:text-accent-cyan">
          {section.workflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
