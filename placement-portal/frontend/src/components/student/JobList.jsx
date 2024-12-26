 // components/student/JobList.jsx
 export const JobList = () => {
    const [jobs, setJobs] = useState([
      {
        id: 1,
        company: 'Tech Corp',
        position: 'Software Engineer',
        package: '15 LPA',
        deadline: '2024-03-15',
        status: 'open'
      }
      // Add more jobs...
    ]);
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Available Opportunities
          </Typography>
          <List>
            {jobs.map((job) => (
              <ListItem 
                key={job.id}
                secondaryAction={
                  <Button variant="contained" size="small">
                    Apply
                  </Button>
                }
              >
                <ListItemText
                  primary={job.position}
                  secondary={
                    <Box>
                      <Typography variant="body2">
                        {job.company}
                      </Typography>
                      <Box display="flex" gap={1} mt={0.5}>
                        <Chip 
                          label={job.package} 
                          size="small" 
                          color="primary"
                        />
                        <Chip 
                          label={`Deadline: ${job.deadline}`} 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };
  
  