// src/controllers/report.controller.js
import { CustomReport } from '../models/custom-report.model.js';
import { generatePDF, generateExcel, generateCSV } from '../utils/report-generator.js';

export const generateCustomReport = async (req, res) => {
  try {
    const { reportType, filters, format } = req.body;

    // Gather data based on report type and filters
    const data = await gatherReportData(reportType, filters);

    // Generate report in specified format
    let reportContent;
    switch (format) {
      case 'pdf':
        reportContent = await generatePDF(data, reportType);
        break;
      case 'excel':
        reportContent = await generateExcel(data, reportType);
        break;
      case 'csv':
        reportContent = await generateCSV(data, reportType);
        break;
      default:
        reportContent = data;
    }

    const report = await CustomReport.create({
      reportType,
      filters,
      data: reportContent,
      format,
      generatedBy: req.user.id,
      validTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Valid for 7 days
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

const gatherReportData = async (reportType, filters) => {
  switch (reportType) {
    case 'placement':
      return await gatherPlacementReportData(filters);
    case 'company':
      return await gatherCompanyReportData(filters);
    case 'student':
      return await gatherStudentReportData(filters);
    case 'trend':
      return await gatherTrendReportData(filters);
    default:
      return await gatherCustomReportData(filters);
  }
};