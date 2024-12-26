 // components/OfflineIndicator.js
 import { Snackbar, Alert } from '@mui/material';
 import { useOffline } from '../hooks/useOffline';
 
 export const OfflineIndicator = () => {
   const isOffline = useOffline();
 
   return (
     <Snackbar open={isOffline} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
       <Alert severity="warning">
         You are currently offline. Some features may be unavailable.
       </Alert>
     </Snackbar>
   );
 };