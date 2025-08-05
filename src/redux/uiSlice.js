import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  modalOpen: false,
  notification: null, // { type: 'success' | 'error', message: '...' }
  theme: 'light',     // Optional: 'light' or 'dark'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    showModal: (state) => {
      state.modalOpen = true;
    },
    hideModal: (state) => {
      state.modalOpen = false;
    },
    showNotification: (state, action) => {
      state.notification = action.payload; // { type, message }
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const {
  setLoading,
  showModal,
  hideModal,
  showNotification,
  clearNotification,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
