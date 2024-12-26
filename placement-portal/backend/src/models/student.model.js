// src/models/student.model.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  personalInfo: {
    dateOfBirth: Date,
    gender: String,
    contact: String,
    email: String,
    address: String,
  },
  academicInfo: {
    course: String,
    branch: String,
    cgpa: Number,
    batch: String,
    activeBacklogs: Number,
    totalBacklogs: Number,
  },
  skills: {
    technical: [String],
    soft: [String],
    languages: [String],
  },
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    url: String,
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    url: String,
    duration: String,
  }],
  placement: {
    status: {
      type: String,
      enum: ['unplaced', 'placed', 'multiple_offers'],
      default: 'unplaced',
    },
    offers: [{
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
      },
      position: String,
      ctc: Number,
      offeredAt: Date,
    }],
  },
  isBlacklisted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active',
  },
}, {
  timestamps: true,
});

export const Student = mongoose.model('Student', studentSchema);

