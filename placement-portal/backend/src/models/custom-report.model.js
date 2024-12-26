
const customReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['placement', 'company', 'student', 'process', 'custom'],
    required: true,
  },
  filters: {
    dateRange: {
      start: Date,
      end: Date,
    },
    branches: [String],
    companies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    }],
    packageRange: {
      min: Number,
      max: Number,
    },
    customFilters: Map,
  },
  data: mongoose.Schema.Types.Mixed,
  format: {
    type: String,
    enum: ['pdf', 'excel', 'csv', 'json'],
    default: 'pdf',
  },
  schedule: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'quarterly'],
    },
    lastRun: Date,
    nextRun: Date,
  },
  recipients: [{
    email: String,
    role: String,
  }],
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export const CustomReport = mongoose.model('CustomReport', customReportSchema);

