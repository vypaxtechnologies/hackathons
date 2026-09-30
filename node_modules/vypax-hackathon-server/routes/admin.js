import express from 'express'
import authenticate, { requireAdmin } from '../middleware/auth.js'
import {
  getDashboardStats,
  getHackathonsAdmin,
  getTeamsAdmin,
  getSubmissionsAdmin,
  getJudgesAdmin,
  getResults,
  getRegistrations
} from '../controllers/adminController.js'

const router = express.Router()

router.use(authenticate, requireAdmin)

router.get('/dashboard', getDashboardStats)
router.get('/hackathons', getHackathonsAdmin)
router.get('/teams', getTeamsAdmin)
router.get('/submissions', getSubmissionsAdmin)
router.get('/judges', getJudgesAdmin)
router.get('/results', getResults)
router.get('/registrations', getRegistrations)

export default router