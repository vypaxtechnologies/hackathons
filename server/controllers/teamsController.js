import Team from '../models/Team.js'
import Hackathon from '../models/Hackathon.js'
import { body, validationResult } from 'express-validator'

export const getTeams = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit

    const filter = {}
    if (req.query.hackathon) filter.hackathon = req.query.hackathon
    if (req.query.status) filter.status = req.query.status

    const [teams, total] = await Promise.all([
      Team.find(filter)
        .populate('hackathon', 'title slug')
        .populate('leader', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Team.countDocuments(filter)
    ])

    res.json({
      teams,
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

export const getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('hackathon', 'title slug')
      .populate('leader', 'name email')
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(team)
  } catch (error) {
    next(error)
  }
}

export const createTeam = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { name, hackathon, members, projectName, projectDescription, githubUrl, demoUrl } = req.body

    const hackathonDoc = await Hackathon.findById(hackathon)
    if (!hackathonDoc) {
      return res.status(404).json({ error: 'Hackathon not found' })
    }

    const memberCount = (members ? members.length : 0) + 1
    if (memberCount < hackathonDoc.teamSizeMin || memberCount > hackathonDoc.teamSizeMax) {
      return res.status(400).json({
        error: `Team size must be between ${hackathonDoc.teamSizeMin} and ${hackathonDoc.teamSizeMax} members`
      })
    }

    const team = await Team.create({
      name,
      hackathon,
      leader: req.user._id,
      members: members || [],
      projectName,
      projectDescription,
      githubUrl,
      demoUrl
    })

    const populated = await Team.findById(team._id)
      .populate('hackathon', 'title slug')
      .populate('leader', 'name email')

    res.status(201).json({ message: 'Team created', team: populated })
  } catch (error) {
    next(error)
  }
}

export const updateTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }

    // Only leader or admin can update
    const isLeader = team.leader.toString() === req.user._id.toString()
    if (!isLeader && req.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' })
    }

    const { name, members, projectName, projectDescription, githubUrl, demoUrl, presentationUrl, status } = req.body

    if (name !== undefined) team.name = name
    if (members !== undefined) team.members = members
    if (projectName !== undefined) team.projectName = projectName
    if (projectDescription !== undefined) team.projectDescription = projectDescription
    if (githubUrl !== undefined) team.githubUrl = githubUrl
    if (demoUrl !== undefined) team.demoUrl = demoUrl
    if (presentationUrl !== undefined) team.presentationUrl = presentationUrl
    if (status !== undefined) {
      team.status = status
      if (status === 'submitted' && !team.submittedAt) {
        team.submittedAt = new Date()
      }
    }

    const updated = await team.save()
    const populated = await Team.findById(updated._id)
      .populate('hackathon', 'title slug')
      .populate('leader', 'name email')

    res.json({ message: 'Team updated', team: populated })
  } catch (error) {
    next(error)
  }
}

export const deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }

    const isLeader = team.leader.toString() === req.user._id.toString()
    if (!isLeader && req.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' })
    }

    await team.deleteOne()
    res.json({ message: 'Team deleted' })
  } catch (error) {
    next(error)
  }
}

export const getMyTeams = async (req, res, next) => {
  try {
    const teams = await Team.find({ leader: req.user._id })
      .populate('hackathon', 'title slug')
      .populate('leader', 'name email')
      .sort({ createdAt: -1 })
    res.json(teams)
  } catch (error) {
    next(error)
  }
}

export const teamValidation = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Team name is required (max 100 chars)'),
  body('hackathon').isMongoId().withMessage('Valid hackathon ID is required')
]