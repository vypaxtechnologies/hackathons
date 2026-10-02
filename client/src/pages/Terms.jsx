import { useNavigate } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function Terms() {
  useDocumentMeta({
    title: 'Terms of Service',
    description:
      'The terms that apply to using Vypax EdTech & Hackathons, joining an edition or booking a ' +
      'training programme.',
    path: '/terms'
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

        <h1 className="font-display text-4xl font-bold text-mist-100 mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none text-mist-300">
          <p className="text-mist-400">Last updated: September 29, 2026</p>

          <h2 className="font-display text-2xl font-semibold text-mist-100">1. Acceptance of Terms</h2>
          <p>By accessing or using the Vypax EdTech & Hackathons platform, you agree to be bound by these Terms of Service.</p>

          <h2 className="font-display text-2xl font-semibold text-mist-100 mt-12">2. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

          <h2 className="font-display text-2xl font-semibold text-mist-100 mt-12">3. Hackathon Rules</h2>
          <p>Participants must comply with all hackathon rules, guidelines, and submission requirements as outlined on the platform.</p>

          <h2 className="font-display text-2xl font-semibold text-mist-100 mt-12">4. Intellectual Property</h2>
          <p>You retain ownership of your submissions, but grant Vypax EdTech & Hackathons a non-exclusive license to use, display, and promote your work in connection with the hackathon.</p>

          <h2 className="font-display text-2xl font-semibold text-mist-100 mt-12">5. Privacy</h2>
          <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.</p>
        </div>
      </div>
    </div>
  )
}