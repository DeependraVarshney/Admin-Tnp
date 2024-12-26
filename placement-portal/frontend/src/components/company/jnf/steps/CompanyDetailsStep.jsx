import { Grid } from '@mui/material';
import { TextInput } from '../../../common/forms/Input';

export const CompanyDetailsStep = ({ formData, handleChange, errors }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextInput
          label="Company Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          error={errors.website}
        />
      </Grid>
      {/* Add more company detail fields */}
    </Grid>
  );
};
