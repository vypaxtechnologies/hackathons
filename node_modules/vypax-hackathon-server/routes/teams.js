import express from 'express'
import authenticate from '../middleware/auth.js'
import {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  getMyTeams,
  teamValidation
} from '../controllers/teamsController.js'

const router = express.Router()

router.get('/', authenticate, getTeams)
router.get('/my', authenticate, getMyTeams)
router.get('/:id', authenticate, getTeam)
router.post('/', authenticate, teamValidation, createTeam)
router.put('/:id', authenticate, updateTeam)
router.delete('/:id', authenticate, deleteTeam)

export default router