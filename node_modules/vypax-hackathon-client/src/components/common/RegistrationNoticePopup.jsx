import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, CheckCircle2, Users, Layers, Timer } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import ApplyNowButton from '../common/ApplyNowButton'
import { hackathon2026, registrationNotice } from '../../config/hackathon2026'

const STORAGE_KEY = 'vypax:registration-notice-dismissed'
const SESSION_KEY = 'vypax:registration-notice-seen'
const DELAY_MS = 2500

/** Icons paired with the supporting bullet copy, in display order. */
const BULLET_ICONS = [Users, Layers, Timer]

/** Read a persisted dismissal flag, tolerating blocked storage. */
function readDismissed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function writeDismissed(value) {
  try {
    if (value) {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    /* Storage unavailable (private mode). Session-only behaviour is fine. */
  }
}

/**
 * Break the remaining time into whole days, hours, minutes and seconds.
 * Returns null once the deadline has passed.
 */
function getTimeLeft(deadline) {
  const target = new Date(deadline).getTime()
  if (Number.isNaN(target)) return null

  const diff = target - Date.now()
  if (diff <= 0) return null

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  }
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-1 flex-col items-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-2 py-3">
      <span className="font-display text-2xl font-bold tabular-nums text-mist-100 sm:text-3xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.14em] text-mist-500">{label}</span>
    </div>
  )
}

/**
 * Deadline popup for Hackathon November 2026.
 *
 * Appears shortly after a visitor lands on a public page, at most once per
 * session, and never again once dismissed for good — a deadline notice that
 * reappears on every page would be noise rather than a reminder. Every deadline
 * string is read from the canonical config, and the countdown is derived from
 * the ISO date so it cannot drift out of sync with the displayed label.
 */
export default function RegistrationNoticePopup() {
  const { registrationDeadline, registrationDeadlineLabel, registrationUrl } = hackathon2026
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(registrationDeadline))

  // Only auto-open while registration is genuinely still open.
  const isRegistrationOpen = timeLeft !== null

  useEffect(() => {
    if (!registrationNotice.enabled || !isRegistrationOpen) return undefined
    if (readDismissed()) return undefined

    let seenThisSession = false
    try {
      seenThisSession = window.sessionStorage.getItem(SESSION_KEY) === 'true'
    } catch {
      seenThisSession = false
    }
    if (seenThisSession) return undefined

    const timer = setTimeout(() => setIsOpen(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [isRegistrationOpen])

  // Remember the visit so the popup does not interrupt the next page.
  useEffect(() => {
    if (!isOpen) return
    try {
      window.sessionStorage.setItem(SESSION_KEY, 'true')
    } catch {
      /* Ignore storage failures. */
    }
  }, [isOpen])

  // Tick the countdown once a second while the dialog is open.
  useEffect(() => {
    if (!isOpen) return undefined
    setTimeLeft(getTimeLeft(registrationDeadline))
    const timer = setInterval(() => setTimeLeft(getTimeLeft(registrationDeadline)), 1000)
    return () => clearInterval(timer)
  }, [isOpen, registrationDeadline])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    writeDismissed(true)
  }, [])

  const closeForNow = useCallback(() => {
    setIsOpen(false)
  }, [])

  const countdown = useMemo(() => {
    if (!timeLeft) return null
    return (
      <div className="mt-6">
        <p className="mb-2 text-center text-[11px] uppercase tracking-[0.16em] text-mist-500">
          Time remaining
        </p>
        <div className="flex gap-2">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Mins" />
          <CountdownUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    )
  }, [timeLeft])

  if (!registrationNotice.enabled) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeForNow}
      title={registrationNotice.title}
      size="sm"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-400" aria-hidden="true" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-lime-400">
            {registrationNotice.eyebrow}
          </span>
        </div>

        <p className="text-sm text-mist-300">{registrationNotice.body}</p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2">
          <CalendarClock className="h-4 w-4 text-mist-400" aria-hidden="true" />
          <span className="text-sm text-mist-200">{registrationDeadlineLabel}</span>
        </div>

        {countdown}

        <ul className="mt-6 space-y-2 text-left">
          {registrationNotice.bullets.map((bullet, index) => {
            const Icon = BULLET_ICONS[index]
            return (
              <li key={bullet} className="flex items-start gap-2.5 text-sm text-mist-300">
                {Icon ? (
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" aria-hidden="true" />
                )}
                <span>{bullet}</span>
              </li>
            )
          })}
        </ul>

        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <ApplyNowButton
            url={registrationUrl}
            label={registrationNotice.primaryLabel}
            onBeforeOpen={handleClose}
          />
          <Button variant="ghost" size="lg" onClick={closeForNow}>
            {registrationNotice.dismissLabel}
          </Button>
        </div>

        <p className="mt-4 text-xs text-mist-500">
          Need the details first?{' '}
          <Link
            to="/hackathons/hackathon-2026"
            onClick={closeForNow}
            className="link-underline text-mist-300"
          >
            View the full schedule
          </Link>
          .
        </p>
      </div>
    </Modal>
  )
}
