// store/middleware/errorMiddleware.js
export const errorMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
      // Handle error actions
      const error = action.payload;
      store.dispatch({
        type: 'ui/setError',
        payload: {
          message: error?.message || 'An error occurred',
          severity: 'error'
        }
      });
    }
    return next(action);
  };
  
  