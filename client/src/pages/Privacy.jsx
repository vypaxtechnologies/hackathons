import { useNavigate } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function Privacy() {
  useDocumentMeta({
    title: 'Privacy Policy',
    description:
      'How Vypax EdTech & Hackathons collects, uses and stores the information you share with us.',
    path: '/privacy'
  })

  const navigate = useNavigate()

  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm text-lime-400 hover:text-lime-300 transition-colors"
        >
          ← Back
        </button>

        <h1 className="font-display text-4xl font-bold text-mist-100 mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none text-mist-300">
          <p className="text-mist-400">Last updated: September 29, 2026</p>

          <h2 className="font-display text-2xl font-semibold text-mist-100 mt-12">1. Information We Collect</h2>
          <p>We collect information you provide directly when using the platform, such as your name, email address, and hackathon submissions.</p>

          <h2 className="font-display text-2xl font-semibold text-mist-100 mt-12">2. How We Use Your Information</h2>
          <p>Your information is used to provide platform services, communicate with you about hackathon activities, and improve our services.</p>

          <h2 className="font-display text-2xl font-semibold text-mist-100 mt-12">3. Data Protection</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

          <h2 className="font-display text-2xl font-semibold text-mist-100 mt-12">4. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information. Contact us if you need assistance with these rights.</p>
        </div>
      </div>
    </div>
  )
}