import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import useToast from '../../hooks/useToast'
import cn from '../../utils/classNames'

const TONES = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-lime-400',
    barClass: 'bg-lime-400'
  },
  error: {
    icon: AlertCircle,
    iconClass: 'text-coral-400',
    barClass: 'bg-coral-400'
  },
  warning: {
    icon: AlertCircle,
    iconClass: 'text-amber-400',
    barClass: 'bg-amber-400'
  },
  info: {
    icon: Info,
    iconClass: 'text-mist-300',
    barClass: 'bg-mist-400'
  }
}

/**
 * Renders the global toast queue in the bottom-left corner.
 *
 * Mounted once inside the router so any screen can raise a message. The bottom
 * left keeps the notices clear of the help bot launcher, which owns the bottom
 * right corner. The progress bar is animated with CSS rather than framer-motion
 * so it restarts cleanly whenever a toast of the same id is re-rendered, and so
 * it can be paused by the user hovering the card.
 */
export default function ToastViewport() {
  const { toasts, removeToast } = useToast()

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-4 left-4 z-[95] flex w-[calc(100vw-2rem)] flex-col items-start gap-2.5 sm:bottom-6 sm:left-6"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const tone = TONES[toast.type] || TONES.info
          const Icon = tone.icon

          return (
            <motion.div
              key={toast.id}
              layout
              data-toast-size={toast.size}
              initial={{ opacity: 0, x: -24, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, scale: 0.97 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'pointer-events-auto relative overflow-hidden rounded-2xl border bg-ink-900/95 shadow-card backdrop-blur-xl',
                toast.variant === 'prominent'
                  ? 'border-lime-400/40'
                  : 'border-white/[0.08]',
                toast.size === 'sm'
                  ? 'max-w-[min(22rem,100%)] p-3 pr-9'
                  : 'w-full max-w-sm p-4 pr-11'
              )}
            >
              <div className={cn('flex items-start gap-3', toast.size === 'sm' && 'gap-2.5')}>
                <Icon
                  className={cn('shrink-0', toast.size === 'sm' ? 'mt-0.5 h-4 w-4' : 'mt-0.5 h-5 w-5', tone.iconClass)}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  {toast.size === 'sm' ? (
                    <p className="text-xs leading-relaxed text-mist-300">
                      {toast.title && <span className="font-semibold text-mist-100">{toast.title} </span>}
                      {toast.message}
                    </p>
                  ) : (
                    <>
                      {toast.title && (
                        <p className="text-sm font-semibold text-mist-100">{toast.title}</p>
                      )}
                      <p
                        className={cn(
                          'text-sm leading-relaxed text-mist-300',
                          toast.title && 'mt-0.5'
                        )}
                      >
                        {toast.message}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {toast.to && (
                <a
                  href={toast.to}
                  onClick={() => removeToast(toast.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 font-medium text-lime-400 transition-colors hover:text-lime-300',
                    toast.size === 'sm' ? 'mt-1 text-xs' : 'mt-3 text-sm'
                  )}
                >
                  {toast.linkLabel}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
                className={cn(
                  'absolute right-2 top-2 rounded-lg p-1 text-mist-500 transition-colors hover:bg-white/[0.06] hover:text-mist-200',
                  toast.size === 'sm' ? 'right-1.5 top-1.5' : 'right-2.5 top-2.5'
                )}
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              {toast.duration > 0 && (
                <span
                  className={cn('absolute bottom-0 left-0 h-0.5', tone.barClass)}
                  style={{
                    width: '100%',
                    transformOrigin: 'left',
                    animation: `toast-progress ${toast.duration}ms linear forwards`
                  }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
