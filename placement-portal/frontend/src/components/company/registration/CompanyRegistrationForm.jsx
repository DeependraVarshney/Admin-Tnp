import { Grid } from '@mui/material';
import { TextInput, SelectInput } from '../../common/forms/Input';
import { ButtonWithLoading } from '../../common/ui/Button/ButtonWithLoading';

export const CompanyRegistrationForm = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  loading, 
  errors 
}) => {
  const companyTypes = [
    { value: 'MNC', label: 'MNC' },
    { value: 'Startup', label: 'Startup' },
    { value: 'PSU', label: 'PSU' },
    // Add more types
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextInput
            label="Company Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectInput
            label="Company Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={companyTypes}
            error={errors.type}
          />
        </Grid>
        {/* Add more fields */}
        <Grid item xs={12}>
          <ButtonWithLoading
            type="submit"
            variant="contained"
            color="primary"
            loading={loading}
            fullWidth
          >
            Register
          </ButtonWithLoading>
        </Grid>
      </Grid>
    </form>
  );
};
