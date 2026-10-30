import { Briefcase, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { education } from '@/data/education'
import { experience } from '@/data/experience'
import { profile } from '@/data/profile'

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-accent-cyan">{icon}</span>
      <div>
        <dt className="text-xs uppercase tracking-wider text-slate-500">{label}</dt>
        <dd className="text-sm text-slate-200">{value}</dd>
      </div>
    </div>
  )
}

export function About() {
  const job = experience[0]
  const degree = education[0]
  return (
    <Section id="about" title="About" eyebrow="Who I am">
      <div className="grid gap-8 lg:grid-cols-3">
        <Reveal className="space-y-4 text-base leading-relaxed text-slate-300 lg:col-span-2">
          {profile.aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal>
          <GlassCard>
            <h3 className="mb-4 text-sm font-semibold text-white">At a glance</h3>
            <dl className="space-y-4">
              <Fact icon={<MapPin size={16} aria-hidden="true" />} label="Location" value={profile.location} />
              <Fact
                icon={<Sparkles size={16} aria-hidden="true" />}
                label="Focus"
                value="Generative AI and agentic AI"
              />
              {job && (
                <Fact
                  icon={<Briefcase size={16} aria-hidden="true" />}
                  label="Background"
                  value={`${job.role}, ${job.dates.display}`}
                />
              )}
              {degree && (
                <Fact
                  icon={<GraduationCap size={16} aria-hidden="true" />}
                  label="Education"
                  value={`${degree.degree}, ${degree.dates.display}`}
                />
              )}
            </dl>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  )
}
