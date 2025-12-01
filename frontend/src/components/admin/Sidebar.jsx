// src/components/admin/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getMenuItemsForRole, getRoleDisplayName, getRoleColor } from '../../config/roles';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Lấy thông tin user từ localStorage
  const getUserInfo = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return {
          email: user.email || 'admin@evcharge.vn',
          fullName: user.fullName || 'Quản trị viên',
          role: user.role?.toUpperCase() || 'ADMIN',
        };
      }
    } catch (error) {
      console.error('Error parsing user info:', error);
    }
    return {
      email: 'admin@evcharge.vn',
      fullName: 'Quản trị viên',
      role: 'ADMIN',
    };
  };

  const userInfo = getUserInfo();
  const menuItems = getMenuItemsForRole(userInfo.role);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}
      
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-bolt"></i>
            {isOpen && <span>EV Admin</span>}
          </div>
          <button 
            className="toggle-btn" 
            onClick={toggleSidebar}
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <i className={`fas fa-chevron-${isOpen ? 'left' : 'right'}`}></i>
          </button>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
              end
              onClick={() => {
                // Đóng sidebar trên mobile sau khi click
                if (window.innerWidth < 768) {
                  toggleSidebar();
                }
              }}
            >
              <i className={item.icon}></i>
              {isOpen && <span>{item.text}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div 
              className="avatar"
              style={{ 
                background: `linear-gradient(135deg, ${getRoleColor(userInfo.role)}, ${getRoleColor(userInfo.role)}dd)`
              }}
            >
              <i className="fas fa-user"></i>
            </div>
            {isOpen && (
              <div className="user-details">
                <p className="name">{userInfo.fullName}</p>
                <p className="role" style={{ color: getRoleColor(userInfo.role) }}>
                  {getRoleDisplayName(userInfo.role)}
                </p>
                <p className="email">{userInfo.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;