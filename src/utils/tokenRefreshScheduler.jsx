import { refreshAccessToken } from "../features/authSlice";

export const scheduleTokenRefresh = (dispatch) => {
    // Clear existing intervals to prevent multiple schedules
    clearInterval(window.tokenRefreshInterval);
  
    // Schedule a refresh every 4 minutes
    window.tokenRefreshInterval = setInterval(async () => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        console.warn('No refresh token found. Stopping refresh scheduler.');
        clearInterval(window.tokenRefreshInterval);
        return;
      }
  
      try {
        // Proactively refresh the access token
        console.log('Proactively refreshing token...');
        await dispatch(refreshAccessToken()).unwrap();
      } catch (error) {
        console.error('Token refresh failed. Logging out.');
        clearInterval(window.tokenRefreshInterval); // Stop the scheduler
        localStorage.clear(); // Clear tokens and user data
        window.location.href = '/'; // Redirect to login
      }
    }, 4* 60 * 1000); // Run every 4 minutes, should be less than 5 min,     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),

  };