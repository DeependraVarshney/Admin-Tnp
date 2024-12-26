// components/admin/automation/WorkflowAutomation.jsx
export const WorkflowAutomation = () => {
    const [workflows, setWorkflows] = useState([
      {
        id: 1,
        name: 'JNF Approval',
        trigger: 'jnf_submitted',
        actions: ['notify_tpo', 'update_status'],
        isActive: true
      }
    ]);
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Workflow Automation</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {/* Add new workflow */}}
            >
              Create Workflow
            </Button>
          </Box>
  
          <Grid container spacing={3}>
            {workflows.map((workflow) => (
              <Grid item xs={12} md={6} key={workflow.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">{workflow.name}</Typography>
                      <Switch
                        checked={workflow.isActive}
                        onChange={() => {/* Toggle workflow */}}
                      />
                    </Box>
                    
                    <Box mt={2}>
                      <Typography variant="body2" color="textSecondary">
                        Trigger: {workflow.trigger}
                      </Typography>
                      <Box mt={1}>
                        {workflow.actions.map((action, index) => (
                          <Chip
                            key={index}
                            label={action}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                        ))}
                      </Box>
                    </Box>
  
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                      <IconButton size="small">
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  };
  