import {
    Card,
    CardContent,
    Grid,
    Typography,
    Box,
    Tabs,
    Tab,
    Button,
    Avatar,
    Divider
  } from '@mui/material';
  import { Edit, Download } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const StudentDetailsView = ({ student, onEdit }) => {
    const [currentTab, setCurrentTab] = useState(0);
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="start" mb={3}>
            <Box display="flex" gap={2}>
              <Avatar
                src={student.photo}
                sx={{ width: 100, height: 100 }}
              />
              <Box>
                <Typography variant="h5">{student.name}</Typography>
                <Typography color="textSecondary">
                  Roll No: {student.rollNo}
                </Typography>
                <Typography color="textSecondary">
                  Branch: {student.branch}
                </Typography>
              </Box>
            </Box>
            <Button
              startIcon={<Edit />}
              onClick={() => onEdit(student)}
            >
              Edit Details
            </Button>
          </Box>
  
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
          >
            <Tab label="Academic Details" />
            <Tab label="Placement Status" />
            <Tab label="Documents" />
          </Tabs>
  
          <Box mt={2}>
            {currentTab === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">CGPA</Typography>
                  <Typography>{student.cgpa}</Typography>
                </Grid>
                {/* Add more academic details */}
              </Grid>
            )}
            {currentTab === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Current Status</Typography>
                  <Typography>{student.placementStatus}</Typography>
                </Grid>
                {/* Add more placement details */}
              </Grid>
            )}
            {currentTab === 2 && (
              <Grid container spacing={2}>
                {student.documents.map((doc) => (
                  <Grid item xs={12} key={doc.id}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography>{doc.name}</Typography>
                      <Button startIcon={<Download />}>
                        Download
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };
  