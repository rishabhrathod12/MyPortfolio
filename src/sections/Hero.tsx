import { ArrowRight } from 'lucide-react'
import * as m from 'motion/react-m'
import { SocialIcon } from '@/components/icons/SocialIcon'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { profile, socialLinks } from '@/data/profile'

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/15 blur-3xl sm:h-[36rem] sm:w-[36rem]"
      />
      <Container className="relative">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="mb-4 font-mono text-sm text-accent-cyan">Hi, I am</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>
          <p className="mt-4 text-xl font-medium text-slate-200 sm:text-2xl">{profile.title}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {profile.heroIntro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#projects">
              View Projects <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary">
              Contact Me
            </Button>
          </div>
          <ul className="mt-8 flex items-center gap-5">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="text-slate-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-cyan"
                >
                  <SocialIcon icon={link.icon} className="h-6 w-6" />
                </a>
              </li>
            ))}
          </ul>
        </m.div>
      </Container>
    </section>
  )
}
