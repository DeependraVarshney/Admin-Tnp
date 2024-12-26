import { 
    Grid, 
    Typography, 
    Paper, 
    Divider, 
    Button 
  } from '@mui/material';
  
  export const ReviewStep = ({ formData, onSubmit, onBack }) => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Review JNF Details
          </Typography>
        </Grid>
  
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Company Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="textSecondary">Company Name:</Typography>
                <Typography>{formData.companyName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">Website:</Typography>
                <Typography>{formData.website}</Typography>
              </Grid>
            </Grid>
  
            <Divider sx={{ my: 2 }} />
  
            <Typography variant="subtitle1" gutterBottom>
              Job Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="textSecondary">Designation:</Typography>
                <Typography>{formData.designation}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">CTC:</Typography>
                <Typography>{formData.ctc}</Typography>
              </Grid>
            </Grid>
  
            <Divider sx={{ my: 2 }} />
  
            <Typography variant="subtitle1" gutterBottom>
              Selection Process
            </Typography>
            <Grid container spacing={2}>
              {/* Add selection process details */}
            </Grid>
          </Paper>
        </Grid>
  
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button onClick={onBack}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                Submit JNF
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  