import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [80, 'Name cannot exceed 80 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  // Required: a phone number is now compulsory so every enquiry can be followed
  // up by call, not just email. Digits, spaces and the usual separators are
  // accepted; anything else is rejected so the value stays dialable.
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters'],
    // Unescaped parens and dash, matching the validation rule. This is a plain
    // RegExp literal, so unlike the browser-side `pattern` attribute there is no
    // `v` flag requirement to escape them.
    match: [/^[0-9+\s()-]+$/, 'Please provide a valid phone number']
  },
  subject: {
    type: String,
    trim: true,
    default: 'General enquiry',
    maxlength: [140, 'Subject cannot exceed 140 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'in-review', 'resolved'],
    default: 'new'
  }
}, {
  timestamps: true
})

contactSchema.index({ createdAt: -1 })

export default mongoose.model('Contact', contactSchema)
