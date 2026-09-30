import mongoose from 'mongoose'

const evaluationSchema = new mongoose.Schema({
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Judge',
    required: true
  },
  innovationScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  technicalScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  designScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  impactScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  comments: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
})

evaluationSchema.index({ submission: 1, judge: 1 }, { unique: true })

export default mongoose.model('Evaluation', evaluationSchema)