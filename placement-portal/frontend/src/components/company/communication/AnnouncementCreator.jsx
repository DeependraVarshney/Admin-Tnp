import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Box,
    Switch,
    FormControlLabel
  } from '@mui/material';
  import { Send, Schedule } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const AnnouncementCreator = ({ onSubmit }) => {
    const [announcement, setAnnouncement] = useState({
      title: '',
      content: '',
      targetAudience: [],
      scheduled: false,
      scheduledDate: null,
      priority: 'normal'
    });
  
    const audiences = [
      'All Students',
      'Final Year',
      'Pre-Final Year',
      'Computer Science',
      'Electronics',
      'Mechanical'
    ];
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create Announcement
          </Typography>
  
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Announcement Title"
              value={announcement.title}
              onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
              sx={{ mb: 2 }}
            />
  
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Announcement Content"
              value={announcement.content}
              onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
              sx={{ mb: 2 }}
            />
  
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Target Audience</InputLabel>
              <Select
                multiple
                value={announcement.targetAudience}
                onChange={(e) => setAnnouncement({ ...announcement, targetAudience: e.target.value })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {audiences.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={announcement.priority}
                onChange={(e) => setAnnouncement({ ...announcement, priority: e.target.value })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </Select>
            </FormControl>
  
            <FormControlLabel
              control={
                <Switch
                  checked={announcement.scheduled}
                  onChange={(e) => setAnnouncement({ ...announcement, scheduled: e.target.checked })}
                />
              }
              label="Schedule Announcement"
            />
  
            {announcement.scheduled && (
              <TextField
                fullWidth
                type="datetime-local"
                label="Schedule Date"
                value={announcement.scheduledDate}
                onChange={(e) => setAnnouncement({ ...announcement, scheduledDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mt: 2 }}
              />
            )}
  
            <Box display="flex" gap={2} mt={3}>
              <Button
                variant="contained"
                startIcon={announcement.scheduled ? <Schedule /> : <Send />}
                onClick={() => onSubmit(announcement)}
              >
                {announcement.scheduled ? 'Schedule' : 'Send'} Announcement
              </Button>
              <Button variant="outlined">
                Preview
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };