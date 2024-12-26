// src/models/interview.model.js
const interviewSchema = new mongoose.Schema({
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    roundType: {
      type: String,
      enum: ['technical', 'hr', 'group_discussion', 'aptitude', 'other'],
      required: true,
    },
    roundNumber: {
      type: Number,
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      default: 45,
    },
    venue: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ['online', 'offline'],
      required: true,
    },
    meetingLink: String,
    panelMembers: [{
      name: String,
      email: String,
      designation: String,
      company: String,
    }],
    feedback: {
      technical: {
        knowledge: Number,
        problemSolving: Number,
        implementation: Number,
      },
      communication: {
        clarity: Number,
        confidence: Number,
        articulation: Number,
      },
      behavioral: {
        attitude: Number,
        enthusiasm: Number,
        teamwork: Number,
      },
      overallRating: Number,
      strengths: [String],
      improvements: [String],
      comments: String,
      recommendation: {
        type: String,
        enum: ['strong_hire', 'hire', 'maybe', 'reject', 'strong_reject'],
      },
    },
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed', 'cancelled', 'rescheduled'],
      default: 'scheduled',
    },
    attendanceStatus: {
      student: {
        type: String,
        enum: ['pending', 'present', 'absent', 'late'],
        default: 'pending',
      },
      panel: {
        type: String,
        enum: ['pending', 'present', 'absent', 'late'],
        default: 'pending',
      },
    },
  }, {
    timestamps: true,
  });
  
  export const Interview = mongoose.model('Interview', interviewSchema);
  
  