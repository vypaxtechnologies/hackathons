import { SITE } from './site'
import fullStackImg from '../assets/images/courses/fullstack.jpg'
import frontendImg from '../assets/images/courses/frontend.jpg'
import backendImg from '../assets/images/courses/backend.jpg'
import seoDigitalImg from '../assets/images/courses/seo-digital.jpg'
import seoImg from '../assets/images/courses/seo.jpg'
import marketingImg from '../assets/images/courses/marketing.jpg'
import dataAnalystImg from '../assets/images/courses/data-analyst.jpg'
import dsaImg from '../assets/images/courses/dsa.jpg'
import mechanicalImg from '../assets/images/courses/mechanical.jpg'
import customSoftwareImg from '../assets/images/services/custom-software.jpg'
import webAppImg from '../assets/images/services/web-app.jpg'
import digitalMarketingImg from '../assets/images/services/digital-marketing.jpg'
import aiAutomationImg from '../assets/images/services/ai-automation.jpg'
import staffingImg from '../assets/images/services/staffing.jpg'

/**
 * Editorial content shared across public pages. Kept separate from the
 * hackathon edition data so both can evolve independently.
 */

/**
 * The three summary cards that sit directly below the hero. Each card groups a
 * set of related facts so the home page reads as three panels rather than a
 * row of disconnected numbers.
 */
export const HOME_STATS = [
  {
    id: 'card-hackathon',
    eyebrow: 'The hackathon',
    title: 'Hackathon November 2026',
    description: 'A month-long build sprint in app and web development, finished by a 24-hour final.',
    facts: [
      { id: 'stat-prize', value: '₹2,00,000', label: 'Total prize pool', sub: 'Up to, across tiers' },
      { id: 'stat-teams', value: '30', label: 'Teams in the final', sub: '24-hour build sprint' },
      { id: 'stat-rounds', value: '4', label: 'Competition stages', sub: 'Register to final' },
      { id: 'stat-team-size', value: '2–4', label: 'Members per team', sub: 'Build together' }
    ],
    to: '/hackathons/hackathon-2026',
    actionLabel: 'View the hackathon'
  },
  {
    id: 'card-partners',
    eyebrow: 'Our network',
    title: 'Partners & reach',
    description:
      'Campus and industry organisations backing the programme, already committed for this edition.',
    facts: [
      { id: 'stat-colleges', value: '20+', label: 'Partner colleges', sub: 'Campus outreach' },
      { id: 'stat-companies', value: '10+', label: 'Partner companies', sub: 'Hiring & mentoring' }
    ],
    to: '/contact',
    actionLabel: 'Partner with us'
  },
  {
    id: 'card-training',
    eyebrow: 'Coming up',
    title: 'Training programmes',
    description:
      'Structured sessions that run alongside the hackathon, open to students and working professionals.',
    badge: 'Registration open',
    facts: [
      { id: 'stat-training-batches', value: '3', label: 'Upcoming batches', sub: 'Across both tracks' },
      { id: 'stat-training-mode', value: 'Remote', label: 'Delivery mode', sub: 'Join from anywhere' }
    ],
    to: '/contact',
    actionLabel: 'Reserve a seat',
    secondaryAction: { label: 'View courses', to: '/courses' }
  }
]

/**
 * Vypax course catalogue. Durations and prices are organizer-supplied; the
 * batch start dates below are the two currently published intakes.
 */
export const COURSE_BATCHES = [
  { id: 'batch-dec-2026', label: '15 December 2026', start: '2026-12-15' },
  { id: 'batch-jan-2027', label: '1 January 2027', start: '2027-01-01' }
]

