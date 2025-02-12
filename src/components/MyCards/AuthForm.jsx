import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/authSlice';
import { useAppContext } from '../../context/GlobalContext';
import { useDebounce } from '../../hooks/useDebounce';
import { usePostHog } from 'posthog-js/react';

const AuthForm = ({ type, onSubmit }) => {
  const { authStatus, error, user } = useAppContext();

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const debouncedUsername = useDebounce(username, 300); // Debounce for 300ms

  const [email, setEmail] = useState(''); // New state for email

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const data = {
      username: debouncedUsername,
      email,
      password1,
      password2,
    };
    onSubmit(data);
  };

  const posthog = usePostHog();

  const handleLogout = async () => {
    dispatch(logoutUser());
    posthog.reset();

    // Optionally, you can also capture a logout event
    posthog.capture('user logout', {
        path: window.location.pathname,
    });
    resetForm();
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword1('');
    setPassword2('');
  };

  return (
    <>
      {/* {console.log('HEYUSER', user)} */}
      {user !== null && console.log('HEYUSER', user)}
      {user ? (
        <Box className="flex flex-col space-y-4 p-6 rounded-lg shadow-lg border max-w-md mx-auto">
          <Typography variant="h5" className="font-bold text-center">
            Welcome, {user.username}
          </Typography>
          <img
            src={user.photo || 'corgi.jpg'}
            alt="User"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <Button
            onClick={handleLogout}
            variant="contained"
            color="secondary"
            fullWidth
            className="py-2 mt-4"
          >
            {authStatus === 'loading' ? 'Logging out ...' : 'Logout'}
          </Button>
        </Box>
      ) : (
        <Box className="flex flex-col space-y-4 p-6 rounded-lg shadow-lg border max-w-md mx-auto">
          <Typography variant="h5" className="font-bold text-center">
            {type === 'login' ? 'Login' : 'Register'}
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {type === 'register' && (
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          {type === 'register' && (
            <TextField
              label="Confirm the Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          )}
          {error && <Typography color="error">{error}</Typography>}{' '}
          {/* Display error message */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            className="py-2 mt-4"
          >
            {type === 'login' ? 'Login' : 'Register'}
          </Button>
        </Box>
      )}
    </>
  );
};

export default AuthForm;
