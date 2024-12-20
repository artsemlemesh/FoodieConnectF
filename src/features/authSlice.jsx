import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../utils/axiosClient';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password1, password2 }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`${apiUrl}/users/register/`, {
        username,
        email,
        password1,
        password2,
      });

      const data = response.data;
      console.log('Register response:', data);

      // Save tokens and user info if returned by backend
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      const user = { username: data.user.username, photo: data.user.photo, is_admin: data.user.is_admin };
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Register response at the very end:', user);

      return user; // Return user data
    } catch (error) {
      console.error('Register error:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
// Artem040036
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password1 }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`${apiUrl}/users/token/`, {
        username,
        password: password1,
      });

      const data = response.data;
      console.log('Login response:', data);
      localStorage.clear();

      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      const user = { username: data.username, photo: data.photo, is_admin: data.is_admin  };
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('No refresh token available');
      console.log('Attempting token refresh...');
      const response = await axiosClient.post(
        `${apiUrl}/users/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      const data = response.data;
      // console.log('Refresh token response:', data);
      localStorage.setItem('access_token', data.access);

      console.log('New access token:', data.access);
      return data.access; // Return new access token
    } catch (error) {
      console.error('Refresh token error:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// const fetchWithRefresh = async (url, options = {}) => {
//   const accessToken = localStorage.getItem('access_token');

//   if (!options.headers) options.headers = {};
//   options.headers.Authorization = `Bearer ${accessToken}`;

//   let response = await fetch(url, options);

//   // If unauthorized, attempt to refresh the token
//   if (response.status === 401) {
//     console.warn('Access token expired, attempting to refresh...');
//     try {
//       const newAccessToken = await refreshAccessToken().unwrap();

//       // Retry the request with the new access token
//       options.headers.Authorization = `Bearer ${newAccessToken}`;
//       response = await fetch(url, options);
//     } catch (error) {
//       console.error('Token refresh failed, logging out user...');
//       localStorage.clear(); // Clear tokens
//       throw error; // Re-throw error to handle it elsewhere
//     }
//   }

//   return response;
// };

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`${apiUrl}/users/profile`, {
        withCredentials: true, // Include credentials for authentication
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);



export const fetchAllUsersProfile = createAsyncThunk(
  'auth/fetchAllUsersProfile',
  async (_, { rejectWithValue }) => {
    try {
      console.log('before response')
      const response = await axiosClient.get(`${apiUrl}/users/users`, {
        withCredentials: true, // Include credentials for authentication
      });
      console.log('USERS', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await axiosClient.post(`${apiUrl}/users/logout/`, {
        refresh_token: refreshToken,
      });

      console.log('Logout successful');
      localStorage.clear();
      return null;
    } catch (error) {
      console.error('Logout error:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
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
          is_admin: action.payload.is_admin
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
          is_admin: action.payload.is_admin
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
      })
      .addCase(fetchAllUsersProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsersProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchAllUsersProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Token refresh failed. Logging out.';
        state.user = null; // Clear user data
        localStorage.clear(); // Clear tokens from storage
      });
  },
});

export default authSlice.reducer;
