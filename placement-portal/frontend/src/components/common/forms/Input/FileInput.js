import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

export const FileInput = ({ onChange, accept, label, ...props }) => {
  return (
    <label htmlFor="contained-button-file">
      <Input
        accept={accept}
        id="contained-button-file"
        type="file"
        onChange={onChange}
        {...props}
      />
      <Button variant="contained" component="span">
        {label}
      </Button>
    </label>
  );
};