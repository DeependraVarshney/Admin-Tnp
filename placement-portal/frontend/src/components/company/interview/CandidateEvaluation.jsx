import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Rating,
    Box,
    Divider
  } from '@mui/material';
  import { Save, Cancel } from '@mui/icons-material';
  
  export const CandidateEvaluation = ({ candidate, onSubmit }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Candidate Evaluation Form
          </Typography>
  
          <Box mb={3}>
            <Typography variant="subtitle1">{candidate.name}</Typography>
            <Typography color="textSecondary">
              Roll No: {candidate.rollNo} | Branch: {candidate.branch}
            </Typography>
          </Box>
  
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="legend">Technical Skills</Typography>
              <Rating name="technical" precision={0.5} />
            </Grid>
  
            <Grid item xs={12}>
              <Typography component="legend">Communication Skills</Typography>
              <Rating name="communication" precision={0.5} />
            </Grid>
  
            <Grid item xs={12}>
              <Typography component="legend">Problem Solving</Typography>
              <Rating name="problemSolving" precision={0.5} />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Strengths"
                multiline
                rows={2}
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Areas of Improvement"
                multiline
                rows={2}
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Comments"
                multiline
                rows={3}
              />
            </Grid>
  
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={onSubmit}
                >
                  Submit Evaluation
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  