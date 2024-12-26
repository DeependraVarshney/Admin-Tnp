import { Grid } from '@mui/material';
import { StatusCard } from '../../common/ui/Card/StatusCard';

export const CompanyStats = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatusCard
          title="Active JNFs"
          value={stats.activeJnfs}
          color="#1976d2"
        />
      </Grid>
      {/* Add more stat cards */}
    </Grid>
  );
};