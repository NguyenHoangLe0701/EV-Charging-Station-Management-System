// src/components/admin/AdminHeader.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoleDisplayName, getRoleColor } from '../../config/roles';
import authService from '../../api/authService';

const AdminHeader = ({ toggleSidebar }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const loadUserInfo = () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserInfo({
            email: user.email || 'admin@evcharge.vn',
            fullName: user.fullName || 'Quản trị viên',
            role: user.role?.toUpperCase() || 'ADMIN',
          });
        }
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    };

    loadUserInfo();

    // Mock notifications - có thể thay bằng API call
    setNotifications([
      { id: 1, message: 'Trạm Vincom cần bảo trì', type: 'warning', time: '5 phút trước' },
      { id: 2, message: 'Thanh toán mới: 1,250,000 VNĐ', type: 'success', time: '12 phút trước' },
      { id: 3, message: 'Người dùng mới đăng ký', type: 'info', time: '18 phút trước' },
    ]);

    // Đóng dropdown khi click bên ngoài
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!userInfo) {
    return null;
  }

  return (
    <header className="admin-header">
      <button 
        className="menu-toggle" 
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className="fas fa-bars"></i>
      </button>
      
      <div className="header-title">
        <h2>Quản trị hệ thống</h2>
      </div>
      
      <div className="header-actions">
        {/* Search */}
        <button className="search-btn" aria-label="Search">
          <i className="fas fa-search"></i>
        </button>

        {/* Notifications */}
        <div className="notification-wrapper">
          <button 
            className="notification-btn" 
            onClick={() => setDropdownOpen(false)}
            aria-label="Notifications"
          >
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>
          {unreadCount > 0 && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>Thông báo</h4>
                <span className="unread-count">{unreadCount} mới</span>
              </div>
              <div className="notification-list">
                {notifications.slice(0, 3).map(notif => (
                  <div key={notif.id} className={`notification-item ${notif.type}`}>
                    <div className="notification-icon">
                      <i className={`fas fa-${
                        notif.type === 'warning' ? 'exclamation-triangle' : 
                        notif.type === 'success' ? 'check-circle' : 'info-circle'
                      }`}></i>
                    </div>
                    <div className="notification-content">
                      <p>{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-all-notifications" onClick={() => navigate('/admin/settings')}>
                Xem tất cả
              </button>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="user-dropdown-wrapper" ref={dropdownRef}>
          <button 
            className="user-dropdown" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="User menu"
          >
            <div 
              className="user-avatar"
              style={{ 
                background: `linear-gradient(135deg, ${getRoleColor(userInfo.role)}, ${getRoleColor(userInfo.role)}dd)`
              }}
            >
              {userInfo.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="user-info-header">
              <span className="user-name">{userInfo.fullName}</span>
              <span className="user-role" style={{ color: getRoleColor(userInfo.role) }}>
                {getRoleDisplayName(userInfo.role)}
              </span>
            </div>
            <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
          </button>

          {dropdownOpen && (
            <div className="user-dropdown-menu">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">
                  {userInfo.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="dropdown-name">{userInfo.fullName}</p>
                  <p className="dropdown-email">{userInfo.email}</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button 
                className="dropdown-item"
                onClick={() => {
                  navigate('/admin/settings');
                  setDropdownOpen(false);
                }}
              >
                <i className="fas fa-user"></i>
                <span>Hồ sơ</span>
              </button>
              <button 
                className="dropdown-item"
                onClick={() => {
                  navigate('/admin/settings');
                  setDropdownOpen(false);
                }}
              >
                <i className="fas fa-cog"></i>
                <span>Cài đặt</span>
              </button>
              <div className="dropdown-divider"></div>
              <button 
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;