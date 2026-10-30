import { ProjectCard } from '@/components/project/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects" eyebrow="Featured work">
      <ul className="space-y-8">
        {projects.map((project) => (
          <li key={project.id}>
            <Reveal>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
