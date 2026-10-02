import { ArrowUpRight, Code, Smartphone, TrendingUp, Bot, UserSearch } from 'lucide-react'
import { SERVICES, serviceContactPath } from '../config/content'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import useDocumentMeta from '../hooks/useDocumentMeta'

/** Resolves the `icon` name on each service to a component. */
const SERVICE_ICONS = { Code, Smartphone, TrendingUp, Bot, UserSearch }

export default function Services() {
  useDocumentMeta({
    title: 'Services',
    description:
      'Custom software, web and app development, digital marketing and SEO, AI automation, and ' +
      'staffing and recruiting from Vypax Technologies.',
    path: '/services'
  })

  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="What we do"
        title="Services for teams that need to ship"
        description="Alongside the hackathon programme, Vypax builds software, grows pipelines and staffs engineering teams."
        align="center"
      />

      {/* A plain responsive grid: every service is visible at once, so there
          is no swipe track, hidden overflow or focusable carousel to maintain. */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => {
          const Icon = SERVICE_ICONS[service.icon] || Code

          return (
            <Reveal
              key={service.id}
              delay={index * 0.06}
              as="article"
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50"
            >
              <div className="relative h-32 w-full shrink-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.imageAlt}
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <h2 className="mt-3.5 font-display text-base font-semibold text-mist-100 sm:text-lg">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mist-400">{service.summary}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {service.capabilities.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-mist-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  <Button
                  variant="secondary"
                  size="sm"
                  to={serviceContactPath(service.id)}
                  iconRight={ArrowUpRight}
                >
                    Request a quote
                  </Button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="mt-16">
        <Card className="p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold text-mist-100 sm:text-3xl">
            Not sure which service fits?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-mist-400">
            Tell us the problem you are trying to solve and we will come back with a scope and a
            plan. Every engagement is quoted individually, so there is no rate card to memorise.
          </p>
          <div className="mt-6 flex justify-center">
            <Button size="lg" to="/contact" iconRight={ArrowUpRight}>
              Talk to us
            </Button>
          </div>
        </Card>
      </Reveal>
    </div>
  )
}
