import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { skillGroups } from '@/data/skills'

export function Skills() {
  return (
    <Section id="skills" title="Technical skills" eyebrow="What I work with">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Reveal key={group.id} className="h-full">
            <GlassCard className="h-full">
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{group.description}</p>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item.name} className="text-sm text-slate-200">
                    <span className="mr-2 text-accent-cyan" aria-hidden="true">
                      &#8250;
                    </span>
                    {item.name}
                    {item.note && <span className="block pl-4 text-xs text-slate-400">{item.note}</span>}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
