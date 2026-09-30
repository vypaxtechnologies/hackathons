import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, ArrowUpRight } from 'lucide-react'
import { VypaxLogo } from '../brand/VypaxLogo'
import Button from '../ui/Button'
import MobileNavDrawer from './MobileNavDrawer'
import { PRIMARY_NAV } from '../../config/site'
import cn from '../../utils/classNames'

const SCROLL_THRESHOLD = 24

// The partnership call-to-action routes into the hackathons listing rather
// than jumping straight to an external form.
const HACKATHON_PATH = '/hackathons'

/**
 * Sticky site navigation. Transparent over the hero, solid once scrolled.
 * Desktop shows the inline nav; below `lg` the hamburger opens a drawer.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname, location.hash])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:rounded-lg focus:bg-lime-400 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-[70] transition-all duration-300 ease-smooth',
          isScrolled
            ? 'border-b border-white/[0.07] bg-ink-950/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <nav aria-label="Primary navigation" className="container-page">
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-300',
              isScrolled ? 'h-16' : 'h-18 sm:h-20'
            )}
          >
            <VypaxLogo size={isScrolled ? 'sm' : 'md'} />

            <ul className="hidden items-center gap-1 lg:flex">
              {PRIMARY_NAV.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'text-lime-300'
                          : 'text-mist-300 hover:bg-white/[0.05] hover:text-mist-100'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2.5 lg:flex">
              <Button variant="primary" size="sm" to={HACKATHON_PATH} iconRight={ArrowUpRight}>
                Join as a hackathon partner
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="rounded-lg p-2 text-mist-200 transition-colors hover:bg-white/[0.06] hover:text-mist-100 lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileNavDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} links={PRIMARY_NAV} />
    </>
  )
}
