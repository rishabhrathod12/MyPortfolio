import type { SocialLink } from '@/types'
import { GitHubIcon } from './GitHubIcon'
import { LinkedInIcon } from './LinkedInIcon'

export function SocialIcon({ icon, className }: { icon: SocialLink['icon']; className?: string }) {
  return icon === 'github' ? (
    <GitHubIcon className={className} />
  ) : (
    <LinkedInIcon className={className} />
  )
}
