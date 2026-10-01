import express from 'express'
import rateLimit from 'express-rate-limit'
import authenticate, { requireAdmin } from '../middleware/auth.js'
import {
  createContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
  contactValidation
} from '../controllers/contactController.js'

const router = express.Router()

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 8,
  message: {
    error: 'Too many messages sent from this IP. Please try again later.'
  }
})

// PUBLIC — no authenticate here
router.post(
  '/',
  contactLimiter,
  contactValidation,
  createContactMessage
)

// ADMIN ONLY
router.get('/', authenticate, requireAdmin, getContactMessages)
router.patch('/:id', authenticate, requireAdmin, updateContactMessage)
router.delete('/:id', authenticate, requireAdmin, deleteContactMessage)

export default router
