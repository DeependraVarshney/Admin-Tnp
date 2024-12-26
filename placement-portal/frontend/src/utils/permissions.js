// utils/permissions.js
export const checkPermission = (userRole, requiredRole) => {
    const roleHierarchy = {
      admin: 4,
      tpo: 3,
      company: 2,
      student: 1
    };
  
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };
  
  export const hasPermission = (userPermissions, requiredPermission) => {
    return userPermissions.includes(requiredPermission);
  };
  
  