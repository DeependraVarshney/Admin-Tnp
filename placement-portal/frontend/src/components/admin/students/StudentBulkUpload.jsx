import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Step,
    Stepper,
    StepLabel,
    Alert,
  } from '@mui/material';
  import { Upload, Download, Check } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const StudentBulkUpload = ({ onUpload }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState([]);
  
    const steps = [
      'Download Template',
      'Fill Data',
      'Upload File',
      'Verify Data'
    ];
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Bulk Student Upload
          </Typography>
  
          <Stepper activeStep={activeStep} sx={{ my: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
  
          <Box mt={3}>
            {activeStep === 0 && (
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={() => setActiveStep(1)}
              >
                Download Template
              </Button>
            )}
  
            {activeStep === 2 && (
              <Box>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<Upload />}
                  >
                    Select File
                  </Button>
                </label>
                {file && (
                  <Typography variant="body2" mt={1}>
                    Selected file: {file.name}
                  </Typography>
                )}
              </Box>
            )}
  
            {activeStep === 3 && (
              <Box>
                {errors.length > 0 ? (
                  <Alert severity="error">
                    Found {errors.length} errors in the data
                  </Alert>
                ) : (
                  <Alert severity="success" icon={<Check />}>
                    Data verified successfully
                  </Alert>
                )}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };
  