import express from 'express'
import authenticate from '../middleware/auth.js'
import {
  getSubmissions,
  getSubmission,
  createSubmission,
  updateSubmission,
  deleteSubmission,
  submissionValidation
} from '../controllers/submissionsController.js'

const router = express.Router()

router.get('/', authenticate, getSubmissions)
router.get('/:id', authenticate, getSubmission)
router.post('/', authenticate, submissionValidation, createSubmission)
router.put('/:id', authenticate, updateSubmission)
router.delete('/:id', authenticate, deleteSubmission)

export default router