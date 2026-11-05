import { MailIcon, PhoneIcon } from '@/components/icons/ContactIcons'
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
        <ul className="mt-6 flex flex-col gap-3 text-slate-200">
          <li className="flex items-center gap-3">
            <MailIcon className="h-5 w-5 text-accent-cyan" />
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-accent-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
            >
              {contact.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <PhoneIcon className="h-5 w-5 text-accent-cyan" />
            <a
              href={`tel:${contact.phoneHref}`}
              className="hover:text-accent-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
            >
              {contact.phone}
            </a>
          </li>
        </ul>
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
