// src/routes/student.routes.js
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createStudent,
  updateStudent,
  getStudentProfile,
  getEligibleStudents,
} from '../controllers/student.controller.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('admin', 'tpo'), createStudent)
  .get(protect, authorize('admin', 'tpo', 'company'), getEligibleStudents);

router
  .route('/:id')
  .get(protect, getStudentProfile)
  .put(protect, updateStudent);

export default router;