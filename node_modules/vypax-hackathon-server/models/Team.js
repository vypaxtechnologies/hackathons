import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: 'member' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { _id: false })

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team name is required'],
    trim: true,
    maxlength: [100, 'Team name cannot exceed 100 characters']
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [memberSchema],
  projectName: {
    type: String,
    trim: true,
    default: ''
  },
  projectDescription: {
    type: String,
    trim: true,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
  demoUrl: {
    type: String,
    default: ''
  },
  presentationUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['registered', 'submitted', 'evaluated', 'shortlisted', 'winner'],
    default: 'registered'
  },
  submittedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

teamSchema.index({ hackathon: 1, name: 1 }, { unique: true })

export default mongoose.model('Team', teamSchema)