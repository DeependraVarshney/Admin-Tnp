//utils/debug.js
  class DebugManager {
    constructor() {
      this.isDebugMode = process.env.NODE_ENV === 'development';
      this.logs = [];
      this.maxLogs = 1000;
    }
  
    log(message, data = {}, level = 'info') {
      const logEntry = {
        timestamp: new Date().toISOString(),
        message,
        data,
        level,
        stack: new Error().stack
      };
  
      this.logs.push(logEntry);
  
      if (this.logs.length > this.maxLogs) {
        this.logs.shift();
      }
  
      if (this.isDebugMode) {
        console.log(`[${level.toUpperCase()}] ${message}`, data);
      }
    }
  
    error(message, error) {
      this.log(message, { error: error.message, stack: error.stack }, 'error');
      
      if (this.isDebugMode) {
        console.error(message, error);
      }
    }
  
    warn(message, data) {
      this.log(message, data, 'warn');
    }
  
    downloadLogs() {
      const blob = new Blob([JSON.stringify(this.logs, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `debug-logs-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  
    clearLogs() {
      this.logs = [];
    }
  }
  
  export const debugManager = new DebugManager();
  
  