import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from '@mui/material';
  import { Add, Schedule } from '@mui/icons-material';
  import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
  
  export const InterviewScheduler = ({ candidates, onSchedule }) => {
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="h6">Interview Scheduler</Typography>
            <Button startIcon={<Add />} variant="contained">
              Add Slot
            </Button>
          </Box>
  
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Candidate Name</TableCell>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Interview Type</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>{candidate.name}</TableCell>
                    <TableCell>{candidate.rollNo}</TableCell>
                    <TableCell>{candidate.interviewType}</TableCell>
                    <TableCell>{candidate.scheduledTime}</TableCell>
                    <TableCell>
                      <Chip 
                        label={candidate.status} 
                        color={candidate.status === 'Scheduled' ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<Schedule />}
                        size="small"
                        onClick={() => onSchedule(candidate)}
                      >
                        Reschedule
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  };
  