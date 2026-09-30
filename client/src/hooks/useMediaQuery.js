import { useEffect, useState } from 'react'

/**
 * Subscribe to a CSS media query.
 *
 * Returns `false` during the first render, then the real value once the query
 * has been evaluated on the client. Components that only change their layout at
 * a breakpoint must therefore tolerate rendering the mobile variant for one
 * pass — the alternative is reading `window` during render, which breaks
 * hydration and is not safe in tests.
 *
 * @param {string} query  e.g. '(min-width: 1024px)'
 * @returns {boolean}
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined

    const list = window.matchMedia(query)
    const update = (event) => setMatches(event.matches)

    // Seed with the current value, otherwise the first paint after mount would
    // keep the initial `false` until the query happens to change.
    setMatches(list.matches)

    // `addEventListener` is not available on the legacy MediaQueryList, so fall
    // back to the deprecated API rather than silently never updating.
    if (typeof list.addEventListener === 'function') {
      list.addEventListener('change', update)
      return () => list.removeEventListener('change', update)
    }

    list.addListener(update)
    return () => list.removeListener(update)
  }, [query])

  return matches
}
