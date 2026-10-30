import { Badge } from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { learning } from '@/data/learning'

export function Learning() {
  return (
    <Section id="learning" title={learning.heading} eyebrow="How I learned AI">
      <Reveal>
        <GlassCard className="space-y-5">
          <p className="text-slate-300">{learning.description}</p>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-white">Topics</h3>
            <ul className="flex flex-wrap gap-2">
              {learning.topics.map((topic) => (
                <li key={topic.name}>
                  <Badge>{topic.name}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-slate-400">{learning.applied}</p>
          <p className="border-t border-white/10 pt-4 text-sm text-slate-500">{learning.disclaimer}</p>
        </GlassCard>
      </Reveal>
    </Section>
  )
}
