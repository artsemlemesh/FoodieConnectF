import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_APP_API_URL

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password1, password2 }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/users/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password1, password2 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        return rejectWithValue(errorData.detail || 'Registration failed');
      }

      const data = await response.json();
      console.log('Register response:', data);

      // Save tokens and user info if returned by backend
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      const user = { username: data.user.username, photo: data.user.photo };
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Register response at the very end:', user);

      return user; // Return user data
    } catch (error) {
      console.error('Register error:', error);
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);
// Artem040036
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password1 }) => {
    const response = await fetch(`${apiUrl}/users/token/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ username, password: password1 }),
    });

    if (!response.ok) {
      throw new Error('Login Failed');
    }

    const data = await response.json();
    console.log('Login response:', data);
    // localStorage.setItem('user', JSON.stringify(data));
    localStorage.clear();

    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    
    // const userResponse = await fetch(`${apiUrl}/users/profile/`, {
    //   headers: {
    //     Authorization: `Bearer ${data.access}`,
    //   },
    // });

    // if (!userResponse.ok) {
    //   throw new Error('Failed to fetch user profile');
    // }

    // const user = await userResponse.json();
    //   localStorage.setItem('user', JSON.stringify(user));
      // localStorage.setItem('data', JSON.stringify(data));
    // check this later func only returns data, but i also have user
      // return data; // Return user data to Redux



    const user = {username: data.username, photo: data.photo}
    localStorage.setItem('user', JSON.stringify(user))
    return user
    
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await fetch(`${apiUrl}/users/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.code === 'token_not_valid') {
          console.error('Refresh token expired, logging out user...');
          localStorage.clear(); // Clear tokens
          window.location.href = '/login'; // Redirect to login
          throw new Error('Refresh token expired, user logged out');
        }
        throw new Error(errorData.detail || 'Failed to refresh access token');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access);

      return data.access; // Return new access token
    } catch (error) {
      console.error('Refresh token error:', error);
      return rejectWithValue(error.message || 'Token refresh failed');
    }
  }
);


const fetchWithRefresh = async (url, options = {}) => {
  const accessToken = localStorage.getItem('access_token');

  if (!options.headers) options.headers = {};
  options.headers.Authorization = `Bearer ${accessToken}`;

  let response = await fetch(url, options);

  // If unauthorized, attempt to refresh the token
  if (response.status === 401) {
    console.warn('Access token expired, attempting to refresh...');
    try {
      const newAccessToken = await refreshAccessToken();

      // Retry the request with the new access token
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
    } catch (error) {
      console.error('Token refresh failed, logging out user...');
      localStorage.clear(); // Clear tokens
      throw error; // Re-throw error to handle it elsewhere
    }
  }

  return response;
};

// export const fetchUserProfile = createAsyncThunk(
//   'auth/fetchUserProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await get(`${apiUrl}/users/profile`, {
//         withCredentials: true, // Include credentials for authentication
//       });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetchWithRefresh(`${apiUrl}/users/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Logout failed:', errorData);
      return rejectWithValue(errorData.detail || 'Logout failed');
    }

    console.log('Logout successful');
    localStorage.clear();
    return null;
  } catch (error) {
    console.error('Logout error:', error);
    return rejectWithValue(error.message || 'Logout failed');
  }
});



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
      // .addCase(fetchUserProfile.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchUserProfile.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.user = action.payload;
      // })
      // .addCase(fetchUserProfile.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload;
      // })
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.user = null; // Logout user if refresh token fails
      });
  },
});

export default authSlice.reducer;
