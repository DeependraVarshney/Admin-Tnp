// components/student/ApplicationTracker.jsx
export const ApplicationTracker = () => {
    const [applications, setApplications] = useState([
      {
        id: 1,
        company: 'Tech Corp',
        position: 'Software Engineer',
        status: 'shortlisted',
        nextStep: 'Technical Interview',
        timeline: [
          { 
            stage: 'Applied', 
            date: '2024-02-01', 
            status: 'completed' 
          },
          { 
            stage: 'Shortlisted', 
            date: '2024-02-05', 
            status: 'completed' 
          },
          { 
            stage: 'Technical Interview', 
            date: '2024-02-10', 
            status: 'pending' 
          }
        ]
      }
      // Add more applications...
    ]);
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Application Status
          </Typography>
          {applications.map((application) => (
            <Box key={application.id} mb={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="subtitle1">
                    {application.position}
                  </Typography>
                  <Typography color="textSecondary">
                    {application.company}
                  </Typography>
                </Box>
                <Chip 
                  label={application.status} 
                  color="primary"
                />
              </Box>
              <Box>
                {application.timeline.map((step, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={1}>
                    <Box 
                      sx={{ 
                        width: 10, 
                        height: 10, 
                        borderRadius: '50%',
                        bgcolor: step.status === 'completed' ? 'success.main' : 'grey.400',
                        mr: 1
                      }} 
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {step.stage}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {step.date}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  };
  
  