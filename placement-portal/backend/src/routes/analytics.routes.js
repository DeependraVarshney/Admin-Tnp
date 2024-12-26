// src/routes/analytics.routes.js
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  generatePlacementStats,
  updateAnalyticsDashboard,
} from '../controllers/analytics.controller.js';
import {
  generateCustomReport,
} from '../controllers/report.controller.js';

const router = express.Router();

// Placement Statistics Routes
router
  .route('/placement-stats/:academicYear')
  .get(protect, authorize('admin', 'tpo'), generatePlacementStats);

// Analytics Dashboard Routes
router
  .route('/dashboard')
  .get(protect, authorize('admin', 'tpo'), updateAnalyticsDashboard);

// Custom Reports Routes
router
  .route('/reports')
  .post(protect, authorize('admin', 'tpo'), generateCustomReport);

// Add more analytics routes as needed
router
  .route('/trends')
  .get(protect, getTrends);

router
  .route('/company-performance')
  .get(protect, getCompanyPerformance);

router
  .route('/branch-analysis')
  .get(protect, getBranchAnalysis);

export default router;