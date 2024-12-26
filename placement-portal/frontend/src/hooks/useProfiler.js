 // hooks/useProfiler.js
 import { useEffect } from 'react';
 import { profiler } from '../utils/profiler';
 
 export const useProfiler = (componentName) => {
   useEffect(() => {
     profiler.startProfiling(`${componentName}-mount`);
     
     return () => {
       profiler.endProfiling(`${componentName}-mount`);
     };
   }, [componentName]);
 
   return {
     startProfiling: (label) => profiler.startProfiling(`${componentName}-${label}`),
     endProfiling: (label) => profiler.endProfiling(`${componentName}-${label}`)
   };
 };
 
 