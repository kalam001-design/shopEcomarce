import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],             // list of all orders for the user
  currentOrder: null,     // current order placed (used after checkout)
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.orders.push(action.payload); // add to order history
    },
    placeOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const {
  placeOrderStart,
  placeOrderSuccess,
  placeOrderFail,
  fetchOrdersSuccess,
  clearCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
