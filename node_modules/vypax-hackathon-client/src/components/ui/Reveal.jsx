import { motion, useReducedMotion } from 'framer-motion'
import cn from '../../utils/classNames'

const DIRECTIONS = {
  up: { y: 22, x: 0 },
  down: { y: -22, x: 0 },
  left: { x: 26, y: 0 },
  right: { x: -26, y: 0 },
  none: { x: 0, y: 0 }
}

/**
 * Scroll-triggered reveal wrapper. Animates once on entry and collapses to a
 * plain element when the user prefers reduced motion.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  className,
  as = 'div',
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion()
  const offset = DIRECTIONS[direction] || DIRECTIONS.up
  const MotionElement = motion[as] || motion.div

  if (prefersReducedMotion) {
    const Static = as
    return (
      <Static className={className} {...rest}>
        {children}
      </Static>
    )
  }

  return (
    <MotionElement
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionElement>
  )
}
