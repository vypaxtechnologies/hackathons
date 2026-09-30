import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { PARTICIPATION_STEPS } from '../../config/content'

/** Four-stage path from registration to the final round. */
export default function ParticipationSteps() {
  return (
    <section aria-labelledby="how-it-works" className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="How it works"
        title="Four stages from sign-up to final round"
        description="A clear, published schedule — so you always know what is due and when."
        align="center"
      />

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {PARTICIPATION_STEPS.map((step, index) => (
          <Reveal
            key={step.id}
            as="li"
            delay={index * 0.08}
            className="relative flex flex-col rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5 sm:p-6"
          >
            <span
              className="font-mono text-2xl font-bold text-lime-400/30 sm:text-3xl"
              aria-hidden="true"
            >
              {step.step}
            </span>

            <h3 className="mt-3 font-display text-base font-semibold text-mist-100 sm:text-lg">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mist-400">{step.description}</p>

            {index < PARTICIPATION_STEPS.length - 1 && (
              <span
                className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 bg-lime-400/25 lg:block"
                aria-hidden="true"
              />
            )}
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
