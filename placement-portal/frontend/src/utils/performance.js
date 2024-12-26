// utils/performance.js
export const performanceMonitor = {
    startTime: null,
  
    start() {
      this.startTime = performance.now();
    },
  
    end(label) {
      if (!this.startTime) return;
      const duration = performance.now() - this.startTime;
      console.log(`${label}: ${duration.toFixed(2)}ms`);
      this.startTime = null;
      
      // Send to analytics if duration is above threshold
      if (duration > 1000) {
        this.logPerformanceIssue(label, duration);
      }
    },
  
    logPerformanceIssue(label, duration) {
      // Send to analytics service
      analytics.logEvent('performance_issue', {
        label,
        duration,
        timestamp: new Date().toISOString()
      });
    }
  };
  
 