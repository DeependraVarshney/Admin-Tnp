// src/controllers/student.controller.js
import { Student } from '../models/student.model.js';
import { User } from '../models/user.model.js';

export const createStudent = async (req, res) => {
  try {
    const { email, password, rollNo, name, ...studentData } = req.body;

    // Create user account
    const user = await User.create({
      email,
      password,
      role: 'student',
      status: 'active',
    });

    // Create student profile
    const student = await Student.create({
      userId: user._id,
      rollNo,
      name,
      ...studentData,
    });

    res.status(201).json({ student });
  } catch (error) {
    res.status(400);
    throw error;
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    // Check authorization
    if (req.user.role !== 'admin' && req.user.role !== 'tpo' && 
        student.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Not authorized');
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', '-password')
      .populate('placement.offers.company');

    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    res.json(student);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

export const getEligibleStudents = async (req, res) => {
  const { cgpa, branch, backlogs } = req.query;

  try {
    const query = {
      isBlacklisted: false,
      status: 'active',
    };

    if (cgpa) query['academicInfo.cgpa'] = { $gte: parseFloat(cgpa) };
    if (branch) query['academicInfo.branch'] = branch;
    if (backlogs) query['academicInfo.activeBacklogs'] = { $lte: parseInt(backlogs) };

    const students = await Student.find(query)
      .select('name rollNo academicInfo placement')
      .populate('userId', 'email');

    res.json(students);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

