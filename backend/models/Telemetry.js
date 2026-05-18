import mongoose from 'mongoose'

const telemetrySchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: [true, 'Event type is required']
  },
  eventData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  userAgent: {
    type: String,
    default: 'Unknown'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Telemetry', telemetrySchema)
