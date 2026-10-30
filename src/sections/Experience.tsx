import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { experience } from '@/data/experience'

export function Experience() {
  return (
    <Section id="experience" title="Professional Experience" eyebrow="Background">
      <ol className="space-y-4">
        {experience.map((entry) => (
          <li key={entry.id}>
            <Reveal>
              <GlassCard className="max-w-3xl">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold text-white">{entry.role}</h3>
                  <time className="font-mono text-sm text-accent-cyan">{entry.dates.display}</time>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{entry.summary}</p>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
