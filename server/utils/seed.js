import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import User from '../models/User.js'
import Judge from '../models/Judge.js'
import Hackathon from '../models/Hackathon.js'
import bcrypt from 'bcryptjs'

dotenv.config()

/**
 * Seeds the platform with the two organizer-provided hackathons, the default
 * admin account and a couple of judge accounts.
 *
 * Usage: npm run seed --prefix server
 */

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@vypaxtechnologies.com'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'VypaxAdmin@2026'

const hackathon2026 = {
  title: 'Hackathon November 2026',
  slug: 'hackathon-2026',
  description:
    'Hackathon November 2026 is the flagship build sprint from Vypax EdTech & Hackathons. Teams design, ' +
    'build and ship working web and mobile products across a month-long schedule that ends in ' +
    'a 24-hour final round for the top 30 teams.',
  status: 'registration-open',
  theme: 'App & Web Development',
  registrationDeadline: new Date('2026-10-31T23:59:59.000Z'),
  startDate: new Date('2026-10-01T00:00:00.000Z'),
  endDate: new Date('2026-11-30T23:59:59.000Z'),
  importantDates: [
    {
      title: 'Registration',
      date: new Date('2026-10-31T23:59:59.000Z'),
      description:
        'Participants must complete registration before the deadline. Teams of 2 to 4 members.'
    },
    {
      title: 'Idea Submission',
      date: new Date('2026-11-02T00:00:00.000Z'),
      endDate: new Date('2026-11-05T23:59:59.000Z'),
      description: 'Participants submit their hackathon idea / project concept for review.'
    },
    {
      title: 'First Round + Project Submission',
      date: new Date('2026-11-15T23:59:59.000Z'),
      description: 'First round evaluation and full project submission.'
    },
    {
      title: 'Final Round',
      date: new Date('2026-11-30T23:59:59.000Z'),
      description: 'Top 30 teams participate in the final round. Final round duration: 24 hours.'
    }
  ],
  prizes: [
    { rank: '1st Prize', amount: 100000, description: 'Up to ₹1,00,000' },
    { rank: '2nd Prize', amount: 50000, description: 'Up to ₹50,000' },
    { rank: '3rd Prize', amount: 30000, description: 'Up to ₹30,000' },
    { rank: '4th Prize', amount: 15000, description: 'Up to ₹15,000' },
    { rank: '5th Prize & Beyond', amount: 5000, description: 'Up to ₹5,000' }
  ],
  recognition: [
    { level: 'Top 30 Teams', teams: 30, reward: 'Hard Copy Certificate' },
    { level: 'Top 20 Teams', teams: 20, reward: 'Medal + Certificate' },
    { level: 'Top 3 Teams', teams: 3, reward: 'Trophy + Medal + Certificate' }
  ],
  internshipOpportunity: {
    description:
      'Top 7 teams will receive an opportunity to participate in the Vypax EdTech & Hackathons ' +
      'internship selection process.',
    teamsEligible: 7,
    candidatesSelected: '3-4 candidates may ultimately be selected',
    isAssessmentBased: true,
    isGuaranteed: false
  },
  registrationUrl: process.env.HACKATHON_2026_FORM_URL || 'https://forms.gle/DvEwSkuK6WjUtT6v6',
  teamSizeMin: 2,
  teamSizeMax: 4,
  rules: [
    {
      title: 'Team Composition',
      description:
        'Teams can have 2 to 4 members. Every member must be listed during registration and a ' +
        'team may not participate in more than one team for the same edition.'
    },
    {
      title: 'Original Work',
      description:
        'All code, designs and assets submitted must be created during the hackathon window. ' +
        'Pre-existing projects, templates or boilerplates must be declared and may not form the ' +
        'core of the submission.'
    },
    {
      title: 'Submission Windows',
      description:
        'The idea submission window and the project submission deadline are binding. Late ' +
        'submissions are not evaluated.'
    },
    {
      title: 'Final Round',
      description:
        'Only the top 30 teams advance to the 24-hour final round. Teams must be available for ' +
        'the full duration of the final round.'
    },
    {
      title: 'Judging',
      description:
        'Projects are scored on innovation, technical execution, design and impact. The decision ' +
        'of the judging panel is final.'
    }
  ],
  faqs: [
    {
      question: 'Who can participate?',
      answer: 'Eligibility details will be announced by the organizers.'
    },
    {
      question: 'What is the team size?',
      answer: 'Teams can have 2-4 members.'
    },
    {
      question: 'How do I register?',
      answer: 'Registration can be completed using the official Apply Now Google Form linked on this page.'
    },
    {
      question: 'What is the registration deadline?',
      answer: '31 October 2026.'
    },
    {
      question: 'What is the final round duration?',
      answer: '24 hours.'
    },
    {
      question: 'What is the hackathon theme?',
      answer: 'App & Web Development.'
    },
    {
      question: 'Will participants receive certificates?',
      answer:
        'Yes. The top 30 teams receive a hard copy certificate, the top 20 teams receive a medal ' +
        'along with the certificate, and the top 3 teams receive a trophy, medal and certificate.'
    },
    {
      question: 'Is the internship guaranteed?',
      answer:
        'No. The top 7 teams receive an opportunity to participate in the Vypax EdTech & Hackathons ' +
        'internship selection process. It is an assessment-based process and does not guarantee ' +
        'selection. Only 3-4 candidates may ultimately be selected.'
    }
  ],
  isPublished: true
}

