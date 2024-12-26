// hooks/usePermissions.js
import { useSelector } from 'react-redux';
import { checkPermission } from '../utils/permissions';

export const usePermissions = () => {
  const { user } = useSelector(state => state.auth);

  const hasPermission = (requiredRole) => {
    return checkPermission(user?.role, requiredRole);
  };

  const canAccessRoute = (route) => {
    // Add route-specific permission logic
    return true;
  };

  return {
    hasPermission,
    canAccessRoute,
    userRole: user?.role
  };
};

