import { ArrowRight } from 'lucide-react'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { projectPath } from '@/lib/router'
import type { Project } from '@/types'
import { projectCovers } from './covers'

/** Summary of one project for the main page. All detail lives on the project's own page. */
export function ProjectCard({ project }: { project: Project }) {
  const cover = projectCovers[project.id]
  const titleId = `${project.id}-card-title`
  return (
    <article
      aria-labelledby={titleId}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition hover:border-accent-blue/40 lg:grid lg:grid-cols-2"
    >
      {cover && (
        <img
          src={cover}
          alt={project.coverAlt}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full object-cover lg:h-full"
        />
      )}
      <div className="flex flex-col p-6 sm:p-8">
        <h3 id={titleId} className="text-2xl font-bold text-white sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-3 leading-relaxed text-slate-300">{project.shortDescription}</p>
        <ul aria-label="Technology highlights" className="mt-4 flex flex-wrap gap-2">
          {project.highlights.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
          <Button
            href={projectPath(project.id)}
            aria-label={`View Details: ${project.name}`}
          >
            View Details <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button
            href={project.repoUrl}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub (opens in a new tab)`}
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </article>
  )
}
