// src/controllers/notification.controller.js
import { emailService } from './email.service.js';
import { EmailTemplate } from '../models/email-template.model.js';
import { NotificationService } from '../services/notification.service.js';
export const createEmailTemplate = async (req, res) => {
  try {
    const template = await EmailTemplate.create(req.body);
    res.status(201).json(template);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

export const sendNotification = async (req, res) => {
  try {
    const { templateName, recipient, variables, attachments } = req.body;
    const result = await emailService.sendEmail(templateName, recipient, variables, attachments);
    res.json(result);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

export const sendBulkNotifications = async (req, res) => {
  try {
    const { templateName, recipients, commonVariables } = req.body;
    const results = await emailService.sendBulkEmails(templateName, recipients, commonVariables);
    res.json(results);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

let notificationService;

export const initializeNotificationService = (server) => {
  notificationService = new NotificationService(server);
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getUserNotifications(
      req.user.id,
      req.query
    );
    res.json(notifications);
  } catch (error) {
    res.status(500);
    throw error;
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await notificationService.markNotificationAsRead(
      req.params.id,
      req.user.id
    );
    res.json(notification);
  } catch (error) {
    res.status(500);
    throw error;
  }
};

// Usage examples for different scenarios
export const notifyInterviewScheduled = async (interview) => {
  await notificationService.createNotification({
    recipients: [{ userId: interview.studentId }],
    title: 'Interview Scheduled',
    message: `Your interview has been scheduled for ${interview.scheduledAt}`,
    type: 'info',
    priority: 'high',
    category: 'interview',
    metadata: {
      entityId: interview._id,
      entityType: 'Interview',
      action: 'scheduled',
      url: `/interviews/${interview._id}`,
    },
  });
};

export const notifyApplicationStatusChange = async (application) => {
  await notificationService.createNotification({
    recipients: [{ userId: application.studentId }],
    title: 'Application Status Updated',
    message: `Your application status has been updated to ${application.status}`,
    type: 'info',
    category: 'application',
    metadata: {
      entityId: application._id,
      entityType: 'Application',
      action: 'status_update',
      url: `/applications/${application._id}`,
    },
  });
};