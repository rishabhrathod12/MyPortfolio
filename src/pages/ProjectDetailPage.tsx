import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { ArchitectureDiagram } from '@/components/project/ArchitectureDiagram'
import { projectCovers } from '@/components/project/covers'
import { FeatureList } from '@/components/project/FeatureList'
import { AppLink } from '@/components/ui/AppLink'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { StatusBadge, statusLabels } from '@/components/ui/StatusBadge'
import { usePageMeta } from '@/hooks/usePageMeta'
import { formatIsoDate } from '@/lib/format'
import type { FeatureStatus, Project } from '@/types'

const STATUS_ORDER: readonly FeatureStatus[] = ['implemented', 'prototype', 'planned']

function DetailSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <Reveal>
        <h2 id={id} className="mb-5 text-2xl font-semibold text-white">
          {title}
        </h2>
        {children}
      </Reveal>
    </section>
  )
}

export function ProjectDetailPage({ project }: { project: Project }) {
  usePageMeta(`${project.name} | Rishabh Rathod`, project.shortDescription)

  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [project.id])

  const cover = projectCovers[project.id]
  const planned = project.features.filter((feature) => feature.status === 'planned')

  return (
    <article className="pb-20 pt-24">
      <Container className="space-y-14">
        <div>
          <AppLink
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-cyan"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to projects
          </AppLink>

          <div className="mt-6 grid gap-8 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-3">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-cyan">
                Featured project
              </p>
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="text-4xl font-bold tracking-tight text-white outline-none sm:text-5xl"
              >
                {project.name}
              </h1>
              <p className="mt-3 text-lg text-slate-300">{project.tagline}</p>
              <p className="mt-5 rounded-lg border border-blue-400/20 bg-blue-400/5 px-4 py-3 text-sm text-slate-300">
                <span className="font-semibold text-blue-300">Current state: </span>
                {project.currentState}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
              </div>
            </div>
            {cover && (
              <img
                src={cover}
                alt={project.coverAlt}
                width={1200}
                height={675}
                className="aspect-video w-full rounded-2xl border border-white/10 object-cover lg:col-span-2"
              />
            )}
          </div>
        </div>

        <DetailSection id="overview" title="Project Overview">
          <p className="max-w-3xl leading-relaxed text-slate-300">{project.overview}</p>
        </DetailSection>

        <DetailSection id="problem" title="Problem Statement">
          <p className="max-w-3xl leading-relaxed text-slate-300">{project.problem}</p>
        </DetailSection>

        <DetailSection id="features" title="Key Features">
          <p className="mb-4 text-sm text-slate-400">
            Each feature is marked by how far it has actually got: implemented, prototype or
            planned.
          </p>
          <FeatureList features={project.features} />
        </DetailSection>

        <DetailSection id="stack" title="Technology Stack">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {project.stack.map((group) => (
              <div key={group.label}>
                <dt className="mb-2 text-xs uppercase tracking-wider text-slate-400">
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
        </DetailSection>

        <DetailSection id="architecture" title="Architecture Overview">
          <ArchitectureDiagram layers={project.architecture} />
        </DetailSection>

        <DetailSection id="status" title="Implementation Status">
          <div className="grid gap-4 md:grid-cols-3">
            {STATUS_ORDER.map((status) => {
              const items = project.features.filter((feature) => feature.status === status)
              return (
                <GlassCard key={status}>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white">{statusLabels[status]}</h3>
                    <StatusBadge status={status} />
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{project.statusNotes[status]}</p>
                  <ul
                    aria-label={`${statusLabels[status]} features`}
                    className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300 marker:text-slate-500"
                  >
                    {items.map((feature) => (
                      <li key={feature.id}>{feature.title}</li>
                    ))}
                  </ul>
                </GlassCard>
              )
            })}
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Checked against the repository on {formatIsoDate(project.lastReviewed)}.
          </p>
        </DetailSection>

        <DetailSection id="limits" title="Limitations and Future Scope">
          <div className="grid gap-6 md:grid-cols-2">
            <GlassCard>
              <h3 className="mb-3 font-semibold text-white">Limitations</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300 marker:text-slate-500">
                {project.limitations.map((limitation) => (
                  <li key={limitation}>{limitation}</li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard>
              <h3 className="mb-3 font-semibold text-white">Future scope</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                {planned.map((feature) => (
                  <li key={feature.id}>
                    <span className="font-medium text-white">{feature.title}.</span>{' '}
                    {feature.description}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </DetailSection>

        <DetailSection id="repository" title="GitHub Repository">
          <GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-300">
              The source code and project documentation are public on GitHub.
            </p>
            <Button
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${project.name} repository on GitHub (opens in a new tab)`}
            >
              <GitHubIcon className="h-4 w-4" />
              Open repository
            </Button>
          </GlassCard>
        </DetailSection>
      </Container>
    </article>
  )
}
