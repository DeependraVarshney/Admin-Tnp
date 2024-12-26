import { 
    Stepper, 
    Step, 
    StepLabel, 
    Typography, 
    Paper 
  } from '@mui/material';
  
  const steps = [
    'Draft',
    'Submitted',
    'Under Review',
    'Approved',
    'Published'
  ];
  
  export const JNFStatusTracker = ({ currentStatus }) => {
    const getStepIndex = (status) => {
      return steps.findIndex(step => 
        step.toLowerCase() === status.toLowerCase()
      );
    };
  
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          JNF Status
        </Typography>
        <Stepper activeStep={getStepIndex(currentStatus)} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    );
  };
  