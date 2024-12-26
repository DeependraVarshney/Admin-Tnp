// src/controllers/dashboard.controller.js
import { DashboardConfig } from '../models/dashboard.model.js';
import { Job } from '../models/job.model.js';
import { Application } from '../models/application.model.js';
import { Student } from '../models/student.model.js';
import { Company } from '../models/company.model.js';
import { Interview } from '../models/interview.model.js';

export const getTPODashboard = async (req, res) => {
  try {
    const currentAcademicYear = getCurrentAcademicYear();

    // Placement Statistics
    const placementStats = await getPlacementStats(currentAcademicYear);
    
    // Upcoming Events
    const upcomingEvents = await getUpcomingEvents();
    
    // Pending Actions
    const pendingActions = await getTPOPendingActions();
    
    // Company Visits
    const companyVisits = await getUpcomingCompanyVisits();

    res.json({
      placementStats,
      upcomingEvents,
      pendingActions,
      companyVisits,
      lastUpdated: new Date(),
    });
  } catch (error) {
    res.status(500);
    throw error;
  }
};

export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    // Active Applications
    const applications = await Application.find({ 
      studentId,
      status: { $nin: ['rejected', 'withdrawn'] }
    }).populate('jobId');
    
    // Upcoming Interviews
    const interviews = await Interview.find({
      applicationId: { $in: applications.map(app => app._id) },
      status: 'scheduled'
    });
    
    // Eligible Jobs
    const eligibleJobs = await getEligibleJobs(studentId);
    
    // Placement Status
    const placementStatus = await getStudentPlacementStatus(studentId);

    res.json({
      applications,
      interviews,
      eligibleJobs,
      placementStatus,
      lastUpdated: new Date(),
    });
  } catch (error) {
    res.status(500);
    throw error;
  }
};

export const getCompanyDashboard = async (req, res) => {
  try {
    const companyId = req.user.id;
    
    // Active Jobs
    const activeJobs = await Job.find({ 
      companyId,
      status: { $in: ['active', 'in_progress'] }
    });
    
    // Application Statistics
    const applicationStats = await getApplicationStats(companyId);
    
    // Upcoming Interviews
    const interviews = await getCompanyInterviews(companyId);
    
    // Selected Candidates
    const selectedCandidates = await getSelectedCandidates(companyId);

    res.json({
      activeJobs,
      applicationStats,
      interviews,
      selectedCandidates,
      lastUpdated: new Date(),
    });
  } catch (error) {
    res.status(500);
    throw error;
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    // System Overview
    const systemStats = await getSystemStats();
    
    // User Analytics
    const userAnalytics = await getUserAnalytics();
    
    // Critical Alerts
    const criticalAlerts = await getCriticalAlerts();
    
    // System Health
    const systemHealth = await getSystemHealth();

    res.json({
      systemStats,
      userAnalytics,
      criticalAlerts,
      systemHealth,
      lastUpdated: new Date(),
    });
  } catch (error) {
    res.status(500);
    throw error;
  }
};