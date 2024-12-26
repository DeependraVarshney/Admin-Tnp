// src/utils/export.js
import ExcelJS from 'exceljs';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export class ExportService {
  static async exportToExcel(data, options) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(options.sheetName || 'Sheet1');

    // Add headers
    worksheet.addRow(options.headers);

    // Add data rows
    data.forEach(item => {
      const row = options.columns.map(col => item[col]);
      worksheet.addRow(row);
    });

    // Style the header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    // Auto-fit columns
    worksheet.columns.forEach(column => {
      column.width = Math.max(
        ...worksheet.getColumn(column.number).values.map(v => 
          v ? v.toString().length : 0
        )
      ) + 2;
    });

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  static async exportToPDF(data, options) {
    const doc = new jsPDF();

    // Add title
    if (options.title) {
      doc.setFontSize(16);
      doc.text(options.title, 14, 15);
      doc.setFontSize(10);
    }

    // Add timestamp
    const timestamp = new Date().toLocaleString();
    doc.setFontSize(8);
    doc.text(`Generated on: ${timestamp}`, 14, 25);

    // Add table
    doc.autoTable({
      head: [options.headers],
      body: data.map(item => options.columns.map(col => item[col])),
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [66, 66, 66] },
    });

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10
      );
    }

    return doc.output('blob');
  }
}

