import { useMemo, useState } from 'react'
import {
  Search,
  X,
  Trophy,
  Scale,
  CalendarDays,
  GraduationCap,
  Briefcase,
  MessageCircleQuestion,
  LifeBuoy
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Accordion from '../components/ui/Accordion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { FAQ_CATEGORIES } from '../config/faq'
import { CONTACT_LINKS, CONTACT_PHONES } from '../config/site'
import useDocumentMeta from '../hooks/useDocumentMeta'

/**
 * Icon names are stored as plain strings in the config so that module stays free
 * of JSX. They are resolved here, with a neutral fallback so a typo in the
 * config degrades to a readable icon instead of crashing the page.
 */
const CATEGORY_ICONS = {
  Participation: Trophy,
  Competition: Scale,
  Editions: CalendarDays,
  'Training & Courses': GraduationCap,
  Services: Briefcase,
  'Contact & Support': MessageCircleQuestion
}

const ALL_CATEGORIES = 'all'

const normalise = (value) => value.toLowerCase().trim()

export default function FAQ() {
  useDocumentMeta({
    title: 'FAQ',
    description:
      'Answers on hackathon participation, prizes and certificates, training batches, services ' +
      'and how to reach the Vypax team.',
    path: '/faq'
  })

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)

  const term = normalise(query)

  // Search matches the question and the answer text, not just the heading, so a
  // visitor looking for "refund" or "prizes" still lands on the right entry.
  const matchingIds = useMemo(() => {
    if (!term) return null
    const ids = new Set()
    for (const category of FAQ_CATEGORIES) {
      for (const item of category.items) {
        if (
          normalise(item.question).includes(term) ||
          normalise(item.answer).includes(term)
        ) {
          ids.add(item.id)
        }
      }
    }
    return ids
  }, [term])

  const visibleCategories = useMemo(
    () =>
      FAQ_CATEGORIES.filter(
        (category) => activeCategory === ALL_CATEGORIES || category.id === activeCategory
      ).map((category) => ({
        ...category,
        items: matchingIds ? category.items.filter((item) => matchingIds.has(item.id)) : category.items
      })).filter((category) => category.items.length > 0),
    [activeCategory, matchingIds]
  )

  const resultCount = visibleCategories.reduce((total, category) => total + category.items.length, 0)

  const isFiltering = term.length > 0 || activeCategory !== ALL_CATEGORIES

  const clearFilters = () => {
    setQuery('')
    setActiveCategory(ALL_CATEGORIES)
  }

  return (
    <div className="container-page py-12 sm:py-16 lg:py-20">
      <SectionHeading
        eyebrow="Help centre"
        title="Frequently asked questions"
        description={`Everything about taking part in a hackathon, our training programmes and the work we take on for clients. If something is still missing, ask us directly.`}
        align="center"
      />

      <div className="mx-auto mt-10 max-w-2xl">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-500"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions, fees, dates…"
            aria-label="Search frequently asked questions"
            className="w-full rounded-full border border-white/[0.08] bg-ink-900/60 py-3 pl-11 pr-11 text-sm text-mist-100 placeholder-mist-500 transition-colors focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400/20 sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-mist-500 transition-colors hover:bg-white/[0.06] hover:text-mist-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category chips scroll horizontally on small screens, matching the
            course carousel so the two behave the same way on a phone. */}
        <div className="no-scrollbar -mx-5 mt-5 flex snap-x gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          <button
            type="button"
            onClick={() => setActiveCategory(ALL_CATEGORIES)}
            aria-pressed={activeCategory === ALL_CATEGORIES}
            className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 ${
              activeCategory === ALL_CATEGORIES
                ? 'border-lime-400/50 bg-lime-400/10 text-lime-300'
                : 'border-white/[0.08] bg-ink-900/50 text-mist-400 hover:border-lime-400/30 hover:text-mist-200'
            }`}
          >
            All
          </button>
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
              className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 ${
                activeCategory === category.id
                  ? 'border-lime-400/50 bg-lime-400/10 text-lime-300'
                  : 'border-white/[0.08] bg-ink-900/50 text-mist-400 hover:border-lime-400/30 hover:text-mist-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-mist-500" role="status" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'question' : 'questions'}
          {term && ` matching “${query.trim()}”`}
        </p>
      </div>

      {resultCount === 0 ? (
        <Reveal className="mx-auto mt-12 max-w-xl">
          <Card className="px-6 py-12 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400">
              <LifeBuoy className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-lg font-semibold text-mist-100">
              No questions match that search
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-mist-400">
              Try a different word, or clear the filters to browse everything. If your question is
              not answered anywhere, just ask us.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {isFiltering && (
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
              <Button to="/contact">Ask the team</Button>
            </div>
          </Card>
        </Reveal>
      ) : (
        <div className="mt-12 space-y-10">
          {visibleCategories.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.label] || MessageCircleQuestion
            return (
              <Reveal key={category.id} delay={index * 0.04}>
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-semibold text-mist-100 sm:text-xl">
                      {category.label}
                    </h2>
                    <p className="mt-0.5 text-sm text-mist-500">{category.description}</p>
                  </div>
                </div>

                <Accordion items={category.items} />
              </Reveal>
            )
          })}
        </div>
      )}

      {/* Contact fallback. Phones are environment-driven, so the call row is only
          rendered when a number is actually configured — the same rule the rest
          of the site follows, so no placeholder number is ever shown. */}
      <Reveal className="mt-16">
        <Card className="overflow-hidden p-8 sm:p-12">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold text-mist-100 sm:text-3xl">
                Still have a question?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mist-400 sm:text-base">
                Tell us which edition or course you are asking about and we will get back to you
                within 24–48 hours. If you are asking about a registration deadline, put it in the
                subject line and we will prioritise it.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <a
                  href={CONTACT_LINKS.emailHref}
                  className="link-underline text-lime-400 transition-colors hover:text-lime-300"
                >
                  {CONTACT_LINKS.email}
                </a>
                {CONTACT_PHONES.map((phone) => (
                  <a
                    key={phone.id}
                    href={phone.href}
                    className="link-underline text-mist-300 transition-colors hover:text-mist-100"
                  >
                    {phone.number}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Button to="/contact" iconLeft={MessageCircleQuestion}>
                Contact the team
              </Button>
              <Button to="/hackathons" variant="secondary">
                Browse hackathons
              </Button>
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  )
}
