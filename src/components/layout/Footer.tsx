import { profile, socialLinks } from '@/data/profile'
import { SocialIcon } from '@/components/icons/SocialIcon'
import { Container } from '@/components/ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {profile.name}. Built with React, TypeScript and
          Tailwind CSS.
        </p>
        <ul className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (opens in a new tab)`}
                className="text-slate-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-cyan"
              >
                <SocialIcon icon={link.icon} className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}
