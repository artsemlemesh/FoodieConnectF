
import { refreshAccessToken } from "../features/authSlice";

const authMiddleware = (store) => (next) => async (action) => {
  if (action.type.endsWith('/rejected') && action.error.message === '401') {
    try {
      await store.dispatch(refreshAccessToken()).unwrap();
      // Retry the original action
      return next(action);
    } catch (error) {
      console.error('Token refresh failed, logging out user...');
      localStorage.clear(); // Clear tokens
    //   window.location.href = '/login'; // Redirect to login
    }
  }
  return next(action);
};

export default authMiddleware;