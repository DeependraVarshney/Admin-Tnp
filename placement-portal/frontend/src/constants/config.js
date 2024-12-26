// constants/config.js
export const CONFIG = {
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    FILE_UPLOAD: {
      MAX_SIZE: 5 * 1024 * 1024, // 5MB
      ALLOWED_TYPES: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
    },
    PAGINATION: {
      DEFAULT_PAGE_SIZE: 10,
      PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
    },
    DATE_FORMAT: 'DD/MM/YYYY',
    DATETIME_FORMAT: 'DD/MM/YYYY HH:mm'
  };
  
  