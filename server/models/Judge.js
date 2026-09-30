import mongoose from 'mongoose'

const judgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Judge name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  expertise: {
    type: String,
    trim: true,
    default: ''
  },
  bio: {
    type: String,
    trim: true,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    default: 'judge'
  }
}, {
  timestamps: true
})

export default mongoose.model('Judge', judgeSchema)