export const COURSES = [
  {
    id: 'course-fullstack',
    name: 'Full Stack Development',
    duration: '6 Months',
    price: '₹11,999',
    image: fullStackImg,
    imageAlt: 'Developer workstation showing full stack application source code'
  },
  {
    id: 'course-frontend',
    name: 'Frontend Development',
    duration: '4 Months',
    price: '₹6,499',
    image: frontendImg,
    imageAlt: 'Code editor window used for building user interfaces'
  },
  {
    id: 'course-backend',
    name: 'Backend Development',
    duration: '4 Months',
    price: '₹6,499',
    image: backendImg,
    imageAlt: 'Screen displaying server-side code for backend development'
  },
  {
    id: 'course-seo-digital',
    name: 'SEO + Digital Marketing',
    duration: '6 Months',
    price: '₹11,499',
    image: seoDigitalImg,
    imageAlt: 'Laptop screen showing combined search and marketing analytics'
  },
  {
    id: 'course-seo',
    name: 'SEO',
    duration: '4 Months',
    price: '₹6,499',
    image: seoImg,
    imageAlt: 'Search optimisation work viewed on a laptop'
  },
  {
    id: 'course-digital-marketing',
    name: 'Digital Marketing',
    duration: '4 Months',
    price: '₹6,499',
    image: marketingImg,
    imageAlt: 'Marketing campaign planning on a laptop screen'
  },
  {
    id: 'course-data-analyst',
    name: 'Data Analyst',
    duration: '6 Months',
    price: '₹11,499',
    image: dataAnalystImg,
    imageAlt: 'Data visualisation and charts being analysed on a monitor'
  },
  {
    id: 'course-dsa',
    name: 'DSA',
    duration: '6 Months',
    price: '₹17,999',
    image: dsaImg,
    imageAlt: 'Data structures and algorithms worked through on a laptop'
  },
  {
    id: 'course-mechanical',
    name: 'Mechanical (AutoCAD)',
    duration: '6 Months',
    price: '₹10,499',
    image: mechanicalImg,
    imageAlt: 'Engineer drafting a mechanical drawing by hand on a blueprint'
  }
]

/** What every course package includes. */
export const COURSE_INCLUDES = [
  { id: 'include-training', label: 'Training', icon: 'Presentation' },
  { id: 'include-communication', label: 'Communication skills', icon: 'Mic' },
  { id: 'include-hackathon', label: 'Hackathon participation', icon: 'Code' },
  { id: 'include-notes', label: 'Notes & handwritten study material', icon: 'NotebookPen' },
  { id: 'include-mocks', label: 'Mock interview tests', icon: 'ClipboardCheck' },
  { id: 'include-interview', label: 'Interview preparation', icon: 'MessagesSquare' },
  { id: 'include-placement', label: 'Placement support', icon: 'Briefcase' }
]

export const WHY_PARTICIPATE = [
  {
    id: 'why-build',
    title: 'Build',
    description: 'Build real-world technology solutions, not throwaway demos.',
    icon: 'Hammer'
  },
  {
    id: 'why-compete',
    title: 'Compete',
    description: 'Compete with other developers and teams on a single ranked board.',
    icon: 'Swords'
  },
  {
    id: 'why-win',
    title: 'Win',
    description: 'Get opportunities for prizes and recognition across five prize tiers.',
    icon: 'Trophy'
  },
  {
    id: 'why-learn',
    title: 'Learn',
    description: 'Improve development and problem-solving skills under real deadlines.',
    icon: 'BookOpen'
  },
  {
    id: 'why-recognized',
    title: 'Get Recognized',
    description: 'Certificates, medals and trophies for qualifying teams.',
    icon: 'Award'
  },
  {
    id: 'why-opportunity',
    title: 'Opportunity',
    description: 'Top teams can enter the internship assessment process.',
    icon: 'DoorOpen'
  }
]

export const ABOUT_INTRO = {
  eyebrow: 'About Vypax EdTech & Hackathons',
  heading: 'We build software. Then we ask everyone else to build it too.',
  paragraphs: [
    `${SITE.name} is a product engineering company that builds web platforms, mobile ' +
      'applications and AI-assisted tooling for teams that need to ship quickly. Our hackathon ' +
      'initiative grew out of a simple observation: the fastest way to find people who can ' +
      'actually build is to give them a real problem and a real deadline.`,
    'We run build-first competitions — not slide-deck contests. Participants get a clear brief, ' +
      'a structured schedule and a final round that compresses everything into a single 24-hour ' +
      'sprint. What comes out the other side is working software, plus a shortlist of developers ' +
      'we want to work with.'
  ],
  imageAlt: 'Developers collaborating on a project during a Vypax EdTech & Hackathons build sprint'
}

