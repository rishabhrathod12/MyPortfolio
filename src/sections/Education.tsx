import { GraduationCap } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { education } from '@/data/education'

export function Education() {
  return (
    <Section id="education" title="Education" eyebrow="Academic background">
      <ul className="space-y-6">
        {education.map((entry) => (
          <li key={entry.id}>
            <Reveal>
              <GlassCard className="flex items-start gap-4">
                <GraduationCap className="mt-1 shrink-0 text-accent-cyan" size={24} aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-xl font-semibold text-white">{entry.degree}</h3>
                    <time className="font-mono text-sm text-accent-cyan">{entry.dates.display}</time>
                  </div>
                  <p className="mt-1 text-slate-300">{entry.institution}</p>
                </div>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
