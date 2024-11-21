import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AuthForm = ({ type, onSubmit }) => {
  return (
    <Box className="flex flex-col space-y-4 p-6 rounded-lg shadow-lg border max-w-md mx-auto">
      <Typography variant="h5" className="font-bold text-center">
        {type === 'login' ? 'Login' : 'Register'}
      </Typography>
      <TextField label="Email" variant="outlined" fullWidth />
      <TextField label="Password" type="password" variant="outlined" fullWidth />
      {type === 'register' && (
        <TextField label="Confirm Password" type="password" variant="outlined" fullWidth />
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onSubmit}
        className="py-2 mt-4"
      >
        {type === 'login' ? 'Login' : 'Register'}
      </Button>
    </Box>
  );
};

export default AuthForm;