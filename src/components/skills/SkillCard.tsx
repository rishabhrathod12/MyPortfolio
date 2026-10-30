import { skillIcons } from '@/components/icons/skillIcons'
import type { Skill } from '@/types'

/** One skill: icon and name in a fixed-height card, with a soft indigo glow on hover. */
export function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skillIcons[skill.icon]
  return (
    <li
      className="flex min-h-20 items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-center transition duration-200 hover:border-indigo-400/60 hover:bg-indigo-400/[0.06] hover:shadow-[0_0_24px_rgba(99,102,241,0.35)] motion-safe:hover:-translate-y-0.5"
    >
      <Icon className="h-6 w-6 shrink-0 text-slate-100" />
      <span className="text-left text-sm font-medium leading-snug text-slate-100 sm:text-base">
        {skill.name}
      </span>
    </li>
  )
}
