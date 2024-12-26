// src/routes/application.routes.js
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  submitApplication,
  updateApplicationStatus,
} from '../controllers/application.controller.js';

const router = express.Router();

router
  .route('/')
  .post(protect, submitApplication);

router
  .route('/:id')
  .put(protect, authorize('admin', 'tpo', 'company'), updateApplicationStatus);

export default router;

