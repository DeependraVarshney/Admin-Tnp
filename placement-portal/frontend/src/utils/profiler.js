// utils/profiler.js
class PerformanceProfiler {
    constructor() {
      this.profiles = new Map();
      this.marks = new Map();
      this.measures = [];
      this.isRecording = false;
    }
  
    startProfiling(label) {
      if (!this.isRecording) {
        this.isRecording = true;
        performance.mark('profile-start');
      }
  
      const startTime = performance.now();
      this.profiles.set(label, { startTime, counts: 0 });
      performance.mark(`${label}-start`);
    }
  
    endProfiling(label) {
      const profile = this.profiles.get(label);
      if (!profile) return;
  
      const endTime = performance.now();
      const duration = endTime - profile.startTime;
      profile.counts++;
      profile.duration = duration;
  
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
  
      this.measures.push({
        label,
        duration,
        timestamp: new Date().toISOString()
      });
  
      // Report if duration exceeds threshold
      if (duration > 100) {
        debugManager.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`);
      }
    }
  
    getProfile(label) {
      return this.profiles.get(label);
    }
  
    getAllProfiles() {
      return Array.from(this.profiles.entries()).map(([label, data]) => ({
        label,
        ...data
      }));
    }
  
    clearProfiles() {
      this.profiles.clear();
      this.measures = [];
      performance.clearMarks();
      performance.clearMeasures();
    }
  
    generateReport() {
      return {
        profiles: this.getAllProfiles(),
        measures: this.measures,
        summary: this.generateSummary()
      };
    }
  
    generateSummary() {
      const summary = {
        totalOperations: this.measures.length,
        totalDuration: 0,
        averageDuration: 0,
        slowestOperation: null,
        fastestOperation: null
      };
  
      if (this.measures.length > 0) {
        summary.totalDuration = this.measures.reduce((acc, m) => acc + m.duration, 0);
        summary.averageDuration = summary.totalDuration / this.measures.length;
        summary.slowestOperation = [...this.measures].sort((a, b) => b.duration - a.duration)[0];
        summary.fastestOperation = [...this.measures].sort((a, b) => a.duration - b.duration)[0];
      }
  
      return summary;
    }
  }
  
  export const profiler = new PerformanceProfiler();
  
 