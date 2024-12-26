// src/utils/eligibility.util.js
export const validateEligibility = async (student, criteria) => {
    if (!student || !criteria) return false;
  
    const { academicInfo } = student;
    const {
      eligibleCourses,
      eligibleBranches,
      minCGPA,
      maxBacklogs,
      activeBacklogs,
    } = criteria;
  
    return (
      eligibleCourses.includes(academicInfo.course) &&
      eligibleBranches.includes(academicInfo.branch) &&
      academicInfo.cgpa >= minCGPA &&
      (!maxBacklogs || academicInfo.totalBacklogs <= maxBacklogs) &&
      (!activeBacklogs || academicInfo.activeBacklogs === 0)
    );
  };