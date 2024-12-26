import { Card, CardContent, Typography, Box } from '@mui/material';

export const StatusCard = ({ status, count, icon, color }) => {
  return (
    <Card sx={{ bgcolor: color }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" color="white">
              {status}
            </Typography>
            <Typography variant="h4" color="white">
              {count}
            </Typography>
          </Box>
          <Box color="white">
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};