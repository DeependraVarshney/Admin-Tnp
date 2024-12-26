// store/middleware/apiMiddleware.js
export const apiMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/pending')) {
      store.dispatch({ type: 'ui/setLoading', payload: true });
    } else if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
      store.dispatch({ type: 'ui/setLoading', payload: false });
    }
    return next(action);
  };
  
  