// components/debug/DebugPanel.jsx
import { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Tabs,
  Tab,
  Button
} from '@mui/material';
import {
  Close,
  Refresh,
  Download,
  Delete
} from '@mui/icons-material';

export const DebugPanel = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const updateLogs = () => {
      setLogs(debugTools.getHistory());
    };

    const interval = setInterval(updateLogs, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      variant="persistent"
      sx={{ width: 400 }}
    >
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Debug Panel</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab label="Logs" />
          <Tab label="Breakpoints" />
          <Tab label="Watchers" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Box display="flex" gap={1} mb={2}>
              <Button
                startIcon={<Refresh />}
                onClick={() => setLogs(debugTools.getHistory())}
              >
                Refresh
              </Button>
              <Button
                startIcon={<Download />}
                onClick={() => debugTools.exportLogs()}
              >
                Export
              </Button>
              <Button
                startIcon={<Delete />}
                onClick={() => {
                  debugTools.clearHistory();
                  setLogs([]);
                }}
              >
                Clear
              </Button>
            </Box>

            <List>
              {logs.map((log, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={log.message}
                    secondary={`${log.type} - ${new Date(log.timestamp).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};