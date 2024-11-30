import axios from 'axios';
import { refreshAccessToken } from '../features/authSlice';

const apiUrl = import.meta.env.VITE_APP_API_URL

export const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the Authorization header
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
export const setupAxiosInterceptors = (dispatch) => {
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await dispatch(refreshAccessToken()).unwrap();
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } catch (refreshError) {
          localStorage.clear(); // Clear tokens
          // window.location.href = '/login'; // Redirect to login
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

