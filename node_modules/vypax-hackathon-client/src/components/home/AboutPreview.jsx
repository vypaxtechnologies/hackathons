import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { ABOUT_INTRO, ABOUT_PILLARS } from '../../config/content'
import { IMAGES } from '../../config/editions'

/** Condensed About block linking through to the full About page. */
export default function AboutPreview() {
  return (
    <section aria-labelledby="about-preview" className="relative overflow-hidden py-16 sm:py-20">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right" className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 p-2">
              <img
                src={IMAGES.aboutCollab}
                alt={ABOUT_INTRO.imageAlt}
                loading="lazy"
                decoding="async"
                width="1200"
                height="800"
                className="h-full w-full rounded-[1.25rem] object-cover"
              />
            </div>
            <div
              className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-lime-400/10 blur-3xl"
              aria-hidden="true"
            />
          </Reveal>

          <Reveal direction="left">
            <span className="eyebrow">
              <span className="h-px w-6 bg-lime-400/60" aria-hidden="true" />
              {ABOUT_INTRO.eyebrow}
            </span>

            <h2
              id="about-preview"
              className="mt-4 font-display text-display-md font-bold text-mist-100"
            >
              {ABOUT_INTRO.heading}
            </h2>

            <div className="mt-5 flex flex-col gap-4">
              {ABOUT_INTRO.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-sm leading-relaxed text-mist-400 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {ABOUT_PILLARS.slice(0, 5).map((pillar) => (
                <li
                  key={pillar.id}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-mist-300"
                >
                  {pillar.title}
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-lime-400 transition-colors hover:text-lime-300"
            >
              More about Vypax EdTech & Hackathons
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
