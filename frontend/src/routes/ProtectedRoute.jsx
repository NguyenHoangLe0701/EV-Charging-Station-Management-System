import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ requiredRole = null }) => {
    const auth = useAuth();

    // Safety check: Nếu AuthContext không được cung cấp
    if (!auth) {
        console.error('AuthContext is not provided. Make sure App is wrapped with AuthProvider.');
        return <Navigate to="/login" replace />;
    }

    const { isAuthenticated } = auth;

    // Kiểm tra đăng nhập
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Kiểm tra role nếu có yêu cầu
    if (requiredRole) {
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                const userRole = user.role?.toUpperCase() || 'USER';
                const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
                
                if (!requiredRoles.includes(userRole)) {
                    // Nếu không có quyền, redirect về trang phù hợp
                    if (userRole === 'ADMIN' || userRole === 'MANAGER') {
                        return <Navigate to="/admin" replace />;
                    }
                    return <Navigate to="/driver/profile" replace />;
                }
            }
        } catch (error) {
            console.error('Error checking role:', error);
            return <Navigate to="/login" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;