import { HACKATHON_2026_FORM_URL } from './site'

/**
 * Canonical organizer-provided data for the Hackathon November 2026 edition.
 *
 * This module is the single source of truth for the public Hackathon November 2026
 * experience. The API can override these values when a seeded document is
 * available, but the published facts never depend on the database being up.
 */

export const hackathon2026 = {
  slug: 'hackathon-2026',
  title: 'Hackathon November 2026',
  year: 2026,
  status: 'registration-open',
  statusLabel: 'Registration Started',
  theme: 'App & Web Development',
  registrationDeadline: '2026-10-31',
  registrationDeadlineLabel: '31 October 2026',
  registrationUrl: HACKATHON_2026_FORM_URL,
  tagline: 'Ship a real product in a month. Finish with a 24-hour build sprint.',
  summary:
    'A four-stage build competition from Vypax EdTech & Hackathons. Register, submit your concept, ' +
    'complete your project, and take the top 30 into a 24-hour final round.',
  teamSize: '2–4 members',
  finalRoundDuration: '24 Hours',
  venue: 'Remote',
  registrationFee: 99,
  registrationFeeLabel: '₹99',
  registrationFeeNote: 'per person',
  prizePoolAmount: '₹1,00,000',
  prizePool: 'Up to ₹1,00,000'
}

/**
 * Copy for the registration deadline popup shown once per browsing session.
 * Kept beside the edition data so the deadline is never duplicated by hand.
 */
export const registrationNotice = {
  enabled: true,
  eyebrow: 'Registration open',
  title: 'Registration closes 31 October 2026',
  body: 'Assemble your team and secure your spot before the deadline.',
  bullets: [
    'Teams of 2–4 members',
    'Theme: App & Web Development',
    'Top 30 teams reach the 24-hour final round'
  ],
  primaryLabel: 'Apply Now',
  dismissLabel: 'Maybe later'
}

/** The four stages shown as a timeline on the detail page. */
export const hackathon2026Timeline = [
  {
    id: 'registration',
    step: '01',
    title: 'Registration',
    dateLabel: 'Deadline: 31 October 2026',
    description: 'Participants must complete registration before the deadline.',
    state: 'open'
  },
  {
    id: 'idea-submission',
    step: '02',
    title: 'Idea Submission',
    dateLabel: '2 November – 5 November 2026',
    description: 'Participants submit their hackathon idea / project concept.',
    state: 'upcoming'
  },
  {
    id: 'first-round',
    step: '03',
    title: 'First Round + Project Submission',
    dateLabel: '15 November 2026',
    description: 'First round evaluation and project submission.',
    state: 'upcoming'
  },
  {
    id: 'final-round',
    step: '04',
    title: 'Final Round',
    dateLabel: '30 November 2026',
    description: 'Top 30 teams participate in the final round.',
    highlight: '24-Hour Final Hackathon',
    state: 'upcoming'
  }
]

/**
 * Total cash prize pool for the edition, qualified with "Up to" exactly as
 * supplied by the organizers — no guarantees beyond that are implied. The
 * individual cash amounts behind the podium places are confirmed closer to the
 * final round, so they are published as a cash prize rather than a figure.
 */
export const hackathon2026PrizePool = {
  label: 'Total prize pool',
  amount: hackathon2026.prizePool,
  note: 'Amounts are published as "up to" figures and are not guaranteed.'
}

/**
 * Prize and recognition tiers for the edition. Cash goes to the podium, and
 * every finishing position down to the tenth takes home a physical award —
 * with a soft copy certificate for everyone who takes part.
 *
 * `icon` is a lucide-react icon name resolved in HackathonDetail rather than a
 * bitmap: inline SVG stays crisp, inherits the theme colours and adds no
 * network request or third-party licensing question.
 */
