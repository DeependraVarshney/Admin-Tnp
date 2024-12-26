// src/controllers/jnf-workflow.controller.js
import { JNFWorkflow } from '../models/jnf-workflow.model.js';
import { Job } from '../models/job.model.js';

export const createJNFWorkflow = async (jobId) => {
  try {
    const workflow = await JNFWorkflow.create({
      jobId,
      requiredApprovals: [
        { role: 'tpo', status: 'pending' },
        { role: 'admin', status: 'pending' },
      ],
    });
    return workflow;
  } catch (error) {
    throw error;
  }
};

export const updateJNFStatus = async (req, res) => {
  try {
    const { status, comments } = req.body;
    const workflow = await JNFWorkflow.findOne({ jobId: req.params.jobId });

    if (!workflow) {
      res.status(404);
      throw new Error('JNF Workflow not found');
    }

    // Update approval status
    const approval = workflow.requiredApprovals.find(
      (a) => a.role === req.user.role && a.status === 'pending'
    );

    if (!approval) {
      res.status(400);
      throw new Error('No pending approval found for your role');
    }

    approval.status = status;
    approval.approvedBy = req.user.id;
    approval.approvedAt = new Date();
    approval.comments = comments;

    // Update workflow status
    workflow.statusFlow.push({
      status,
      updatedBy: req.user.id,
      updatedAt: new Date(),
      comments,
    });

    // Check if all approvals are complete
    const allApproved = workflow.requiredApprovals.every(
      (a) => a.status === 'approved'
    );

    if (allApproved) {
      workflow.currentStatus = 'approved';
      workflow.isComplete = true;

      // Update job status
      await Job.findByIdAndUpdate(req.params.jobId, { status: 'active' });
    } else if (status === 'rejected') {
      workflow.currentStatus = 'rejected';
      workflow.isComplete = true;

      // Update job status
      await Job.findByIdAndUpdate(req.params.jobId, { status: 'cancelled' });
    }

    await workflow.save();
    res.json(workflow);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

export const getJNFWorkflow = async (req, res) => {
  try {
    const workflow = await JNFWorkflow.findOne({ jobId: req.params.jobId })
      .populate('statusFlow.updatedBy', 'name email')
      .populate('requiredApprovals.approvedBy', 'name email');

    if (!workflow) {
      res.status(404);
      throw new Error('JNF Workflow not found');
    }

    res.json(workflow);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

