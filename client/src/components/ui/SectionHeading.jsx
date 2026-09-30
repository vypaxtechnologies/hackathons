import { motion } from 'framer-motion'
import cn from '../../utils/classNames'

const ALIGN = {
  left: 'items-start text-left',
  center: 'items-center text-center mx-auto'
}

/**
 * Consistent section intro: eyebrow label, headline and supporting copy.
 * Headline level is configurable so the H1/H2 hierarchy stays correct.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  headingId,
  headingClassName,
  className,
  children
}) {
  return (
    <div className={cn('flex flex-col gap-3', ALIGN[align] || ALIGN.left, className)}>
      {eyebrow && (
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="h-px w-6 bg-lime-400/60" aria-hidden="true" />
          {eyebrow}
        </motion.span>
      )}

      {title && (
        <Heading
          id={headingId}
          className={cn(
            'font-display text-display-md font-bold text-mist-100',
            headingClassName
          )}
        >
          {title}
        </Heading>
      )}

      {description && (
        <p
          className={cn(
            'max-w-2xl text-sm leading-relaxed text-mist-400 sm:text-base',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  )
}
