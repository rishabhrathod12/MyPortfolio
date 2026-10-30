import { SocialIcon } from '@/components/icons/SocialIcon'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { contact, socialLinks } from '@/data/profile'

export function Contact() {
  return (
    <Section id="contact" title={contact.heading} eyebrow="Contact">
      <Reveal className="max-w-2xl">
        <p className="text-base leading-relaxed text-slate-300">{contact.message}</p>
        <ul className="mt-6 flex flex-col gap-3 sm:flex-row">
          {socialLinks.map((link, index) => (
            <li key={link.label}>
              <Button
                href={link.href}
                variant={index === 0 ? 'primary' : 'secondary'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (opens in a new tab)`}
                className="w-full sm:w-auto"
              >
                <SocialIcon icon={link.icon} className="h-4 w-4" />
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
