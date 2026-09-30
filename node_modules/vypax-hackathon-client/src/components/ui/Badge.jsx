import cn from '../../utils/classNames'

const TONES = {
  open: 'border-lime-400/40 bg-lime-400/10 text-lime-300',
  live: 'border-amber-400/40 bg-amber-400/10 text-amber-400',
  closed: 'border-white/15 bg-white/[0.04] text-mist-400',
  done: 'border-white/10 bg-white/[0.03] text-mist-500',
  neutral: 'border-white/15 bg-white/[0.04] text-mist-300',
  accent: 'border-amber-400/40 bg-amber-400/10 text-amber-400',
  danger: 'border-coral-400/40 bg-coral-400/10 text-coral-400'
}

const SIZES = {
  sm: 'px-2.5 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-[11px]'
}

/**
 * Pill label for statuses, themes and tags.
 * `withDot` renders a small pulse indicator for live/open states.
 */
export default function Badge({
  children,
  tone = 'neutral',
  size = 'md',
  withDot = false,
  className
}) {
  const toneClasses = TONES[tone] || TONES.neutral

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-mono font-medium uppercase tracking-[0.14em]',
        toneClasses,
        SIZES[size] || SIZES.md,
        className
      )}
    >
      {withDot && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60 animate-pulse-ring" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  )
}
