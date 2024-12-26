// utils/userTracking.js
class UserActivityTracker {
    constructor() {
      this.events = [];
      this.isTracking = false;
      this.maxEvents = 100;
      this.sessionStartTime = null;
    }
  
    startTracking() {
      if (this.isTracking) return;
      
      this.isTracking = true;
      this.sessionStartTime = Date.now();
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      // Track page navigation
      window.addEventListener('popstate', this.trackNavigation);
      
      // Track user clicks
      document.addEventListener('click', this.trackClick);
      
      // Track form submissions
      document.addEventListener('submit', this.trackFormSubmission);
      
      // Track user session duration
      window.addEventListener('beforeunload', this.endSession);
    }
  
    trackNavigation = (event) => {
      this.addEvent({
        type: 'navigation',
        path: window.location.pathname,
        timestamp: Date.now()
      });
    };
  
    trackClick = (event) => {
      const target = event.target.closest('button, a');
      if (!target) return;
  
      this.addEvent({
        type: 'click',
        elementType: target.tagName.toLowerCase(),
        elementId: target.id,
        elementText: target.textContent,
        timestamp: Date.now()
      });
    };
  
    trackFormSubmission = (event) => {
      this.addEvent({
        type: 'form_submission',
        formId: event.target.id,
        timestamp: Date.now()
      });
    };
  
    addEvent(event) {
      this.events.push(event);
      
      if (this.events.length > this.maxEvents) {
        this.flushEvents();
      }
    }
  
    flushEvents() {
      if (this.events.length === 0) return;
  
      analytics.logEvent('user_activity_batch', {
        events: this.events,
        sessionDuration: Date.now() - this.sessionStartTime
      });
  
      this.events = [];
    }
  
    endSession = () => {
      this.flushEvents();
      analytics.logEvent('session_end', {
        duration: Date.now() - this.sessionStartTime
      });
    };
  
    cleanup() {
      window.removeEventListener('popstate', this.trackNavigation);
      document.removeEventListener('click', this.trackClick);
      document.removeEventListener('submit', this.trackFormSubmission);
      window.removeEventListener('beforeunload', this.endSession);
    }
  }
  
  export const userTracker = new UserActivityTracker();
  
  