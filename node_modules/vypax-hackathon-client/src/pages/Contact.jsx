import { useMemo, useState } from 'react'
import {
  AlertCircle,
  Briefcase,
  ClipboardList,
  Clock3,
  Code,
  GraduationCap,
  Handshake,
  Lightbulb,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  Timer,
  Wrench
} from 'lucide-react'
import { CONTACT_SUBJECTS, CONTACT_SUBJECT_OTHER } from '../config/content'
import { CONTACT_LINKS, CONTACT_PHONES, SITE } from '../config/site'
import { hackathon2026 } from '../config/hackathon2026'
import useToast from '../hooks/useToast'
import contactService from '../services/contactService'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'

const SUBJECT_ICONS = {
  ClipboardList,
  Lightbulb,
  Code,
  Timer,
  GraduationCap,
  Briefcase,
  Handshake,
  Wrench,
  MessageSquare,
  Sparkles
}

/** Character budget enforced client-side, matching the server's message limit. */
const MESSAGE_MAX = 2000
const MESSAGE_MIN = 10

export default function Contact() {
  const toast = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topicId: CONTACT_SUBJECTS[0].id,
    customSubject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // "Something else" swaps the dropdown for a free-text subject so the visitor is
  // never forced to file an enquiry under a category that does not fit.
  const isCustomSubject = formData.topicId === CONTACT_SUBJECT_OTHER

  const selectedSubject = useMemo(
    () => CONTACT_SUBJECTS.find((topic) => topic.id === formData.topicId),
    [formData.topicId]
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const subject = isCustomSubject ? formData.customSubject.trim() : selectedSubject.label

    // The native `required` attribute only rejects a truly empty field, so a
    // value of spaces still gets through the browser. The server trims before
    // validating and would reject it, so check the trimmed value here to keep
    // the visitor on the page instead of bouncing off a failed request.
    if (!formData.phone.trim()) {
      setError('Please add a phone number so we can call you back.')
      return
    }
    if (!subject) {
      setError('Please add a short subject so we know where to route this.')
      return
    }
    if (formData.message.trim().length < MESSAGE_MIN) {
      setError(`Please write at least ${MESSAGE_MIN} characters so we can help properly.`)
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await contactService.send({
        name: formData.name,
        email: formData.email,
        phone: formData.phone.trim(),
        subject,
        message: formData.message
      })

      // Success is reported through the global toast rather than a full-page
      // confirmation: the visitor keeps their place on the page and can carry on
      // browsing. The form is cleared so a follow-up message starts fresh.
      toast.success('Message sent. We will get back to you in 24-48 hours.', {
        title: 'Form submitted',
        variant: 'prominent',
        duration: 8000
      })

      setFormData({
        name: '',
        email: '',
        phone: '',
        topicId: CONTACT_SUBJECTS[0].id,
        customSubject: '',
        message: ''
      })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      toast.error('We could not send your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="border-b border-white/[0.07] bg-ink-950">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Get in touch"
            title="Tell us what you need"
            description="Pick the closest subject and your message goes straight to the person who handles it. Questions about an edition, a course or a project all land in the same place."
            as="h1"
            align="center"
          />
        </div>
      </section>

      {/* Form first, contact details alongside: the form is the reason for the
          page, so it takes the wider column. */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <div className="rounded-2xl border border-white/[0.08] bg-ink-900/50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-mist-100">Send a message</h2>
            <p className="mt-1.5 text-sm text-mist-500">
              Fields marked with <span className="text-coral-400">*</span> are required.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-2.5 rounded-xl border border-coral-400/30 bg-coral-400/10 p-4 text-sm text-coral-400"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-mist-200"
                  >
                    Full name <span className="text-coral-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    maxLength={80}
                    className="w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-base text-mist-100 placeholder-mist-500 transition-colors focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400/20"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-mist-200"
                  >
                    Phone number <span className="text-coral-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    maxLength={20}
                    pattern="[0-9+\s\(\)\-]+"
                    title="Digits, spaces, brackets, dashes and an optional leading + only."
                    className="w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-base text-mist-100 placeholder-mist-500 transition-colors focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400/20"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-mist-200"
                >
                  Email address <span className="text-coral-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-base text-mist-100 placeholder-mist-500 transition-colors focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400/20"
                  placeholder="jane@example.com"
                />
              </div>

              {isCustomSubject ? (
                <div>
                  <label
                    htmlFor="customSubject"
                    className="mb-2 block text-sm font-medium text-mist-200"
                  >
                    Subject <span className="text-coral-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="customSubject"
                    name="customSubject"
                    value={formData.customSubject}
                    onChange={handleChange}
                    required
                    maxLength={140}
                    className="w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-base text-mist-100 placeholder-mist-500 transition-colors focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400/20"
                    placeholder="What is your message about?"
                  />
                  <p className="mt-1.5 text-xs text-mist-500">
                    Keep it short &mdash; under 140 characters.
                  </p>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="topicId"
                    className="mb-2 block text-sm font-medium text-mist-200"
                  >
                    What is this about? <span className="text-coral-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="topicId"
                      name="topicId"
                      value={formData.topicId}
                      onChange={handleChange}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 pr-11 text-base text-mist-100 transition-colors focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400/20"
                    >
                      {CONTACT_SUBJECTS.map((topic) => (
                        <option key={topic.id} value={topic.id} className="bg-ink-900">
                          {topic.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      aria-hidden="true"
                    >
                      <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {selectedSubject && (
                    <p className="mt-2 flex items-start gap-2 text-xs text-mist-500">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-400" aria-hidden="true" />
                      {selectedSubject.description}
                    </p>
                  )}
                </div>
              )}

              <div>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <label htmlFor="message" className="block text-sm font-medium text-mist-200">
                    Message <span className="text-coral-400">*</span>
                  </label>
                  <span
                    className={
                      formData.message.length > MESSAGE_MAX ? 'text-xs text-coral-400' : 'text-xs text-mist-500'
                    }
                  >
                    {formData.message.length}/{MESSAGE_MAX}
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  minLength={MESSAGE_MIN}
                  maxLength={MESSAGE_MAX}
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 py-3 text-base leading-relaxed text-mist-100 placeholder-mist-500 transition-colors focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400/20"
                  placeholder="Tell us how we can help..."
                />
                <p className="mt-1.5 text-xs text-mist-500">
                  At least {MESSAGE_MIN} characters. Include your team name if it is about a
                  hackathon.
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                icon={Send}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </div>

          {/* Side rail — every direct channel, plus a shortcut past the form. */}
          <aside className="flex flex-col gap-5">
            <div className="rounded-2xl border border-white/[0.08] bg-ink-900/50 p-6">
              <h2 className="font-display text-lg font-semibold text-mist-100">
                Contact information
              </h2>

              <dl className="mt-6 space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400"
                    aria-hidden="true"
                  >
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-medium text-mist-200">Email</dt>
                    <dd className="mt-0.5">
                      <a href={CONTACT_LINKS.emailHref} className="link-underline break-all text-mist-300">
                        {CONTACT_LINKS.email}
                      </a>
                    </dd>
                  </div>
                </div>

                {CONTACT_PHONES.map((phone) => (
                  <div key={phone.id} className="flex items-start gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400"
                      aria-hidden="true"
                    >
                      <Phone className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <dt className="font-medium text-mist-200">Phone</dt>
                      <dd className="mt-0.5">
                        <a href={phone.href} className="link-underline text-mist-300">
                          {phone.number}
                        </a>
                      </dd>
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400"
                    aria-hidden="true"
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <dt className="font-medium text-mist-200">Where we are</dt>
                    <dd className="mt-0.5 text-mist-300">
                      {SITE.name} HQ
                      <span className="mt-0.5 block text-xs text-mist-500">
                        Editions run {hackathon2026.venue.toLowerCase()}.
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400"
                    aria-hidden="true"
                  >
                    <Clock3 className="h-4 w-4" />
                  </span>
                  <div>
                    <dt className="font-medium text-mist-200">Response time</dt>
                    <dd className="mt-0.5 text-mist-300">24&ndash;48 hours</dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* The chatbot answers the published questions instantly, so it is
                offered here as the faster route before anyone writes. */}
            <div className="rounded-2xl border border-lime-400/25 bg-lime-400/[0.07] p-6">
              <h2 className="font-display text-base font-semibold text-mist-100">
                Just need a quick fact?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">
                Venue, dates, fees, team size, prizes and certificates are all answered instantly by
                the help assistant in the bottom-right corner.
              </p>
              <Button variant="outline" size="sm" to="/faq" className="mt-4">
                Read the FAQ instead
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Topic picker: the same list as the dropdown, offered as a grid so a
          visitor can see every route at a glance. */}
      <section
        className="border-t border-white/[0.07] bg-ink-950/40"
        aria-labelledby="topics-heading"
      >
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Before you write"
            title="What are you getting in touch about?"
            description="Pick a topic to know exactly what happens next."
            headingId="topics-heading"
            align="center"
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTACT_SUBJECTS.map((topic) => {
              const Icon = SUBJECT_ICONS[topic.icon] || MessageSquare

              return (
                <li
                  key={topic.id}
                  className="flex gap-4 rounded-2xl border border-white/[0.08] bg-ink-900/50 p-5"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400"
                    aria-hidden="true"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-mist-100">
                      {topic.label}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist-400">{topic.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
