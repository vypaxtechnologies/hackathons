import mongoose from 'mongoose'

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Hackathon title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  status: {
    type: String,
    enum: ['upcoming', 'registration-open', 'registration-closed', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  theme: {
    type: String,
    trim: true,
    default: 'App & Web Development'
  },
  registrationDeadline: {
    type: Date,
    default: null
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  importantDates: [{
    title: { type: String, required: true },
    date: { type: Date, required: true },
    endDate: { type: Date, default: null },
    description: { type: String, default: '' }
  }],
  prizes: [{
    rank: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, default: '' }
  }],
  recognition: [{
    level: { type: String, required: true },
    teams: { type: Number, required: true },
    reward: { type: String, required: true }
  }],
  internshipOpportunity: {
    description: { type: String, default: '' },
    teamsEligible: { type: Number, default: 0 },
    candidatesSelected: { type: String, default: '' },
    isAssessmentBased: { type: Boolean, default: true },
    isGuaranteed: { type: Boolean, default: false }
  },
  registrationUrl: {
    type: String,
    default: ''
  },
  teamSizeMin: {
    type: Number,
    default: 2
  },
  teamSizeMax: {
    type: Number,
    default: 4
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  rules: [{
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  judges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Judge'
  }],
  bannerImage: {
    type: String,
    default: null
  },
  logoImage: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

hackathonSchema.pre('save', function(next) {
  // The slug is only derived when the document has none. It is part of the
  // published URL for an edition — the client links to /hackathons/<slug> and
  // the public API resolves by it — so regenerating it from a later title edit
  // would silently break every existing link to that edition.
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  next()
})

hackathonSchema.index({ status: 1, isPublished: 1 })

export default mongoose.model('Hackathon', hackathonSchema)
