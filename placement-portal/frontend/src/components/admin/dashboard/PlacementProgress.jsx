// components/admin/dashboard/PlacementProgress.jsx
import {
    Card,
    CardContent,
    Typography,
    Box,
    LinearProgress,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
  } from '@mui/material';
  import {
    MoreVert,
    TrendingUp,
    TrendingDown,
    Info
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const PlacementProgress = () => {
    // In real app: useSelector for Redux state
    const [stats, setStats] = useState({
      totalStudents: 500,
      eligibleStudents: 480,
      registeredStudents: 450,
      placedStudents: 380,
      ongoingProcesses: 45,
      averagePackage: 12.5,
      targetAchievement: 85
    });
  
    const [branchWiseData, setBranchWiseData] = useState([
      {
        branch: 'Computer Science',
        total: 120,
        eligible: 118,
        placed: 100,
        averagePackage: 14.5,
        ongoingProcesses: 15
      },
      // Add more branches...
    ]);
  
    const ProgressSection = ({ title, value, total, color }) => (
      <Box mb={2}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">{title}</Typography>
          <Typography variant="body2">
            {value} / {total} ({Math.round((value/total) * 100)}%)
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={(value/total) * 100}
          color={color}
        />
      </Box>
    );
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Placement Progress</Typography>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
  
          <Grid container spacing={3}>
            {/* Overall Progress */}
            <Grid item xs={12} md={6}>
              <ProgressSection
                title="Registration Progress"
                value={stats.registeredStudents}
                total={stats.eligibleStudents}
                color="primary"
              />
              <ProgressSection
                title="Placement Progress"
                value={stats.placedStudents}
                total={stats.eligibleStudents}
                color="success"
              />
              <ProgressSection
                title="Target Achievement"
                value={stats.targetAchievement}
                total={100}
                color="secondary"
              />
  
              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Quick Stats
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box bgcolor="grey.100" p={2} borderRadius={1}>
                      <Typography variant="body2" color="textSecondary">
                        Average Package
                      </Typography>
                      <Typography variant="h6">
                        ₹{stats.averagePackage} LPA
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box bgcolor="grey.100" p={2} borderRadius={1}>
                      <Typography variant="body2" color="textSecondary">
                        Ongoing Processes
                      </Typography>
                      <Typography variant="h6">
                        {stats.ongoingProcesses}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
  
            {/* Branch-wise Progress */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Branch-wise Statistics
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Branch</TableCell>
                    <TableCell align="right">Placed</TableCell>
                    <TableCell align="right">Progress</TableCell>
                    <TableCell align="right">Avg. Package</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branchWiseData.map((branch) => (
                    <TableRow key={branch.branch}>
                      <TableCell>{branch.branch}</TableCell>
                      <TableCell align="right">
                        {branch.placed}/{branch.eligible}
                      </TableCell>
                      <TableCell align="right">
                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                          <LinearProgress
                            variant="determinate"
                            value={(branch.placed/branch.eligible) * 100}
                            sx={{ width: 60, mr: 1 }}
                          />
                          {Math.round((branch.placed/branch.eligible) * 100)}%
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                          {branch.averagePackage} LPA
                          {branch.averagePackage > stats.averagePackage ? (
                            <TrendingUp color="success" fontSize="small" sx={{ ml: 1 }} />
                          ) : (
                            <TrendingDown color="error" fontSize="small" sx={{ ml: 1 }} />
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
  
          {/* Insights Section */}
          <Box mt={3}>
            <Typography variant="subtitle2" gutterBottom>
              Key Insights
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box 
                  bgcolor="success.light" 
                  p={2} 
                  borderRadius={1}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Info color="success" />
                  <Typography variant="body2">
                    85% students placed above average package
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box 
                  bgcolor="warning.light" 
                  p={2} 
                  borderRadius={1}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Info color="warning" />
                  <Typography variant="body2">
                    30 students in final rounds of interviews
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box 
                  bgcolor="info.light" 
                  p={2} 
                  borderRadius={1}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Info color="info" />
                  <Typography variant="body2">
                    5 new companies scheduled for next week
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    );
  };