import { AlertTriangle, RefreshCw } from 'lucide-react'
import Button from './Button'
import cn from '../../utils/classNames'

/**
 * Standard failure surface for API-driven sections.
 * Pass `onRetry` to surface a retry action; omit it for terminal errors.
 */
export default function ErrorMessage({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
  compact = false,
  className
}) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-coral-400/25 bg-coral-400/[0.06] text-center',
        compact ? 'gap-2 p-5' : 'gap-3 p-8 sm:p-10',
        className
      )}
    >
      <AlertTriangle
        className={cn('text-coral-400', compact ? 'h-5 w-5' : 'h-7 w-7')}
        aria-hidden="true"
      />
      <h3 className={cn('font-display font-semibold text-mist-100', compact ? 'text-sm' : 'text-lg')}>
        {title}
      </h3>
      {message && (
        <p className={cn('max-w-md text-mist-400', compact ? 'text-xs' : 'text-sm')}>{message}</p>
      )}
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          icon={RefreshCw}
          onClick={onRetry}
          className="mt-1"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  )
}
