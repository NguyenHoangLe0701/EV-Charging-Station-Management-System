// src/components/admin/AdminHeader.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoleDisplayName, getRoleColor } from '../../config/roles';
import authService from '../../api/authService';

const AdminHeader = ({ toggleSidebar }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
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
      { id: 1, message: 'Trạm Vincom cần bảo trì', type: 'warning', time: '5 phút trước', read: false },
      { id: 2, message: 'Thanh toán mới: 1,250,000 VNĐ', type: 'success', time: '12 phút trước', read: false },
      { id: 3, message: 'Người dùng mới đăng ký', type: 'info', time: '18 phút trước', read: false },
    ]);

    // Đóng dropdown khi click bên ngoài
    const handleClickOutside = (event) => {
      // Đóng user dropdown
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      // Đóng notification dropdown
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
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

  const handleNotificationClick = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
    // Đóng user dropdown nếu đang mở
    if (userDropdownOpen) {
      setUserDropdownOpen(false);
    }
  };

  const handleNotificationItemClick = (notifId) => {
    // Đánh dấu đã đọc
    setNotifications(prev => 
      prev.map(n => n.id === notifId ? { ...n, read: true } : n)
    );
  };

  const handleUserDropdownClick = () => {
    setUserDropdownOpen(!userDropdownOpen);
    // Đóng notification dropdown nếu đang mở
    if (notificationDropdownOpen) {
      setNotificationDropdownOpen(false);
    }
  };

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
        <div className="notification-wrapper" ref={notificationDropdownRef}>
          <button 
            className={`notification-btn ${notificationDropdownOpen ? 'active' : ''}`}
            onClick={handleNotificationClick}
            aria-label="Notifications"
          >
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>
          {notificationDropdownOpen && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>Thông báo</h4>
                {unreadCount > 0 && <span className="unread-count">{unreadCount} mới</span>}
                <button 
                  className="notification-close"
                  onClick={() => setNotificationDropdownOpen(false)}
                  aria-label="Close notifications"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="notification-list">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map(notif => (
                    <div 
                      key={notif.id} 
                      className={`notification-item ${notif.type} ${notif.read ? 'read' : ''}`}
                      onClick={() => handleNotificationItemClick(notif.id)}
                    >
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
                      {!notif.read && <div className="notification-dot"></div>}
                    </div>
                  ))
                ) : (
                  <div className="notification-empty">
                    <i className="fas fa-bell-slash"></i>
                    <p>Không có thông báo mới</p>
                  </div>
                )}
              </div>
              {notifications.length > 0 && (
                <button 
                  className="view-all-notifications" 
                  onClick={() => {
                    navigate('/admin/settings');
                    setNotificationDropdownOpen(false);
                  }}
                >
                  Xem tất cả
                </button>
              )}
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="user-dropdown-wrapper" ref={userDropdownRef}>
          <button 
            className={`user-dropdown ${userDropdownOpen ? 'active' : ''}`}
            onClick={handleUserDropdownClick}
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
            <i className={`fas fa-chevron-${userDropdownOpen ? 'up' : 'down'}`}></i>
          </button>

          {userDropdownOpen && (
            <div className="user-dropdown-menu">
              <div className="dropdown-user-info">
                <div 
                  className="dropdown-avatar"
                  style={{ 
                    background: `linear-gradient(135deg, ${getRoleColor(userInfo.role)}, ${getRoleColor(userInfo.role)}dd)`
                  }}
                >
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
                  setUserDropdownOpen(false);
                }}
              >
                <i className="fas fa-user"></i>
                <span>Hồ sơ</span>
              </button>
              <button 
                className="dropdown-item"
                onClick={() => {
                  navigate('/admin/settings');
                  setUserDropdownOpen(false);
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