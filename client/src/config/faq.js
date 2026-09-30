import {
  hackathon2026,
  hackathon2026Timeline,
  hackathon2026Prizes,
  hackathon2026Recognition,
  hackathon2026Internship,
  hackathon2026Rules,
  hackathon2026Theme,
  hackathonProfessionals,
  hackathonProfessionalsTimeline,
  hackathonMarch2027
} from './hackathon2026'
import { COURSES, COURSE_BATCHES, COURSE_INCLUDES, SERVICES } from './content'
import { SITE } from './site'

/**
 * FAQ content for the whole site.
 *
 * Answers are composed from the canonical configuration modules rather than
 * written out again. A deadline, fee, team size or batch date is therefore
 * published in exactly one place, so this page cannot quietly contradict the
 * hackathon, courses or services pages the way a hand-written copy would.
 *
 * Where the organizers have genuinely not published something, the answer says
 * so and points at the contact form. Inventing a policy would be worse than
 * admitting the gap, so those answers are deliberately explicit.
 */

const stageById = (id) => hackathon2026Timeline.find((stage) => stage.id === id)
const ruleById = (id) => hackathon2026Rules.find((rule) => rule.id === id)
const lowestPrize = hackathon2026Prizes[hackathon2026Prizes.length - 1]

const courseList = COURSES.map((course) => `${course.name} (${course.duration})`).join(', ')
const batchList = COURSE_BATCHES.map((batch) => batch.label).join(' and ')
const includeList = COURSE_INCLUDES.map((item) => item.label.toLowerCase()).join(', ')

