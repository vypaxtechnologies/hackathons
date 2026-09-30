import { Link } from 'react-router-dom'
import { VypaxMark } from '../components/brand/VypaxMark'
import { CONTACT_LINKS, CONTACT_PHONES } from '../config/site'

export default function ContactInfo() {
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <VypaxMark className="h-16 w-16 mx-auto" />
          <h1 className="font-display text-4xl font-bold text-mist-100 mt-6">Contact Vypax EdTech & Hackathons</h1>
          <p className="mt-4 text-mist-400 max-w-2xl mx-auto">
            Whether you have questions about registration, sponsorship opportunities, or partnership inquiries, our team is ready to help.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-mist-100 mb-6">General inquiries</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 flex-shrink-0">
                  📧
                </div>
                <div>
                  <h3 className="font-semibold text-mist-200">Email</h3>
                  <a href={CONTACT_LINKS.emailHref} className="link-underline text-mist-300">
                    {CONTACT_LINKS.email}
                  </a>
                </div>
              </div>
              {CONTACT_PHONES.map((phone) => (
                <div key={phone.id} className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="font-semibold text-mist-200">Phone</h3>
                    <a href={phone.href} className="link-underline text-mist-300">
                      {phone.number}
                    </a>
                  </div>
                </div>
              ))}
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-mist-200">Location</h3>
                  <p className="text-mist-300">Vypax EdTech & Hackathons HQ</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 flex-shrink-0">
                  ⏰
                </div>
                <div>
                  <h3 className="font-semibold text-mist-200">Response time</h3>
                  <p className="text-mist-300">24-48 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-mist-100 mb-6">Follow us</h2>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-xl bg-white/[0.02] flex items-center justify-center text-mist-300 hover:bg-lime-400/10 hover:text-lime-400 transition-colors">🔗</a>
                <a href="#" className="h-10 w-10 rounded-xl bg-white/[0.02] flex items-center justify-center text-mist-300 hover:bg-lime-400/10 hover:text-lime-400 transition-colors">📘</a>
                <a href="#" className="h-10 w-10 rounded-xl bg-white/[0.02] flex items-center justify-center text-mist-300 hover:bg-lime-400/10 hover:text-lime-400 transition-colors">🐦</a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-mist-100 mb-6">Send us a message</h2>
            <div className="rounded-2xl border border-white/[0.08] bg-ink-900/50 p-8">
              <p className="text-mist-300 mb-6">Fill out the form and we&apos;ll get back to you as soon as possible.</p>
              <Link
                to="/contact"
                className="inline-block rounded-xl bg-lime-400 px-8 py-3 text-base font-medium text-ink-950 hover:bg-lime-300 transition-colors"
              >
                Open contact form
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-ink-900/30 p-6">
              <h3 className="font-display text-lg font-semibold text-mist-100 mb-4">Quick topics</h3>
              <ul className="space-y-3 text-sm text-mist-300">
                <li className="flex items-center gap-2">
                  <span className="text-lime-400">•</span> Registration & eligibility
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lime-400">•</span> Teams & submissions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lime-400">•</span> Sponsorship & partnerships
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lime-400">•</span> Judging & evaluation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lime-400">•</span> Something else
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}