export const ABOUT_PILLARS = [
  {
    id: 'pillar-innovation',
    title: 'Innovation',
    description: 'We push for ideas that go past the obvious and into something genuinely useful.',
    icon: 'Lightbulb'
  },
  {
    id: 'pillar-technology',
    title: 'Technology',
    description: 'Modern stacks, real architecture and code that holds up under review.',
    icon: 'Cpu'
  },
  {
    id: 'pillar-students',
    title: 'Student Developers',
    description: 'A platform built for students who are ready to work at a professional pace.',
    icon: 'GraduationCap'
  },
  {
    id: 'pillar-problem-solving',
    title: 'Problem Solving',
    description: 'Every submission starts with a problem worth solving, not a framework to show off.',
    icon: 'Puzzle'
  },
  {
    id: 'pillar-products',
    title: 'Real-World Products',
    description: 'Ship something deployable — working software beats a concept document.',
    icon: 'Rocket'
  },
  {
    id: 'pillar-collaboration',
    title: 'Collaboration',
    description: 'Teams of 2–4 learn to split, review and integrate work under pressure.',
    icon: 'Users'
  },
  {
    id: 'pillar-community',
    title: 'Developer Community',
    description: 'A growing network of builders who stay connected after the competition ends.',
    icon: 'Network'
  }
]

export const PARTICIPATION_STEPS = [
  {
    id: 'step-register',
    step: '01',
    title: 'Register your team',
    description: 'Complete the official registration form with your team of 2–4 members.'
  },
  {
    id: 'step-idea',
    step: '02',
    title: 'Submit your concept',
    description: 'Share the problem you are solving and the product you plan to build.'
  },
  {
    id: 'step-build',
    step: '03',
    title: 'Build and submit',
    description: 'Ship your project, push your repository and prepare your presentation.'
  },
  {
    id: 'step-final',
    step: '04',
    title: 'Enter the final round',
    description: 'The top 30 teams take part in a single 24-hour final hackathon.'
  }
]

/**
 * Vypax engineering and growth services offered alongside the hackathon
 * programme. Pricing is deliberately omitted — every engagement is scoped to
 * the client's requirements, so published figures would be misleading.
 */
export const SERVICES = [
  {
    id: 'service-custom-software',
    title: 'Custom Software Solutions',
    summary:
      'Bespoke platforms built against your actual workflow — including university management ' +
      'and learning systems — not a generic template.',
    icon: 'Code',
    image: customSoftwareImg,
    imageAlt: 'Engineering team reviewing a software architecture diagram',
    capabilities: [
      'University Management System (UMS)',
      'Learning Management System (LMS)',
      'Library and inventory modules',
      'Custom web and desktop applications'
    ]
  },
  {
    id: 'service-web-app',
    title: 'Web & App Development',
    summary:
      'Responsive products shipped from design through deployment, on stacks your team can maintain.',
    icon: 'Smartphone',
    image: webAppImg,
    imageAlt: 'Developer reviewing a responsive web and mobile interface',
    capabilities: [
      'Responsive front-end builds',
      'Android and iOS applications',
      'API and backend integration',
      'Hosting, CI and release management'
    ]
  },
  {
    id: 'service-digital-marketing',
    title: 'Digital Marketing, SEO & Lead Generation',
    summary:
      'Search, content and paid campaigns measured against pipeline rather than impressions.',
    icon: 'TrendingUp',
    image: digitalMarketingImg,
    imageAlt: 'Marketing performance dashboards reviewed on a laptop',
    capabilities: [
      'Technical and on-page SEO',
      'Content and backlink strategy',
      'Paid search and social campaigns',
      'Lead capture funnels and reporting'
    ]
  },
  {
    id: 'service-ai-automation',
    title: 'AI Automation',
    summary:
      'Practical automation of repetitive work, grounded in models that suit the task and budget.',
    icon: 'Bot',
    image: aiAutomationImg,
    imageAlt: 'Abstract visualisation representing AI automation workflows',
    capabilities: [
      'Workflow and process automation',
      'Custom LLM and RAG applications',
      'Document and data extraction',
      'Human-in-the-loop review systems'
    ]
  },
  {
    id: 'service-staffing',
    title: 'Staffing & Recruiting',
    summary:
      'Pre-vetted engineering talent matched to your stack, plus recruitment support for growing teams.',
    icon: 'UserSearch',
    image: staffingImg,
    imageAlt: 'Professionals collaborating around a shared workspace table',
    capabilities: [
      'Contract developer staffing',
      'Full-time talent sourcing',
      'Technical and HR screening',
      'Onboarding and engagement support'
    ]
  }
]

