import express from 'express'
import {
  register,
  login,
  judgeLogin,
  logout,
  getMe,
  updateProfile,
  registerValidation,
  loginValidation
} from '../controllers/authController.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.post('/judge/login', loginValidation, judgeLogin)
router.post('/logout', logout)
router.get('/me', authenticate, getMe)
router.put('/profile', authenticate, updateProfile)

export default router