/**
 * Single source of truth for platform-wide configuration.
 * Values that must be environment-driven are read from Vite env vars with
 * development fallbacks, so URLs are never repeated inline across components.
 */

const env = import.meta.env

export const SITE = {
  name: 'Vypax EdTech & Hackathons',
  productName: 'Vypax EdTech & Hackathons',
  shortName: 'Vypax EdTech & Hackathons',
  tagline: 'Build. Compete. Innovate.',
  description:
    'Vypax EdTech & Hackathons is a build-first competition platform where student and ' +
    'professional developers ship real web and mobile products, compete for prizes and earn ' +
    'recognition from the Vypax engineering team.',
  url: env.VITE_SITE_URL || 'https://hackathon.vypaxtechnologies.com',
  email: env.VITE_CONTACT_EMAIL || 'vypaxtechnologies@gmail.com',
  foundedYear: 2026
}

export const API_BASE_URL = env.VITE_API_URL || '/api'

/** Official registration destination for Hackathon November 2026. */
export const HACKATHON_2026_FORM_URL =
  env.VITE_HACKATHON_2026_FORM_URL || 'https://forms.gle/DvEwSkuK6WjUtT6v6'

export const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', href: env.VITE_SOCIAL_LINKEDIN || 'https://www.linkedin.com/company/vypax-technologies' },
  { id: 'instagram', label: 'Instagram', icon: 'Instagram', href: env.VITE_SOCIAL_INSTAGRAM || 'https://www.instagram.com/vypaxtechnologies' },
  { id: 'x', label: 'X', icon: 'X', href: env.VITE_SOCIAL_X || 'https://x.com/vypaxtechnology' }
].filter((link) => Boolean(link.href))

export const CONTACT_LINKS = {
  email: SITE.email,
  emailHref: `mailto:${SITE.email}`
}

/**
 * Build a `tel:` URI. Spaces, dashes, brackets and dots are stripped so the
 * value stays dialable; anything else is left alone so an extension survives.
 */
const toTelHref = (number) => `tel:${String(number).replace(/[^\d+]/g, '')}`

/**
 * Published phone numbers.
 *
 * Sourced from `VITE_CONTACT_PHONE` (comma separated) rather than hardcoded so
 * the number can be corrected or rotated without touching a component. When
 * nothing is configured the list is empty and every surface that renders it
 * omits the phone row entirely — no placeholder number is ever shown to a
 * visitor.
 */
export const CONTACT_PHONES = String(env.VITE_CONTACT_PHONE || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)
  .map((number, index) => ({
    id: `phone-${index + 1}`,
    number,
    href: toTelHref(number)
  }))

export const PRIMARY_NAV = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'hackathons', label: 'Hackathons', to: '/hackathons' },
  { id: 'courses', label: 'Training & Courses', to: '/courses' },
  { id: 'services', label: 'Services', to: '/services' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'faq', label: 'FAQ', to: '/faq' },
  { id: 'contact', label: 'Contact', to: '/contact' }
]

export const FOOTER_NAV = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'hackathons', label: 'Hackathons', to: '/hackathons' },
  { id: 'courses', label: 'Training & Courses', to: '/courses' },
  { id: 'services', label: 'Services', to: '/services' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'faq', label: 'FAQ', to: '/faq' },
  { id: 'contact', label: 'Contact', to: '/contact' }
]

export const COPYRIGHT_NOTICE = `© ${SITE.foundedYear} Vypax EdTech & Hackathons. All rights reserved.`
