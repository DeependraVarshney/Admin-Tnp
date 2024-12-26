// components/PerformanceMonitor.js
import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { profiler } from '../utils/profiler';

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const updateMetrics = () => {
      const report = profiler.generateReport();
      setMetrics(report.summary);
    };

    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  return (
    <Box p={2}>
      <Typography variant="h6">Performance Metrics</Typography>
      <Box mt={2}>
        <Typography variant="body2">
          Average Operation Duration: {metrics.averageDuration.toFixed(2)}ms
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={(metrics.averageDuration / 100) * 100} 
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};