import type { ScreenshotGroup } from '@/types'
import { screenshotUrl } from './covers'

/** Screenshots grouped by workflow. Each figure has a visible caption and descriptive alt text. */
export function ScreenshotGallery({
  projectId,
  groups,
}: {
  projectId: string
  groups: readonly ScreenshotGroup[]
}) {
  return (
    <div className="space-y-10">
      {groups.map((group) => {
        const headingId = `${projectId}-${group.id}-shots`
        return (
          <section key={group.id} aria-labelledby={headingId}>
            <h3 id={headingId} className="text-lg font-semibold text-white">
              {group.label}
            </h3>
            <p className="mt-1 mb-4 text-sm text-slate-400">{group.description}</p>
            <ul className="grid gap-6 md:grid-cols-2">
              {group.shots.map((shot) => {
                const src = screenshotUrl(projectId, shot.file)
                return (
                  <li key={shot.file}>
                    <figure className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                      {src && (
                        <img
                          src={src}
                          alt={shot.alt}
                          width={1200}
                          height={577}
                          loading="lazy"
                          decoding="async"
                          className="h-auto w-full"
                        />
                      )}
                      <figcaption className="p-4">
                        <span className="block font-medium text-white">{shot.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-slate-400">
                          {shot.caption}
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
