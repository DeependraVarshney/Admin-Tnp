import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
    Alert
  } from '@mui/material';
  import { useState } from 'react';
  
  export const ForgotPassword = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(email);
      setSubmitted(true);
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Forgot Password
          </Typography>
          
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <Typography color="textSecondary" paragraph>
                Enter your email address and we'll send you instructions to reset your password.
              </Typography>
              
              <TextField
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                type="email"
              />
  
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <Box mt={2}>
              <Alert severity="success">
                If an account exists with this email, you will receive password reset instructions.
              </Alert>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };
  