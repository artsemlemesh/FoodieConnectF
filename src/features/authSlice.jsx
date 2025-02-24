import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../utils/axiosClient';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk( // for async operations, allows to define a function that dispatches actions(loading, success, error) based on lifecycle or promise
  'auth/register', //action type 
  async ({ username, email, password1, password2 }, { rejectWithValue }) => { //(first argument is an object containing parameters for the async operation, second-object with additional options)
    try {
      const response = await axiosClient.post(`${apiUrl}/users/register/`, {
        username,
        email,
        password1,
        password2,
        // is_premium
      });

      const data = response.data;
      console.log('Register response:', data);

      // Save tokens and user info if returned by backend
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      const user = { username: data.user.username, photo: data.user.photo, is_admin: data.user.is_admin, is_premium: data.user.is_premium };
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Register response at the very end:', user);

      return user; // Return user data
    } catch (error) {
      console.error('Register error:', error);
      return rejectWithValue( //utility func that creates rejected action with a custom payload. useful for handling errors and passing error message to the state
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
        // is_premium,
        password: password1,
      });

      const data = response.data;
      console.log('Login response:', data);
      localStorage.clear();

      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      const user = { username: data.username, photo: data.photo, is_admin: data.is_admin, id: data.id, is_premium: data.is_premium  };
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

const authSlice = createSlice({ //creates a slice of the state
  name: 'auth',
  initialState,
  reducers: {}, //synchronous reducers, they take the current state and an action and return a new state
  extraReducers: (builder) => { // async reducers, for handling actions that arent defined in reducers, (actions generated by createAsyncThunk), allows to respond to actions defined elsewhere
    builder //builder is an object that allows to add case reducers for specific action types
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => { //addCase method is used to add a case reducer for a specific action type (pending,...) , usually 1)the first argument is action type (from createAsyncThunk) 2) the second argument is a callback function that takes the current state and an action and returns a new state
        state.status = 'succeeded';
        state.user = { //update user data with the payload from the fulfilled action
          username: action.payload.username, // this username should be the same as in other places
          photo: action.payload.photo,
          is_admin: action.payload.is_admin,
          is_premium: action.payload.is_premium
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'; //set status to failed when the registerUser action is rejected
        state.error = action.error.message; //store the error message
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
          username: action.payload.username, // this username should be the same as in other places
          photo: action.payload.photo,
          is_admin: action.payload.is_admin,
          is_premium: action.payload.is_premium,
          id: action.payload.id // backend is set up seems like
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
