import { useContext } from 'react'
import { ToastContext } from '../context/toast-context'

/**
 * Access the global toast API.
 * Usage: `const toast = useToast(); toast.success('Saved')`.
 */
export default function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside a <ToastProvider>.')
  }

  return context
}
