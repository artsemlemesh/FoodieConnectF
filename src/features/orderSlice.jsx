import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../utils/axiosClient';

const apiUrl = import.meta.env.VITE_APP_API_URL;

//fix this backend later, no such endpoint
export const fetchOrderStatus = createAsyncThunk(
  'orders/fetchOrderStatus',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `${apiUrl}/cart/orders/${orderId}/`
      );
      console.log('fetchOrderStatus', response);
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

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async ({ orderId }, { rejectWithValue }) => {
    try {
      console.log('hey');
      await axiosClient.delete(`${apiUrl}/cart/order/${orderId}/delete/`);
      return { id: orderId };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/cart/orders/`);
      console.log('fetch', response.data);
      // console.log('user', response.data[0].user);
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
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.id
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
