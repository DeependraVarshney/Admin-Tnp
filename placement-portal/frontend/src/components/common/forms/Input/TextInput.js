import { TextField } from '@mui/material';

export const TextInput = ({ error, ...props }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error}
      {...props}
    />
  );
};