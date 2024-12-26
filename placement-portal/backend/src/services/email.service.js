// src/services/email.service.js
import nodemailer from 'nodemailer';
import { EmailTemplate } from '../models/email-template.model.js';
import { EmailLog } from '../models/email-log.model.js';
import Handlebars from 'handlebars';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(templateName, recipient, variables, attachments = []) {
    try {
      // Get template
      const template = await EmailTemplate.findOne({ name: templateName, isActive: true });
      if (!template) {
        throw new Error('Email template not found');
      }

      // Compile template with Handlebars
      const compiledSubject = Handlebars.compile(template.subject);
      const compiledContent = Handlebars.compile(template.content);

      const emailData = {
        to: recipient,
        subject: compiledSubject(variables),
        html: compiledContent(variables),
        attachments,
      };

      // Send email
      const info = await this.transporter.sendMail(emailData);

      // Log email
      await EmailLog.create({
        templateId: template._id,
        recipient,
        subject: emailData.subject,
        content: emailData.content,
        status: 'sent',
        messageId: info.messageId,
      });

      return info;
    } catch (error) {
      // Log failed email
      await EmailLog.create({
        templateId: template?._id,
        recipient,
        subject: template?.subject,
        status: 'failed',
        error: error.message,
      });
      throw error;
    }
  }

  async sendBulkEmails(templateName, recipients, commonVariables = {}) {
    const results = [];
    for (const recipient of recipients) {
      try {
        const variables = { ...commonVariables, ...recipient.variables };
        const info = await this.sendEmail(templateName, recipient.email, variables);
        results.push({ email: recipient.email, status: 'success', messageId: info.messageId });
      } catch (error) {
        results.push({ email: recipient.email, status: 'failed', error: error.message });
      }
    }
    return results;
  }
}

export const emailService = new EmailService();

