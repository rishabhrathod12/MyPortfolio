import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { formatIsoDate } from '@/lib/format'
import type { Project } from '@/types'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { FeatureList } from './FeatureList'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-white">{title}</h3>
      {children}
    </div>
  )
}

export function ProjectShowcase({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`${project.id}-title`} className="space-y-12">
      <Reveal>
        <GlassCard className="p-6 sm:p-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-cyan">
            Featured project
          </p>
          <h3 id={`${project.id}-title`} className="text-3xl font-bold text-white sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 text-lg text-slate-300">{project.tagline}</p>
          <p className="mt-4 rounded-lg border border-blue-400/20 bg-blue-400/5 px-4 py-3 text-sm text-slate-300">
            <span className="font-semibold text-blue-300">Current state: </span>
            {project.currentState}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub (opens in a new tab)`}
            >
              <GitHubIcon className="h-4 w-4" />
              View on GitHub
            </Button>
            {project.demoUrl && (
              <Button
                href={project.demoUrl}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo <ExternalLink size={16} aria-hidden="true" />
              </Button>
            )}
            <p className="text-xs text-slate-500">
              Repository last reviewed against this page on {formatIsoDate(project.lastReviewed)}.
            </p>
          </div>
        </GlassCard>
      </Reveal>

      <Reveal className="grid gap-8 md:grid-cols-2">
        <Block title="Overview">
          <p className="leading-relaxed text-slate-300">{project.overview}</p>
        </Block>
        <Block title="The problem">
          <p className="leading-relaxed text-slate-300">{project.problem}</p>
        </Block>
      </Reveal>

      <Reveal>
        <Block title="Key features">
          <p className="mb-4 text-sm text-slate-400">
            Each feature is marked by how far it has actually got: implemented and tested,
            prototype, or planned.
          </p>
          <FeatureList features={project.features} />
        </Block>
      </Reveal>

      <Reveal>
        <Block title="Technology stack">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.stack.map((group) => (
              <div key={group.label}>
                <dt className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                  {group.label}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge>{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Block>
      </Reveal>

      <Reveal>
        <Block title="Architecture overview">
          <ArchitectureDiagram layers={project.architecture} />
        </Block>
      </Reveal>

      <Reveal>
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">What this project does not claim</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300 marker:text-slate-500">
            {project.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>
    </article>
  )
}
