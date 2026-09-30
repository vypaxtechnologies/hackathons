import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import useMediaQuery from '../../hooks/useMediaQuery'
import { HOME_STATS } from '../../config/content'
import cn from '../../utils/classNames'

/** How long a card stays in front before the next one takes over. */
const ROTATION_MS = 5200

/**
 * Home page highlight cards.
 *
 * The three cards rotate: the leading card moves to the back of the queue and
 * the others advance, repeating on a timer. Order is held as a single integer
 * offset rather than a reordered array, so the rotation is idempotent and the
 * timer can never accumulate duplicate cards.
 *
 * Layout has two shapes. At `lg` and above it is a three column grid and the
 * reordering is animated with framer-motion's `layout`, so each card visibly
 * slides to its new slot. Below `lg` it is a horizontal snap scroller, which
 * still works by touch and keyboard; the scroll offset is reset on rotation so
 * the incoming front card is actually visible.
 *
 * Auto-rotation stops when the visitor hovers, when focus is inside the region,
 * when the tab is hidden, and entirely when they prefer reduced motion. Without
 * those stops a card can slide away while it is being read or clicked.
 */
export default function RotatingHighlights() {
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const [offset, setOffset] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)

  const count = HOME_STATS.length

  // Rotating the array by an offset is a pure derivation, so it is memoised on
  // `offset` rather than rebuilt on every render.
  const cards = Array.from({ length: count }, (_, index) => HOME_STATS[(index + offset) % count])

  const advance = useCallback(() => {
    setOffset((current) => (current + 1) % count)
  }, [count])

  // Auto-advance. The interval is torn down and rebuilt whenever rotation is
  // suppressed, so a paused region never keeps a timer running in the background
  // and resuming always restarts a full, readable dwell.
  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined

    // Do not rotate a scroller that is only partly on screen: the cards would
    // animate out of view and the visitor would see an unexplained jump.
    if (!isDesktop) return undefined

    const id = setInterval(advance, ROTATION_MS)
    return () => clearInterval(id)
  }, [advance, isDesktop, paused, reduceMotion, count])

  // Hold the timer while the tab is in the background so returning to the tab
  // does not immediately swap the card out.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // In the scroller layout the browser keeps its own scroll offset, which would
  // leave the newly front card off screen after a rotation. Snap it back to the
  // start. Guarded to the mobile branch so it cannot fight the grid.
  useEffect(() => {
    if (isDesktop) return
    const track = trackRef.current
    if (track) track.scrollLeft = 0
  }, [offset, isDesktop])

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        // Only resume once focus has left the region entirely, otherwise moving
        // between the cards inside it would restart the timer on every tab press.
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <div
        ref={trackRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-x-visible lg:px-0"
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            // `layout` is what makes the rotation read as a slide rather than a
            // jump. Position-only keeps the cost down, since card size is fixed.
            layout="position"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            // The breakpoint switch stays in CSS rather than in `isDesktop`.
            // The media query hook reports `false` on the first render, so
            // driving width from it would paint 85vw-wide cards inside a
            // three-column grid for one frame and cause exactly the overlap
            // this is meant to avoid. `isDesktop` gates behaviour only.
            className="w-[85vw] max-w-sm shrink-0 snap-center lg:w-auto lg:max-w-none"
          >
            <Reveal
              delay={0}
              as="article"
              className={cn(
                'flex h-full flex-col rounded-2xl border p-5 sm:p-6',
                card.badge
                  ? 'border-lime-400/30 bg-lime-400/[0.05]'
                  : 'border-white/[0.08] bg-ink-900/50'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-mist-100 sm:text-xl">
                    {card.title}
                  </h3>
                </div>
                {card.badge && (
                  <span className="shrink-0 rounded-full bg-lime-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink-950">
                    {card.badge}
                  </span>
                )}
              </div>

              <p className="mt-2.5 text-sm leading-relaxed text-mist-400">{card.description}</p>

              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/[0.07] pt-5">
                {card.facts.map((fact) => (
                  <div key={fact.id}>
                    <dt className="font-display text-2xl font-bold text-lime-400 sm:text-3xl">
                      {fact.value}
                    </dt>
                    <dd className="mt-1 text-xs font-medium text-mist-200">{fact.label}</dd>
                    <dd className="mt-0.5 text-[11px] text-mist-500">{fact.sub}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                <Button variant="secondary" size="sm" to={card.to} iconRight={ArrowUpRight}>
                  {card.actionLabel}
                </Button>
                {card.secondaryAction && (
                  <Button
                    variant="ghost"
                    size="sm"
                    to={card.secondaryAction.to}
                    iconRight={ArrowUpRight}
                  >
                    {card.secondaryAction.label}
                  </Button>
                )}
              </div>
            </Reveal>
          </motion.div>
        ))}
      </div>

      {/* Rotation is decorative, so it is hidden from assistive technology and
          announced once instead. The cards themselves stay in the accessibility
          tree in a stable, logical order. */}
      <p className="sr-only" aria-live="polite">
        {isDesktop && !reduceMotion && !paused
          ? 'Highlight cards rotate automatically. Hover or focus the section to hold the current card.'
          : 'Highlight cards. Use the links inside each card to continue.'}
      </p>
    </div>
  )
}
