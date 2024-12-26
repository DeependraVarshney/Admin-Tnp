// src/controllers/analytics.controller.js
import { PlacementStats } from '../models/placement-stats.model.js';
import { AnalyticsDashboard } from '../models/analytics-dashboard.model.js';
import { Application } from '../models/application.model.js';
import { Student } from '../models/student.model.js';
import { Company } from '../models/company.model.js';

export const generatePlacementStats = async (req, res) => {
  try {
    const { academicYear } = req.params;

    // Get all placed students for the academic year
    const placedStudents = await Student.find({
      'academicInfo.batch': academicYear,
      'placement.status': 'placed',
    }).populate('placement.offers.company');

    // Calculate branch-wise statistics
    const branchWise = await calculateBranchWiseStats(academicYear, placedStudents);

    // Calculate company-wise statistics
    const companyWise = await calculateCompanyWiseStats(academicYear);

    // Calculate package-wise distribution
    const packageWise = calculatePackageDistribution(placedStudents);

    // Calculate trends
    const trends = await calculatePlacementTrends(academicYear);

    const stats = await PlacementStats.create({
      academicYear,
      branchWise,
      companyWise,
      packageWise,
      trends,
    });

    res.status(201).json(stats);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

export const updateAnalyticsDashboard = async (req, res) => {
  try {
    const dashboard = await AnalyticsDashboard.findOne() || new AnalyticsDashboard();

    // Update placement statistics
    const placementStats = await calculateOverallPlacementStats();
    dashboard.placementStats = placementStats;

    // Update company statistics
    const companyStats = await calculateCompanyStats();
    dashboard.companyStats = companyStats;

    // Update branch statistics
    const branchStats = await calculateBranchStats();
    dashboard.branchStats = branchStats;

    // Update trend analysis
    const trendAnalysis = await calculateTrendAnalysis();
    dashboard.trendAnalysis = trendAnalysis;

    dashboard.lastUpdated = new Date();
    await dashboard.save();

    res.json(dashboard);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

// Utility functions for statistics calculation
const calculateBranchWiseStats = async (academicYear, placedStudents) => {
  const branches = [...new Set(placedStudents.map(s => s.academicInfo.branch))];
  
  return Promise.all(branches.map(async branch => {
    const branchStudents = placedStudents.filter(s => s.academicInfo.branch === branch);
    const totalStudents = await Student.countDocuments({
      'academicInfo.batch': academicYear,
      'academicInfo.branch': branch,
    });

    return {
      branch,
      totalStudents,
      eligibleStudents: await calculateEligibleStudents(academicYear, branch),
      placedStudents: branchStudents.length,
      averagePackage: calculateAveragePackage(branchStudents),
      highestPackage: calculateHighestPackage(branchStudents),
      multipleOffers: countMultipleOffers(branchStudents),
      companies: await calculateCompanyBreakdown(branchStudents),
    };
  }));
};

const calculateCompanyWiseStats = async (academicYear) => {
  const companies = await Company.find({
    'previousPlacements.years.year': academicYear,
  });

  return Promise.all(companies.map(async company => {
    const placements = await Application.find({
      companyId: company._id,
      status: 'selected',
      'createdAt': {
        $gte: new Date(academicYear),
        $lt: new Date(parseInt(academicYear) + 1, 0),
      },
    }).populate('studentId');

    return {
      companyId: company._id,
      totalPositions: company.previousPlacements.years.find(y => y.year === academicYear)?.count || 0,
      positionsFilled: placements.length,
      averagePackage: calculateAveragePackageForCompany(placements),
      offerAcceptanceRate: calculateOfferAcceptanceRate(placements),
      departments: calculateDepartmentBreakdown(placements),
    };
  }));
};
