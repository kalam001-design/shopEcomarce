import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],        // list of all categories
  activeCategory: null,  // currently selected category (e.g., 'shirt')
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    clearActiveCategory: (state) => {
      state.activeCategory = null;
    },
  },
});

export const { setCategories, setActiveCategory, clearActiveCategory } = categorySlice.actions;

export default categorySlice.reducer;
