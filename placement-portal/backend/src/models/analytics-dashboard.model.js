// models/analytics-dashboard.model.js
const mongoose = require('mongoose');

const analyticsDashboardSchema = new mongoose.Schema({
    placementStats: {
        totalPlaced: Number,
        totalStudents: Number,
        placementPercentage: Number,
        averagePackage: Number,
        highestPackage: Number
    },
    companyStats: {
        totalCompanies: Number,
        activeCompanies: Number,
        newCompanies: Number,
        industryWise: Map
    },
    branchStats: [{
        branch: String,
        totalStudents: Number,
        placedStudents: Number,
        averagePackage: Number,
        placementPercentage: Number
    }],
    trendAnalysis: {
        monthly: [{
            month: String,
            placements: Number,
            companies: Number,
            averagePackage: Number
        }],
        yearly: [{
            year: String,
            totalPlacements: Number,
            placementPercentage: Number,
            averagePackage: Number
        }]
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AnalyticsDashboard', analyticsDashboardSchema);