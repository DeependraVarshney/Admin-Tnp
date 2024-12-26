 // utils/analytics.js
 class Analytics {
    constructor() {
      this.initialized = false;
      this.queue = [];
    }
  
    init(config) {
      // Initialize analytics service (e.g., Google Analytics)
      try {
        // Analytics initialization code
        this.initialized = true;
        this.processQueue();
      } catch (error) {
        console.error('Analytics initialization failed:', error);
      }
    }
  
    logEvent(eventName, params = {}) {
      if (!this.initialized) {
        this.queue.push({ type: 'event', eventName, params });
        return;
      }
  
      try {
        // Log to analytics service
        console.log('Analytics Event:', eventName, params);
      } catch (error) {
        console.error('Failed to log event:', error);
      }
    }
  
    logPageView(page) {
      this.logEvent('page_view', { page });
    }
  
    logError(error, context = {}) {
      this.logEvent('error', {
        message: error.message,
        stack: error.stack,
        ...context
      });
    }
  
    processQueue() {
      while (this.queue.length > 0) {
        const item = this.queue.shift();
        if (item.type === 'event') {
          this.logEvent(item.eventName, item.params);
        }
      }
    }
  }
  
  export const analytics = new Analytics();
  
  