import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, CalendarClock, Globe2, Timer, Users, Trophy, Medal, ScrollText, Award } from 'lucide-react'
import { HACKATHON_2026_FORM_URL } from '../config/site'
import {
  hackathon2026,
  hackathonMarch2027,
  hackathonProfessionals,
  hackathon2026Theme,
  hackathon2026Prizes,
  hackathon2026Recognition,
  hackathonProfessionalsTimeline
} from '../config/hackathon2026'
import hackathonService from '../services/hackathonService'
import { getStatusMeta, mergeWithStaticEdition, openExternal } from '../utils/hackathon'
import useAsyncResource from '../hooks/useAsyncResource'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import Reveal from '../components/ui/Reveal'
import { PageLoader } from '../components/ui/Loader'

const STATIC_EDITIONS = {
  [hackathon2026.slug]: hackathon2026,
  [hackathonProfessionals.slug]: hackathonProfessionals,
  [hackathonMarch2027.slug]: hackathonMarch2027
}

/** Resolves the `icon` name on each recognition tier to a component. */
const RECOGNITION_ICONS = {
  Trophy,
  Medal,
  ScrollText,
  Award
}

/**
 * Detail view for a single edition.
 *
 * The organizer-provided static definition is always the baseline, so the page
 * renders complete copy even when the API is unreachable. A live document is
 * merged in when one exists so seeded content can override the defaults.
 */
