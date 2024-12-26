 // utils/analyticsEnhanced.js
 class EnhancedAnalytics {
    constructor() {
      this.sessionId = this.generateSessionId();
      this.userProperties = {};
      this.eventQueue = [];
      this.isProcessing = false;
    }
  
    generateSessionId() {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
  
    setUserProperties(properties) {
      this.userProperties = {
        ...this.userProperties,
        ...properties
      };
    }
  
    async trackEvent(eventName, properties = {}) {
      const event = {
        eventName,
        properties: {
          ...properties,
          sessionId: this.sessionId,
          timestamp: new Date().toISOString(),
          userProperties: this.userProperties,
          path: window.location.pathname,
          referrer: document.referrer
        }
      };
  
      this.eventQueue.push(event);
      await this.processQueue();
    }
  
    async processQueue() {
      if (this.isProcessing || this.eventQueue.length === 0) return;
  
      this.isProcessing = true;
      const batch = this.eventQueue.splice(0, 10);
  
      try {
        await this.sendEvents(batch);
      } catch (error) {
        console.error('Failed to send analytics events:', error);
        // Put events back in queue
        this.eventQueue.unshift(...batch);
      } finally {
        this.isProcessing = false;
        if (this.eventQueue.length > 0) {
          setTimeout(() => this.processQueue(), 1000);
        }
      }
    }
  
    async sendEvents(events) {
      // Implement API call to your analytics backend
      console.log('Sending analytics events:', events);
    }
  
    trackPageView(properties = {}) {
      const pageViewProperties = {
        title: document.title,
        url: window.location.href,
        ...properties
      };
  
      this.trackEvent('page_view', pageViewProperties);
    }
  
    trackError(error, context = {}) {
      const errorProperties = {
        message: error.message,
        stack: error.stack,
        ...context
      };
  
      this.trackEvent('error', errorProperties);
    }
  
    trackUserAction(action, context = {}) {
      const actionProperties = {
        action,
        ...context
      };
  
      this.trackEvent('user_action', actionProperties);
    }
  
    trackPerformance(metrics) {
      this.trackEvent('performance', metrics);
    }
  }
  
  export const enhancedAnalytics = new EnhancedAnalytics();
  
 