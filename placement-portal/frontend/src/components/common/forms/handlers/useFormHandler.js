export const validateRequired = (value) => {
    if (!value || value.trim() === '') {
      return 'This field is required';
    }
    return '';
  };
  
  export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!regex.test(email)) return 'Invalid email format';
    return '';
  };
  
  export const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  };