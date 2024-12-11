import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../utils/axiosClient';

const apiUrl = import.meta.env.VITE_APP_API_URL;


export const fetchOrderStatus = createAsyncThunk(
  'orders/fetchOrderStatus',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `${apiUrl}/cart/orders/${orderId}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(
        `${apiUrl}/cart/orders/${orderId}/update-status/`,
        { status }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`${apiUrl}/cart/orders/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderStatus.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default orderSlice.reducer;
