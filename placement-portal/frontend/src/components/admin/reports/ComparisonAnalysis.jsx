import {
    Card,
    CardContent,
    Typography,
    Grid,
    Paper,
    Box,
    Chip
  } from '@mui/material';
  import {
    ArrowUpward,
    ArrowDownward
  } from '@mui/icons-material';
  
  export const ComparisonAnalysis = ({ data }) => {
    const getPercentageChange = (current, previous) => {
      const change = ((current - previous) / previous) * 100;
      return change.toFixed(1);
    };
  
    const getChangeColor = (change) => {
      return change > 0 ? 'success' : 'error';
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Year-over-Year Comparison
          </Typography>
  
          <Grid container spacing={3}>
            {Object.entries(data.metrics).map(([key, value]) => (
              <Grid item xs={12} md={6} lg={3} key={key}>
                <Paper sx={{ p: 2 }}>
                  <Typography color="textSecondary" variant="body2" gutterBottom>
                    {key}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {value.current}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      icon={value.change > 0 ? <ArrowUpward /> : <ArrowDownward />}
                      label={`${Math.abs(value.change)}%`}
                      color={getChangeColor(value.change)}
                      size="small"
                    />
                    <Typography variant="body2" color="textSecondary">
                      vs previous year
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
  
          <Box mt={4}>
            <Typography variant="subtitle1" gutterBottom>
              Key Insights
            </Typography>
            <Grid container spacing={2}>
              {data.insights.map((insight, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body2">
                      {insight}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    );
  };