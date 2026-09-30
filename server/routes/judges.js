import express from 'express'
import authenticate, { requireAdmin } from '../middleware/auth.js'
import {
  getJudges,
  getAllJudges,
  getJudge,
  createJudge,
  updateJudge,
  deleteJudge,
  judgeValidation
} from '../controllers/judgesController.js'

const router = express.Router()

router.get('/', authenticate, getJudges)
router.get('/all', authenticate, requireAdmin, getAllJudges)
router.get('/:id', authenticate, getJudge)
router.post('/', authenticate, requireAdmin, judgeValidation, createJudge)
router.put('/:id', authenticate, requireAdmin, updateJudge)
router.delete('/:id', authenticate, requireAdmin, deleteJudge)

export default router