import { Link } from 'react-router-dom'
import { Linkedin, Instagram, Twitter, Mail, Phone, ArrowUpRight, ExternalLink } from 'lucide-react'
import { VypaxLogo } from '../brand/VypaxLogo'
import Button from '../ui/Button'
import {
  COPYRIGHT_NOTICE,
  FOOTER_NAV,
  SOCIAL_LINKS,
  CONTACT_LINKS,
  CONTACT_PHONES,
  SITE
} from '../../config/site'
import { hackathon2026, hackathonMarch2027 } from '../../config/hackathon2026'
import { openExternal } from '../../utils/hackathon'

const SOCIAL_ICONS = {
  linkedin: Linkedin,
  instagram: Instagram,
  x: Twitter
}

/** Site-wide footer: brand, navigation, hackathons, socials and legal line. */
export default function Footer() {
  const hackathonLinks = [
    { id: 'hackathon-2026', label: hackathon2026.title, to: `/hackathons/${hackathon2026.slug}` },
    {
      id: 'hackathon-march-2027',
      label: hackathonMarch2027.title,
      to: `/hackathons/${hackathonMarch2027.slug}`
    },
    { id: 'all-hackathons', label: 'All hackathons', to: '/hackathons' }
  ]

  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <VypaxLogo size="md" />
            <p className="max-w-xs text-sm leading-relaxed text-mist-400">
              A build-first hackathon platform from {SITE.name}. We run competitions that end in
              working software — not slide decks.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openExternal(hackathon2026.registrationUrl)}
              iconRight={ArrowUpRight}
              className="w-fit"
            >
              Apply for {hackathon2026.title}
            </Button>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2
              id="footer-explore"
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500"
            >
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {FOOTER_NAV.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    className="text-sm text-mist-300 transition-colors hover:text-lime-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-hackathons">
            <h2
              id="footer-hackathons"
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500"
            >
              Hackathons
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {hackathonLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    className="text-sm text-mist-300 transition-colors hover:text-lime-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500">
              Connect
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.id] || ExternalLink
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${SITE.name} on ${social.label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mist-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-400/40 hover:text-lime-400"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
              <li>
                <a
                  href={CONTACT_LINKS.emailHref}
                  aria-label={`Email ${SITE.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mist-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-400/40 hover:text-lime-400"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
              {CONTACT_PHONES.map((phone) => (
                <li key={phone.id}>
                  <a
                    href={phone.href}
                    aria-label={`Call ${SITE.name} on ${phone.number}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mist-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-400/40 hover:text-lime-400"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm text-mist-400">
              <a href={CONTACT_LINKS.emailHref} className="link-underline text-mist-300">
                {CONTACT_LINKS.email}
              </a>
            </p>
            {CONTACT_PHONES.map((phone) => (
              <p key={phone.id} className="mt-2 text-sm text-mist-400">
                <a href={phone.href} className="link-underline text-mist-300">
                  {phone.number}
                </a>
              </p>
            ))}
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">
              Venue — To Be Announced
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mist-500">{COPYRIGHT_NOTICE}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">
            React · Node · Express · MongoDB
          </p>
        </div>
      </div>
    </footer>
  )
}
