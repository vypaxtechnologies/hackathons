import Hackathon from '../models/Hackathon.js'
import { body, validationResult } from 'express-validator'

export const getHackathons = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12
    const skip = (page - 1) * limit

    const filter = {}
    if (req.query.status) filter.status = req.query.status
    if (req.query.theme) filter.theme = new RegExp(req.query.theme, 'i')
    if (req.query.year) {
      const year = parseInt(req.query.year)
      filter.$or = [
        { startDate: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) } },
        { registrationDeadline: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) } }
      ]
    }
    if (req.query.published !== 'false') filter.isPublished = true

    const [hackathons, total] = await Promise.all([
      Hackathon.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Hackathon.countDocuments(filter)
    ])

    res.json({
      hackathons,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getHackathonBySlug = async (req, res, next) => {
  try {
    const hackathon = await Hackathon.findOne({ slug: req.params.slug })
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' })
    }
    res.json(hackathon)
  } catch (error) {
    next(error)
  }
}

export const getHackathonById = async (req, res, next) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' })
    }
    res.json(hackathon)
  } catch (error) {
    next(error)
  }
}

export const createHackathon = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const hackathon = await Hackathon.create(req.body)
    res.status(201).json({ message: 'Hackathon created', hackathon })
  } catch (error) {
    next(error)
  }
}

export const updateHackathon = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const hackathon = await Hackathon.findById(req.params.id)
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' })
    }

    Object.assign(hackathon, req.body)
    const updated = await hackathon.save()
    res.json({ message: 'Hackathon updated', hackathon: updated })
  } catch (error) {
    next(error)
  }
}

export const deleteHackathon = async (req, res, next) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id)
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' })
    }
    res.json({ message: 'Hackathon deleted' })
  } catch (error) {
    next(error)
  }
}

export const togglePublish = async (req, res, next) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' })
    }
    hackathon.isPublished = !hackathon.isPublished
    await hackathon.save()
    res.json({ message: `Hackathon ${hackathon.isPublished ? 'published' : 'unpublished'}`, hackathon })
  } catch (error) {
    next(error)
  }
}

export const hackathonValidation = [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required (max 100 chars)'),
  body('description').trim().isLength({ min: 1, max: 5000 }).withMessage('Description is required (max 5000 chars)'),
  body('theme').optional().trim(),
  body('status').optional().isIn(['upcoming', 'registration-open', 'registration-closed', 'ongoing', 'completed'])
]