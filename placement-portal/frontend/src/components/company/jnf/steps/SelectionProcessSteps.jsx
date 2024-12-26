import { Grid, Typography } from '@mui/material';
import { CheckboxInput, TextInput, DateInput } from '../../../common/forms/Input';

export const SelectionProcessStep = ({ formData, handleChange, errors }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Selection Process Details
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <CheckboxInput
          name="resumeShortlisting"
          label="Resume Shortlisting"
          checked={formData.resumeShortlisting}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CheckboxInput
          name="prePlacementTalk"
          label="Pre-Placement Talk"
          checked={formData.prePlacementTalk}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CheckboxInput
          name="groupDiscussion"
          label="Group Discussion"
          checked={formData.groupDiscussion}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CheckboxInput
          name="technicalTest"
          label="Technical Test"
          checked={formData.technicalTest}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextInput
          label="Expected Number of Recruits"
          name="expectedRecruits"
          type="number"
          value={formData.expectedRecruits}
          onChange={handleChange}
          error={errors.expectedRecruits}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <DateInput
          label="Tentative Visit Date"
          name="visitDate"
          value={formData.visitDate}
          onChange={handleChange}
          error={errors.visitDate}
        />
      </Grid>
    </Grid>
  );
};