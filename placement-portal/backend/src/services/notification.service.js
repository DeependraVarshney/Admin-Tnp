// src/services/notification.service.js
import { Server } from 'socket.io';
import { Notification } from '../models/notification.model.js';
import { verifyToken } from '../utils/auth.util.js';

export class NotificationService {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
      },
    });

    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const decoded = await verifyToken(token);
        socket.user = decoded;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    this.setupSocketConnections();
  }

  setupSocketConnections() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.user.id}`);
      
      // Join user-specific room
      socket.join(`user:${socket.user.id}`);
      
      // Join role-specific room
      socket.join(`role:${socket.user.role}`);
      
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.user.id}`);
      });
      
      socket.on('markAsRead', async (notificationId) => {
        await this.markNotificationAsRead(notificationId, socket.user.id);
      });
    });
  }

  async createNotification(data) {
    try {
      const notification = await Notification.create(data);
      
      // Emit to specific users
      data.recipients.forEach(recipient => {
        this.io.to(`user:${recipient.userId}`).emit('notification', notification);
      });
      
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async markNotificationAsRead(notificationId, userId) {
    try {
      const notification = await Notification.findOneAndUpdate(
        {
          _id: notificationId,
          'recipients.userId': userId,
        },
        {
          $set: {
            'recipients.$.read': true,
            'recipients.$.readAt': new Date(),
          },
        },
        { new: true }
      );
      
      return notification;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async getUserNotifications(userId, query = {}) {
    try {
      const { page = 1, limit = 10, unreadOnly = false } = query;
      
      const filter = {
        'recipients.userId': userId,
      };
      
      if (unreadOnly) {
        filter['recipients.read'] = false;
      }
      
      const notifications = await Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }
}

