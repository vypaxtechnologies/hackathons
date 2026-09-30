import express from 'express'
import authenticate, { requireAdmin } from '../middleware/auth.js'
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  userValidation
} from '../controllers/usersController.js'

const router = express.Router()

router.get('/', authenticate, requireAdmin, getAllUsers)
router.get('/:id', authenticate, getUser)
router.put('/:id', authenticate, requireAdmin, userValidation, updateUser)
router.delete('/:id', authenticate, requireAdmin, deleteUser)

export default router