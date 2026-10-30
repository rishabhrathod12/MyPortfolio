// Verifies every external link published by the site. Run: npm run check:links
// Node strips the TypeScript types on import, so the real data files are the source of truth.
import { socialLinks } from '../src/data/profile.ts'
import { projects } from '../src/data/projects.ts'

const urls = new Set(socialLinks.map((link) => link.href))
for (const project of projects) {
  urls.add(project.repoUrl)
  if (project.demoUrl) urls.add(project.demoUrl)
}

// LinkedIn answers automated requests with 999 whatever the profile, so it cannot be verified here.
const BOT_BLOCKED = new Set([999])

let failed = false
for (const url of urls) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (link-check)' },
      signal: AbortSignal.timeout(15_000),
    })
    if (response.ok) {
      console.log(`ok       ${response.status} ${url}`)
    } else if (BOT_BLOCKED.has(response.status)) {
      console.log(`unchecked ${response.status} ${url} (blocks automated requests; open it manually)`)
    } else {
      console.log(`BROKEN   ${response.status} ${url}`)
      failed = true
    }
  } catch (error) {
    console.log(`BROKEN   ${url} (${error instanceof Error ? error.message : error})`)
    failed = true
  }
}
process.exit(failed ? 1 : 0)
