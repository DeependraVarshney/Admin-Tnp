// utils/test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { LoadingProvider } from '../context/LoadingContext';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/slices';

const createTestStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

const AllTheProviders = ({ children, initialState = {} }) => {
  const store = createTestStore(initialState);
  
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LoadingProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </LoadingProvider>
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

