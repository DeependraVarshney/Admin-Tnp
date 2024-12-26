import { 
    Card, 
    CardContent, 
    Typography, 
    Grid, 
    Box 
  } from '@mui/material';
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from 'recharts';
  
  export const PlacementStats = ({ data }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Placement Statistics
          </Typography>
          <Box sx={{ height: 300 }}>
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="placed" fill="#8884d8" name="Placed" />
              <Bar dataKey="total" fill="#82ca9d" name="Total Students" />
            </BarChart>
          </Box>
        </CardContent>
      </Card>
    );
  };