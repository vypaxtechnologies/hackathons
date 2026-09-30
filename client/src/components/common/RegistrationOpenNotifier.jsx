import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import useToast from '../../hooks/useToast'
import { hackathon2026 } from '../../config/hackathon2026'

// First notice lands shortly after landing so it does not compete with the
// initial render; every repeat is measured from the previous one.
const INITIAL_DELAY_MS = 12000
const REPEAT_MS = 5 * 60 * 1000
const VISIBLE_MS = 30 * 1000

/** Pages that already show a registration call-to-action. */
function isRegistrationSurface(pathname, hash) {
  return pathname === '/contact' || pathname === '/hackathons' || hash === '#courses'
}

/**
 * Rotating "registrations are open" notice.
 *
 * Appears as a single compact card in the bottom-left corner, stays visible for
 * 30 seconds, then returns every 5 minutes for as long as the visitor is on the
 * site. Repeats are chained off the previous notice rather than driven by a
 * fixed interval, so each one is measured from when the last actually appeared
 * and the cadence does not drift.
 *
 * Pausing is deliberately not offered: the notice is dismissible but returns, so
 * a visitor who ignores the first one still gets a reminder.
 *
 * The bottom left is shared with the toast queue and the bottom right is owned
 * by the help bot launcher, so the notice sits clear of both. The toast queue
 * shows one message at a time, so this notice never stacks with itself or with
 * another notification.
 *
 * It is suppressed on the pages where a registration prompt is already on
 * screen. The schedule keeps running there rather than restarting, so moving off
 * those pages brings the next notice up on schedule instead of resetting it.
 *
 * The schedule is installed once and reads location and the toast API from refs:
 * re-running it on a route change or a toast state update would restart the
 * chain and break the five-minute cadence.
 */
export default function RegistrationOpenNotifier() {
  const toast = useToast()
  const { pathname, hash } = useLocation()

  const locationRef = useRef({ pathname, hash })
  locationRef.current = { pathname, hash }

  const toastRef = useRef(toast)
  toastRef.current = toast

  const timerRef = useRef(null)

  useEffect(() => {
    const schedule = (delay) => {
      const timer = setTimeout(() => {
        const { pathname: currentPath, hash: currentHash } = locationRef.current

        if (!isRegistrationSurface(currentPath, currentHash)) {
          toastRef.current.info(`Registration for ${hackathon2026.title} is open.`, {
            title: 'Registrations are open',
            duration: VISIBLE_MS,
            variant: 'prominent',
            size: 'sm',
            to: hackathon2026.registrationUrl,
            linkLabel: 'Register now'
          })
        }

        schedule(REPEAT_MS)
      }, delay)

      timerRef.current = timer
    }

    schedule(INITIAL_DELAY_MS)

    return () => clearTimeout(timerRef.current)
  }, [])

  return null
}
