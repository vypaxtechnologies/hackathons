import User from '../models/User.js'
import Hackathon from '../models/Hackathon.js'
import Team from '../models/Team.js'
import Submission from '../models/Submission.js'
import Judge from '../models/Judge.js'
import Evaluation from '../models/Evaluation.js'

export const getDashboardStats = async (req, res, next) => {
  try {
    const [users, hackathons, teams, submissions, judges, evaluations] = await Promise.all([
      User.countDocuments(),
      Hackathon.countDocuments(),
      Team.countDocuments(),
      Submission.countDocuments(),
      Judge.countDocuments(),
      Evaluation.countDocuments()
    ])

    const recentTeams = await Team.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('hackathon', 'title')
      .populate('leader', 'name email')

    const recentSubmissions = await Submission.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('team', 'name')
      .populate('hackathon', 'title')

    res.json({
      stats: { users, hackathons, teams, submissions, judges, evaluations },
      recentTeams,
      recentSubmissions
    })
  } catch (error) {
    next(error)
  }
}

export const getHackathonsAdmin = async (req, res, next) => {
  try {
    const hackathons = await Hackathon.find().sort({ createdAt: -1 })
    res.json(hackathons)
  } catch (error) {
    next(error)
  }
}

export const getTeamsAdmin = async (req, res, next) => {
  try {
    const teams = await Team.find()
      .populate('hackathon', 'title slug')
      .populate('leader', 'name email')
      .sort({ createdAt: -1 })
    res.json(teams)
  } catch (error) {
    next(error)
  }
}

export const getSubmissionsAdmin = async (req, res, next) => {
  try {
    const submissions = await Submission.find()
      .populate('team', 'name leader projectName')
      .populate('hackathon', 'title slug')
      .sort({ createdAt: -1 })
    res.json(submissions)
  } catch (error) {
    next(error)
  }
}

export const getJudgesAdmin = async (req, res, next) => {
  try {
    const judges = await Judge.find().sort({ name: 1 })
    res.json(judges)
  } catch (error) {
    next(error)
  }
}

export const getResults = async (req, res, next) => {
  try {
    const hackathonId = req.query.hackathon
    const filter = hackathonId ? { hackathon: hackathonId } : {}

    const submissions = await Submission.find(filter)
      .populate('team', 'name leader projectName members')
      .populate('hackathon', 'title slug')
      .sort({ averageScore: -1 })

    const ranked = submissions.map((s, index) => ({
      ...s.toObject(),
      rank: index + 1
    }))

    res.json(ranked)
  } catch (error) {
    next(error)
  }
}

export const getRegistrations = async (req, res, next) => {
  try {
    const hackathonId = req.query.hackathon
    const filter = hackathonId ? { hackathon: hackathonId } : {}

    const teams = await Team.find(filter)
      .populate('hackathon', 'title slug')
      .populate('leader', 'name email phone')
      .sort({ createdAt: -1 })

    res.json(teams)
  } catch (error) {
    next(error)
  }
}