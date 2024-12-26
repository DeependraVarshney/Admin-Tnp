// src/models/application.model.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      'applied',
      'under_review',
      'shortlisted',
      'interview_scheduled',
      'in_process',
      'selected',
      'rejected',
      'withdrawn'
    ],
    default: 'applied',
  },
  timeline: [{
    status: String,
    date: Date,
    remarks: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  scores: {
    aptitude: Number,
    technical: Number,
    interview: Number,
    groupDiscussion: Number,
  },
  isShortlisted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Ensure one student can apply only once for a job
applicationSchema.index({ jobId: 1, studentId: 1 }, { unique: true });

export const Application = mongoose.model('Application', applicationSchema);

