// hooks/useDebug.js
import { useEffect } from 'react';
import { debugManager } from '../utils/debug';

export const useDebug = (componentName) => {
  useEffect(() => {
    debugManager.log(`${componentName} mounted`);
    
    return () => {
      debugManager.log(`${componentName} unmounted`);
    };
  }, [componentName]);

  return {
    log: (message, data) => debugManager.log(`[${componentName}] ${message}`, data),
    error: (message, error) => debugManager.error(`[${componentName}] ${message}`, error),
    warn: (message, data) => debugManager.warn(`[${componentName}] ${message}`, data)
  };
};

