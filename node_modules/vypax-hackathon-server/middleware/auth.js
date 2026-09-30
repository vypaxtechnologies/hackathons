import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Judge from '../models/Judge.js'

export const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role === 'judge') {
      const judge = await Judge.findById(decoded.id).select('-password')
      if (!judge) {
        return res.status(401).json({ error: 'Judge not found' })
      }
      req.user = judge
      req.role = 'judge'
    } else {
      const user = await User.findById(decoded.id).select('-password')
      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }
      req.user = user
      req.role = user.role
    }

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ error: 'Access denied' })
    }
    next()
  }
}

export const requireAdmin = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}

export default authenticate