// store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';
  
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    error: null,
    notifications: [],
    currentModal: null,
    sidebarOpen: true
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    setCurrentModal: (state, action) => {
      state.currentModal = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    }
  }
});

export const {
  setLoading,
  setError,
  clearError,
  addNotification,
  removeNotification,
  setCurrentModal,
  toggleSidebar
} = uiSlice.actions;
export default uiSlice.reducer;

