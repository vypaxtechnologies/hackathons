import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import HackathonCard from '../components/hackathons/HackathonCard'
import ApplyNowButton from '../components/common/ApplyNowButton'
import { EDITION_SUMMARIES } from '../config/editions'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function Hackathons() {
  useDocumentMeta({
    title: 'Hackathons',
    description:
      'Every Vypax EdTech & Hackathons edition — the student track, the professional track and ' +
      'what is planned next, each with its own theme, schedule and prize pool.',
    path: '/hackathons'
  })

  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="All hackathons"
        title="Current and upcoming editions"
        description="Each edition has its own theme, schedule and prize pool. Explore the details to find your next build sprint."
        align="center"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {EDITION_SUMMARIES.map((edition, index) => (
          <Reveal key={edition.id} delay={index * 0.08} className="h-full">
            <HackathonCard edition={edition} index={index} compact />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 rounded-2xl border border-white/[0.08] bg-ink-900/50 p-8 text-center sm:p-12">
        <h2 className="font-display text-2xl font-bold text-mist-100 sm:text-3xl">
          Registration is open
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-mist-400 sm:text-lg">
          The Apply Now button opens the official Vypax EdTech & Hackathons registration form in a new
          tab. No account is required to register.
        </p>
        <div className="mt-6 flex justify-center">
          <ApplyNowButton size="lg" />
        </div>
      </Reveal>
    </div>
  )
}
