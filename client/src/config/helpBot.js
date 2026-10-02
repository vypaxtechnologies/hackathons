import {
  hackathon2026,
  hackathon2026Timeline,
  hackathon2026Prizes,
  hackathon2026PrizePool,
  hackathonProfessionals,
  hackathonProfessionalsTimeline,
  hackathonMarch2027,
  hackathon2026Internship
} from './hackathon2026'
import { CONTACT_LINKS, CONTACT_PHONES } from './site'

/**
 * Knowledge base for the on-page help bot.
 *
 * Every answer is composed from the canonical hackathon configuration rather
 * than written out again, so a date, venue or fee change on the config module
 * is reflected here automatically and the bot can never contradict the rest of
 * the site.
 *
 * The panel presents these as an ordered question list, so venue, dates and
 * fees are answered first and the less common questions follow.
 */

const stageById = (id) => hackathon2026Timeline.find((stage) => stage.id === id)
const prizeSummary = hackathon2026Prizes.map((tier) => `${tier.level}: ${tier.reward}.`).join(' ')

export const HELP_BOT_PROFILE = {
  name: 'Vypax Assistant',
  role: 'Hackathon help',
  greeting:
    'Hi! Pick a question below and I will answer straight away — venue, dates, fees, team size, ' +
    'prizes and registration are all here.'
}

export const HELP_BOT_ENTRIES = [
  {
    id: 'venue',
    question: 'What is the venue?',
    answer:
      `${hackathon2026.title} is fully ${hackathon2026.venue.toLowerCase()} — you can take part ` +
      'from wherever you are, and the 24-hour final round is run the same way.',
    link: { label: 'View the hackathon', to: `/hackathons/${hackathon2026.slug}` }
  },
  {
    id: 'dates',
    question: 'What are the dates?',
    answer: [
      `Registration closes ${hackathon2026.registrationDeadlineLabel}.`,
      `Idea submission: ${stageById('idea-submission').dateLabel}.`,
      `Project submission: ${stageById('first-round').dateLabel}.`,
      `Final round: ${stageById('final-round').dateLabel}.`
    ].join(' '),
    link: { label: 'Full schedule', to: `/hackathons/${hackathon2026.slug}` }
  },
  {
    id: 'deadline',
    question: 'When is the registration deadline?',
    answer:
      `Registration for ${hackathon2026.title} closes on ${hackathon2026.registrationDeadlineLabel}. ` +
      'Complete the form before that date — late registrations are not evaluated.',
    link: { label: 'Register now', href: hackathon2026.registrationUrl }
  },
  {
    id: 'fee',
    question: 'How much is the entry fee?',
    answer:
      `The entry fee is ${hackathon2026.registrationFeeLabel} ${hackathon2026.registrationFeeNote} for ` +
      `${hackathon2026.title}. Refund terms are not published, so confirm with the organizers ` +
      'before paying.'
  },
  {
    id: 'team-size',
    question: 'How many members can a team have?',
    answer:
      `Teams have ${hackathon2026.teamSize}. Every member must be declared during registration, and ` +
      'a team may not compete in more than one team for this edition.'
  },
  {
    id: 'prizes',
    question: 'What are the prizes?',
    answer:
      `The ${hackathon2026PrizePool.label.toLowerCase()} is ${hackathon2026PrizePool.amount}, shared by ` +
      `the 1st, 2nd and 3rd placed teams. ${hackathon2026PrizePool.note} ${prizeSummary}`
  },
  {
    id: 'registration',
    question: 'How do I register?',
    answer:
      'Registration is completed through the official Google Form. Use the Apply Now button on the ' +
      'hackathon page — it opens in a new tab — and add every team member as you register.',
    link: { label: 'Open registration form', href: hackathon2026.registrationUrl }
  },
  {
    id: 'theme',
    question: 'What is the theme?',
    answer:
      `The theme is ${hackathon2026.theme}. It is deliberately broad — web apps, mobile apps, SaaS, ` +
      'AI products and social-impact tools all fit, as long as it solves a real problem.',
    link: { label: 'Explore build areas', to: `/hackathons/${hackathon2026.slug}` }
  },
  {
    id: 'final-round',
    question: 'How long is the final round?',
    answer:
      `The final round lasts ${hackathon2026.finalRoundDuration}. Only the top 30 teams advance, and ` +
      'teams must be available for the full duration.'
  },
  {
    id: 'recognition',
    question: 'Do we get a certificate, medal or trophy?',
    answer: prizeSummary
  },
  {
    id: 'submissions',
    question: 'What do we submit?',
    answer:
      'First your concept (the problem you are solving and what you plan to build), then the ' +
      'working project with its repository and a short presentation. Idea submissions run ' +
      `${stageById('idea-submission').dateLabel} and project submissions are due ${stageById('first-round').dateLabel}.`
  },
  {
    id: 'judging',
    question: 'How are projects judged?',
    answer:
      'Projects are evaluated on innovation, technical execution, design and impact. The decision ' +
      'of the judging panel is final.'
  },
  {
    id: 'internship',
    question: 'Is there an internship opportunity?',
    answer:
      `The top 7 teams get an opportunity to enter the ${hackathon2026Internship.natureLabel.toLowerCase()} ` +
      'internship selection process. Qualification does not guarantee selection, and only 3–4 ' +
      'candidates may ultimately be selected.'
  },
  {
    id: 'eligibility',
    question: 'Who can participate?',
    answer:
      'Eligibility details for the edition have not been published yet. The organizers will ' +
      'announce them — ask for the contact question below if you need an answer before then.'
  },
  {
    id: 'professionals',
    question: 'Is there an edition for working professionals?',
    answer:
      `${hackathonProfessionals.title} is a paid edition for working professionals and senior ` +
      `builders: ${hackathonProfessionals.registrationFeeLabel} ${hackathonProfessionals.registrationFeeNote}, ` +
      `${hackathonProfessionals.teamSize}, prizes ${hackathonProfessionals.prizeCeiling}. Idea ` +
      `submission opens ${hackathonProfessionalsTimeline[0].dateLabel} and it is currently ` +
      `${hackathonProfessionals.statusLabel.toLowerCase()}.`,
    link: { label: 'View the edition', to: `/hackathons/${hackathonProfessionals.slug}` }
  },
  {
    id: 'next-edition',
    question: 'When is the next hackathon?',
    answer:
      `${hackathonMarch2027.title} is being planned and is currently ` +
      `${hackathonMarch2027.statusLabel.toLowerCase()}. Theme, dates and prizes will be published ` +
      'on the edition page first.',
    link: { label: 'See upcoming editions', to: '/hackathons' }
  },
  {
    id: 'contact',
    question: 'How do I contact the organizers?',
    answer:
      'Email us, call us, or use the contact form. Mention the edition and your question and the ' +
      'team will get back to you within 24–48 hours.',
    links: [
      { label: `Email ${CONTACT_LINKS.email}`, href: CONTACT_LINKS.emailHref },
      ...CONTACT_PHONES.map((phone) => ({ label: `Call ${phone.number}`, href: phone.href })),
      { label: 'Open contact page', to: '/contact' }
    ]
  }
]
