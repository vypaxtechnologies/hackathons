import { ArrowUpRight, Award, CalendarClock, CheckCircle2, Clock, Code, FileQuestion, Presentation, Mic, NotebookPen, ClipboardCheck, MessagesSquare, Briefcase } from 'lucide-react'
import { COURSES, COURSE_BATCHES, COURSE_INCLUDES, courseContactPath } from '../config/content'
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
  FileQuestion,
  Award,
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

      {/* A plain responsive grid: every programme is visible at once and there
          is no swipe track to discover, so no hidden overflow, no focusable
          carousel and no peek-card padding to maintain. */}
      <div
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {COURSES.map((course, index) => (
          <Reveal
            key={course.id}
            delay={index * 0.05}
            as="article"
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50"
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

              <div className="mt-auto pt-5">
                <Button
                  variant="secondary"
                  size="sm"
                  to={courseContactPath(course.id)}
                  iconRight={ArrowUpRight}
                >
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