/** The escape hatch: choosing it reveals a free-text subject field. */
export const CONTACT_SUBJECT_OTHER = 'topic-other'

/**
 * Subject options offered by the contact form dropdown.
 *
 * Each entry is scoped to something the site actually publishes or runs, so a
 * message lands with the right team member rather than a generic inbox. The
 * `label` is what is submitted and stored, which keeps admin filtering simple —
 * these values are the canonical subject list, not display-only copy.
 */
export const CONTACT_SUBJECTS = [
  {
    id: 'topic-hackathon-registration',
    label: 'Hackathon registration & eligibility',
    description: 'Joining an edition, team size, eligibility or deadlines.',
    icon: 'ClipboardList'
  },
  {
    id: 'topic-hackathon-idea',
    label: 'Hackathon idea submission',
    description: 'Submitting a project concept or asking what to build.',
    icon: 'Lightbulb'
  },
  {
    id: 'topic-hackathon-project',
    label: 'Hackathon project submission',
    description: 'Repository access, deadlines or what to submit.',
    icon: 'Code'
  },
  {
    id: 'topic-final-round',
    label: 'Final round & 24-hour sprint',
    description: 'Shortlist logistics, availability and judging.',
    icon: 'Timer'
  },
  {
    id: 'topic-training',
    label: 'Courses & batch enquiry',
    description: 'Course content, duration, fees or batch dates.',
    icon: 'GraduationCap'
  },
  {
    id: 'topic-placement',
    label: 'Placement & internship',
    description: 'Internship selection, assessments or placement support.',
    icon: 'Briefcase'
  },
  {
    id: 'topic-partnership',
    label: 'Sponsorship & partnerships',
    description: 'Sponsoring an edition, campus or company collaboration.',
    icon: 'Handshake'
  },
  {
    id: 'topic-services',
    label: 'Project or service enquiry',
    description: 'Custom software, web or app work for your organisation.',
    icon: 'Wrench'
  },
  {
    id: 'topic-feedback',
    label: 'Feedback or a bug on this site',
    description: 'Something on the page is wrong or missing.',
    icon: 'MessageSquare'
  },
  {
    id: CONTACT_SUBJECT_OTHER,
    label: 'Something else',
    description: 'Tell us what it is about and we will route it.',
    icon: 'Sparkles'
  }
]

/**
 * Headline figures used on the About page. Every value matches what the rest of
 * the site already publishes — the prize pool, the final-round size and the
 * partner reach are the same numbers shown on the home page and edition cards,
 * so the two can never disagree.
 */
export const ABOUT_STATS = [
  {
    id: 'about-stat-founded',
    value: String(SITE.foundedYear),
    label: 'Founded',
    sub: 'Vypax Technologies'
  },
  {
    id: 'about-stat-editions',
    value: '3',
    label: 'Editions announced',
    sub: 'Student, professional and next'
  },
  {
    id: 'about-stat-prizes',
    value: '₹2,00,000',
    label: 'Prize pool',
    sub: 'Across five tiers, up to'
  },
  {
    id: 'about-stat-colleges',
    value: '20+',
    label: 'Partner colleges',
    sub: 'Campus outreach'
  },
  {
    id: 'about-stat-companies',
    value: '10+',
    label: 'Partner companies',
    sub: 'Hiring and mentoring'
  },
  {
    id: 'about-stat-courses',
    value: '9',
    label: 'Training courses',
    sub: 'Two published intakes'
  }
]