const hackathonMarch2027 = {
  title: 'Hackathon March 2027',
  slug: 'hackathon-march-2027',
  description:
    'The next edition of the Vypax EdTech & Hackathons series. Theme, schedule, rules and ' +
    'prizes are being finalized and will be announced here first.',
  status: 'upcoming',
  theme: 'To Be Announced',
  registrationDeadline: null,
  importantDates: [],
  prizes: [],
  recognition: [],
  internshipOpportunity: {
    description: 'To Be Announced.',
    teamsEligible: 0,
    candidatesSelected: '',
    isAssessmentBased: true,
    isGuaranteed: false
  },
  registrationUrl: '',
  teamSizeMin: 2,
  teamSizeMax: 4,
  rules: [],
  faqs: [],
  isPublished: true
}

const judgeSeed = [
  {
    name: 'Vypax Evaluation Panel',
    email: 'judge@vypaxtechnologies.com',
    password: 'VypaxJudge@2026',
    expertise: 'Full-stack engineering, product design'
  }
]

const run = async () => {
  await connectDB()

  // Admin account
  const existingAdmin = await User.findOne({ email: ADMIN_EMAIL })
  if (existingAdmin) {
    console.log(`Admin already exists: ${ADMIN_EMAIL}`)
  } else {
    await User.create({
      name: 'Vypax Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin'
    })
    console.log(`Admin created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  }

  // Judges
  for (const judge of judgeSeed) {
    const exists = await Judge.findOne({ email: judge.email })
    if (exists) {
      console.log(`Judge already exists: ${judge.email}`)
      continue
    }
    await Judge.create({
      ...judge,
      password: await bcrypt.hash(judge.password, 12)
    })
    console.log(`Judge created: ${judge.email} / ${judge.password}`)
  }

  // Hackathons
  for (const data of [hackathon2026, hackathonMarch2027]) {
    const existing = await Hackathon.findOne({ slug: data.slug })
    if (existing) {
      await Hackathon.findByIdAndUpdate(existing._id, data, { new: true, runValidators: true })
      console.log(`Hackathon updated: ${data.title}`)
    } else {
      await Hackathon.create(data)
      console.log(`Hackathon created: ${data.title}`)
    }
  }

  await mongoose.connection.close()
  console.log('Seed complete.')
  process.exit(0)
}

run().catch(async (error) => {
  console.error('Seed failed:', error)
  await mongoose.connection.close()
  process.exit(1)
})
