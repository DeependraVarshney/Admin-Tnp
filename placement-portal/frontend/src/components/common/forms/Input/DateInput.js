import { TextField } from '@mui/material';

export const DateInput = ({ error, ...props }) => {
  return (
    <TextField
      type="date"
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error}
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );
};
