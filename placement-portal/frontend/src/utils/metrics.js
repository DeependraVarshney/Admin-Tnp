// utils/metrics.js
class MetricsCollector {
    constructor() {
      this.metrics = {
        pageLoads: 0,
        apiCalls: 0,
        errors: 0,
        averageLoadTime: 0
      };
    }
  
    trackPageLoad(duration) {
      this.metrics.pageLoads++;
      this.metrics.averageLoadTime = (
        (this.metrics.averageLoadTime * (this.metrics.pageLoads - 1) + duration) /
        this.metrics.pageLoads
      );
  
      this.sendMetrics();
    }
  
    trackApiCall(endpoint, duration, success) {
      this.metrics.apiCalls++;
      if (!success) {
        this.metrics.errors++;
      }
  
      this.sendMetrics();
    }
  
    sendMetrics() {
      // Send metrics to backend or analytics service
      if (this.metrics.pageLoads % 10 === 0) { // Send every 10 page loads
        analytics.logEvent('metrics_update', this.metrics);
      }
    }
  
    reset() {
      this.metrics = {
        pageLoads: 0,
        apiCalls: 0,
        errors: 0,
        averageLoadTime: 0
      };
    }
  }
  
  export const metricsCollector = new MetricsCollector();
  
