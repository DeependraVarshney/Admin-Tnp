import {
    Card,
    CardContent,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel
  } from '@mui/material';
  import {
    Search,
    FilterList,
    Info,
    Download,
    Refresh
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const AuditLogViewer = ({ logs, onAction }) => {
    const [filters, setFilters] = useState({
      action: 'all',
      user: 'all',
      dateRange: 'all'
    });
  
    const getActionColor = (action) => {
      const colors = {
        create: 'success',
        update: 'info',
        delete: 'error',
        login: 'primary',
        export: 'warning'
      };
      return colors[action] || 'default';
    };
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Audit Logs</Typography>
            <Box display="flex" gap={1}>
              <IconButton onClick={() => onAction('refresh')}>
                <Refresh />
              </IconButton>
              <IconButton onClick={() => onAction('export')}>
                <Download />
              </IconButton>
            </Box>
          </Box>
  
          <Box display="flex" gap={2} mb={3}>
            <TextField
              size="small"
              placeholder="Search logs..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Action</InputLabel>
              <Select
                value={filters.action}
                onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                label="Action"
              >
                <MenuItem value="all">All Actions</MenuItem>
                <MenuItem value="create">Create</MenuItem>
                <MenuItem value="update">Update</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
                <MenuItem value="login">Login</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                label="Date Range"
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>
          </Box>
  
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Resource</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>IP Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      <Chip
                        label={log.action}
                        size="small"
                        color={getActionColor(log.action)}
                      />
                    </TableCell>
                    <TableCell>{log.resource}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => onAction('viewDetails', log)}
                      >
                        <Info fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  };
  