// components/student/StudentDashboard.jsx
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Divider
  } from '@mui/material';
  import {
    Work,
    School,
    Description,
    Timeline,
    Notifications,
    BusinessCenter
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const StudentDashboard = () => {
    const [stats, setStats] = useState({
      appliedJobs: 12,
      shortlisted: 5,
      interviews: 3,
      offers: 1
    });
  
    return (
      <Box>
        <Grid container spacing={3}>
          {/* Profile Summary */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{ width: 64, height: 64 }}>JS</Avatar>
                  <Box>
                    <Typography variant="h6">John Smith</Typography>
                    <Typography color="textSecondary">B.Tech - CSE</Typography>
                    <Chip 
                      label="8.5 CGPA" 
                      size="small" 
                      color="primary"
                      sx={{ mt: 0.5 }} 
                    />
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <School fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Academic Year" 
                      secondary="2023-24"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Work fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Placement Status" 
                      secondary="Eligible"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Application Stats */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Application Overview
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h4">{stats.appliedJobs}</Typography>
                      <Typography color="textSecondary">Applied</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h4">{stats.shortlisted}</Typography>
                      <Typography color="textSecondary">Shortlisted</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h4">{stats.interviews}</Typography>
                      <Typography color="textSecondary">Interviews</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h4">{stats.offers}</Typography>
                      <Typography color="textSecondary">Offers</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
 