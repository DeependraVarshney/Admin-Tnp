// components/student/ResumeManager.jsx
export const ResumeManager = () => {
    const [resumes, setResumes] = useState([
      {
        id: 1,
        name: 'SDE Resume',
        version: '1.2',
        lastUpdated: '2024-02-01',
        status: 'approved'
      }
      // Add more resumes...
    ]);
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">
              Resume Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<Description />}
            >
              Upload New
            </Button>
          </Box>
          <List>
            {resumes.map((resume) => (
              <ListItem
                key={resume.id}
                secondaryAction={
                  <Box>
                    <Button size="small">Edit</Button>
                    <Button size="small">Download</Button>
                  </Box>
                }
              >
                <ListItemText
                  primary={resume.name}
                  secondary={
                    <Box>
                      <Typography variant="body2">
                        Version: {resume.version}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Last Updated: {resume.lastUpdated}
                      </Typography>
                    </Box>
                  }
                />
                <Chip 
                  label={resume.status} 
                  color={resume.status === 'approved' ? 'success' : 'warning'}
                  size="small"
                  sx={{ mr: 2 }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

