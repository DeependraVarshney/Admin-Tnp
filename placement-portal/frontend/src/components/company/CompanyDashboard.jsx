 // components/company/CompanyDashboard.jsx
 export const CompanyDashboard = () => {
    const [stats, setStats] = useState({
      activeJNFs: 3,
      totalApplications: 150,
      shortlisted: 45,
      selected: 12
    });
  
    const [upcomingEvents, setUpcomingEvents] = useState([
      {
        id: 1,
        title: 'Technical Interview Round',
        date: '2024-03-15',
        type: 'interview',
        candidates: 15
      }
    ]);
  
    return (
      <Box>
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active JNFs
                </Typography>
                <Typography variant="h4">
                  {stats.activeJNFs}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more stat cards */}
  
          {/* Upcoming Events */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upcoming Events
                </Typography>
                <List>
                  {upcomingEvents.map((event) => (
                    <ListItem key={event.id}>
                      <ListItemText
                        primary={event.title}
                        secondary={`${event.date} • ${event.candidates} candidates`}
                      />
                      <Button size="small">
                        View Details
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Add />}
                    >
                      Create JNF
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Schedule />}
                    >
                      Schedule Interview
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  
  