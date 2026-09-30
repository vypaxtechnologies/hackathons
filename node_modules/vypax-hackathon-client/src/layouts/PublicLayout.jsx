import { Outlet, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollToTop from '../components/layout/ScrollToTop'
import RegistrationNoticePopup from '../components/common/RegistrationNoticePopup'
import RegistrationOpenNotifier from '../components/common/RegistrationOpenNotifier'
import HelpBotWidget from '../components/common/HelpBotWidget'
import ToastViewport from '../components/ui/ToastViewport'

/**
 * Shell for every public page: fixed navbar, animated page body, footer.
 * The animated wrapper is keyed by pathname so each route transitions once.
 */
export default function PublicLayout() {
  const { pathname } = useLocation()
  const prefersReducedMotion = useReducedMotion()

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <motion.main
        key={pathname}
        id="main-content"
        className="flex-1 pt-24 sm:pt-28"
        {...motionProps}
      >
        <Outlet />
      </motion.main>

      <Footer />

      <RegistrationNoticePopup />
      <RegistrationOpenNotifier />
      <HelpBotWidget />
      <ToastViewport />
    </div>
  )
}
