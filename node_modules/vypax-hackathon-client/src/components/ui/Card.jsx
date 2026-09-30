import cn from '../../utils/classNames'

/**
 * Neutral surface container. `interactive` enables the hover lift used by
 * hackathon, prize and recognition cards.
 */
export default function Card({
  as: Element = 'div',
  interactive = false,
  glow = false,
  className,
  children,
  ...rest
}) {
  return (
    <Element
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/60',
        interactive &&
          'transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-lime-400/30 hover:bg-ink-850/80',
        glow && 'shadow-card',
        className
      )}
      {...rest}
    >
      {children}
    </Element>
  )
}
