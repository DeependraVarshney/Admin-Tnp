import { Grid } from '@mui/material';
import { TextInput, SelectInput } from '../../../common/forms/Input';

export const JobDetailsStep = ({ formData, handleChange, errors }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextInput
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          error={errors.jobTitle}
        />
      </Grid>
      {/* Add more job detail fields */}
    </Grid>
  );
};