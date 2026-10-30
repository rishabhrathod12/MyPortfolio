import { Briefcase, MapPin, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import profilePhoto from '@/assets/profile.jpg'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-accent-cyan">{icon}</span>
      <div>
        <span className="block text-xs uppercase tracking-wider text-slate-400">{label}</span>
        <span className="block text-sm text-slate-200">{value}</span>
      </div>
    </li>
  )
}

export function About() {
  return (
    <Section id="about" title="About" eyebrow="Professional introduction">
      <div className="grid gap-8 lg:grid-cols-3">
        <Reveal className="order-2 space-y-4 text-base leading-relaxed text-slate-300 lg:order-1 lg:col-span-2">
          {profile.aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal className="order-1 space-y-6 lg:order-2">
          <img
            src={profilePhoto}
            alt={profile.photoAlt}
            width={600}
            height={600}
            loading="lazy"
            decoding="async"
            className="mx-auto aspect-square w-full max-w-xs rounded-2xl border border-white/10 object-cover shadow-[0_0_40px_rgba(59,130,246,0.15)] lg:mx-0 lg:max-w-none"
          />
          <GlassCard>
            <h3 className="mb-4 text-sm font-semibold text-white">At a glance</h3>
            <ul className="space-y-4">
              <Fact icon={<MapPin size={16} aria-hidden="true" />} label="Location" value={profile.location} />
              <Fact
                icon={<Sparkles size={16} aria-hidden="true" />}
                label="Focus"
                value="Generative AI and agentic AI"
              />
              <Fact
                icon={<Briefcase size={16} aria-hidden="true" />}
                label="Background"
                value="Entrepreneurship"
              />
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  )
}
