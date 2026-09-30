import { Compass } from 'lucide-react'
import Button from '../ui/Button'
import ApplyNowButton from '../common/ApplyNowButton'
import Reveal from '../ui/Reveal'
import { hackathon2026 } from '../../config/hackathon2026'

/** Final conversion block: apply or browse the hackathon list. */
export default function CtaBanner() {
  return (
    <section className="container-page pb-16 sm:pb-20">
      <Reveal className="relative overflow-hidden rounded-3xl border border-lime-400/20 bg-ink-900 p-8 text-center sm:p-12 lg:p-16">
        <span
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full bg-lime-400/[0.12] blur-[100px]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 grid-overlay opacity-40"
          aria-hidden="true"
        />

        <div className="relative">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-lime-400/60" aria-hidden="true" />
            Registration closes {hackathon2026.registrationDeadlineLabel}
          </span>

          <h2 className="mx-auto mt-4 max-w-3xl font-display text-display-md font-bold text-mist-100">
            Ready to build something that actually ships?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mist-400 sm:text-base">
            Register your team of 2–4 members, submit your concept and take it all the way to the
            24-hour final round on 30 November 2026.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ApplyNowButton className="w-full sm:w-auto" />
            <Button
              variant="secondary"
              size="lg"
              to="/hackathons/hackathon-2026"
              icon={Compass}
              className="w-full sm:w-auto"
            >
              View Hackathon Details
            </Button>
          </div>

          <p className="mt-4 text-xs text-mist-500">
            Apply Now opens the official Vypax EdTech & Hackathons registration form in a new tab.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
