 // utils/offline.js
 export const checkOnlineStatus = () => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(true);
        return;
      }
  
      if (navigator.onLine) {
        resolve(true);
        return;
      }
  
      window.addEventListener('online', () => resolve(true), { once: true });
      window.addEventListener('offline', () => resolve(false), { once: true });
    });
  };
  
  export const setupOfflineDetection = (onOffline, onOnline) => {
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
  
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  };
  
 