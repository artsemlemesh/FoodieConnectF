import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Base API URL
const apiUrl = 'http://127.0.0.1:8000';

// Get CSRF token from cookies
const getCSRFToken = () => Cookies.get('csrftoken');

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

// Update a cart item's quantity
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }) => {
    let accessToken = localStorage.getItem('access_token');

    const response = await axios.patch(
      `${apiUrl}/cart/cart/`,
      {
        product_id: productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('updateCartItem', response.data);

    return response.data; // Return the updated cart item
  }
);

// Fetch cart items
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { dispatch, rejectWithValue }) => {
    let accessToken = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`${apiUrl}/cart/cart/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('fetchCart', response);
      console.log('product', response.data);

      if (response.status !== 200) {
        throw new Error('Failed to fetch cart items');
      }
      // console.log('fetchCart', response)

      return await response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk('cart/addToCart', async (item) => {
  const csrfToken = getCSRFToken();

  const response = await fetch(`${apiUrl}/cart/cart/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }

  return await response.json();
});

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId) => {
    let accessToken = localStorage.getItem('access_token');
    try {
      const response = await axios.delete(
        `${apiUrl}/cart/cart/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          data: {
            product_id: productId,
          },
        }
      );
      console.log('removeFromCart', response);

      if (response.status !== 200) {
        throw new Error('Failed to remove item from cart');
      }

      return productId;
    } catch (error) {
      console.error('Error removing item from cart:', error);

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
        state.items = state.items.filter((item) => item.product.id !== action.payload);
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
        // Update the item in the cart
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
      });
  },
});

export default cartSlice.reducer;
