// src/routes/jnf-workflow.routes.js
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  updateJNFStatus,
  getJNFWorkflow,
} from '../controllers/jnf-workflow.controller.js';

const router = express.Router();

router
  .route('/:jobId')
  .get(protect, getJNFWorkflow)
  .put(protect, authorize('admin', 'tpo'), updateJNFStatus);

export default router;