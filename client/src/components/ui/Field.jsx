import { useId } from 'react'
import cn from '../../utils/classNames'

const CONTROL_BASE =
  'w-full rounded-xl border bg-ink-950/60 px-3.5 py-2.5 text-sm text-mist-100 placeholder:text-mist-500 ' +
  'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400/40 disabled:opacity-50'

const VARIANTS = {
  input: 'h-11',
  select: 'h-11 cursor-pointer',
  textarea: 'min-h-[124px] resize-y leading-relaxed'
}

/**
 * Label + control + hint/error wrapper. Renders an input, select or textarea
 * based on `as`, wiring up aria-invalid and aria-describedby automatically.
 */
export default function Field({
  as = 'input',
  label,
  hint,
  error,
  required = false,
  className,
  controlClassName,
  children,
  ...rest
}) {
  const generatedId = useId()
  const controlId = rest.id || generatedId
  const hintId = hint ? `${controlId}-hint` : undefined
  const errorId = error ? `${controlId}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  const Control = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input'

  const controlProps = {
    id: controlId,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    className: cn(
      CONTROL_BASE,
      VARIANTS[as] || VARIANTS.input,
      error ? 'border-coral-400/50' : 'border-white/12 focus:border-lime-400/50',
      controlClassName
    ),
    ...rest
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={controlId} className="text-xs font-medium text-mist-300">
          {label}
          {required && (
            <span className="ml-1 text-lime-400" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {as === 'select' ? <Control {...controlProps}>{children}</Control> : <Control {...controlProps} />}

      {error ? (
        <p id={errorId} className="text-xs text-coral-400">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="text-xs text-mist-500">
            {hint}
          </p>
        )
      )}
    </div>
  )
}
