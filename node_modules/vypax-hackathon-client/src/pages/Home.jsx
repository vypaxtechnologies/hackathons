import {
  WHY_PARTICIPATE,
  COURSES,
  COURSE_BATCHES
} from '../config/content'
import { SITE } from '../config/site'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import ParticipationSteps from '../components/home/ParticipationSteps'
import RotatingHighlights from '../components/home/RotatingHighlights'
import HackathonCard from '../components/hackathons/HackathonCard'
import { EDITION_SUMMARIES } from '../config/editions'
import { ArrowUpRight, CalendarClock, Clock } from 'lucide-react'

const ICON_MAP = {
  Hammer: '🔨',
  Swords: '⚔️',
  Trophy: '🏆',
  BookOpen: '📚',
  Award: '🏅',
  DoorOpen: '🚪'
}

// Hero background video, served from `public/`. A still image is set as the
// poster so the section renders immediately and still looks right for anyone
// who has `prefers-reduced-motion` enabled or the video fails to load.
const HERO_VIDEO = '/Herovideo.mp4'
const HERO_POSTER = '/og-cover.jpg'

// Hero primary CTA routes to the hackathons listing so people can browse
// every edition before registering.
const HACKATHONS_PATH = '/hackathons'

export default function Home() {
  // Honour the OS-level motion preference: pause the loop and leave the poster
  // showing rather than autoplaying a decorative background.
  const handleCanPlay = (event) => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      event.currentTarget.pause()
    }
  }

  return (
    <>
      <header className="relative isolate overflow-hidden bg-ink-950 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          onCanPlay={handleCanPlay}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        <div className="absolute inset-0 -z-10 bg-ink-950/35" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(7,8,11,0.72)_0%,rgba(7,8,11,0.3)_45%,rgba(7,8,11,0.55)_100%)]"
          aria-hidden="true"
        />

        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal className="flex items-center justify-center gap-2 text-lime-400 mb-6">
              <span className="font-mono text-xs tracking-widest uppercase">All India Hackathons</span>
            </Reveal>
            <Reveal delay={0.1} as="h1" className="font-display text-4xl font-bold text-mist-100 sm:text-5xl lg:text-6xl leading-tight">
              Build. Compete. Innovate.
            </Reveal>
            <Reveal delay={0.2} className="mt-4 text-lg text-mist-400 sm:text-xl max-w-2xl mx-auto">
              {SITE.tagline}
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to={HACKATHONS_PATH}
                variant="primary"
                size="lg"
                weight="bold"
                className="w-full sm:w-auto"
              >
                Register Now
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" aria-hidden="true" />
      </header>

      <main>
        <section className="container-page py-12 sm:py-16" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">
            Hackathon, partner and training highlights
          </h2>
          <RotatingHighlights />
        </section>

        <section className="container-page py-12 sm:py-16" aria-labelledby="editions-heading">
          <SectionHeading
            eyebrow="All hackathons"
            title="Every edition in one place"
            description="Student and professional tracks, current and upcoming."
            headingId="editions-heading"
            align="center"
          />
          {/* Mirrors the layout of the highlights row above: a snap-scrolling
              track below `lg` and a three-column grid above it. */}
          <div className="no-scrollbar mt-12 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-x-visible lg:px-0">
            {EDITION_SUMMARIES.map((edition, index) => (
              <Reveal
                key={edition.id}
                delay={index * 0.08}
                className="h-full w-[85vw] max-w-sm shrink-0 snap-center sm:w-[70vw] lg:w-auto lg:max-w-none"
              >
                <HackathonCard edition={edition} index={index} compact />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button variant="secondary" size="md" to="/hackathons" iconRight={ArrowUpRight}>
              View all hackathons
            </Button>
          </div>
        </section>

        <section
          id="courses"
          className="container-page scroll-mt-28 py-12 sm:py-16"
          aria-labelledby="training-heading"
        >
          <SectionHeading
            eyebrow="Vypax courses"
            title="Course pricing"
            description="Job-ready programmes built around live builds, mock interviews and placement support."
            headingId="training-heading"
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

          {/* Scrolls horizontally at every breakpoint, including desktop, with a
              fixed card width so the catalogue stays browsable without the grid
              collapsing back to stacked columns. The scrollbar is hidden but the
              track remains swipeable and keyboard-scrollable. */}
          <div className="no-scrollbar mt-10 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {COURSES.map((course, index) => (
              <Reveal
                key={course.id}
                delay={index * 0.06}
                as="article"
                className="flex w-[78vw] max-w-xs shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50"
              >
                <div className="relative h-36 w-full overflow-hidden">
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
                  <h3 className="font-display text-base font-semibold text-mist-100 sm:text-lg">
                    {course.name}
                  </h3>

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

          <div className="mt-8 flex justify-center">
            <Button variant="secondary" size="md" to="/courses" iconRight={ArrowUpRight}>
              View all courses
            </Button>
          </div>
        </section>

        <section className="container-page py-16 sm:py-20" aria-labelledby="why-heading">
          <SectionHeading
            eyebrow="Why participate"
            title="Six reasons to join the build sprint"
            description="Not a slide-deck contest. Real code, real deadlines, real outcomes."
            headingId="why-heading"
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_PARTICIPATE.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06} className="rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5 sm:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400" aria-hidden="true">
                  <span className="text-2xl" role="img" aria-label={item.icon}>{ICON_MAP[item.icon] || '⚡'}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-mist-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-400">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <ParticipationSteps />
      </main>
    </>
  )
}