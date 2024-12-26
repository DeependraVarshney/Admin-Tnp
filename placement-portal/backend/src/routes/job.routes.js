// src/routes/job.routes.js
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createJob,
  updateJob,
  getEligibleStudentsForJob,
} from '../controllers/job.controller.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('admin', 'tpo', 'company'), createJob);

router
  .route('/:id')
  .put(protect, updateJob)
  .get(protect, getEligibleStudentsForJob);

export default router;

