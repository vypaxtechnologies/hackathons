import express from 'express'
import authenticate, { requireAdmin } from '../middleware/auth.js'
import {
  getHackathons,
  getHackathonBySlug,
  getHackathonById,
  createHackathon,
  updateHackathon,
  deleteHackathon,
  togglePublish,
  hackathonValidation
} from '../controllers/hackathonsController.js'

const router = express.Router()

// Public routes
router.get('/', getHackathons)
router.get('/slug/:slug', getHackathonBySlug)
router.get('/:id', getHackathonById)

// Admin routes
router.post('/', authenticate, requireAdmin, hackathonValidation, createHackathon)
router.put('/:id', authenticate, requireAdmin, hackathonValidation, updateHackathon)
router.delete('/:id', authenticate, requireAdmin, deleteHackathon)
router.patch('/:id/toggle-publish', authenticate, requireAdmin, togglePublish)

export default router