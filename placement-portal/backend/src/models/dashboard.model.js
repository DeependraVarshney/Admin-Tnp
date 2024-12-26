// src/models/dashboard.model.js
import mongoose from 'mongoose';

const dashboardConfigSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'tpo', 'company', 'student'],
    required: true,
  },
  layout: [{
    widgetId: String,
    position: {
      x: Number,
      y: Number,
      width: Number,
      height: Number,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  }],
  preferences: {
    theme: {
      type: String,
      default: 'light',
    },
    notifications: {
      email: Boolean,
      push: Boolean,
      sms: Boolean,
    },
    refreshInterval: {
      type: Number,
      default: 300, // 5 minutes in seconds
    },
  },
}, {
  timestamps: true,
});

export const DashboardConfig = mongoose.model('DashboardConfig', dashboardConfigSchema);

