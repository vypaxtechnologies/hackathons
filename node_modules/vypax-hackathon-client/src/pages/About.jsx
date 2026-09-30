import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  Mail,
  Phone,
  Scale,
  ShieldCheck
} from 'lucide-react'
import { VypaxMark } from '../components/brand/VypaxMark'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import ParticipationSteps from '../components/home/ParticipationSteps'
import { IMAGES } from '../config/editions'
import {
  ABOUT_COMMITMENTS,
  ABOUT_INTRO,
  ABOUT_JOURNEY,
  ABOUT_PILLARS,
  ABOUT_STATS,
  ABOUT_TRACKS
} from '../config/content'
import { CONTACT_LINKS, CONTACT_PHONES } from '../config/site'
import { hackathon2026 } from '../config/hackathon2026'

const COMMITMENT_ICONS = {
  CalendarCheck,
  Scale,
  Award,
  ShieldCheck
}

/** Emoji glyph per pillar, resolved from the icon name on the config entry. */
const PILLAR_GLYPHS = {
  Lightbulb: '💡',
  Cpu: '🛠️',
  GraduationCap: '🎓',
  Puzzle: '🧩',
  Rocket: '🚀',
  Users: '🤝',
  Network: '🌐'
}

export default function About() {
  const total = ABOUT_JOURNEY.length

  return (
    <>
      {/* Hero — the one place the full positioning statement is stated outright. */}
      <header className="relative isolate overflow-hidden border-b border-white/[0.07] bg-ink-950">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-lime-400/[0.07] blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <VypaxMark className="mx-auto h-16 w-16" />
            </Reveal>

            <Reveal delay={0.06}>
              <p className="eyebrow mt-8 justify-center">
                <span className="h-px w-6 bg-lime-400/60" aria-hidden="true" />
                {ABOUT_INTRO.eyebrow}
                <span className="h-px w-6 bg-lime-400/60" aria-hidden="true" />
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-5 font-display text-display-lg font-bold text-mist-100">
                {ABOUT_INTRO.heading}
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mx-auto mt-7 max-w-2xl space-y-4 text-left">
                {ABOUT_INTRO.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-mist-400">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.open(hackathon2026.registrationUrl, '_blank', 'noopener')}
                  iconRight={ArrowUpRight}
                >
                  Apply for {hackathon2026.title}
                </Button>
                <Button variant="secondary" size="lg" to="/hackathons">
                  See all editions
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Programme at a glance — the same published figures used elsewhere. */}
      <section className="container-page py-14 sm:py-16" aria-labelledby="about-stats-heading">
        <h2 id="about-stats-heading" className="sr-only">
          Vypax EdTech & Hackathons at a glance
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_STATS.map((stat, index) => (
            <Reveal
              key={stat.id}
              as="li"
              delay={index * 0.05}
              className="rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5 sm:p-6"
            >
              <p className="font-display text-3xl font-bold tracking-tight text-lime-400">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-mist-100">{stat.label}</p>
              <p className="mt-0.5 text-xs text-mist-500">{stat.sub}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Mission, with the collaboration image that the intro promises. */}
      <section className="container-page py-16 sm:py-20" aria-labelledby="mission-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <img
              src={IMAGES.aboutCollab}
              alt={ABOUT_INTRO.imageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-2xl border border-white/[0.08] object-cover"
            />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Our mission"
              title="Find the people who can actually build"
              headingId="mission-heading"
              description="We run competitions, not auditions. The fastest way to meet developers who ship is to hand them a real problem, a real brief and a real deadline — then judge what they hand back."
            />

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-mist-400 sm:text-base">
              <p>
                Every edition is structured the same way: register, submit a concept, build and
                submit a working project, then the top teams go head to head in a single 24-hour
                final round. What comes out the other side is shipped software and a shortlist of
                developers we want to work with.
              </p>
              <p>
                The same applies to how we run as a company. We publish our deadlines, we judge on
                stated criteria, and we tell teams exactly what they did and did not get.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {[
                'Working software over slide decks',
                'Published dates and stated judging criteria',
                'Recognition for every qualifying team, not just the winners'
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-mist-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What we build on. */}
      <section className="border-y border-white/[0.07] bg-ink-950/40" aria-labelledby="pillars-heading">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="What we build on"
            title="Seven principles behind every edition"
            description="The values the competition is actually run against, from the brief a team receives to the certificate it goes home with."
            headingId="pillars-heading"
            align="center"
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_PILLARS.map((pillar, index) => (
              <Reveal
                key={pillar.id}
                as="li"
                delay={index * 0.05}
                className="group rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5 transition-colors hover:border-lime-400/30 sm:p-6"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lg"
                  aria-hidden="true"
                >
                  {PILLAR_GLYPHS[pillar.icon] || '⚡'}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-mist-100">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-400">{pillar.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* The three programmes, so the whole site is legible from one page. */}
      <section className="container-page py-16 sm:py-20" aria-labelledby="tracks-heading">
        <SectionHeading
          eyebrow="What we do"
          title="Three programmes, one engineering practice"
          description="Competitions, training and client work all run by the same team — which is why the mentors in the hackathon have actually shipped the products they advise on."
          headingId="tracks-heading"
          align="center"
        />

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {ABOUT_TRACKS.map((track, index) => (
            <Reveal
              key={track.id}
              as="li"
              delay={index * 0.06}
              className="flex flex-col rounded-2xl border border-white/[0.08] bg-ink-900/50 p-6"
            >
              <h3 className="font-display text-xl font-semibold text-mist-100">{track.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-400">{track.description}</p>

              <ul className="mt-5 space-y-2.5">
                {track.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-mist-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <Button variant="outline" size="sm" to={track.to} iconRight={ArrowUpRight}>
                  {track.actionLabel}
                </Button>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <ParticipationSteps />

      {/* Journey — published editions and intakes only, no invented dates. */}
      <section
        className="border-y border-white/[0.07] bg-ink-950/40"
        aria-labelledby="journey-heading"
      >
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Our journey"
            title="How the programme took shape"
            description="Each milestone below is an edition or intake that is actually scheduled."
            headingId="journey-heading"
            align="center"
          />

          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
            {ABOUT_JOURNEY.map((milestone, index) => (
              <Reveal
                key={milestone.id}
                as="li"
                delay={index * 0.08}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5 transition-colors duration-300 hover:border-lime-400/30 sm:p-6"
              >
                {/* Progress rail across the top of each card: filled for the
                    milestone, muted for everything after it. */}
                <span className="absolute inset-x-0 top-0 h-0.5 bg-white/[0.06]" aria-hidden="true">
                  <span
                    className="block h-full bg-lime-400/70"
                    style={{ width: `${((index + 1) / total) * 100}%` }}
                  />
                </span>

                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lime-400/30 bg-ink-950 font-mono text-xs font-bold text-lime-400"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-500"
                    aria-label={`Milestone ${index + 1} of ${total}`}
                  >
                    {milestone.year}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-base font-semibold text-mist-100 sm:text-lg">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-400">{milestone.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What participants can hold us to. */}
      <section
        className="border-y border-white/[0.07] bg-ink-950/40"
        aria-labelledby="commitments-heading"
      >
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Our commitments"
            title="What you can hold us to"
            description="These are already in the published rules — restated here as plain promises."
            headingId="commitments-heading"
            align="center"
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {ABOUT_COMMITMENTS.map((item, index) => {
              const Icon = COMMITMENT_ICONS[item.icon] || CheckCircle2

              return (
                <Reveal
                  key={item.id}
                  as="li"
                  delay={index * 0.05}
                  className="flex gap-4 rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5 sm:p-6"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400"
                    aria-hidden="true"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-mist-100">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist-400">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Close — register, or just ask a question. */}
      <section className="container-page py-16 sm:py-24" aria-labelledby="about-cta-heading">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            id="about-cta-heading"
            className="font-display text-display-md font-bold text-mist-100"
          >
            Come build with us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mist-400 sm:text-base">
            Registration for {hackathon2026.title} closes on{' '}
            {hackathon2026.registrationDeadlineLabel}. Teams are {hackathon2026.teamSize} and the
            theme is {hackathon2026.theme}. If you still have a question, ask it before you register
            — we answer every one.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open(hackathon2026.registrationUrl, '_blank', 'noopener')}
              iconRight={ArrowUpRight}
            >
              Apply now
            </Button>
            <Button variant="secondary" size="lg" to="/contact">
              Ask a question
            </Button>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-6">
            <a
              href={CONTACT_LINKS.emailHref}
              className="inline-flex items-center gap-2 text-mist-300 transition-colors hover:text-lime-400"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {CONTACT_LINKS.email}
            </a>
            {CONTACT_PHONES.map((phone) => (
              <a
                key={phone.id}
                href={phone.href}
                className="inline-flex items-center gap-2 text-mist-300 transition-colors hover:text-lime-400"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {phone.number}
              </a>
            ))}
          </div>

          <p className="mt-6 text-sm text-mist-500">
            Prefer to browse first?{' '}
            <Link to="/faq" className="link-underline text-mist-300">
              Read the full FAQ
            </Link>{' '}
            or{' '}
            <Link to="/hackathons" className="link-underline text-mist-300">
              compare every edition
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  )
}
