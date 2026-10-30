import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { focus } from '@/data/focus'

export function Focus() {
  return (
    <Section id="focus" title={focus.heading} eyebrow="What I work on">
      <Reveal>
        <ul aria-label="Areas of interest" className="flex flex-wrap gap-3">
          {focus.topics.map((topic) => (
            <li
              key={topic.name}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-100 backdrop-blur-md transition hover:border-accent-cyan/50 sm:text-base"
            >
              {topic.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
