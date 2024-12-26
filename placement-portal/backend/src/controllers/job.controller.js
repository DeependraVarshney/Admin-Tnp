// src/controllers/job.controller.js
import { Job } from '../models/job.model.js';
import { Student } from '../models/student.model.js';

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      companyId: req.user.role === 'company' ? req.user.id : req.body.companyId,
    });

    // Create JNF workflow
    await createJNFWorkflow(job._id);

    res.status(201).json(job);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }

    // Check authorization
    if (req.user.role !== 'admin' && req.user.role !== 'tpo' && 
        job.companyId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Not authorized');
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Record changes in JNF workflow
    await recordJNFChanges(job._id, req.user.id, req.body);

    res.json(updatedJob);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

export const getEligibleStudentsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }

    const { eligibilityCriteria } = job;

    const eligibleStudents = await Student.find({
      'academicInfo.course': { $in: eligibilityCriteria.eligibleCourses },
      'academicInfo.branch': { $in: eligibilityCriteria.eligibleBranches },
      'academicInfo.cgpa': { $gte: eligibilityCriteria.minCGPA },
      'academicInfo.activeBacklogs': eligibilityCriteria.activeBacklogs ? 
        { $exists: true } : { $eq: 0 },
      isBlacklisted: false,
      status: 'active',
    }).select('name rollNo academicInfo');

    res.json(eligibleStudents);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

