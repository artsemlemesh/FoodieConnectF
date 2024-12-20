import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../utils/axiosClient';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/cart/products/');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteProducts = createAsyncThunk(
  'products/deleteProducts',
  async (pk, { rejectWithValue }) => {
    try {
      // Perform the delete API request
      const response = await axiosClient.delete(`/cart/products/${pk}/`);
      return pk; // Return the product ID for deletion
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.status = 'loading'; // Optional: update loading state
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Optional: update to succeeded state
        const itemId = action.payload; // The product ID returned from the API

        // Delete the product by filtering out the product with the given ID
        state.items = state.items.filter((item) => item.id !== itemId);
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.status = 'failed'; // Optional: update to failed state
        state.error = action.payload || action.error.message;
      });
  },
});

export default productSlice.reducer;
