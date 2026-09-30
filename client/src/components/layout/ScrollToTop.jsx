import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll on navigation and honours in-page hash anchors
 * (e.g. /hackathons/hackathon-2026#prizes) once the view has mounted.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists before scrolling to it.
      const frame = requestAnimationFrame(() => {
        const target = document.querySelector(hash)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      })
      return () => cancelAnimationFrame(frame)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [pathname, hash])

  return null
}
