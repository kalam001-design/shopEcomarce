import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const product = action.payload;
      const exists = state.wishlistItems.find((item) => item.id === product.id);
      if (!exists) {
        state.wishlistItems.push(product);
      }
    },
    removeFromWishlist(state, action) {
      const id = action.payload;
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== id);
    },
    clearWishlist(state) {
      state.wishlistItems = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
