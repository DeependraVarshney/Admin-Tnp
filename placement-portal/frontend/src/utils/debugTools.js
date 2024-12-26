

// utils/debugTools.js
class DebugTools {
  constructor() {
    this.debugMode = process.env.NODE_ENV === 'development';
    this.breakpoints = new Set();
    this.watchers = new Map();
    this.history = [];
    this.maxHistory = 1000;
  }

  setBreakpoint(condition, callback) {
    const breakpointId = Date.now().toString();
    this.breakpoints.add({
      id: breakpointId,
      condition,
      callback
    });
    return breakpointId;
  }

  removeBreakpoint(id) {
    this.breakpoints.delete(id);
  }

  watch(expression, callback) {
    const watcherId = Date.now().toString();
    this.watchers.set(watcherId, {
      expression,
      callback,
      lastValue: undefined
    });
    return watcherId;
  }

  unwatch(id) {
    this.watchers.delete(id);
  }

  log(type, message, data = {}) {
    const logEntry = {
      type,
      message,
      data,
      timestamp: new Date().toISOString(),
      stack: new Error().stack
    };

    this.history.push(logEntry);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    if (this.debugMode) {
      console.log(`[${type}] ${message}`, data);
    }

    // Check breakpoints
    this.breakpoints.forEach(breakpoint => {
      if (breakpoint.condition(logEntry)) {
        breakpoint.callback(logEntry);
      }
    });

    // Check watchers
    this.watchers.forEach((watcher, id) => {
      const newValue = watcher.expression(logEntry);
      if (newValue !== watcher.lastValue) {
        watcher.callback(newValue, watcher.lastValue);
        watcher.lastValue = newValue;
      }
    });
  }

  getHistory(filter = {}) {
    return this.history.filter(entry => {
      for (const [key, value] of Object.entries(filter)) {
        if (entry[key] !== value) return false;
      }
      return true;
    });
  }

  clearHistory() {
    this.history = [];
  }

  exportLogs() {
    const blob = new Blob([JSON.stringify(this.history, null, 2)], {
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
}

export const debugTools = new DebugTools();

