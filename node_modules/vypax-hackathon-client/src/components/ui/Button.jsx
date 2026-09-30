import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import cn from '../../utils/classNames'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 ease-smooth ' +
  'disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-lime-400 whitespace-nowrap'

const VARIANTS = {
  primary:
    'bg-lime-400 text-ink-950 hover:bg-lime-300 hover:shadow-lime-glow active:scale-[0.98]',
  secondary:
    'border border-white/15 bg-white/[0.03] text-mist-100 hover:border-lime-400/50 hover:bg-white/[0.06] active:scale-[0.98]',
  outline:
    'border border-lime-400/40 text-lime-400 hover:bg-lime-400/10 active:scale-[0.98]',
  ghost: 'text-mist-300 hover:bg-white/[0.06] hover:text-mist-100',
  danger:
    'border border-coral-400/40 bg-coral-400/10 text-coral-400 hover:bg-coral-400/20 active:scale-[0.98]',
  dark: 'bg-ink-800 text-mist-100 hover:bg-ink-700 active:scale-[0.98]'
}

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base sm:h-14 sm:px-8'
}

// Declared as a variant rather than a loose utility so callers can request a
// heavier label without depending on Tailwind's stylesheet ordering to win
// against the `font-medium` in BASE.
const WEIGHTS = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

/**
 * Single button primitive covering internal links, external links and real
 * buttons — so every CTA in the app shares identical focus and hover states.
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    weight = 'medium',
    to,
    href,
    isLoading = false,
    icon: Icon,
    iconRight: IconRight,
    className,
    children,
    disabled,
    type = 'button',
    ...rest
  },
  ref
) {
  const classes = cn(
    BASE,
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    WEIGHTS[weight] || WEIGHTS.medium,
    className
  )

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        Icon && <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      <span>{children}</span>
      {IconRight && !isLoading && <IconRight className="h-4 w-4" aria-hidden="true" />}
    </>
  )

  if (to && !disabled) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href && !disabled) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button ref={ref} type={type} className={classes} disabled={disabled || isLoading} {...rest}>
      {content}
    </button>
  )
})

export default Button
