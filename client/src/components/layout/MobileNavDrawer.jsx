import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { VypaxLogo } from '../brand/VypaxLogo'
import Button from '../ui/Button'
import useScrollLock from '../../hooks/useScrollLock'
import { COPYRIGHT_NOTICE } from '../../config/site'
import { PARTNER_CONTACT_PATH } from '../../config/content'
import cn from '../../utils/classNames'

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
}

/**
 * Full-height mobile navigation panel. Locks page scroll while open, traps
 * focus on the panel and closes on Escape.
 */
export default function MobileNavDrawer({
  isOpen,
  onClose,
  links = []
}) {
  useScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[85vw] flex-col border-l border-white/10 bg-ink-900 sm:max-w-sm"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <VypaxLogo size="sm" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="rounded-lg p-2 text-mist-400 transition-colors hover:bg-white/[0.06] hover:text-mist-100"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5"
            >
              {links.map((link) => (
                <motion.li key={link.id} variants={itemVariants}>
                  <NavLink
                    to={link.to}
                    onClick={onClose}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-base font-medium transition-colors',
                        isActive
                          ? 'bg-lime-400/10 text-lime-300'
                          : 'text-mist-200 hover:bg-white/[0.05] hover:text-mist-100'
                      )
                    }
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 opacity-40" aria-hidden="true" />
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            <div className="border-t border-white/[0.07] px-5 py-5">
              <Button
                variant="primary"
                size="md"
                to={PARTNER_CONTACT_PATH}
                onClick={onClose}
                iconRight={ArrowUpRight}
                className="w-full"
              >
                Join as a hackathon partner
              </Button>

              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-mist-500">
                {COPYRIGHT_NOTICE}
              </p>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  )
}
