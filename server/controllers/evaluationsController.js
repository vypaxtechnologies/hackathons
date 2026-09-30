import Evaluation from '../models/Evaluation.js'
import Submission from '../models/Submission.js'
import Judge from '../models/Judge.js'
import { body, validationResult } from 'express-validator'

export const getEvaluations = async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.submission) filter.submission = req.query.submission
    if (req.query.judge) filter.judge = req.query.judge

    const evaluations = await Evaluation.find(filter)
      .populate('submission', 'title team hackathon')
      .populate('judge', 'name expertise')
      .sort({ createdAt: -1 })

    res.json(evaluations)
  } catch (error) {
    next(error)
  }
}

export const getEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
      .populate('submission')
      .populate('judge', 'name expertise')
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' })
    }
    res.json(evaluation)
  } catch (error) {
    next(error)
  }
}

export const createEvaluation = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { submission, innovationScore, technicalScore, designScore, impactScore, comments } = req.body

    const submissionDoc = await Submission.findById(submission)
    if (!submissionDoc) {
      return res.status(404).json({ error: 'Submission not found' })
    }

    const existing = await Evaluation.findOne({ submission, judge: req.user._id })
    if (existing) {
      return res.status(400).json({ error: 'You have already evaluated this submission' })
    }

    const overallScore = Math.round(
      (innovationScore * 0.3) +
      (technicalScore * 0.35) +
      (designScore * 0.2) +
      (impactScore * 0.15)
    )

    const evaluation = await Evaluation.create({
      submission,
      judge: req.user._id,
      innovationScore,
      technicalScore,
      designScore,
      impactScore,
      overallScore,
      comments
    })

    await updateSubmissionAverage(submission)

    const populated = await Evaluation.findById(evaluation._id)
      .populate('submission', 'title team hackathon')
      .populate('judge', 'name expertise')

    res.status(201).json({ message: 'Evaluation submitted', evaluation: populated })
  } catch (error) {
    next(error)
  }
}

export const updateEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' })
    }

    if (evaluation.judge.toString() !== req.user._id.toString() && req.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' })
    }

    const { innovationScore, technicalScore, designScore, impactScore, comments } = req.body

    if (innovationScore !== undefined) evaluation.innovationScore = innovationScore
    if (technicalScore !== undefined) evaluation.technicalScore = technicalScore
    if (designScore !== undefined) evaluation.designScore = designScore
    if (impactScore !== undefined) evaluation.impactScore = impactScore
    if (comments !== undefined) evaluation.comments = comments

    evaluation.overallScore = Math.round(
      (evaluation.innovationScore * 0.3) +
      (evaluation.technicalScore * 0.35) +
      (evaluation.designScore * 0.2) +
      (evaluation.impactScore * 0.15)
    )

    const updated = await evaluation.save()
    await updateSubmissionAverage(evaluation.submission)

    const populated = await Evaluation.findById(updated._id)
      .populate('submission', 'title team hackathon')
      .populate('judge', 'name expertise')

    res.json({ message: 'Evaluation updated', evaluation: populated })
  } catch (error) {
    next(error)
  }
}

export const deleteEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findByIdAndDelete(req.params.id)
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' })
    }
    await updateSubmissionAverage(evaluation.submission)
    res.json({ message: 'Evaluation deleted' })
  } catch (error) {
    next(error)
  }
}

const updateSubmissionAverage = async (submissionId) => {
  const result = await Evaluation.aggregate([
    { $match: { submission: submissionId } },
    { $group: { _id: null, avg: { $avg: '$overallScore' } } }
  ])
  const avg = result.length > 0 ? Math.round(result[0].avg) : 0
  await Submission.findByIdAndUpdate(submissionId, { averageScore: avg })
}

export const evaluationValidation = [
  body('submission').isMongoId().withMessage('Valid submission ID is required'),
  body('innovationScore').isInt({ min: 0, max: 100 }).withMessage('Innovation score must be 0-100'),
  body('technicalScore').isInt({ min: 0, max: 100 }).withMessage('Technical score must be 0-100'),
  body('designScore').isInt({ min: 0, max: 100 }).withMessage('Design score must be 0-100'),
  body('impactScore').isInt({ min: 0, max: 100 }).withMessage('Impact score must be 0-100')
]