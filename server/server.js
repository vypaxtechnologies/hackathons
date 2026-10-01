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

// --------------------------------------------------
// Render / Reverse Proxy
// --------------------------------------------------
// Render sits behind a reverse proxy and sends
// X-Forwarded-For. Trust the first proxy so Express
// and express-rate-limit can correctly identify IPs.
app.set('trust proxy', 1)

// --------------------------------------------------
// Security
// --------------------------------------------------
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin'
    }
  })
)

// --------------------------------------------------
// CORS
// --------------------------------------------------
const allowedOrigins = [
  'https://hackathons-vypax.vercel.app',
  'https://vypaxedutech.pages.dev',
  'https://www.vypaxedutech.com',
  'http://localhost:5173'
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as server-to-server requests.
      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error(`CORS: Origin ${origin} not allowed`))
    },
    credentials: true
  })
)

// --------------------------------------------------
// Rate Limiting
// --------------------------------------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests, please try again later'
  }
})

app.use('/api/', limiter)

// Auth-specific rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: 'Too many authentication attempts, please try again later'
  }
})

app.use('/api/auth/', authLimiter)

// --------------------------------------------------
// Body Parsing
// --------------------------------------------------
app.use(
  express.json({
    limit: '10mb'
  })
)

app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb'
  })
)

app.use(cookieParser())

// --------------------------------------------------
// Logging
// --------------------------------------------------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// --------------------------------------------------
// Health Check
// --------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    email: {
      configured: isEmailConfigured(),
      from: process.env.EMAIL_FROM || null,
      to: process.env.EMAIL_TO || null,
      smtpHost: process.env.SMTP_HOST || null,
      hint: isEmailConfigured()
        ? 'Configured. If mail is not arriving, check the recipient spam folder.'
        : 'RESEND_API_KEY is not set in this environment. Set it in the deployment platform settings, then restart. Contact submissions still save, but no notification is sent.'
    }
  })
})

// --------------------------------------------------
// Public Contact Test
// --------------------------------------------------
// Temporary diagnostic endpoint.
// You can remove this later after confirming deployment.
app.get('/api/contact-test', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Public contact route is reachable'
  })
})

// --------------------------------------------------
// API Routes
// --------------------------------------------------

// Authentication
app.use('/api/auth', authRoutes)

// Users
app.use('/api/users', userRoutes)

// Hackathons
app.use('/api/hackathons', hackathonRoutes)

// Teams
app.use('/api/teams', teamRoutes)

// Submissions
app.use('/api/submissions', submissionRoutes)

// Judges
app.use('/api/judges', judgeRoutes)

// Evaluations
app.use('/api/evaluations', evaluationRoutes)

// --------------------------------------------------
// CONTACT
// --------------------------------------------------
// IMPORTANT:
// This router contains a PUBLIC POST endpoint:
//
// POST /api/contact
//
// Admin GET/PATCH/DELETE endpoints remain protected
// inside routes/contact.js.
app.use('/api/contact', contactRoutes)

// Admin
app.use('/api/admin', adminRoutes)

// --------------------------------------------------
// 404 Handler
// --------------------------------------------------
app.use(notFound)

// --------------------------------------------------
// Error Handler
// --------------------------------------------------
app.use(errorHandler)

// --------------------------------------------------
// Database + Server
// --------------------------------------------------
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
      )

      console.log(
        isEmailConfigured()
          ? `[email] Contact notifications enabled — sending as "${process.env.EMAIL_FROM}"`
          : '[email] RESEND_API_KEY is not set. Form submissions are saved but no notification email will be sent.'
      )
    })
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err)
    process.exit(1)
  })
