import {
  Hammer,
  Swords,
  Trophy,
  BookOpen,
  Award,
  DoorOpen,
  Sparkles
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { WHY_PARTICIPATE } from '../../config/content'

const ICONS = { Hammer, Swords, Trophy, BookOpen, Award, DoorOpen }

/** Six-up value grid explaining what participants get out of the event. */
export default function WhyParticipate() {
  return (
    <section aria-labelledby="why-participate" className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="Why Participate?"
        title="Everything you get from building in public"
        description="A structured competition with real evaluation, real recognition and a genuine route into the Vypax engineering team."
        headingClassName="scroll-mt-28"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_PARTICIPATE.map((item, index) => {
          const Icon = ICONS[item.icon] || Sparkles
          return (
            <Reveal
              key={item.id}
              delay={index * 0.06}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-lime-400/30 sm:p-6"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-lime-400/25 bg-lime-400/10 text-lime-400 transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-mist-100">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mist-400">{item.description}</p>
              <span
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-lime-400/[0.06] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
