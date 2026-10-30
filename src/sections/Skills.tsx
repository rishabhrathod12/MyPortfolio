import { SkillCard } from '@/components/skills/SkillCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { skills } from '@/data/skills'

export function Skills() {
  return (
    <Section id="skills" title="Technical Skills" align="center" titleClassName="text-indigo-400">
      <Reveal>
        <ul
          aria-label="Technical skills"
          className="mx-auto grid max-w-6xl grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
