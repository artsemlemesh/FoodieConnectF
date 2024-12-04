import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../utils/axiosClient';

export const fetchOrderStatus = createAsyncThunk(
  'orders/fetchOrderStatus',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`${apiUrl}/cart/orders/${orderId}/`);
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

const orderSlice = createSlice({
  name: 'orders',
  initialState: { status: 'Pending', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderStatus.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export default orderSlice.reducer;
