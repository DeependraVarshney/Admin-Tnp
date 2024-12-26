// src/routes/company.routes.js
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  registerCompany,
  updateCompany,
  verifyCompany,
  getCompanyProfile,
} from '../controllers/company.controller.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('admin', 'tpo'), registerCompany);

router
  .route('/:id')
  .get(protect, getCompanyProfile)
  .put(protect, updateCompany);

router
  .route('/:id/verify')
  .put(protect, authorize('admin', 'tpo'), verifyCompany);

export default router;