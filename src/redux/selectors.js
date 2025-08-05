// src/redux/selectors.js
import { createSelector } from '@reduxjs/toolkit';

// Wishlist selector
const selectWishlistState = (state) => state.wishlist;

export const selectWishlistItems = createSelector(
  [selectWishlistState],
  (wishlist) => wishlist.wishlistItems || []
);

// Cart selector
const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items || []
);

// Auth selector
const selectAuthState = (state) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user || null
);
