import Contact from '../models/Contact.js'
import { body, validationResult } from 'express-validator'
import { sendContactNotification } from '../services/emailService.js'

export const createContactMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { name, email, phone, subject, message } = req.body

    const contact = await Contact.create({ name, email, phone, subject, message })

    // Awaited so the outcome is logged — a swallowed rejection here is exactly
    // how a broken mail setup goes unnoticed. The message is already persisted
    // and `send` never throws, so a delivery failure cannot lose it.
    const notification = await sendContactNotification({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
      createdAt: contact.createdAt
    })

    if (notification.sent) {
      console.log(`[email] Contact notification sent for ${contact._id} (${notification.id})`)
    } else {
      console.error(
        `[email] Contact notification FAILED for ${contact._id}:`,
        notification.error?.message || notification.error
      )
    }

    res.status(201).json({
      message: 'Thanks for reaching out. The Vypax team will get back to you shortly.',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getContactMessages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 25
    const skip = (page - 1) * limit

    const filter = {}
    if (req.query.status) filter.status = req.query.status

    const [messages, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(filter)
    ])

    res.json({
      messages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    })
  } catch (error) {
    next(error)
  }
}

export const updateContactMessage = async (req, res, next) => {
  try {
    const { status } = req.body
    const allowedStatuses = ['new', 'in-review', 'resolved']

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' })
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!contact) {
      return res.status(404).json({ error: 'Message not found' })
    }

    res.json({ message: 'Message updated', contact })
  } catch (error) {
    next(error)
  }
}

export const deleteContactMessage = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      return res.status(404).json({ error: 'Message not found' })
    }
    res.json({ message: 'Message deleted' })
  } catch (error) {
    next(error)
  }
}

export const contactValidation = [
  body('name').trim().isLength({ min: 1, max: 80 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('A valid email is required'),
  // Required. Only digits, spaces and the usual separators, so the stored value
  // is always something a person can dial. The length and format rules chain
  // after the presence check so a blank field reports a single readable message.
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .bail()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters')
    .matches(/^[0-9+\s()\-]+$/)
    .withMessage('Please provide a valid phone number'),
  body('subject').optional().trim().isLength({ max: 140 }),
  body('message').trim().isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
]
