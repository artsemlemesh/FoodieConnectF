import { configureStore } from '@reduxjs/toolkit';
import authReducer, { refreshAccessToken } from '../features/authSlice';
import cartReducer from '../features/cartSlice';
import productReducer from '../features/productSlice';
import orderReducer from '../features/orderSlice';

import authMiddleware from '../middleware/authMiddleware';
import { setupAxiosInterceptors } from '../utils/axiosClient';
import { scheduleTokenRefresh } from '../utils/tokenRefreshScheduler';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    orders: orderReducer,
  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ thunk: true }).concat(authMiddleware),
});
setupAxiosInterceptors(store.dispatch);


// Check token validity and start the scheduler
const refreshToken = localStorage.getItem('refresh_token');
if (refreshToken) {
  store
    .dispatch(refreshAccessToken())
    .unwrap()
    .then(() => {
      scheduleTokenRefresh(store.dispatch); // Start proactive refresh if valid
    })
    .catch((error) => {
      console.error('Initial token refresh failed. Logging out...');
      localStorage.clear();
      window.location.href = '/'; // Redirect to the main page
    });
} else {
  console.warn('No refresh token found. User needs to log in.');
}

export default store;
