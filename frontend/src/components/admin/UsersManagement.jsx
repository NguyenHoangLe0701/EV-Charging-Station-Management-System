// src/components/admin/UsersManagement.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const UsersManagement = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
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
      totalSpent: '5,200,000'
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
      totalSpent: '12,500,000'
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
      totalSpent: '0'
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
      totalSpent: '450,000'
    },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.id.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);
    
    const matchesFilter = filter === 'all' || user.status.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusClass = status === 'Hoạt động' ? 'active' : 'blocked';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const getRoleBadge = (role) => {
    const roleClass = role === 'Nhân viên' ? 'staff' : 'user';
    return <span className={`role-badge ${roleClass}`}>{role}</span>;
  };

  return (
    <div className="users-management">
      <div className="page-header">
        <div>
          <h2>Quản lý Người dùng</h2>
          <p className="page-subtitle">Quản lý tất cả người dùng và nhân viên trong hệ thống</p>
        </div>
        <button className="btn-primary">
          <i className="fas fa-plus"></i>
          Thêm người dùng
        </button>
      </div>

      <div className="stats-summary-bar">
        <div className="stat-item">
          <span className="stat-label">Tổng người dùng</span>
          <span className="stat-value">{users.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Đang hoạt động</span>
          <span className="stat-value highlight">{users.filter(u => u.status === 'Hoạt động').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Bị khóa</span>
          <span className="stat-value">{users.filter(u => u.status === 'Bị khóa').length}</span>
        </div>
      </div>

      <div className="management-toolbar">
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
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
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
                  <td><strong>{user.id}</strong></td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.name.charAt(0)}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>{user.package}</td>
                  <td><strong>{user.totalSessions}</strong></td>
                  <td><strong className="price">{user.totalSpent} VNĐ</strong></td>
                  <td>{user.joinDate}</td>
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
    </div>
  );
};

export default UsersManagement;
