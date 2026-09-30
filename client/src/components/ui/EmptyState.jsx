import { Inbox } from 'lucide-react'
import Button from './Button'
import cn from '../../utils/classNames'

/**
 * Shown when a request succeeds but there is nothing to display.
 * Always offers a way forward via `action`.
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  message,
  actionLabel,
  actionTo,
  onAction,
  actionIcon,
  compact = false,
  className
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/12 bg-white/[0.015] text-center',
        compact ? 'gap-2 p-6' : 'gap-3 p-10 sm:p-14',
        className
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center rounded-full border border-white/10 bg-ink-850/80 text-mist-400',
          compact ? 'h-9 w-9' : 'h-12 w-12'
        )}
        aria-hidden="true"
      >
        <Icon className={compact ? 'h-4 w-4' : 'h-5 w-5'} />
      </span>

      <h3 className={cn('font-display font-semibold text-mist-100', compact ? 'text-sm' : 'text-lg')}>
        {title}
      </h3>

      {message && (
        <p className={cn('max-w-md text-mist-400', compact ? 'text-xs' : 'text-sm')}>{message}</p>
      )}

      {(actionLabel && (actionTo || onAction)) && (
        <Button
          variant="secondary"
          size="sm"
          to={actionTo}
          onClick={onAction}
          icon={actionIcon}
          className="mt-1"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
