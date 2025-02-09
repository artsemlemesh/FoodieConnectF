import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosClient } from '../utils/axiosClient';

// Base API URL
const apiUrl = 'http://127.0.0.1:8000';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  pageViewCount: null,
  totalViews: null,
};

// Update a cart item's quantity
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch('/cart/cart/', {
        product_id: productId,
        quantity,
      });
      console.log('updateCartItem', response.data);
      return response.data; // Return the updated cart item
    } catch (error) {
      console.error('Error updating cart item:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('User is not authenticated');
      }
      const response = await axiosClient.get(`${apiUrl}/cart/cart/`);
      // console.log('fetchCart', response);
      return await response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchPageViewCount = createAsyncThunk(
  'tracking/fetchPageViewCount',
  async (pageUrl, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `${apiUrl}/cart/track-page-view/`,
        {
          params: { page_url: pageUrl },
        }
      );
      console.log('Api response:', response.data); // Log count to the console
      return response.data;
    } catch (error) {
      console.error('Error fetching page view count:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const trackPageView = createAsyncThunk(
  'tracking/trackPageView',
  async (pageUrl, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('User is not authenticated');
      }
      const response = await axiosClient.post(
        `${apiUrl}/cart/track-page-view/`,
        { page_url: pageUrl },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('Page view tracked:', response.data); // Log the response to the console
      return response.data;
    } catch (error) {
      console.error('Error tracking page view:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (item, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`${apiUrl}/cart/cart/`, item);
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`${apiUrl}/cart/cart/`, {
        data: { product_id: productId },
      });
      console.log('removeFromCart', response);
      return productId;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const checkoutCart = createAsyncThunk(
  'cart/checkoutCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const cartItems = state.cart.items; // Access cart items from state
      const cartTotal = cartItems.reduce(
        (total, item) => total + item.total_price,
        0
      );

      console.log('before stripe');

      const response = await axiosClient.post(
        `${apiUrl}/cart/create-payment-intent/`,
        {
          amount: cartTotal * 100,
        }
      );
      console.log('stripe', response);
      return response.data; // Contains the Stripe Checkout URL
    } catch (error) {
      console.error('Error during checkout:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Redux slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageViewCount.fulfilled, (state, action) => {
        console.log('Payload in reducer:', action.payload);  // Check what the payload contains

        state.pageViewCount = action.payload.daily_views
        state.totalViews = action.payload.total_views
      })
      .addCase(fetchPageViewCount.rejected, (state, action) => {
        console.error('Failed to fetch page view count:', action.payload);
        state.error = action.payload;
      })
      .addCase(trackPageView.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(trackPageView.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.lastTrackedPage = action.payload?.pageUrl || null; // Store page URL safely
      })
      .addCase(trackPageView.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to track page view';
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(
          (item) => item.product.id !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload; // Update the item with the new data
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(checkoutCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.checkoutUrl = action.payload.url; // Save the Stripe URL to state
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default cartSlice.reducer;
