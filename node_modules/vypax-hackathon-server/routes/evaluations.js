import express from 'express'
import authenticate, { authorize } from '../middleware/auth.js'
import {
  getEvaluations,
  getEvaluation,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
  evaluationValidation
} from '../controllers/evaluationsController.js'

const router = express.Router()

router.get('/', authenticate, getEvaluations)
router.get('/:id', authenticate, getEvaluation)
router.post('/', authenticate, authorize('judge', 'admin'), evaluationValidation, createEvaluation)
router.put('/:id', authenticate, updateEvaluation)
router.delete('/:id', authenticate, deleteEvaluation)

export default router