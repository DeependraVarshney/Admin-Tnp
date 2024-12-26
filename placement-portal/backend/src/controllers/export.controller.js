// src/controllers/export.controller.js
import { ExportService } from '../utils/export.js';
import { Student } from '../models/student.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';

export const exportPlacementReport = async (req, res) => {
  try {
    const { format, academicYear } = req.query;

    // Fetch placement data
    const placementData = await Student.aggregate([
      {
        $match: {
          'placement.status': 'placed',
          'academicInfo.batch': academicYear
        }
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'placement.offers.company',
          foreignField: '_id',
          as: 'companyDetails'
        }
      },
      {
        $project: {
          name: 1,
          rollNo: 1,
          'academicInfo.branch': 1,
          'academicInfo.cgpa': 1,
          'placement.offers': 1,
          companyName: { $arrayElemAt: ['$companyDetails.name', 0] },
          package: { $arrayElemAt: ['$placement.offers.ctc', 0] }
        }
      }
    ]);

    const exportOptions = {
      sheetName: `Placement Report ${academicYear}`,
      title: `Placement Report - ${academicYear}`,
      headers: ['Roll No', 'Name', 'Branch', 'CGPA', 'Company', 'Package (LPA)'],
      columns: ['rollNo', 'name', 'academicInfo.branch', 'academicInfo.cgpa', 'companyName', 'package']
    };

    let exportedData;
    if (format === 'excel') {
      exportedData = await ExportService.exportToExcel(placementData, exportOptions);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=placement_report_${academicYear}.xlsx`);
    } else if (format === 'pdf') {
      exportedData = await ExportService.exportToPDF(placementData, exportOptions);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=placement_report_${academicYear}.pdf`);
    } else {
      res.status(400);
      throw new Error('Unsupported export format');
    }

    res.send(exportedData);
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};

export const exportCompanyReport = async (req, res) => {
  try {
    const { format } = req.query;

    const companyData = await Company.aggregate([
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
          type: 1,
          industry: 1,
          jobCount: { $size: '$jobs' },
          averagePackage: { $avg: '$jobs.salaryDetails.ctcRange.max' },
          status: 1
        }
      }
    ]);

    const exportOptions = {
      sheetName: 'Company Report',
      title: 'Company Statistics Report',
      headers: ['Company Name', 'Type', 'Industry', 'Jobs Posted', 'Avg Package (LPA)', 'Status'],
      columns: ['name', 'type', 'industry', 'jobCount', 'averagePackage', 'status']
    };

    let exportedData;
    if (format === 'excel') {
      exportedData = await ExportService.exportToExcel(companyData, exportOptions);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=company_report.xlsx');
    } else if (format === 'pdf') {
      exportedData = await ExportService.exportToPDF(companyData, exportOptions);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=company_report.pdf');
    } else {
      res.status(400);
      throw new Error('Unsupported export format');
    }

    res.send(exportedData);
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};