export const hackathon2026Prizes = [
  {
    id: 'prize-podium',
    level: '1st, 2nd & 3rd Prize',
    teams: '3',
    reward: 'Cash Prize + Trophy + Certificate (Hard Copy)',
    detail:
      'The three podium teams share the cash prize pool and each receive a trophy along with a hard copy certificate.',
    includes: ['Cash Prize', 'Trophy', 'Certificate (Hard Copy)'],
    icon: 'Trophy',
    featured: true
  },
  {
    id: 'prize-4-5',
    level: '4th & 5th Prize',
    teams: '2',
    reward: 'Medal + Certificate (Hard Copy)',
    detail: 'The fourth and fifth placed teams receive a medal along with a hard copy certificate.',
    includes: ['Medal', 'Certificate (Hard Copy)'],
    icon: 'Medal'
  },
  {
    id: 'prize-6-10',
    level: '6th to 10th Prize',
    teams: '5',
    reward: 'Certificate (Hard Copy)',
    detail: 'Teams finishing between sixth and tenth receive a hard copy certificate.',
    includes: ['Certificate (Hard Copy)'],
    icon: 'ScrollText'
  },
  {
    id: 'prize-participants',
    level: 'All Participants',
    teams: 'All',
    reward: 'Certificate (Soft Copy)',
    detail: 'Every participant who takes part in the edition receives a soft copy certificate.',
    includes: ['Certificate (Soft Copy)'],
    icon: 'Award'
  }
]

/**
 * Internship wording is intentionally explicit about the assessment gate so
 * participants are never misled into reading it as a guaranteed placement.
 */
export const hackathon2026Internship = {
  heading: 'Internship Opportunity',
  headline:
    'Top 7 teams will receive an opportunity to participate in the Vypax EdTech & Hackathons ' +
    'internship selection process.',
  natureLabel: 'Assessment Based',
  natureNote:
    'The hackathon qualification does not automatically guarantee selection. Qualifying only ' +
    'unlocks entry into the selection process.',
  selectionNote: 'Only 3–4 candidates may ultimately be selected through the assessment process.',
  disclaimer:
    'This is an opportunity to participate in the internship selection process — not an ' +
    'automatic internship guarantee.'
}

export const hackathon2026Rules = [
  {
    id: 'rule-team',
    title: 'Team Composition',
    description:
      'Teams can have 2–4 members. Every member must be declared during registration and a team ' +
      'may not compete in more than one team for this edition.'
  },
  {
    id: 'rule-original',
    title: 'Original Work',
    description:
      'All code, design and assets must be produced during the hackathon window. Existing ' +
      'projects, templates or boilerplates must be declared and cannot form the core of your ' +
      'submission.'
  },
  {
    id: 'rule-deadlines',
    title: 'Submission Windows',
    description:
      'The idea submission window (2–5 November 2026) and the project submission deadline ' +
      '(15 November 2026) are binding. Late submissions are not evaluated.'
  },
  {
    id: 'rule-final',
    title: 'Final Round',
    description:
      'Only the top 30 teams advance to the 24-hour final round on 30 November 2026. Teams must ' +
      'be available for the full duration.'
  },
  {
    id: 'rule-judging',
    title: 'Judging',
    description:
      'Projects are evaluated on innovation, technical execution, design and impact. The ' +
      'decision of the judging panel is final.'
  },
  {
    id: 'rule-conduct',
    title: 'Code of Conduct',
    description:
      'Plagiarism, harassment or misrepresentation of submitted work leads to immediate ' +
      'disqualification. Eligibility details will be announced by the organizers.'
  }
]
/** Broad scope of what participants may build for this edition. */
export const hackathon2026Theme = {
  name: 'App & Web Development',
  intro:
    'Build something that works. The theme is intentionally broad — if your idea is a digital ' +
    'product that solves a real problem, it fits.',
  buildAreas: [
    { id: 'web-apps', label: 'Web applications', icon: 'Globe' },
    { id: 'mobile-apps', label: 'Mobile applications', icon: 'Smartphone' },
    { id: 'saas', label: 'SaaS products', icon: 'Cloud' },
    { id: 'productivity', label: 'Productivity tools', icon: 'Zap' },
    { id: 'business', label: 'Business applications', icon: 'Briefcase' },
    { id: 'ai', label: 'AI-powered applications', icon: 'Sparkles' },
    { id: 'social-impact', label: 'Social-impact applications', icon: 'HeartHandshake' },
    { id: 'devtools', label: 'Developer tools', icon: 'Terminal' },
    { id: 'edtech', label: 'Education technology', icon: 'GraduationCap' },
    { id: 'fintech', label: 'FinTech concepts', icon: 'Wallet' },
    { id: 'healthtech', label: 'Healthcare technology', icon: 'Activity' },
    { id: 'open', label: 'Other innovative digital products', icon: 'Rocket' }
  ]
}

