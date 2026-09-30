import Submission from '../models/Submission.js'
import Team from '../models/Team.js'
import Hackathon from '../models/Hackathon.js'
import { body, validationResult } from 'express-validator'

export const getSubmissions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit

    const filter = {}
    if (req.query.hackathon) filter.hackathon = req.query.hackathon
    if (req.query.team) filter.team = req.query.team

    const [submissions, total] = await Promise.all([
      Submission.find(filter)
        .populate('team', 'name leader projectName')
        .populate('hackathon', 'title slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Submission.countDocuments(filter)
    ])

    res.json({
      submissions,
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

export const getSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('team', 'name leader projectName members projectDescription githubUrl demoUrl')
      .populate('hackathon', 'title slug')
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }
    res.json(submission)
  } catch (error) {
    next(error)
  }
}

export const createSubmission = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { team, hackathon, title, description, githubUrl, demoUrl, presentationUrl } = req.body

    const teamDoc = await Team.findById(team)
    if (!teamDoc) {
      return res.status(404).json({ error: 'Team not found' })
    }

    const isLeader = teamDoc.leader.toString() === req.user._id.toString()
    if (!isLeader && req.role !== 'admin') {
      return res.status(403).json({ error: 'Only team leader can submit' })
    }

    const existing = await Submission.findOne({ team, hackathon })
    if (existing) {
      return res.status(400).json({ error: 'Submission already exists for this team' })
    }

    const submission = await Submission.create({
      team,
      hackathon,
      title,
      description,
      githubUrl,
      demoUrl,
      presentationUrl
    })

    teamDoc.status = 'submitted'
    teamDoc.submittedAt = new Date()
    teamDoc.projectName = title
    teamDoc.projectDescription = description
    if (githubUrl) teamDoc.githubUrl = githubUrl
    if (demoUrl) teamDoc.demoUrl = demoUrl
    if (presentationUrl) teamDoc.presentationUrl = presentationUrl
    await teamDoc.save()

    const populated = await Submission.findById(submission._id)
      .populate('team', 'name leader projectName')
      .populate('hackathon', 'title slug')

    res.status(201).json({ message: 'Submission created', submission: populated })
  } catch (error) {
    next(error)
  }
}

export const updateSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id)
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }

    const team = await Team.findById(submission.team)
    const isLeader = team && team.leader.toString() === req.user._id.toString()
    if (!isLeader && req.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' })
    }

    const { title, description, githubUrl, demoUrl, presentationUrl, averageScore, rank } = req.body

    if (title !== undefined) submission.title = title
    if (description !== undefined) submission.description = description
    if (githubUrl !== undefined) submission.githubUrl = githubUrl
    if (demoUrl !== undefined) submission.demoUrl = demoUrl
    if (presentationUrl !== undefined) submission.presentationUrl = presentationUrl
    if (averageScore !== undefined) submission.averageScore = averageScore
    if (rank !== undefined) submission.rank = rank

    const updated = await submission.save()
    const populated = await Submission.findById(updated._id)
      .populate('team', 'name leader projectName')
      .populate('hackathon', 'title slug')

    res.json({ message: 'Submission updated', submission: populated })
  } catch (error) {
    next(error)
  }
}

export const deleteSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id)
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }
    res.json({ message: 'Submission deleted' })
  } catch (error) {
    next(error)
  }
}

export const submissionValidation = [
  body('team').isMongoId().withMessage('Valid team ID is required'),
  body('hackathon').isMongoId().withMessage('Valid hackathon ID is required'),
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required (max 200 chars)'),
  body('description').trim().isLength({ min: 1, max: 5000 }).withMessage('Description is required (max 5000 chars)')
]