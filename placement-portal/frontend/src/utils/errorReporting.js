// utils/errorReporting.js
class ErrorReporter {
    constructor() {
      this.errors = [];
      this.maxErrors = 50;
      this.initialized = false;
    }
  
    init(config) {
      window.addEventListener('error', this.handleError);
      window.addEventListener('unhandledrejection', this.handlePromiseError);
      this.initialized = true;
    }
  
    handleError = (event) => {
      this.reportError({
        type: 'runtime',
        message: event.message,
        stack: event.error?.stack,
        source: event.filename,
        line: event.lineno,
        column: event.colno
      });
    };
  
    handlePromiseError = (event) => {
      this.reportError({
        type: 'promise',
        message: event.reason?.message || 'Promise rejection',
        stack: event.reason?.stack
      });
    };
  
    reportError(error) {
      this.errors.push({
        ...error,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
  
      if (this.errors.length > this.maxErrors) {
        this.errors.shift();
      }
  
      // Send to analytics
      analytics.logError(error);
  
      // Log to debug
      debugManager.error(error.message, error);
    }
  
    cleanup() {
      window.removeEventListener('error', this.handleError);
      window.removeEventListener('unhandledrejection', this.handlePromiseError);
    }
  }
  
  export const errorReporter = new ErrorReporter();