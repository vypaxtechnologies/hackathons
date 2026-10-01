// Environment bootstrap — must stay first. See config/env.js for why.
import './config/env.js'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import hackathonRoutes from './routes/hackathons.js'
import teamRoutes from './routes/teams.js'
import submissionRoutes from './routes/submissions.js'
import judgeRoutes from './routes/judges.js'
import evaluationRoutes from './routes/evaluations.js'
import contactRoutes from './routes/contact.js'
import adminRoutes from './routes/admin.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'
import { isEmailConfigured } from './services/emailService.js'

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// CORS
const allowedOrigins = [
  'https://hackathons-vypax.vercel.app',
  'https://vypaxedutech.pages.dev',
  'https://www.vypaxedutech.com',
  'http://localhost:5173'
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`))
    }
  },
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later' }
})
app.use('/api/', limiter)

// Auth-specific rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many authentication attempts, please try again later' }
})
app.use('/api/auth/', authLimiter)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Health check
//
// Also reports whether form notifications are usable. Email failure is soft —
// the contact endpoint still returns 201 and the record still saves — so a
// deployed backend with a missing RESEND_API_KEY looks completely healthy from
// the outside. Surfacing the flags here makes that diagnosable in one request
// instead of by inferring it from an inbox that stays empty.
//
// Secrets are never included: only booleans and the public from/to addresses,
// which are already published on the site.
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    email: {
      configured: isEmailConfigured(),
      from: process.env.EMAIL_FROM || null,
      to: process.env.EMAIL_TO || null,
      smtpHost: process.env.SMTP_HOST || null,
      // Verbatim `console.error` text from the send path, so a silent drop can
      // be diagnosed without server log access.
      hint: isEmailConfigured()
        ? 'Configured. If mail is not arriving, check the recipient spam folder — a shared ' +
          'onboarding@resend.dev sender has no SPF/DKIM for this domain.'
        : 'RESEND_API_KEY is not set in this environment. Set it in the deployment platform ' +
          'settings, then restart. Contact submissions still save, but no notification is sent.'
    }
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/hackathons', hackathonRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/submissions', submissionRoutes)
app.use('/api/judges', judgeRoutes)
app.use('/api/evaluations', evaluationRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)

    // Surface mail configuration at boot rather than letting the first form
    // submission fail quietly: without this, a missing key only shows up as a
    // warning in the log long after somebody has already submitted a form.
    console.log(
      isEmailConfigured()
        ? `[email] Form notifications enabled — sending as "${process.env.EMAIL_FROM}"`
        : '[email] RESEND_API_KEY is not set. Form submissions are saved but no notification email will be sent.'
    )
  })
}).catch(err => {
  console.error('Failed to connect to database:', err)
  process.exit(1)
})
