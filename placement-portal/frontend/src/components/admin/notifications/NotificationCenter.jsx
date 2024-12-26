// components/admin/notifications/NotificationCenter.jsx
import {
    Card,
    CardContent,
    Typography,
    Box,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    IconButton,
    Button,
    Chip,
    Badge,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
  } from '@mui/material';
  import {
    Notifications,
    Email,
    Message,
    BusinessCenter,
    Person,
    MoreVert,
    Delete,
    CheckCircle,
    Error,
    Info,
    Warning,
    Send
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const NotificationCenter = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [composeDialog, setComposeDialog] = useState(false);
  
    // In real app: These would come from Redux/API
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        type: 'jnf',
        title: 'New JNF Submission',
        message: 'Tech Corp has submitted a new JNF for review',
        timestamp: '2024-02-20T10:30:00Z',
        status: 'unread',
        priority: 'high',
        sender: {
          name: 'Tech Corp',
          avatar: null
        }
      },
      // Add more notifications...
    ]);
  
    const getNotificationIcon = (type) => {
      switch(type) {
        case 'jnf':
          return <BusinessCenter color="primary" />;
        case 'student':
          return <Person color="secondary" />;
        case 'email':
          return <Email color="action" />;
        default:
          return <Info color="action" />;
      }
    };
  
    const getPriorityIcon = (priority) => {
      switch(priority) {
        case 'high':
          return <Error color="error" />;
        case 'medium':
          return <Warning color="warning" />;
        default:
          return <Info color="info" />;
      }
    };
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Notification Center</Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<Send />}
                onClick={() => setComposeDialog(true)}
              >
                Send Notification
              </Button>
            </Box>
          </Box>
  
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab 
              label={
                <Badge badgeContent={4} color="error">
                  All
                </Badge>
              } 
            />
            <Tab label="JNF Updates" />
            <Tab label="Student Updates" />
            <Tab label="System Alerts" />
          </Tabs>
  
          <List>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  bgcolor: notification.status === 'unread' ? 'action.hover' : 'transparent',
                  mb: 1,
                  borderRadius: 1
                }}
              >
                <ListItemAvatar>
                  {notification.sender.avatar ? (
                    <Avatar src={notification.sender.avatar} />
                  ) : (
                    <Avatar>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      {notification.title}
                      {notification.priority === 'high' && (
                        <Chip 
                          label="High Priority" 
                          size="small" 
                          color="error"
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(notification.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={(e) => {
                      setSelectedNotification(notification);
                      setAnchorEl(e.currentTarget);
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
  
          {/* Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => {
              // Mark as read logic
              setAnchorEl(null);
            }}>
              <ListItemIcon>
                <CheckCircle fontSize="small" />
              </ListItemIcon>
              Mark as read
            </MenuItem>
            <MenuItem onClick={() => {
              // Delete logic
              setAnchorEl(null);
            }}>
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
  
          {/* Compose Dialog */}
          <Dialog
            open={composeDialog}
            onClose={() => setComposeDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Send Notification</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Recipients"
                  select
                  SelectProps={{
                    multiple: true
                  }}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="all">All Students</MenuItem>
                  <MenuItem value="placed">Placed Students</MenuItem>
                  <MenuItem value="unplaced">Unplaced Students</MenuItem>
                  <MenuItem value="companies">All Companies</MenuItem>
                </TextField>
  
                <TextField
                  fullWidth
                  label="Subject"
                  sx={{ mb: 2 }}
                />
  
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
  
                <Box display="flex" gap={1} mb={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Email />}
                  >
                    Send Email
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Message />}
                  >
                    Send SMS
                  </Button>
                </Box>
  
                <TextField
                  fullWidth
                  select
                  label="Priority"
                  defaultValue="normal"
                >
                  <MenuItem value="high">High Priority</MenuItem>
                  <MenuItem value="normal">Normal Priority</MenuItem>
                  <MenuItem value="low">Low Priority</MenuItem>
                </TextField>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setComposeDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<Send />}
                onClick={() => {
                  // Send notification logic
                  setComposeDialog(false);
                }}
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    );
  };