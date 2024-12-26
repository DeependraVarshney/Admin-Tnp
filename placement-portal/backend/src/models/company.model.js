// src/models/company.model.js
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  website: String,
  type: {
    type: String,
    enum: ['MNC', 'Startup', 'PSU'],
    required: true,
  },
  industry: String,
  size: String,
  description: String,
  contact: {
    name: String,
    designation: String,
    email: String,
    phone: String,
  },
  documents: [{
    type: String,
    name: String,
    url: String,
    uploadedAt: Date,
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  registrationStatus: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'inactive',
  },
  previousPlacements: {
    total: Number,
    years: [{
      year: String,
      count: Number,
      averagePackage: Number,
    }],
  },
}, {
  timestamps: true,
});

export const Company = mongoose.model('Company', companySchema);

