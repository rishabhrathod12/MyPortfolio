import { ArrowUp, Building2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { experience } from '@/data/experience'
import { vortexia } from '@/data/vortexia'

export function Experience() {
  return (
    <Section id="experience" title="Professional Experience" eyebrow="Background">
      <article aria-labelledby="vortexia-heading" className="max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan">
            <Building2 aria-hidden="true" className="h-5 w-5" />
          </span>
          <h3 id="vortexia-heading" className="text-2xl font-semibold text-white">
            {vortexia.company}
          </h3>
        </div>

        <ol
          aria-label={`Career progression at ${vortexia.company}`}
          className="relative space-y-6 pl-8 sm:pl-10"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-accent-cyan via-accent-blue to-white/10 sm:left-[15px]"
          />
          {vortexia.roles.map((role, index) => (
            <li key={role.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-8 top-7 flex h-6 w-6 items-center justify-center rounded-full border-2 sm:-left-10 sm:h-8 sm:w-8 ${
                  role.current
                    ? 'border-accent-cyan bg-ink-900 shadow-[0_0_16px_rgba(34,211,238,0.5)]'
                    : 'border-accent-blue/60 bg-ink-900'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 ${role.current ? 'bg-accent-cyan' : 'bg-accent-blue'}`}
                />
              </span>
              <Reveal>
                <GlassCard className="transition duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:bg-white/[0.07]">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h4 className="text-lg font-semibold text-white">{role.title}</h4>
                    <time className="font-mono text-sm text-accent-cyan">{role.dates.display}</time>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {role.current && <Badge tone="implemented">Current role</Badge>}
                    {index === 0 && (
                      <Badge tone="prototype">
                        <ArrowUp aria-hidden="true" className="mr-1 h-3 w-3" />
                        Promoted from Associate AI/ML Engineer
                      </Badge>
                    )}
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <ul
                    aria-label={`Technologies used as ${role.title}`}
                    className="mt-5 flex flex-wrap gap-2"
                  >
                    {role.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </article>

      <ol aria-label="Business experience" className="mt-12 space-y-4">
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
