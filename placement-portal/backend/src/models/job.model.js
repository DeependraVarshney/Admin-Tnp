// src/models/job.model.js
import mongoose from 'mongoose';

const jnfDetailsSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: true,
  },
  skillsRequired: [String],
  workMode: {
    type: String,
    enum: ['onsite', 'remote', 'hybrid'],
    required: true,
  },
  projectDuration: String,
  internshipProvided: {
    type: Boolean,
    default: false,
  },
  internshipDuration: String,
  internshipStipend: Number,
});

const selectionProcessSchema = new mongoose.Schema({
  resumeShortlisting: {
    type: Boolean,
    default: true,
  },
  prePlacementTalk: Boolean,
  aptitudeTest: Boolean,
  technicalTest: Boolean,
  groupDiscussion: Boolean,
  interviews: {
    technical: {
      required: Boolean,
      rounds: Number,
    },
    hr: {
      required: Boolean,
      rounds: Number,
    },
  },
  otherRounds: String,
  totalRounds: Number,
  selectionMode: {
    type: String,
    enum: ['online', 'offline', 'hybrid'],
    required: true,
  },
  accommodationRequired: Boolean,
});

const eligibilityCriteriaSchema = new mongoose.Schema({
  eligibleCourses: [String],
  eligibleBranches: [String],
  minCGPA: {
    type: Number,
    required: true,
  },
  maxBacklogs: Number,
  activeBacklogs: {
    type: Boolean,
    default: false,
  },
  marksCriteria: String,
});

const salaryDetailsSchema = new mongoose.Schema({
  ctcRange: {
    min: Number,
    max: Number,
  },
  ctcBreakup: {
    basic: Number,
    hra: Number,
    others: Number,
  },
  basePay: Number,
  variablePay: Number,
  allowances: {
    type: Map,
    of: Number,
  },
  bonuses: {
    type: Map,
    of: Number,
  },
  internshipStipend: {
    amount: Number,
    frequency: String,
  },
  trainingPeriod: {
    duration: String,
    stipend: Number,
  },
});

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String,
    enum: ['technical', 'non-technical', 'research', 'management'],
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['fulltime', 'internship', 'internship+fte'],
    required: true,
  },
  totalPositions: {
    type: Number,
    required: true,
  },
  tentativeJoiningDate: Date,
  bondRequired: {
    type: Boolean,
    default: false,
  },
  bondDetails: String,
  jobLocation: [String],
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'active', 'closed', 'cancelled'],
    default: 'draft',
  },
  jnfDetails: jnfDetailsSchema,
  selectionProcess: selectionProcessSchema,
  eligibilityCriteria: eligibilityCriteriaSchema,
  salaryDetails: salaryDetailsSchema,
}, {
  timestamps: true,
});

export const Job = mongoose.model('Job', jobSchema);

