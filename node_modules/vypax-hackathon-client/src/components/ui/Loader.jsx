import { Loader2 } from 'lucide-react'
import cn from '../../utils/classNames'

const SIZES = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-9 w-9'
}

/**
 * Inline spinner. `label` is announced to assistive tech and rendered
 * underneath when `showLabel` is set.
 */
export default function Loader({
  size = 'md',
  label = 'Loading',
  showLabel = false,
  className
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)} role="status">
      <Loader2 className={cn('animate-spin text-lime-400', SIZES[size] || SIZES.md)} aria-hidden="true" />
      <span className={showLabel ? 'text-sm text-mist-400' : 'sr-only'}>{label}</span>
    </div>
  )
}

/** Full-block loading placeholder used while a page-level fetch resolves. */
export function PageLoader({ label = 'Loading' }) {
  return (
    <div className="flex min-h-[55vh] items-center justify-center">
      <Loader size="lg" label={label} showLabel />
    </div>
  )
}

/** Skeleton block for card grids. */
export function SkeletonCard({ className }) {
  return (
    <div
      className={cn(
        'h-64 animate-pulse rounded-2xl border border-white/[0.06] bg-ink-900/60',
        className
      )}
      aria-hidden="true"
    />
  )
}
