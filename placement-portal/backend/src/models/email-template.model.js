// src/models/email-template.model.js
import mongoose from 'mongoose';

const emailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  variables: [{
    name: String,
    description: String,
  }],
  purpose: {
    type: String,
    enum: [
      'job_posting',
      'interview_schedule',
      'application_status',
      'offer_letter',
      'account_verification',
      'password_reset',
      'announcement',
      'reminder',
    ],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);

