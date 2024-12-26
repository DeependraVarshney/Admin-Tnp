// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { errorMiddleware } from './middleware/errorMiddleware';
import { apiMiddleware } from './middleware/apiMiddleware';
import rootReducer from './slices';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorMiddleware, apiMiddleware)
});

