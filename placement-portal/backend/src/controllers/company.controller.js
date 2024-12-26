// src/controllers/company.controller.js
import { Company } from '../models/company.model.js';
import { User } from '../models/user.model.js';

export const registerCompany = async (req, res) => {
  try {
    const { email, password, name, ...companyData } = req.body;

    // Create user account
    const user = await User.create({
      email,
      password,
      role: 'company',
      status: 'active',
    });

    // Create company profile
    const company = await Company.create({
      userId: user._id,
      name,
      ...companyData,
    });

    res.status(201).json({ company });
  } catch (error) {
    res.status(400);
    throw error;
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    // Check authorization
    if (req.user.role !== 'admin' && req.user.role !== 'tpo' && 
        company.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Not authorized');
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedCompany);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

export const verifyCompany = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const company = await Company.findById(req.params.id);
    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    company.verificationStatus = status;
    if (status === 'verified') {
      company.registrationStatus = 'active';
    }

    await company.save();

    // TODO: Send notification to company

    res.json(company);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

export const getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('userId', '-password');

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    res.json(company);
  } catch (error) {
    res.status(res.statusCode || 400);
    throw error;
  }
};

