import { ProjectShowcase } from '@/components/project/ProjectShowcase'
import { Section } from '@/components/ui/Section'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <Section id="projects" title="Projects" eyebrow="Featured work">
      <div className="space-y-16">
        {projects.map((project) => (
          <ProjectShowcase key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
