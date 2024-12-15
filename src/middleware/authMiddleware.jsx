import { refreshAccessToken } from "../features/authSlice";

let isRefreshing = false; // To prevent multiple refresh requests simultaneously
// CURRENTLY NOT IN USE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const authMiddleware = (store) => (next) => async (action) => {
  console.log('Action:', action);

  // Handle 401 errors
  if (action.type.endsWith('/rejected') && action.error?.message === '401') {
    // Prevent multiple refresh requests simultaneously
    if (isRefreshing) {
      console.warn('Token refresh already in progress. Skipping this request.');
      return;
    }

    const originalActionMeta = action.meta;

    try {
      isRefreshing = true; // Set flag to prevent multiple refreshes

      // Refresh the token
      const refreshedToken = await store.dispatch(refreshAccessToken()).unwrap();

      console.log('Token refreshed:', refreshedToken);

      // Retry the original action if possible
      if (originalActionMeta && originalActionMeta.arg) {
        console.log('Retrying action:', action.type);
        const retryAction = {
          ...action,
          meta: originalActionMeta, // Pass back the original meta data
        };
        return store.dispatch(retryAction);
      } else {
        console.warn('No original action metadata available. Skipping retry.');
      }
    } catch (refreshError) {
      console.error('Token refresh failed. Logging out the user...');
      localStorage.clear(); // Clear tokens
      // Optionally redirect to login page
      // window.location.href = '/login'; // Redirect to login
    } finally {
      isRefreshing = false; // Reset the flag
    }
  }

  return next(action); // Proceed with other actions
};

export default authMiddleware;