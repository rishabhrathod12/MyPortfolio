import { Badge } from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { experience } from '@/data/experience'

export function Experience() {
  return (
    <Section id="experience" title="Professional experience" eyebrow="Where I have worked">
      <ol className="space-y-6">
        {experience.map((entry) => (
          <li key={entry.id}>
            <Reveal>
              <GlassCard>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{entry.role}</h3>
                    <p className="text-sm text-slate-400">{entry.organization}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{entry.category}</Badge>
                    <time className="font-mono text-sm text-accent-cyan">{entry.dates.display}</time>
                  </div>
                </div>
                <p className="mt-4 text-slate-300">{entry.summary}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300 marker:text-accent-cyan">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
