// src/models/notification.model.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipients: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
  }],
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['info', 'success', 'warning', 'error'],
    default: 'info',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  category: {
    type: String,
    enum: ['application', 'interview', 'placement', 'system', 'announcement'],
    required: true,
  },
  metadata: {
    entityId: mongoose.Schema.Types.ObjectId,
    entityType: String,
    action: String,
    url: String,
  },
  expiresAt: Date,
}, {
  timestamps: true,
});

export const Notification = mongoose.model('Notification', notificationSchema);

