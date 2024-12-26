 // hooks/useOffline.js
 import { useState, useEffect } from 'react';
 import { setupOfflineDetection } from '../utils/offline';
 
 export const useOffline = () => {
   const [isOffline, setIsOffline] = useState(!navigator.onLine);
 
   useEffect(() => {
     const cleanup = setupOfflineDetection(
       () => setIsOffline(true),
       () => setIsOffline(false)
     );
 
     return cleanup;
   }, []);
 
   return isOffline;
 };
 
