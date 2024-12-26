import { 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    FormHelperText 
  } from '@mui/material';

  export const RadioInput = ({ label, options, error, ...props }) => {
    return (
      <FormControl error={!!error}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup {...props}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  };