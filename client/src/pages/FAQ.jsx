import { useState } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import { hackathon2026Faqs } from '../config/hackathon2026'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = hackathon2026Faqs

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Frequently asked"
          title="Questions & answers"
          description="Everything you need to know about participating in Vypax EdTech & Hackathons 2026."
          align="center"
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl border border-white/[0.08] bg-ink-900/30 overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-display text-lg font-semibold text-mist-100">{faq.question}</span>
                <span className="ml-4 flex-shrink-0 h-8 w-8 rounded-full bg-lime-400/10 flex items-center justify-center">
                  <span className={`text-lime-400 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>▼</span>
                </span>
              </button>
              <div className={`px-6 pb-5 ${openIndex === index ? 'block' : 'hidden'}`}>
                <p className="text-mist-300 leading-relaxed pt-2 border-t border-white/[0.05]">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}