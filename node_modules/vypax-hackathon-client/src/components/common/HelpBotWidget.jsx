import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Bot, CalendarClock, MapPin, Sparkles, X } from 'lucide-react'
import Button from '../ui/Button'
import { HELP_BOT_ENTRIES, HELP_BOT_PROFILE } from '../../config/helpBot'
import cn from '../../utils/classNames'

/** Icons paired with the most asked topics, purely to break up the chip list. */
const QUESTION_ICONS = { venue: MapPin, dates: CalendarClock, prizes: Sparkles }

/** Delay before the answer appears, so the exchange reads as a conversation. */
const REPLY_DELAY_MS = 400

let nextMessageId = 0

function createMessage(role, text, entry = null) {
  nextMessageId += 1
  return { id: nextMessageId, role, text, entry }
}

/**
 * On-page help bot for hackathon questions.
 *
 * Sits in the bottom-right corner as a launcher button that expands into a chat
 * panel. The visitor picks a question from the list — there is no free-text
 * input — and the bot replies in the conversation above, so every exchange stays
 * on a fact the site actually publishes.
 *
 * Answers come from a static knowledge base derived from the canonical hackathon
 * config, so venue, dates, fees and prizes can never drift away from the rest of
 * the site. Nothing leaves the browser: there is no network call and no
 * third-party service involved.
 */
export default function HelpBotWidget() {
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(() => [
    createMessage('bot', HELP_BOT_PROFILE.greeting)
  ])
  const [isTyping, setIsTyping] = useState(false)

  const scrollRef = useRef(null)
  const launcherRef = useRef(null)
  const replyTimers = useRef([])

  const scrollToLatest = useCallback(() => {
    const node = scrollRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [])

  useEffect(() => {
    if (!isOpen) return
    scrollToLatest()
  }, [isOpen, messages, isTyping, scrollToLatest])

  // Pending replies must not fire into an unmounted panel.
  useEffect(() => {
    const timers = replyTimers.current
    return () => {
      timers.forEach(clearTimeout)
      timers.length = 0
    }
  }, [])

  const ask = useCallback((entry) => {
    setMessages((current) => [...current, createMessage('user', entry.question)])
    setIsTyping(true)

    const timer = setTimeout(() => {
      replyTimers.current = replyTimers.current.filter((value) => value !== timer)
      setIsTyping(false)
      setMessages((current) => [...current, createMessage('bot', entry.answer, entry)])
    }, REPLY_DELAY_MS)

    replyTimers.current.push(timer)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    launcherRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  return (
    <div className="fixed bottom-4 right-4 z-[90] sm:bottom-6 sm:right-6">
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="help-bot-panel"
            role="dialog"
            aria-label={`${HELP_BOT_PROFILE.name} — ${HELP_BOT_PROFILE.role}`}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 flex h-[min(32rem,72vh)] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/95 shadow-card backdrop-blur-xl"
          >
            <header className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-400/15 text-lime-400">
                <Bot className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold text-mist-100">
                  {HELP_BOT_PROFILE.name}
                </p>
                <p className="text-xs text-mist-500">{HELP_BOT_PROFILE.role}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close help assistant"
                className="rounded-lg p-1.5 text-mist-500 transition-colors hover:bg-white/[0.06] hover:text-mist-200"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              role="log"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                      message.role === 'user'
                        ? 'bg-lime-400 text-ink-950'
                        : 'bg-white/[0.04] text-mist-200'
                    )}
                  >
                    <p>{message.text}</p>
                    {message.entry?.links?.map((link) => (
                      <Button
                        key={link.label}
                        variant="outline"
                        size="sm"
                        to={link.to}
                        href={link.href}
                        className="mt-2 mr-1.5 h-8 px-3 text-xs"
                      >
                        {link.label}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <span className="flex items-center gap-1 rounded-2xl bg-white/[0.04] px-3.5 py-3">
                    {[0, 150, 300].map((delay) => (
                      <motion.span
                        key={delay}
                        className="h-1.5 w-1.5 rounded-full bg-mist-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: delay / 1000 }}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="sr-only">Typing</span>
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-white/[0.07] p-3">
              <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-mist-500">
                Ask a question
              </p>
              <div className="flex max-h-28 flex-wrap gap-1.5 overflow-y-auto pr-1">
                {HELP_BOT_ENTRIES.map((entry) => {
                  const Icon = QUESTION_ICONS[entry.id]

                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => ask(entry)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-mist-300 transition-colors hover:border-lime-400/40 hover:text-mist-100"
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 text-lime-400" aria-hidden="true" />}
                      {entry.question}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="help-bot-panel"
        aria-label={isOpen ? 'Close help assistant' : 'Open help assistant'}
        className="flex h-13 w-13 items-center justify-center rounded-full border border-lime-400/40 bg-lime-400 text-ink-950 shadow-lime-glow transition-transform duration-200 ease-smooth hover:bg-lime-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.16 }}
            className="flex"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Bot className="h-5 w-5" aria-hidden="true" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}
