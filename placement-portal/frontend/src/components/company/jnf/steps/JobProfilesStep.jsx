import { Grid, Typography, Button } from '@mui/material';
import { TextInput, SelectInput } from '../../../common/forms/Input';
import { Add as AddIcon } from '@mui/icons-material';

export const JobProfileStep = ({ formData, handleChange, errors }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Job Profile Details
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextInput
          label="Job Designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          error={errors.designation}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextInput
          label="CTC (Per Annum)"
          name="ctc"
          type="number"
          value={formData.ctc}
          onChange={handleChange}
          error={errors.ctc}
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          label="Job Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <SelectInput
          label="Place of Posting"
          name="placeOfPosting"
          value={formData.placeOfPosting}
          onChange={handleChange}
          error={errors.placeOfPosting}
          options={[
            { value: 'delhi', label: 'Delhi' },
            { value: 'mumbai', label: 'Mumbai' },
            { value: 'bangalore', label: 'Bangalore' },
            // Add more cities
          ]}
        />
      </Grid>
    </Grid>
  );
};