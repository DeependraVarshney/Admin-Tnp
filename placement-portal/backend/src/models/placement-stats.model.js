// src/models/placement-stats.model.js
import mongoose from 'mongoose';

const placementStatsSchema = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true,
  },
  branchWise: [{
    branch: String,
    totalStudents: Number,
    eligible: Number,
    placed: Number,
    averagePackage: Number,
    highestPackage: Number,
    multiplePlacements: Number,
  }],
  companyWise: [{
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    totalHires: Number,
    averagePackage: Number,
    roles: [{
      title: String,
      count: Number,
      package: Number,
    }],
  }],
  packageWise: {
    lessThan5: Number,
    fiveToTen: Number,
    tenToFifteen: Number,
    fifteenToTwenty: Number,
    aboveTwenty: Number,
    averagePackage: Number,
    medianPackage: Number,
  },
  trends: {
    monthWise: [{
      month: String,
      placements: Number,
      companies: Number,
      averagePackage: Number,
    }],
    yearOverYear: [{
      year: String,
      totalPlacements: Number,
      averagePackage: Number,
      companies: Number,
    }],
  },
}, {
  timestamps: true,
});

export const PlacementStats = mongoose.model('PlacementStats', placementStatsSchema);