export const FAQ_CATEGORIES = [
  {
    id: 'participation',
    label: 'Participation',
    description: `Joining ${hackathon2026.title} and competing.`,
    icon: 'Trophy',
    items: [
      {
        id: 'faq-who',
        question: 'Who can participate?',
        answer:
          'Eligibility details for this edition have not been published yet. The organizers will ' +
          'announce them, and the contact form is the fastest way to get an answer before then.'
      },
      {
        id: 'faq-team-size',
        question: 'How many members can a team have?',
        answer: ruleById('rule-team').description
      },
      {
        id: 'faq-format',
        question: 'Is the hackathon online or in person?',
        answer:
          `${hackathon2026.title} runs fully ${hackathon2026.venue.toLowerCase()}. You can take part ` +
          'from wherever you are, and the final round is run the same way.'
      },
      {
        id: 'faq-register',
        question: 'How do I register?',
        answer:
          'Registration is completed through the official Google Form. Use the Apply Now button on ' +
          'the hackathon page — it opens in a new tab — and declare every team member while you are ' +
          'there.'
      },
      {
        id: 'faq-deadline',
        question: 'What is the registration deadline?',
        answer:
          `Registration closes on ${hackathon2026.registrationDeadlineLabel}. Late registrations ` +
          'are not evaluated, so complete the form before that date.'
      },
      {
        id: 'faq-fee',
        question: 'How much does the entry fee cost?',
        answer:
          `The entry fee is ${hackathon2026.registrationFeeLabel} ${hackathon2026.registrationFeeNote} ` +
          `for ${hackathon2026.title}. Refund terms have not been published, so confirm with the ` +
          'organizers before paying.'
      },
      {
        id: 'faq-theme',
        question: 'What is the theme?',
        answer:
          `The theme is ${hackathon2026Theme.name}. ${hackathon2026Theme.intro} Build areas include ` +
          `${hackathon2026Theme.buildAreas
            .slice(0, 4)
            .map((area) => area.label.toLowerCase())
            .join(', ')} and more.`
      }
    ]
  },
  {
    id: 'competition',
    label: 'Competition',
    description: 'Stages, judging and what you win.',
    icon: 'Scale',
    items: [
      {
        id: 'faq-stages',
        question: 'What are the stages and how long does it take?',
        answer:
          'The edition runs in four stages. Submit a concept, build and submit the working project, ' +
          `then the top 30 teams enter a final round lasting ${hackathon2026.finalRoundDuration.toLowerCase()}. ` +
          `Idea submissions open ${stageById('idea-submission').dateLabel} and project ` +
          `submissions are due ${stageById('first-round').dateLabel}.`
      },
      {
        id: 'faq-submit',
        question: 'What exactly do I submit?',
        answer:
          'First your concept — the problem you are solving and what you plan to build. Then the ' +
          'working project with its repository and a short presentation. Only the top 30 teams reach ' +
          'the final round.'
      },
      {
        id: 'faq-original',
        question: 'Can I use code I already wrote?',
        answer: ruleById('rule-original').description
      },
      {
        id: 'faq-judging',
        question: 'How are projects judged?',
        answer:
          'Projects are evaluated on innovation, technical execution, design and impact. The ' +
          'decision of the judging panel is final.'
      },
      {
        id: 'faq-prizes',
        question: 'What are the prizes?',
        answer:
          `Prizes run across five tiers, from ${hackathon2026Prizes[0].amount} for the winner down ` +
          `to ${lowestPrize.amount}. Amounts are published as "up to" figures and are not guaranteed.`
      },
      {
        id: 'faq-recognition',
        question: 'Do we get a certificate, medal or trophy?',
        answer: hackathon2026Recognition.map((tier) => `${tier.level}: ${tier.reward}.`).join(' ')
      },
      {
        id: 'faq-internship',
        question: 'Is the internship guaranteed?',
        answer:
          `No. ${hackathon2026Internship.headline} ${hackathon2026Internship.natureNote} ` +
          hackathon2026Internship.selectionNote
      }
    ]
  },
  {
    id: 'editions',
    label: 'Editions',
    description: 'The professional track and what comes next.',
    icon: 'CalendarDays',
    items: [
      {
        id: 'faq-professionals',
        question: 'Is there an edition for working professionals?',
        answer:
          `${hackathonProfessionals.title} is a paid edition for ${hackathonProfessionals.audience.toLowerCase()}: ` +
          `${hackathonProfessionals.registrationFeeLabel} ${hackathonProfessionals.registrationFeeNote}, ` +
          `teams of ${hackathonProfessionals.teamSize}, and prizes ${hackathonProfessionals.prizeCeiling.toLowerCase()}. ` +
          `Idea submission opens ${hackathonProfessionalsTimeline[0].dateLabel} and it is currently ` +
          `${hackathonProfessionals.statusLabel.toLowerCase()}.`
      },
      {
        id: 'faq-next-edition',
        question: 'When is the next hackathon?',
        answer:
          `${hackathonMarch2027.title} is being planned and is currently ` +
          `${hackathonMarch2027.statusLabel.toLowerCase()}. Theme, dates and prizes will be published ` +
          'on the edition page first.'
      },
      {
        id: 'faq-multiple',
        question: 'Can I take part in more than one edition?',
        answer:
          `Yes. Each edition is run separately, so you are free to enter more than one. Within a ` +
          `single edition a team may not compete in more than one team, and every member must be ` +
          'declared at registration.'
      }
    ]
  },
  {
    id: 'training',
    label: 'Training & Courses',
    description: 'Programmes, batches and what is included.',
    icon: 'GraduationCap',
    items: [
      {
        id: 'faq-courses',
        question: 'Which courses do you run?',
        answer:
          `We currently run ${COURSES.length} programmes: ${courseList}. Each one is built around ` +
          'live training rather than recorded lectures.'
      },
      {
        id: 'faq-batches',
        question: 'When do the courses start?',
        answer:
          `The next batches start on ${batchList}. Which batch you can join depends on the course, ` +
          'so tell us the programme you are interested in and we will confirm the schedule.'
      },
      {
        id: 'faq-includes',
        question: 'What is included with every course?',
        answer:
          `Every package includes ${includeList}. Courses are priced individually and the current ` +
          'price is shown on each course card.'
      },
      {
        id: 'faq-hackathon-link',
        question: 'Do the courses include the hackathon?',
        answer:
          'Hackathon participation is part of the package, alongside the training, communication ' +
          'skills, mock interviews and placement support. The exact inclusions are listed above.'
      },
      {
        id: 'faq-placement',
        question: 'Is placement guaranteed?',
        answer:
          'Placement support is included, but no programme can guarantee a job offer on its own. ' +
          'What is provided is interview preparation, mock interview tests and introductions — the ' +
          'outcome depends on your own performance and the market.'
      }
    ]
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Work we take on for clients.',
    icon: 'Briefcase',
    items: [
      {
        id: 'faq-services',
        question: 'What services do you offer?',
        // Counted rather than written out, and the titles are listed without a
        // joining comma: "Digital Marketing, SEO & Lead Generation" already
        // contains one, which made a hardcoded list read as six items.
        answer:
          `We take on ${SERVICES.length} lines of work: ` +
          `${SERVICES.map((service) => service.title).join('; ')}.`
      },
      {
        id: 'faq-pricing',
        question: 'How much do your services cost?',
        answer:
          'Every engagement is scoped to your requirements, so there is no published price list. ' +
          'Send us what you need to build through the contact form and we will come back with a quote.'
      },
      {
        id: 'faq-timeline',
        question: 'How long does a project take?',
        answer:
          'It depends entirely on the scope. We agree the timeline with you before starting, and ' +
          'the contact form is the fastest way to get a realistic estimate.'
      },
      {
        id: 'faq-clients',
        question: 'Who do you work with?',
        answer:
          'Clients range from universities needing management and learning systems to businesses ' +
          'looking for web, app or AI automation work, and teams that need engineers staffed. Tell us ' +
          'your context and we will say honestly whether we are the right fit.'
      }
    ]
  },
  {
    id: 'contact',
    label: 'Contact & Support',
    description: 'Reaching the team and getting a reply.',
    icon: 'MessageCircle',
    items: [
      {
        id: 'faq-how-to-contact',
        question: 'How do I contact the organizers?',
        answer:
          `Email ${SITE.email}, call us, or use the contact form. Mention the edition and your ` +
          'question and the team will get back to you within 24–48 hours.'
      },
      {
        id: 'faq-reply-time',
        question: 'How quickly do you reply?',
        answer:
          'Within 24–48 hours on working days. If your question is about a registration deadline, ' +
          'say so in the subject and we will prioritise it.'
      },
      {
        id: 'faq-no-answer',
        question: 'I still cannot find my answer. What now?',
        answer:
          'Use the contact form and describe what you are trying to find out. Questions that come up ' +
          'repeatedly get added to this page, so asking genuinely improves the site.'
      }
    ]
  }
]

/** Every question flattened, used to power the search index and result count. */
export const FAQ_ITEMS = FAQ_CATEGORIES.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id, categoryLabel: category.label }))
)

/** All lucide icon names referenced above, so the page can resolve them once. */
export const FAQ_CATEGORY_ICONS = FAQ_CATEGORIES.map((category) => category.icon)
