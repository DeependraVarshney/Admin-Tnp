// hooks/useNotification.js
import { useDispatch } from 'react-redux';
import { addNotification, removeNotification } from '../store/slices/notificationSlice';

export const useNotification = () => {
  const dispatch = useDispatch();

  const showNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    dispatch(addNotification({ id, message, type }));

    if (duration) {
      setTimeout(() => {
        dispatch(removeNotification(id));
      }, duration);
    }
  };

  return {
    showSuccess: (message) => showNotification(message, 'success'),
    showError: (message) => showNotification(message, 'error'),
    showWarning: (message) => showNotification(message, 'warning'),
    showInfo: (message) => showNotification(message, 'info')
  };
};

