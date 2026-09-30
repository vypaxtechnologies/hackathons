export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({ error: `${field} already exists` })
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ error: messages.join(', ') })
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' })
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' })
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
}

export const notFound = (req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` })
}

export default errorHandler