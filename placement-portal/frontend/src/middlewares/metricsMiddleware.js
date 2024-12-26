  // 
  export const metricsMiddleware = store => next => action => {
    const startTime = performance.now();
    const result = next(action);
    const duration = performance.now() - startTime;
  
    if (action.type.endsWith('/pending')) {
      metricsCollector.trackApiCall(action.type, 0, true);
    }
    
    if (action.type.endsWith('/rejected')) {
      metricsCollector.trackApiCall(action.type, duration, false);
    }
  
    if (duration > 100) { // Log slow actions
      console.warn(`Slow action: ${action.type} took ${duration.toFixed(2)}ms`);
    }
  
    return result;
  };
  