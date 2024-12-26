// utils/errorHandler.js
export const handleError = (error) => {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'No response from server',
        status: 503
      };
    } else {
      // Error in request setup
      return {
        message: error.message,
        status: 400
      };
    }
  };
  
  