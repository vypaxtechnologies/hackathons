import { createContext } from 'react'

/** Toast severity levels understood by ToastProvider. */
export const TOAST_VARIANTS = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
}

export const ToastContext = createContext(null)
