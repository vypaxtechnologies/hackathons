import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, CalendarClock, Layers, Users, Timer } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import ApplyNowButton from '../common/ApplyNowButton'
import { hackathon2026 } from '../../config/hackathon2026'
import { IMAGES } from '../../config/editions'
import cn from '../../utils/classNames'

const FACTS = [
  { id: 'registration', icon: CalendarClock, label: 'Registration closes', value: '31 October 2026' },
  { id: 'theme', icon: Layers, label: 'Theme', value: 'App & Web Development' },
  { id: 'team', icon: Users, label: 'Team size', value: '2–4 members' },
  { id: 'final', icon: Timer, label: 'Final round', value: '24 hours' }
]

/**
 * Homepage hero: headline, primary actions and a summary of the flagship
 * edition, paired with the Vypax build artwork.
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const rise = (delay) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
        }

  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 grid-overlay opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-lime-400/[0.07] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[320px] w-[320px] rounded-full bg-amber-400/[0.06] blur-[100px]"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <motion.div {...rise(0)}>
              <Badge tone="open" withDot size="md">
                {hackathon2026.statusLabel} · until {hackathon2026.registrationDeadlineLabel}
              </Badge>
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className="mt-5 text-display-xl font-bold text-mist-100"
            >
              Vypax EdTech & Hackathons
              <span className="block text-gradient-lime">Hackathon November 2026</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-5 max-w-xl text-base leading-relaxed text-mist-400 sm:text-lg"
            >
              Build innovative web and mobile applications, take them through a month-long
              competition and finish in a 24-hour final round. Compete for prizes, certificates,
              medals, trophies and a route into the Vypax internship assessment.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                size="lg"
                to="/hackathons"
                iconRight={ArrowUpRight}
                className="w-full sm:w-auto"
              >
                Explore Hackathons
              </Button>
              <ApplyNowButton
                label="Register Now"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              />
            </motion.div>

            <motion.p {...rise(0.3)} className="mt-4 text-xs text-mist-500">
              Registration runs through the official Vypax EdTech & Hackathons Google Form.
            </motion.p>
          </div>

          <motion.div
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.96 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }
                })}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 p-2 shadow-card">
              <img
                src={IMAGES.heroBuild}
                alt="Abstract render of floating interface panels built during a Vypax EdTech & Hackathons hackathon"
                width="1400"
                height="875"
                decoding="async"
                fetchPriority="high"
                className="h-auto w-full rounded-[1.25rem] object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-white/10 bg-ink-900/95 p-4 backdrop-blur-md sm:left-8 sm:right-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
                Flag this date
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-mist-100 sm:text-base">
                24-Hour Final Hackathon · 30 November 2026
              </p>
            </div>
          </motion.div>
        </div>

        <motion.dl
          {...rise(0.36)}
          className={cn(
            'mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05]',
            'sm:mt-20 lg:grid-cols-4'
          )}
        >
          {FACTS.map((fact) => {
            const Icon = fact.icon
            return (
              <div key={fact.id} className="flex flex-col gap-1.5 bg-ink-950 px-5 py-4">
                <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">
                  <Icon className="h-3.5 w-3.5 text-lime-400" aria-hidden="true" />
                  {fact.label}
                </dt>
                <dd className="font-display text-sm font-semibold text-mist-100 sm:text-base">
                  {fact.value}
                </dd>
              </div>
            )
          })}
        </motion.dl>
      </div>
    </section>
  )
}
