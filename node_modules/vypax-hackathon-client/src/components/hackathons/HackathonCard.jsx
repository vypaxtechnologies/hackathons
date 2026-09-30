import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarClock, Globe2, Hash, Layers, Users, Wallet } from 'lucide-react'
import Badge from '../ui/Badge'
import cn from '../../utils/classNames'

/**
 * Hackathon summary card.
 *
 * `edition` is one of the view models from `config/editions.js`, so the home
 * page and the hackathons list render byte-identical cards.
 *
 * `compact` is a denser layout for the three-across listing on the hackathons
 * page: a shorter image, a clamped summary and a two-column fact grid, so all
 * editions stay on one row on wide screens without the card growing tall.
 */
export default function HackathonCard({ edition, index = 0, compact = false }) {
  const headerId = `edition-${edition.slug}-title`
  const tba = 'To Be Announced'

  const isVenueConfirmed = Boolean(edition.venue) && edition.venue !== tba

  // Always render the same four cells so every card in the grid is the same
  // height, regardless of how much data an edition has published yet. Paid
  // editions swap the theme cell for the entry fee, which is the fact a
  // professional reader is actually looking for.
  const facts = [
    edition.registrationFee
      ? {
          id: 'fee',
          icon: Wallet,
          label: 'Entry fee',
          value: `${edition.registrationFeeLabel} ${edition.registrationFeeNote}`.trim(),
          accent: true
        }
      : { id: 'theme', icon: Layers, label: 'Theme', value: edition.theme || tba },
    {
      id: 'deadline',
      icon: CalendarClock,
      label: 'Registration deadline',
      value: edition.deadlineLabel || tba
    },
    { id: 'team-size', icon: Users, label: 'Team size', value: edition.teamSize || tba },
    { id: 'stages', icon: Hash, label: 'Stages', value: edition.stages > 0 ? `${edition.stages} rounds` : tba }
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/60 transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:border-lime-400/30 hover:shadow-card"
    >
      <div className={cn('relative overflow-hidden', compact ? 'aspect-[16/7]' : 'aspect-[16/9]')}>
        <img
          src={edition.image}
          alt={edition.imageAlt}
          loading="lazy"
          decoding="async"
          width="1200"
          height="675"
          className={cn(
            'h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]',
            edition.comingSoon && 'opacity-70 saturate-[0.55]'
          )}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge tone={edition.tone} withDot={edition.withDot}>
            {edition.statusLabel}
          </Badge>
        </div>
        <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-300 backdrop-blur">
          {edition.year}
        </span>
        {/* Only badge a venue that is actually settled. A confirmed format
            (e.g. "Remote") gets the globe; an unconfirmed one is left off
            rather than advertised in the same green treatment. */}
        {isVenueConfirmed && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-lime-400/30 bg-ink-950/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-lime-300 backdrop-blur">
            <Globe2 className="h-3 w-3" aria-hidden="true" />
            {edition.venue}
          </span>
        )}
      </div>

      <div className={cn('flex flex-1 flex-col', compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6')}>
        <h3
          id={headerId}
          className={cn(
            'font-display font-bold text-mist-100',
            compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
          )}
        >
          {edition.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist-400">
          {edition.summary}
        </p>

        <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-white/[0.07] pt-4 sm:grid-cols-2">
          {facts.map(({ id, icon: Icon, label, value, accent }) => (
            <div key={id} className="flex items-start gap-2.5">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" aria-hidden="true" />
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">
                  {label}
                </dt>
                <dd className={cn('text-sm', accent ? 'font-semibold text-amber-400' : 'text-mist-200')}>
                  {value}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        {edition.highlights?.length > 0 && (
          <ul
            className={cn(
              'flex flex-wrap content-start gap-1.5',
              compact ? 'mt-4' : 'mt-5 min-h-[3.25rem]'
            )}
          >
            {edition.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-mist-300"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className={cn('mt-auto', compact ? 'pt-4' : 'pt-6')}>
          <Link
            to={edition.to}
            aria-describedby={headerId}
            className="inline-flex w-full items-center justify-between gap-3 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-medium text-mist-100 transition-all duration-200 hover:border-lime-400/50 hover:bg-lime-400/10 hover:text-lime-300 sm:w-auto"
          >
            View Details
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
