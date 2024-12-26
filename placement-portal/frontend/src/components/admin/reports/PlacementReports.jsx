  // components/admin/reports/PlacementReports.jsx
  import {
    Card,
    CardContent,
    Grid,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton
  } from '@mui/material';
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
  } from 'recharts';
  import { Download, FilterList, Refresh } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const PlacementReports = () => {
    const [year, setYear] = useState('2024');
    const [department, setDepartment] = useState('all');
  
    const stats = {
      totalStudents: 500,
      placedStudents: 450,
      averagePackage: 12.5,
      highestPackage: 45
    };
  
    const departmentData = [
      { name: 'CSE', placed: 120, total: 125 },
      { name: 'ECE', placed: 110, total: 120 },
      { name: 'ME', placed: 95, total: 100 }
    ];
  
    const packageDistribution = [
      { range: '5-10 LPA', count: 150 },
      { range: '10-15 LPA', count: 200 },
      { range: '15-20 LPA', count: 75 },
      { range: '20+ LPA', count: 25 }
    ];
  
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">Placement Reports</Typography>
          <Box display="flex" gap={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="cse">CSE</MenuItem>
                <MenuItem value="ece">ECE</MenuItem>
              </Select>
            </FormControl>
            <IconButton>
              <Download />
            </IconButton>
          </Box>
        </Box>
  
        <Grid container spacing={3}>
          {/* Statistics Cards */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Students
                </Typography>
                <Typography variant="h4">
                  {stats.totalStudents}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Placed Students
                </Typography>
                <Typography variant="h4">
                  {stats.placedStudents}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {Math.round((stats.placedStudents/stats.totalStudents) * 100)}% Placed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Average Package
                </Typography>
                <Typography variant="h4">
                  {stats.averagePackage} LPA
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Highest Package
                </Typography>
                <Typography variant="h4">
                  {stats.highestPackage} LPA
                </Typography>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Department-wise Chart */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Department-wise Placement Status
                </Typography>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="placed" fill="#8884d8" name="Placed" />
                      <Bar dataKey="total" fill="#82ca9d" name="Total Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Package Distribution */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Package Distribution
                </Typography>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={packageDistribution}
                        dataKey="count"
                        nameKey="range"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {packageDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Company-wise Placements */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Company-wise Placement Details
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Company</TableCell>
                      <TableCell>Students Placed</TableCell>
                      <TableCell>Average Package</TableCell>
                      <TableCell>Highest Package</TableCell>
                      <TableCell>Departments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Add company-wise data */}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
 