// src/controllers/application.controller.js
import { Application } from '../models/application.model.js';
import { Job } from '../models/job.model.js';
import { Student } from '../models/student.model.js';

export const submitApplication = async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;
    const studentId = req.user.role === 'student' ? req.user.id : req.body.studentId;

    // Check if student is eligible
    const job = await Job.findById(jobId);
    const student = await Student.findById(studentId);

    if (!job || !student) {
      res.status(404);
      throw new Error('Job or Student not found');
    }

    // Validate eligibility
    const isEligible = await validateEligibility(student, job.eligibilityCriteria);
    if (!isEligible) {
      res.status(400);
      throw new Error('Student does not meet eligibility criteria');
    }

    const application = await Application.create({
      jobId,
      studentId,
      resumeUrl,
      timeline: [{
        status: 'applied',
        date: new Date(),
        remarks: 'Application submitted',
        updatedBy: req.user.id,
      }],
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }

    application.status = status;
    application.timeline.push({
      status,
      date: new Date(),
      remarks,
      updatedBy: req.user.id,
    });

    if (status === 'shortlisted') {
      application.isShortlisted = true;
    }

    await application.save();
    res.json(application);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

