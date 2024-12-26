// src/routes/interview.routes.js
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  scheduleInterview,
  submitInterviewFeedback,
} from '../controllers/interview.controller.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('admin', 'tpo', 'company'), scheduleInterview);

router
  .route('/:id/feedback')
  .post(protect, authorize('admin', 'tpo', 'company'), submitInterviewFeedback);

export default router;

