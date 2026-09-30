import Judge from '../models/Judge.js'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'

export const getJudges = async (req, res, next) => {
  try {
    const judges = await Judge.find({ isActive: true }).sort({ name: 1 })
    res.json(judges)
  } catch (error) {
    next(error)
  }
}

export const getAllJudges = async (req, res, next) => {
  try {
    const judges = await Judge.find().sort({ name: 1 })
    res.json(judges)
  } catch (error) {
    next(error)
  }
}

export const getJudge = async (req, res, next) => {
  try {
    const judge = await Judge.findById(req.params.id)
    if (!judge) {
      return res.status(404).json({ error: 'Judge not found' })
    }
    res.json(judge)
  } catch (error) {
    next(error)
  }
}

export const createJudge = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { name, email, password, expertise, bio } = req.body

    const existing = await Judge.findOne({ email })
    if (existing) {
      return res.status(400).json({ error: 'Judge already exists with this email' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const judge = await Judge.create({
      name,
      email,
      password: hashedPassword,
      expertise,
      bio
    })

    res.status(201).json({
      message: 'Judge created',
      judge: { _id: judge._id, name: judge.name, email: judge.email, expertise: judge.expertise }
    })
  } catch (error) {
    next(error)
  }
}

export const updateJudge = async (req, res, next) => {
  try {
    const judge = await Judge.findById(req.params.id)
    if (!judge) {
      return res.status(404).json({ error: 'Judge not found' })
    }

    const { name, email, expertise, bio, isActive, password } = req.body

    if (name !== undefined) judge.name = name
    if (email !== undefined) judge.email = email
    if (expertise !== undefined) judge.expertise = expertise
    if (bio !== undefined) judge.bio = bio
    if (isActive !== undefined) judge.isActive = isActive
    if (password !== undefined && password.length >= 6) {
      judge.password = await bcrypt.hash(password, 12)
    }

    const updated = await judge.save()
    res.json({
      message: 'Judge updated',
      judge: { _id: updated._id, name: updated.name, email: updated.email, expertise: updated.expertise }
    })
  } catch (error) {
    next(error)
  }
}

export const deleteJudge = async (req, res, next) => {
  try {
    const judge = await Judge.findByIdAndDelete(req.params.id)
    if (!judge) {
      return res.status(404).json({ error: 'Judge not found' })
    }
    res.json({ message: 'Judge deleted' })
  } catch (error) {
    next(error)
  }
}

export const judgeValidation = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]