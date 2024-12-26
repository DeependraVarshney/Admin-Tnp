// src/models/document.model.js
import mongoose from 'mongoose';

const documentVersionSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  changes: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const documentSchema = new mongoose.Schema({
  documentType: {
    type: String,
    enum: [
      'resume',
      'offer_letter',
      'company_profile',
      'jnf',
      'policy',
      'agreement',
      'certificate',
      'other'
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: String,
  tags: [String],
  isTemplate: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'archived'],
    default: 'draft',
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accessControl: {
    visibility: {
      type: String,
      enum: ['private', 'internal', 'public'],
      default: 'private',
    },
    allowedRoles: [{
      type: String,
      enum: ['admin', 'tpo', 'company', 'student'],
    }],
    allowedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  versions: [documentVersionSchema],
  currentVersion: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const Document = mongoose.model('Document', documentSchema);

