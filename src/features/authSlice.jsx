import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const csrftoken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('csrftoken='))
  .split('=')[1];

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password1, password2 }) => {
    const response = await fetch(`http://127.0.0.1:8000/users/register/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': csrftoken,  // Include the CSRF token
      },
      body: JSON.stringify({ username, email, password1, password2 }), // Send all required fields
    });
    console.log(response, 'RESPONSE');

    if (!response.ok) {
      throw new Error('Registration Failed');
    }

    const data = await response.json();
    console.log(data, 'DATA');
    console.log('RegistrationREDUCER');
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password1 }) => {
    const response = await fetch(`http://127.0.0.1:8000/users/login/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': csrftoken,  // Include the CSRF token
      },
      body: JSON.stringify({ username, password: password1 }),
    });
    console.log(response, 'RESPONSE');

    if (!response.ok) {
      throw new Error('Login Failed');
    }

    const data = await response.json();
    console.log(data, 'DATA');
    console.log('LOGINREDUCER');
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  const response = await fetch(`http://127.0.0.1:8000/users/logout/`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  localStorage.removeItem('user');

  return null;
});

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get(`http://127.0.0.1:8000/users/profile`, {
        withCredentials: true, // Include credentials for authentication
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
            username: action.payload.username, // this username should be the same as in other places
            photo: action.payload.photo,
          };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
          username: action.payload.username, // this username should be the same as in other places
          photo: action.payload.photo,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
