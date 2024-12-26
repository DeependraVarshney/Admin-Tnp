// components/company/InterviewScheduler.jsx
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from '@mui/material';
  import { Add, Edit, Delete, Schedule } from '@mui/icons-material';
  import { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  
  export const InterviewScheduler = () => {
    // In real app, these would come from Redux/API
    const [interviews, setInterviews] = useState([
      {
        _id: '507f1f77bcf86cd799439011', // MongoDB-style ID
        candidateName: 'John Doe',
        candidateId: '507f1f77bcf86cd799439012',
        round: 'Technical',
        scheduledTime: '2024-03-15T10:00:00Z',
        duration: 45,
        status: 'scheduled',
        interviewers: ['Jane Smith', 'Bob Wilson'],
        location: 'Room 101'
      }
    ]);
  
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    // In real app:
    // const dispatch = useDispatch();
    // const { interviews, loading, error } = useSelector(state => state.interviews);
    // useEffect(() => {
    //   dispatch(fetchInterviews());
    // }, [dispatch]);
  
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">Interview Schedule</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setDialogOpen(true)}
          >
            Schedule Interview
          </Button>
        </Box>
  
        <Grid container spacing={3}>
          {/* Calendar View */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                {/* Calendar implementation */}
              </CardContent>
            </Card>
          </Grid>
  
          {/* Upcoming Interviews */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upcoming Interviews
                </Typography>
                <List>
                  {interviews.map((interview) => (
                    <ListItem key={interview._id}>
                      <ListItemText
                        primary={interview.candidateName}
                        secondary={`${interview.round} - ${new Date(interview.scheduledTime).toLocaleString()}`}
                      />
                      <Chip 
                        label={interview.status} 
                        color={interview.status === 'scheduled' ? 'primary' : 'default'}
                        size="small"
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
  
        {/* Schedule Dialog */}
        <Dialog 
          open={dialogOpen} 
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Candidate</InputLabel>
                  <Select>
                    {/* In real app, candidates would come from API/Redux */}
                    <MenuItem value="1">John Doe</MenuItem>
                    <MenuItem value="2">Jane Smith</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Round</InputLabel>
                  <Select>
                    <MenuItem value="technical">Technical</MenuItem>
                    <MenuItem value="hr">HR</MenuItem>
                    <MenuItem value="managerial">Managerial</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location/Link"
                  placeholder="Enter interview location or meeting link"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={() => {
                // In real app: dispatch(scheduleInterview(formData));
                setDialogOpen(false);
              }}
            >
              Schedule
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  