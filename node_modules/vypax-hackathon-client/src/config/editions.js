import heroBuild from '../assets/images/hero-build.webp'
import teamHack from '../assets/images/team-hack.webp'
import codeScreen from '../assets/images/code-screen.webp'
import devDesk from '../assets/images/dev-desk.webp'
import aboutCollab from '../assets/images/about-collab.webp'
import {
  hackathon2026,
  hackathonMarch2027,
  hackathonProfessionals,
  hackathon2026Timeline,
  hackathonProfessionalsTimeline
} from './hackathon2026'

/**
 * Local, optimised brand imagery. Bundled through Vite so the URLs are
 * content-hashed and cached.
 */
export const IMAGES = {
  heroBuild,
  teamHack,
  codeScreen,
  devDesk,
  aboutCollab
}

/**
 * Card-ready view models for every published edition. Derived from the
 * canonical hackathon configuration so card copy and detail pages can never
 * drift apart.
 */
export const EDITION_SUMMARIES = [
  {
    id: 'hackathon-2026',
    slug: hackathon2026.slug,
    title: hackathon2026.title,
    year: hackathon2026.year,
    statusLabel: hackathon2026.statusLabel,
    tone: 'open',
    withDot: true,
    theme: hackathon2026.theme,
    deadlineLabel: hackathon2026.registrationDeadlineLabel,
    deadlineRaw: hackathon2026.registrationDeadline,
    teamSize: hackathon2026.teamSize,
    venue: hackathon2026.venue,
    summary: hackathon2026.summary,
    image: heroBuild,
    imageAlt: 'Abstract render of floating interface panels for Vypax EdTech & Hackathons 2026',
    to: `/hackathons/${hackathon2026.slug}`,
    registrationUrl: hackathon2026.registrationUrl,
    comingSoon: false,
    stages: hackathon2026Timeline.length,
    registrationFee: hackathon2026.registrationFee,
    registrationFeeLabel: hackathon2026.registrationFeeLabel,
    registrationFeeNote: hackathon2026.registrationFeeNote,
    highlights: [
      `Entry fee ${hackathon2026.registrationFeeLabel} ${hackathon2026.registrationFeeNote}`,
      'Prizes up to ₹1,00,000',
      '24-hour final round'
    ]
  },
  {
    id: 'hackathon-for-professionals',
    slug: hackathonProfessionals.slug,
    title: hackathonProfessionals.title,
    year: hackathonProfessionals.year,
    statusLabel: hackathonProfessionals.statusLabel,
    tone: 'accent',
    withDot: false,
    theme: hackathonProfessionals.theme,
    deadlineLabel: hackathonProfessionalsTimeline[0].dateLabel,
    deadlineRaw: hackathonProfessionalsTimeline[0].date,
    teamSize: hackathonProfessionals.teamSize,
    venue: hackathonProfessionals.venue,
    summary: hackathonProfessionals.summary,
    image: codeScreen,
    imageAlt:
      'A developer screen filled with code, representing the Vypax Hackathon for Professionals edition',
    to: `/hackathons/${hackathonProfessionals.slug}`,
    registrationUrl: '',
    comingSoon: true,
    stages: hackathonProfessionalsTimeline.length,
    registrationFee: hackathonProfessionals.registrationFee,
    registrationFeeLabel: hackathonProfessionals.registrationFeeLabel,
    registrationFeeNote: hackathonProfessionals.registrationFeeNote,
    highlights: [
      `Entry fee ${hackathonProfessionals.registrationFeeLabel} ${hackathonProfessionals.registrationFeeNote}`,
      `Prizes ${hackathonProfessionals.prizeCeiling}`,
      '12-hour final round'
    ]
  },
  {
    id: 'hackathon-march-2027',
    slug: hackathonMarch2027.slug,
    title: hackathonMarch2027.title,
    year: hackathonMarch2027.year,
    statusLabel: hackathonMarch2027.statusLabel,
    tone: 'neutral',
    withDot: false,
    theme: 'To Be Announced',
    deadlineLabel: 'Coming Soon',
    deadlineRaw: null,
    teamSize: null,
    venue: hackathonMarch2027.venue,
    summary: hackathonMarch2027.summary,
    image: devDesk,
    imageAlt: 'A developer workstation lit in warm tones, representing the next Vypax hackathon edition',
    to: `/hackathons/${hackathonMarch2027.slug}`,
    registrationUrl: '',
    comingSoon: true,
    stages: 0,
    registrationFee: hackathonMarch2027.registrationFee,
    registrationFeeLabel: hackathonMarch2027.registrationFeeLabel,
    registrationFeeNote: hackathonMarch2027.registrationFeeNote,
    highlights: [
      `Entry fee ${hackathonMarch2027.registrationFeeLabel} ${hackathonMarch2027.registrationFeeNote}`,
      'Theme reveal pending',
      'Dates To Be Announced'
    ]
  }
]

export const getEditionBySlug = (slug) =>
  EDITION_SUMMARIES.find((edition) => edition.slug === slug) || null

export const STATUS_FILTERS = [
  { id: 'all', label: 'All statuses' },
  { id: 'registration-open', label: 'Registration Started' },
  { id: 'upcoming', label: 'Upcoming' }
]

export const YEAR_FILTERS = [
  { id: 'all', label: 'All years' },
  { id: '2026', label: '2026' },
  { id: '2027', label: '2027' }
]

export const THEME_FILTERS = [
  { id: 'all', label: 'All themes' },
  { id: 'app-web', label: 'App & Web Development' },
  { id: 'tba', label: 'To Be Announced' }
]
