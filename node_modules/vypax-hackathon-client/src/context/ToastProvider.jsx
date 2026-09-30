import { useCallback, useMemo, useState } from 'react'
import { ToastContext } from './toast-context'

let nextToastId = 0

/** Only the newest message is ever on screen; older ones are dropped. */
const MAX_VISIBLE_TOASTS = 1

/**
 * Global toast queue. Lives above the router so any screen can raise a message
 * and the list is shared by every consumer of the `useToast` hook.
 *
 * The queue is capped at a single toast so the corner never stacks up and a
 * message is never missed behind an older one: raising a new toast replaces
 * whatever was showing.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    (
      message,
      { type = 'info', duration = 5000, title, to, linkLabel, variant, size = 'md' } = {}
    ) => {
      nextToastId += 1
      const id = nextToastId

      setToasts((current) =>
        [...current, { id, message, type, title, to, linkLabel, variant, size, duration }].slice(
          -MAX_VISIBLE_TOASTS
        )
      )

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration)
      }

      return id
    },
    [removeToast]
  )

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      success: (message, options) => addToast(message, { ...options, type: 'success' }),
      error: (message, options) => addToast(message, { ...options, type: 'error' }),
      info: (message, options) => addToast(message, { ...options, type: 'info' }),
      warning: (message, options) => addToast(message, { ...options, type: 'warning' })
    }),
    [toasts, addToast, removeToast]
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export default ToastProvider