/**
 * The three things we run, so a visitor can see the whole programme from one
 * place rather than having to discover each part of the site separately.
 */
export const ABOUT_TRACKS = [
  {
    id: 'track-hackathons',
    title: 'Hackathons',
    description:
      'Build-first competitions with a published schedule, a ranked board and a 24-hour final round. ' +
      'The student edition is open now; a professional edition and a 2027 edition are planned.',
    points: [
      'Three announced editions',
      '24-hour final hackathon',
      'Prizes, medals and hard copy certificates'
    ],
    to: '/hackathons',
    actionLabel: 'Browse the editions'
  },
  {
    id: 'track-training',
    title: 'Training & courses',
    description:
      'Structured programmes that run alongside the hackathon, covering development, marketing and ' +
      'engineering skills with placement support built into the package.',
    points: [
      'Nine courses from four to six months',
      'Two published batch intakes',
      'Mock interviews and placement support'
    ],
    to: '/courses',
    actionLabel: 'See the courses'
  },
  {
    id: 'track-services',
    title: 'Services',
    description:
      'The engineering work behind the programme. We build custom software, web and mobile products, ' +
      'AI automation and recruit technical teams for growing companies.',
    points: [
      'Custom software and web products',
      'AI automation and data extraction',
      'Staffing and technical recruiting'
    ],
    to: '/services',
    actionLabel: 'Explore the services'
  }
]

/**
 * How the programme got here. Framed around published editions and batches
 * rather than invented dates, so the timeline is a record of what is actually
 * scheduled.
 */
export const ABOUT_JOURNEY = [
  {
    id: 'journey-founded',
    year: String(SITE.foundedYear),
    title: 'Vypax EdTech & Hackathons launches',
    description:
      'The hackathon initiative starts as a build-first competition series alongside the Vypax ' +
      'engineering practice, aimed at developers who want to ship under a real deadline.'
  },
  {
    id: 'journey-student-edition',
    year: '2026',
    title: 'Hackathon November 2026 goes live',
    description:
      'The first full student edition: registration, idea submission, project submission and a ' +
      '24-hour final round decided by a judging panel.'
  },
  {
    id: 'journey-training',
    year: '2026–27',
    title: 'Training programmes open',
    description:
      'Nine courses across development, marketing and engineering, with published batch intakes so ' +
      'students and professionals can join between hackathons.'
  },
  {
    id: 'journey-professional-edition',
    year: '2027',
    title: 'Professional edition announced',
    description:
      'A paid track for working developers and senior builders, with a larger prize pool, smaller ' +
      'teams and a format aimed at shipping production work.'
  },
  {
    id: 'journey-march-2027',
    year: '2027',
    title: 'Hackathon March 2027 confirmed',
    description:
      'The next student edition in the series. It stays remote like the first one, with the theme, ' +
      'round-by-round dates and prize breakdown published on its edition page as soon as they are set.'
  }
]

/**
 * What a participant can hold us to. These are the commitments already implied
 * by the published rules, restated as plain promises.
 */
export const ABOUT_COMMITMENTS = [
  {
    id: 'commit-schedule',
    title: 'A published schedule',
    description:
      'Every stage has a published date and we do not move deadlines silently. If something changes, ' +
      'it is announced to registered participants.',
    icon: 'CalendarCheck'
  },
  {
    id: 'commit-judging',
    title: 'A transparent result',
    description:
      'Projects are judged on innovation, technical execution, design and impact. The panel decision ' +
      'is final and we publish the outcome for every qualifying team.',
    icon: 'Scale'
  },
  {
    id: 'commit-recognition',
    title: 'Recognition that arrives',
    description:
      'Certificates, medals and trophies are awarded to qualifying teams. An internship qualification ' +
      'opens an assessment process — it is never presented as a guaranteed placement.',
    icon: 'Award'
  },
  {
    id: 'commit-original',
    title: 'Original work only',
    description:
      'All code, design and assets must be produced during the hackathon window. Existing projects ' +
      'must be declared and plagiarism ends a run.',
    icon: 'ShieldCheck'
  }
]

