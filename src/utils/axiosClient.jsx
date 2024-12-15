import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach access token to headers
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

// Response interceptor: handle 401 errors and logout
export const setupAxiosInterceptors = () => {
  axiosClient.interceptors.response.use(
    (response) => response, // Pass through if the response is successful
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        console.error('Unauthorized request. Logging out user...');
        localStorage.clear(); // Clear tokens and user data
        window.location.href = '/'; // Redirect to homepage or login page
        return Promise.reject(error);
      }

      return Promise.reject(error); // Propagate other errors
    }
  );
};