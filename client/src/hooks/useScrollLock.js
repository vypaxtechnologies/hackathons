import { useEffect } from 'react'

/**
 * Locks document scrolling while an overlay (mobile nav, modal, drawer)
 * is open, restoring the previous overflow value on close.
 */
export default function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return undefined

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }, [isLocked])
}
