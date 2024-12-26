// src/services/analytics.service.js
import { Student } from '../models/student.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import { Application } from '../models/application.model.js';
import { PlacementStats } from '../models/placement-stats.model.js';
import { generatePDF, generateExcel } from '../utils/reportGenerator.js';

class AnalyticsService {
    async generatePlacementStats(academicYear) {
        const stats = await PlacementStats.aggregate([
            { $match: { academicYear } },
            {
                $group: {
                    _id: null,
                    totalPlaced: { $sum: '$branchWise.placed' },
                    totalStudents: { $sum: '$branchWise.total' },
                    averagePackage: { $avg: '$packageWise.average' },
                    highestPackage: { $max: '$packageWise.highest' }
                }
            }
        ]);

        return stats[0];
    }

    async getDashboardStats() {
        const [placementStats, companyStats, branchStats] = await Promise.all([
            this.getOverallPlacementStats(),
            this.getCompanyStats(),
            this.getBranchWiseStats()
        ]);

        return {
            placementStats,
            companyStats,
            branchStats,
            lastUpdated: new Date()
        };
    }

    async getCompanyStats(startDate, endDate) {
        const matchQuery = {};
        if (startDate && endDate) {
            matchQuery.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        return await Company.aggregate([
            { $match: matchQuery },
            {
                $lookup: {
                    from: 'jobs',
                    localField: '_id',
                    foreignField: 'companyId',
                    as: 'jobs'
                }
            },
            {
                $project: {
                    name: 1,
                    industry: 1,
                    jobsPosted: { $size: '$jobs' },
                    activeJobs: {
                        $size: {
                            $filter: {
                                input: '$jobs',
                                as: 'job',
                                cond: { $eq: ['$$job.status', 'active'] }
                            }
                        }
                    }
                }
            }
        ]);
    }

    async getBranchWiseStats(academicYear) {
        return await Student.aggregate([
            {
                $match: {
                    'academicInfo.academicYear': academicYear
                }
            },
            {
                $group: {
                    _id: '$academicInfo.branch',
                    totalStudents: { $sum: 1 },
                    placedStudents: {
                        $sum: {
                            $cond: [{ $eq: ['$placement.status', 'placed'] }, 1, 0]
                        }
                    },
                    averagePackage: { $avg: '$placement.package' }
                }
            }
        ]);
    }

    async getTrendAnalysis(period, type) {
        const groupBy = period === 'monthly' ? 
            { $month: '$createdAt' } : 
            { $year: '$createdAt' };

        return await PlacementStats.aggregate([
            {
                $group: {
                    _id: groupBy,
                    placements: { $sum: '$branchWise.placed' },
                    averagePackage: { $avg: '$packageWise.average' }
                }
            },
            { $sort: { _id: -1 } },
            { $limit: period === 'monthly' ? 12 : 5 }
        ]);
    }

    async generateReportData(filters, type) {
        // Implement custom report generation logic based on filters and type
        switch (type) {
            case 'placement':
                return await this.generatePlacementReport(filters);
            case 'company':
                return await this.generateCompanyReport(filters);
            case 'student':
                return await this.generateStudentReport(filters);
            default:
                throw new Error('Invalid report type');
        }
    }

    async generateReportFile(report, format) {
        const data = report.data;
        
        if (format === 'pdf') {
            return await generatePDF(data);
        } else if (format === 'xlsx') {
            return await generateExcel(data);
        }
        
        throw new Error('Unsupported format');
    }
}

export const analyticsService = new AnalyticsService();