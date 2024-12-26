// src/controllers/interview.controller.js
import { Interview } from '../models/interview.model.js';
import { Application } from '../models/application.model.js';

export const scheduleInterview = async (req, res) => {
  try {
    const {
      applicationId,
      roundType,
      roundNumber,
      scheduledAt,
      venue,
      mode,
      panelMembers,
      duration,
    } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }

    const interview = await Interview.create({
      applicationId,
      roundType,
      roundNumber,
      scheduledAt,
      venue,
      mode,
      panelMembers,
      duration,
    });

    // Update application status
    application.status = 'interview_scheduled';
    application.timeline.push({
      status: 'interview_scheduled',
      date: new Date(),
      remarks: `${roundType} interview scheduled for ${scheduledAt}`,
      updatedBy: req.user.id,
    });
    await application.save();

    // TODO: Send notifications to student and panel members

    res.status(201).json(interview);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

export const submitInterviewFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      res.status(404);
      throw new Error('Interview not found');
    }

    interview.feedback = feedback;
    interview.status = 'completed';
    await interview.save();

    // Update application status based on interview feedback
    const application = await Application.findById(interview.applicationId);
    if (feedback.recommendation === 'strong_reject' || feedback.recommendation === 'reject') {
      application.status = 'rejected';
    } else if (feedback.recommendation === 'strong_hire' || feedback.recommendation === 'hire') {
      application.status = 'selected';
    } else {
      application.status = 'in_process';
    }

    application.timeline.push({
      status: application.status,
      date: new Date(),
      remarks: `Interview round ${interview.roundNumber} completed`,
      updatedBy: req.user.id,
    });

    await application.save();
    res.json(interview);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};