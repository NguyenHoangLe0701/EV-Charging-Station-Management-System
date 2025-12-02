// src/components/admin/UsersManagement.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const UsersManagement = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  
  const [users] = useState([
    {
      id: 'USR001',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0912345678',
      role: 'Người dùng',
      status: 'Hoạt động',
      package: 'Gói Tiêu Chuẩn',
      joinDate: '2024-01-10',
      totalSessions: 24,
      totalSpent: 5200000,
      avatar: null,
      lastActive: '2024-01-15 10:30'
    },
    {
      id: 'USR002',
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      role: 'Người dùng',
      status: 'Hoạt động',
      package: 'Gói Premium',
      joinDate: '2024-01-05',
      totalSessions: 42,
      totalSpent: 12500000,
      avatar: null,
      lastActive: '2024-01-15 09:15'
    },
    {
      id: 'USR003',
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0909123456',
      role: 'Nhân viên',
      status: 'Hoạt động',
      package: '-',
      joinDate: '2023-12-20',
      totalSessions: 0,
      totalSpent: 0,
      avatar: null,
      lastActive: '2024-01-15 08:00'
    },
    {
      id: 'USR004',
      name: 'Phạm Văn D',
      email: 'phamvand@email.com',
      phone: '0977888999',
      role: 'Người dùng',
      status: 'Bị khóa',
      package: 'Gói Cơ Bản',
      joinDate: '2024-01-12',
      totalSessions: 3,
      totalSpent: 450000,
      avatar: null,
      lastActive: '2024-01-13 15:20'
    },
    {
      id: 'USR005',
      name: 'Hoàng Thị E',
      email: 'hoangthie@email.com',
      phone: '0966554433',
      role: 'Người dùng',
      status: 'Hoạt động',
      package: 'Gói Premium',
      joinDate: '2024-01-08',
      totalSessions: 18,
      totalSpent: 4200000,
      avatar: null,
      lastActive: '2024-01-15 11:45'
    },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.id.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);
    
    const matchesStatusFilter = filter === 'all' || user.status.toLowerCase() === filter.toLowerCase();
    const matchesRoleFilter = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
    
    return matchesSearch && matchesStatusFilter && matchesRoleFilter;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Hoạt động').length;
  const blockedUsers = users.filter(u => u.status === 'Bị khóa').length;
  const premiumUsers = users.filter(u => u.package.includes('Premium')).length;
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0);

  const getStatusBadge = (status) => {
    const statusClass = status === 'Hoạt động' ? 'active' : 'blocked';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const getRoleBadge = (role) => {
    const roleClass = role === 'Nhân viên' ? 'staff' : 'user';
    return <span className={`role-badge ${roleClass}`}>{role}</span>;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <div className="users-management">
      <div className="page-header">
        <div>
          <h2>Quản lý Người dùng</h2>
          <p className="page-subtitle">Quản lý tất cả người dùng và nhân viên trong hệ thống</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <i className="fas fa-download"></i>
            Xuất Excel
          </button>
          <button className="btn-primary">
            <i className="fas fa-plus"></i>
            Thêm người dùng
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="stats-cards-grid">
        <div className="stat-card users-total">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i>
              <span>+8.2%</span>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng người dùng</p>
            <h3 className="stat-value">{totalUsers}</h3>
            <p className="stat-subtitle">Tất cả tài khoản</p>
          </div>
        </div>

        <div className="stat-card users-active">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <i className="fas fa-user-check"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Đang hoạt động</p>
            <h3 className="stat-value">{activeUsers}</h3>
            <p className="stat-subtitle">{((activeUsers / totalUsers) * 100).toFixed(1)}% tổng số</p>
          </div>
        </div>

        <div className="stat-card users-blocked">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
              <i className="fas fa-user-lock"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Bị khóa</p>
            <h3 className="stat-value">{blockedUsers}</h3>
            <p className="stat-subtitle">Cần xem xét</p>
          </div>
        </div>

        <div className="stat-card users-premium">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <i className="fas fa-crown"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Premium</p>
            <h3 className="stat-value">{premiumUsers}</h3>
            <p className="stat-subtitle">Gói cao cấp</p>
          </div>
        </div>

        <div className="stat-card users-revenue">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              <i className="fas fa-dollar-sign"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng chi tiêu</p>
            <h3 className="stat-value">{formatCurrency(totalRevenue)} VNĐ</h3>
            <p className="stat-subtitle">Từ tất cả người dùng</p>
          </div>
        </div>
      </div>

      {/* Enhanced Toolbar */}
      <div className="management-toolbar enhanced-toolbar">
        <div className="search-filter-group">
          <div className="search-input-wrapper">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm theo ID, tên, email, số điện thoại..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="hoạt động">Hoạt động</option>
            <option value="bị khóa">Bị khóa</option>
          </select>

          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="người dùng">Người dùng</option>
            <option value="nhân viên">Nhân viên</option>
          </select>
        </div>

        <div className="toolbar-actions">
          <div className="view-mode-toggle">
            <button 
              className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Chế độ bảng"
            >
              <i className="fas fa-table"></i>
            </button>
            <button 
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Chế độ lưới"
            >
              <i className="fas fa-th"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="table-container enhanced-table-container">
          <table className="data-table enhanced-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Người dùng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Gói dịch vụ</th>
                <th>Số phiên</th>
                <th>Tổng chi tiêu</th>
                <th>Ngày tham gia</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="11" className="no-data">
                    <i className="fas fa-user-slash"></i>
                    <p>Không tìm thấy người dùng nào</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td><strong className="user-id">{user.id}</strong></td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-meta">Hoạt động: {user.lastActive}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="email-cell">{user.email}</div>
                    </td>
                    <td>
                      <span className="phone-cell">{user.phone}</span>
                    </td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>
                      <span className={`package-badge ${user.package.includes('Premium') ? 'premium' : user.package.includes('Tiêu Chuẩn') ? 'standard' : 'basic'}`}>
                        {user.package}
                      </span>
                    </td>
                    <td>
                      <strong className="sessions-count">{user.totalSessions}</strong>
                    </td>
                    <td>
                      <strong className="price">{formatCurrency(user.totalSpent)} VNĐ</strong>
                    </td>
                    <td>
                      <div className="date-cell">{user.joinDate}</div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-view" title="Xem chi tiết">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn-action btn-edit" title="Chỉnh sửa">
                          <i className="fas fa-edit"></i>
                        </button>
                        {user.status === 'Hoạt động' ? (
                          <button className="btn-action btn-block" title="Khóa tài khoản">
                            <i className="fas fa-lock"></i>
                          </button>
                        ) : (
                          <button className="btn-action btn-unblock" title="Mở khóa">
                            <i className="fas fa-unlock"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="users-grid">
          {filteredUsers.length === 0 ? (
            <div className="no-data-card">
              <i className="fas fa-user-slash"></i>
              <p>Không tìm thấy người dùng nào</p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-card-header">
                  <div className="user-avatar-large">
                    {user.name.charAt(0)}
                  </div>
                  <div className="user-card-status">
                    {getStatusBadge(user.status)}
                    {getRoleBadge(user.role)}
                  </div>
                </div>
                <div className="user-card-body">
                  <h3 className="user-card-name">{user.name}</h3>
                  <p className="user-card-email">{user.email}</p>
                  <p className="user-card-phone">
                    <i className="fas fa-phone"></i>
                    {user.phone}
                  </p>
                  <div className="user-card-stats">
                    <div className="user-stat-item">
                      <span className="stat-label">Phiên</span>
                      <span className="stat-value">{user.totalSessions}</span>
                    </div>
                    <div className="user-stat-item">
                      <span className="stat-label">Chi tiêu</span>
                      <span className="stat-value">{formatCurrency(user.totalSpent)}</span>
                    </div>
                  </div>
                  <div className="user-card-package">
                    <span className={`package-badge ${user.package.includes('Premium') ? 'premium' : user.package.includes('Tiêu Chuẩn') ? 'standard' : 'basic'}`}>
                      {user.package}
                    </span>
                  </div>
                </div>
                <div className="user-card-footer">
                  <button className="btn-action btn-view" title="Xem chi tiết">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="btn-action btn-edit" title="Chỉnh sửa">
                    <i className="fas fa-edit"></i>
                  </button>
                  {user.status === 'Hoạt động' ? (
                    <button className="btn-action btn-block" title="Khóa">
                      <i className="fas fa-lock"></i>
                    </button>
                  ) : (
                    <button className="btn-action btn-unblock" title="Mở khóa">
                      <i className="fas fa-unlock"></i>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {filteredUsers.length > 0 && (
        <div className="table-pagination">
          <span className="pagination-info">
            Hiển thị 1-{filteredUsers.length} trong tổng số {users.length} người dùng
          </span>
          <div className="pagination-controls">
            <button className="btn-pagination" disabled>
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="page-info">Trang 1 / 1</span>
            <button className="btn-pagination" disabled>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