/**
 * Hackathon for Professionals — a paid edition running alongside the student
 * track. The schedule, team size and certificate terms below are confirmed by
 * the organizers; the theme and prize breakdown are still deferred rather than
 * invented.
 */
export const hackathonProfessionals = {
  slug: 'hackathon-for-professionals',
  title: 'Hackathon for Professionals',
  year: 2027,
  status: 'upcoming',
  statusLabel: 'Coming Soon',
  comingSoon: true,
  audience: 'Working professionals & senior builders',
  theme: 'To Be Announced',
  // Delivery mode is not settled for this edition yet, so it is published as
  // unconfirmed rather than inherited from the all-remote student track.
  venue: 'To Be Announced',
  registrationFee: 4999,
  registrationFeeLabel: '₹4,999',
  registrationFeeNote: 'per person',
  prizeCeiling: 'Up to ₹2,00,000',
  teamSize: '1–2 members',
  teamSizeMin: 1,
  teamSizeMax: 2,
  finalRoundDuration: '24 Hours',
  finalRoundDurationLabel: '24 hours',
  certificate: 'Hard copy certificate provided',
  summary:
    'A paid, professional-grade edition of the Vypax EdTech & Hackathons series, built for working ' +
    'developers and senior builders competing for a larger prize pool.',
  facts: [
    { id: 'fact-fee', label: 'Entry fee', value: '₹4,999 per person', icon: 'Wallet' },
    { id: 'fact-prizes', label: 'Prize pool', value: 'Up to ₹2,00,000', icon: 'Trophy' },
    { id: 'fact-team', label: 'Team size', value: '1–2 members', icon: 'Users' },
    { id: 'fact-final', label: 'Final round', value: '12-hour hackathon', icon: 'Timer' }
  ],
  upcomingPoints: [
    'Theme reveal and build tracks',
    'Prize breakdown across tiers',
    'Entry fee terms and refund policy'
  ]
}

/**
 * Three-round schedule for the professional edition. Dates are confirmed by
 * the organizers; each round is stored with a sortable ISO date so ordering
 * and any future countdown logic stays derived from a single field.
 */
export const hackathonProfessionalsTimeline = [
  {
    id: 'idea-submission',
    step: '01',
    title: 'Idea Submission',
    date: '2027-05-21',
    dateLabel: '21 May 2027',
    description: 'Submit your project idea and proposed build plan.',
    state: 'upcoming'
  },
  {
    id: 'project-submission',
    step: '02',
    title: 'Project Submission',
    date: '2027-06-10',
    dateLabel: '10 June 2027',
    description: 'Working projects are due before the first round closes.',
    state: 'upcoming'
  },
  {
    id: 'final-round',
    step: '03',
    title: 'Final Round',
    date: '2027-06-12',
    dateLabel: '12 June 2027',
    description: 'A 24-hour hackathon decides the final standings.',
    state: 'upcoming'
  }
]

/**
 * Hackathon March 2027 — nothing beyond the title has been supplied by the
 * organizers, so every other field is explicitly deferred rather than invented.
 */
export const hackathonMarch2027 = {
  slug: 'hackathon-march-2027',
  title: 'Hackathon March 2027',
  year: 2027,
  status: 'upcoming',
  statusLabel: 'Coming Soon',
  comingSoon: true,
  venue: 'Remote',
  registrationFee: 99,
  registrationFeeLabel: '₹99',
  registrationFeeNote: 'per person',
  summary:
    'The next edition of the Vypax EdTech & Hackathons series is being planned. Theme, ' +
    'schedule, registration and prizes will be published here first.',
  facts: [
    { id: 'fact-theme', label: 'Theme', value: 'To Be Announced', icon: 'Palette' },
    { id: 'fact-dates', label: 'Dates', value: 'To Be Announced', icon: 'CalendarDays' },
    { id: 'fact-registration', label: 'Registration', value: 'Coming Soon', icon: 'ClipboardList' },
    { id: 'fact-prizes', label: 'Prizes', value: 'To Be Announced', icon: 'Trophy' }
  ],
  upcomingPoints: [
    'Theme reveal and build tracks',
    'Full schedule with round-by-round dates',
    'Prize pool and recognition structure',
    'Judging panel and evaluation criteria'
  ]
}
