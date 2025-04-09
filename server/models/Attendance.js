const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date
  },
  status: {
    type: String,
    enum: ['present', 'late', 'absent', 'on-leave'],
    default: 'present'
  },
  lateMinutes: {
    type: Number,
    default: 0
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Add geospatial index for location queries
AttendanceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Attendance', AttendanceSchema);
