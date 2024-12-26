import { FormControlLabel, Checkbox, FormHelperText } from '@mui/material';

export const CheckboxInput = ({ label, error, ...props }) => {
  return (
    <>
      <FormControlLabel
        control={<Checkbox {...props} />}
        label={label}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
};