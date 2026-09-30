import { ArrowUpRight, CalendarClock, CheckCircle2, Clock, Code, Presentation, Mic, NotebookPen, ClipboardCheck, MessagesSquare, Briefcase } from 'lucide-react'
import { COURSES, COURSE_BATCHES, COURSE_INCLUDES } from '../config/content'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import useDocumentMeta from '../hooks/useDocumentMeta'

/** Resolves the `icon` name on each course inclusion to a component. */
const COURSE_INCLUDE_ICONS = {
  Presentation,
  Mic,
  Code,
  NotebookPen,
  ClipboardCheck,
  MessagesSquare,
  Briefcase
}

export default function Courses() {
  useDocumentMeta({
    title: 'Training & Courses',
    description:
      'Vypax training programmes across full stack, frontend, backend, SEO, digital marketing, ' +
      'data analysis, DSA and mechanical AutoCAD.',
    path: '/courses'
  })

  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="Training & courses"
        title="Job-ready programmes"
        description="Every course combines live training with communication skills, mock interviews and placement support."
        align="center"
      />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-mist-300">
          <CalendarClock className="h-4 w-4 text-lime-400" aria-hidden="true" />
          Batches start
        </span>
        {COURSE_BATCHES.map((batch) => (
          <span
            key={batch.id}
            className="rounded-full bg-lime-400/10 px-3 py-1.5 text-sm font-medium text-lime-300"
          >
            {batch.label}
          </span>
        ))}
      </div>

      {/* Below `sm` the cards become a snap-scrolling carousel instead of a
          single cramped column. The negative margin pulls the track out to the
          viewport edge so the neighbouring card peeks in and signals that there
          is more to swipe, then `sm:` restores the normal centred grid. The
          padding-bottom reserves room for the focus ring of a keyboard-focused
          card so it is not clipped by the overflow container.

          The track is focusable so it can be scrolled with the arrow keys.
          Without this a keyboard user reaches the last visible card and has no
          way to reach the rest, since the scrollbar is hidden. */}
      <div
        role="group"
        aria-label="Courses, scroll sideways to see all programmes"
        tabIndex={0}
        className="no-scrollbar mt-12 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4
          focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950
          sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
      >
        {COURSES.map((course, index) => (
          <Reveal
            key={course.id}
            delay={index * 0.05}
            as="article"
            className="flex h-full w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50 sm:w-auto"
          >
            <div className="relative h-40 w-full shrink-0 overflow-hidden">
              <img
                src={course.image}
                alt={course.imageAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-display text-lg font-semibold text-mist-100">{course.name}</h2>

              <p className="mt-2 inline-flex items-center gap-2 text-sm text-mist-400">
                <Clock className="h-4 w-4 text-lime-400" aria-hidden="true" />
                {course.duration}
              </p>

              <p className="mt-4 border-t border-white/[0.07] pt-4 font-display text-2xl font-bold text-lime-400">
                {course.price}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">
                New price
              </p>

              <div className="mt-auto pt-5">
                <Button variant="secondary" size="sm" to="/contact" iconRight={ArrowUpRight}>
                  Enquire now
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-16" aria-labelledby="includes-heading">
        <h2
          id="includes-heading"
          className="text-center font-display text-2xl font-semibold text-mist-100"
        >
          Every package includes
        </h2>
        <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COURSE_INCLUDES.map((item) => {
            const Icon = COURSE_INCLUDE_ICONS[item.icon] || CheckCircle2
            return (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-ink-900/50 px-4 py-3 text-sm text-mist-200"
              >
                <Icon className="h-4 w-4 shrink-0 text-lime-400" aria-hidden="true" />
                {item.label}
              </li>
            )
          })}
        </ul>
      </section>

      <Reveal className="mt-16">
        <Card className="p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold text-mist-100 sm:text-3xl">
            Not sure which course fits?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-mist-400">
            Tell us where you are now and what you want to be able to do. We will recommend the
            shortest path, including which batches you are eligible to join.
          </p>
          <div className="mt-6 flex justify-center">
            <Button size="lg" to="/contact" iconRight={ArrowUpRight}>
              Talk to a counsellor
            </Button>
          </div>
        </Card>
      </Reveal>
    </div>
  )
}
