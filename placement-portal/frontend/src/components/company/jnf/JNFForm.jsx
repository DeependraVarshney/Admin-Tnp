import { Grid, Stepper, Step, StepLabel } from '@mui/material';
import { useState } from 'react';

const steps = [
  'Company Details',
  'Job Details',
  'Selection Process',
  'Review'
];

export const JNFForm = ({ onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Initialize form data
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      {/* Add step content */}
    </Grid>
  );
};