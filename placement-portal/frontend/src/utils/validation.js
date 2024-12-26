// utils/validation.js
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password) => {
    return {
      isValid: password.length >= 8,
      message: password.length < 8 ? 'Password must be at least 8 characters' : ''
    };
  };
  
  export const validateRequired = (value, fieldName) => {
    return {
      isValid: value && value.toString().trim().length > 0,
      message: !value ? `${fieldName} is required` : ''
    };
  };
  
 