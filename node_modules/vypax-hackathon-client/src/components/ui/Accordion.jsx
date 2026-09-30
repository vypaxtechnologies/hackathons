import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import cn from '../../utils/classNames'

/**
 * Disclosure list used for FAQ sections.
 * Fully keyboard operable through native buttons and aria-expanded.
 */
export default function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpenId = null,
  className
}) {
  const [openIds, setOpenIds] = useState(() => (defaultOpenId ? [defaultOpenId] : []))
  const baseId = useId()

  const toggle = (id) => {
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id)
      return allowMultiple ? [...current, id] : [id]
    })
  }

  return (
    <div
      className={cn(
        'divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50',
        className
      )}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        const panelId = `${baseId}-panel-${item.id}`
        const buttonId = `${baseId}-button-${item.id}`

        return (
          <div key={item.id}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] sm:px-6 sm:py-5"
              >
                <span className="font-display text-sm font-semibold text-mist-100 sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-mist-400 transition-transform duration-300',
                    isOpen && 'rotate-180 text-lime-400'
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-mist-400 sm:px-6 sm:pb-6">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
