// PermissionGuard - Component để kiểm tra quyền truy cập
import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasPermission, PERMISSIONS } from '../../config/roles';

const PermissionGuard = ({ children, permission, fallback = '/admin' }) => {
  // Lấy thông tin user từ localStorage
  const getUserRole = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user.role?.toUpperCase() || 'USER';
      }
    } catch (error) {
      console.error('Error parsing user info:', error);
    }
    return 'USER';
  };

  const userRole = getUserRole();

  // Kiểm tra quyền
  if (permission && !hasPermission(userRole, permission)) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

export default PermissionGuard;

