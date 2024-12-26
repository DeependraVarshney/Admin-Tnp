// src/models/jnf-workflow.model.js
const jnfWorkflowSchema = new mongoose.Schema({
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    currentStatus: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'],
      default: 'draft',
    },
    statusFlow: [{
      status: String,
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      updatedAt: Date,
      comments: String,
    }],
    requiredApprovals: [{
      role: String,
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
      },
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      approvedAt: Date,
      comments: String,
    }],
    isComplete: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: true,
  });
  
  export const JNFWorkflow = mongoose.model('JNFWorkflow', jnfWorkflowSchema);