export default function HackathonDetail() {
  const { slug } = useParams()
  const staticEdition = STATIC_EDITIONS[slug] || null

  const loader = useCallback(async () => {
    if (!staticEdition) return null

    try {
      const apiDoc = await hackathonService.getBySlug(slug)
      return mergeWithStaticEdition(apiDoc, staticEdition)
    } catch {
      return staticEdition
    }
  }, [slug, staticEdition])

  const { data: hackathon, isLoading } = useAsyncResource(loader, [slug])

  useDocumentMeta({
    title: hackathon?.title,
    description: hackathon?.summary,
    path: `/hackathons/${slug}`
  })

  if (isLoading) {
    return <PageLoader label="Loading hackathon details" />
  }

  if (!hackathon) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-mist-100">Hackathon not found</h1>
          <p className="mt-2 text-mist-400">
            The hackathon you are looking for does not exist or has been removed.
          </p>
          <Button to="/hackathons" className="mt-6">
            Browse all hackathons
          </Button>
        </div>
      </div>
    )
  }

  const status = getStatusMeta(hackathon.status)
  const registrationUrl = hackathon.registrationUrl || HACKATHON_2026_FORM_URL
  const theme = hackathon.theme || hackathon2026Theme.name
  const teamSize = hackathon.teamSize || hackathon2026.teamSize
  const deadlineLabel = hackathon.registrationDeadlineLabel || 'To Be Announced'

  // Prize tiers and the build theme are only published for the 2026 edition.
  // Rendering them for any other slug would show another edition's data under
  // this edition's heading, so they are gated on the edition itself.
  const isStudentEdition = slug === hackathon2026.slug
  const isProfessionals = slug === hackathonProfessionals.slug
  const isComingSoon = Boolean(hackathon.comingSoon)

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link to="/hackathons" className="text-sm text-lime-400 transition-colors hover:text-lime-300">
          ← Back to all hackathons
        </Link>

        <Reveal className="mt-6">
          <Badge tone={status.tone} withDot={status.tone === 'open'}>
            {hackathon.statusLabel || status.label}
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-bold text-mist-100 sm:text-5xl">
            {hackathon.title}
          </h1>
          {hackathon.tagline && <p className="mt-3 text-lg text-mist-400">{hackathon.tagline}</p>}
        </Reveal>

        <Reveal delay={0.05} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="flex items-start gap-3 p-5">
            <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-lime-400" aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">Theme</p>
              <p className="mt-1 text-sm font-medium text-mist-100">{theme}</p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-lime-400" aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">Team size</p>
              <p className="mt-1 text-sm font-medium text-mist-100">{teamSize}</p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <Timer className="mt-0.5 h-5 w-5 shrink-0 text-lime-400" aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">Deadline</p>
              <p className="mt-1 text-sm font-medium text-mist-100">{deadlineLabel}</p>
            </div>
          </Card>
          {hackathon.venue && (
            <Card className="flex items-start gap-3 p-5">
              <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-400" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">Venue</p>
                <p className="mt-1 text-sm font-medium text-mist-100">{hackathon.venue}</p>
              </div>
            </Card>
          )}
        </Reveal>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-mist-100">Description</h2>
          <p className="mt-4 leading-relaxed text-mist-300">{hackathon.summary}</p>

          {isProfessionals && (
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-mist-300">
                <Users className="h-4 w-4 text-lime-400" aria-hidden="true" />
                Team size: {hackathonProfessionals.teamSize}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-mist-300">
                <Timer className="h-4 w-4 text-lime-400" aria-hidden="true" />
                Final round: {hackathonProfessionals.finalRoundDurationLabel}
              </span>
            </div>
          )}
        </section>

        {isProfessionals ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-mist-100">Schedule</h2>
            <p className="mt-2 text-sm text-mist-400">
              Three rounds, from the first idea through to the 12-hour final.
            </p>
            <ol className="mt-6 grid gap-4 sm:grid-cols-3">
              {hackathonProfessionalsTimeline.map((round, index) => (
                <Reveal
                  as="li"
                  key={round.id}
                  delay={index * 0.08}
                  className="relative flex flex-col rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5"
                >
                  <span className="font-mono text-2xl font-bold text-lime-400/30" aria-hidden="true">
                    {round.step}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold text-mist-100">
                    {round.title}
                  </h3>
                  <p className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium text-lime-400">
                    <CalendarClock className="h-4 w-4" aria-hidden="true" />
                    {round.dateLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist-400">{round.description}</p>
                </Reveal>
              ))}
            </ol>
          </section>
        ) : null}

        {isProfessionals && hackathonProfessionals.certificate ? (
          <section className="mt-10">
            <div className="flex items-start gap-4 rounded-2xl border border-lime-400/25 bg-lime-400/[0.06] p-5 sm:p-6">
              <ScrollText className="mt-0.5 h-6 w-6 shrink-0 text-lime-400" aria-hidden="true" />
              <div>
                <p className="font-display text-base font-semibold text-mist-100">Certificate</p>
                <p className="mt-1 text-sm text-mist-300">
                  {hackathonProfessionals.certificate}. Every participant who completes the
                  competition receives one.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {hackathon.registrationFee ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-mist-100">Entry fee</h2>
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">
                  Registration fee
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-amber-400">
                  {hackathon.registrationFeeLabel}
                  <span className="ml-2 text-base font-medium text-mist-400">
                    {hackathon.registrationFeeNote}
                  </span>
                </p>
              </div>
              <p className="text-sm text-mist-400">
                Paid edition. The fee is charged per participant and covers entry to the
                competition.
              </p>
            </div>
          </section>
        ) : null}

        {isStudentEdition ? (
          <>
            <section className="mt-14 scroll-mt-28" id="prizes">
              <h2 className="font-display text-2xl font-semibold text-mist-100">Prizes</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {hackathon2026Prizes.map((prize) => (
                  <li
                    key={prize.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-ink-900/50 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-mist-200">{prize.rank}</span>
                    <span className="font-mono text-sm font-bold text-lime-400">{prize.amount}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <h3 className="font-display text-lg font-semibold text-mist-100">
                  Certificates, medals &amp; trophies
                </h3>
                <p className="mt-2 text-sm text-mist-400">
                  Every team that reaches the final round is recognised. The higher the finish, the
                  more they take home.
                </p>

                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {hackathon2026Recognition.map((tier, index) => {
                    const Icon = RECOGNITION_ICONS[tier.icon] || Award

                    return (
                      <Reveal
                        as="li"
                        key={tier.id}
                        delay={index * 0.08}
                        className={
                          tier.featured
                            ? 'relative flex flex-col rounded-2xl border border-lime-400/30 bg-lime-400/[0.06] p-6'
                            : 'relative flex flex-col rounded-2xl border border-white/[0.08] bg-ink-900/50 p-6'
                        }
                      >
                        {tier.featured && (
                          <span className="absolute right-5 top-5 rounded-full bg-lime-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink-950">
                            Podium
                          </span>
                        )}

                        <div
                          className={
                            tier.featured
                              ? 'flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/15 text-lime-400'
                              : 'flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] text-mist-300'
                          }
                        >
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>

                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">
                          {tier.level}
                        </p>
                        <p className="mt-1 font-display text-lg font-semibold text-mist-100">
                          {tier.reward}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-mist-400">{tier.detail}</p>

                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {tier.includes.map((item) => (
                            <li
                              key={item}
                              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-mist-300"
                            >
                              {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )
              })}
            </ul>
            </div>
          </section>
          </>
        ) : (
          <section className="mt-14 scroll-mt-28" id="prizes">
            <h2 className="font-display text-2xl font-semibold text-mist-100">Prizes</h2>
            <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/[0.06] p-6">
              <p className="font-display text-3xl font-bold text-amber-400">
                {hackathon.prizeCeiling || 'To Be Announced'}
              </p>
              <p className="mt-2 text-sm text-mist-400">
                Total prize pool for this edition. The breakdown across individual tiers has not
                been published yet and will appear here once the organizers confirm it.
              </p>
            </div>

            {hackathonProfessionals.certificate ? (
              <div className="mt-4 flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5">
                <ScrollText className="mt-0.5 h-5 w-5 shrink-0 text-lime-400" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-mist-100">
                    {hackathonProfessionals.certificate}
                  </p>
                  <p className="mt-1 text-sm text-mist-400">
                    Awarded to every participant who takes part in this edition.
                  </p>
                </div>
              </div>
            ) : null}
          </section>
        )}

        {isStudentEdition ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-mist-100">What you can build</h2>
            <p className="mt-4 leading-relaxed text-mist-300">{hackathon2026Theme.intro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {hackathon2026Theme.buildAreas.map((area) => (
                <li
                  key={area.id}
                  className="rounded-xl border border-white/[0.08] bg-ink-900/50 px-4 py-3 text-sm text-mist-200"
                >
                  {area.label}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {isComingSoon && !isStudentEdition ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-mist-100">What to expect</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {(hackathon.upcomingPoints || []).map((point) => (
                <li
                  key={point}
                  className="rounded-xl border border-white/[0.08] bg-ink-900/50 px-4 py-3 text-sm text-mist-200"
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          {isComingSoon ? (
            <Button to="/contact" variant="secondary" size="lg">
              Notify Me
            </Button>
          ) : (
            <Button size="lg" iconRight={ArrowUpRight} onClick={() => openExternal(registrationUrl)}>
              Register Now
            </Button>
          )}
          <Button to="/contact" variant="secondary" size="lg">
            Questions?
          </Button>
        </div>
      </div>
    </div>
  )
}
