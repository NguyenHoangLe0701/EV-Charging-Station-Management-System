// src/components/admin/PartnerManagement.jsx
// Quản lý đối tác B2B (Chủ trạm sạc)
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const PartnerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const partners = [
    {
      id: 1,
      name: 'Công ty TNHH Trạm Sạc Việt Nam',
      contactPerson: 'Nguyễn Văn A',
      email: 'contact@chargingvn.com',
      phone: '0901234567',
      stations: 2,
      totalRevenue: 1240000000,
      myShare: 248000000,
      status: 'active',
      joinDate: '01/01/2024',
      contractType: 'Revenue Share 80/20',
    },
    {
      id: 2,
      name: 'EV Station Solutions',
      contactPerson: 'Trần Thị B',
      email: 'info@evsolutions.vn',
      phone: '0907654321',
      stations: 1,
      totalRevenue: 620000000,
      myShare: 124000000,
      status: 'active',
      joinDate: '15/03/2024',
      contractType: 'Revenue Share 80/20',
    },
    {
      id: 3,
      name: 'Green Energy Partners',
      contactPerson: 'Lê Văn C',
      email: 'contact@greenenergy.vn',
      phone: '0912345678',
      stations: 0,
      totalRevenue: 0,
      myShare: 0,
      status: 'pending',
      joinDate: '20/06/2024',
      contractType: 'Chờ phê duyệt',
    },
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: partners.length,
    active: partners.filter(p => p.status === 'active').length,
    pending: partners.filter(p => p.status === 'pending').length,
    totalRevenue: partners.reduce((sum, p) => sum + p.totalRevenue, 0),
    totalStations: partners.reduce((sum, p) => sum + p.stations, 0),
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };

  return (
    <div className="management-page">
      <div className="page-header">
        <div>
          <h2>Quản Lý Đối Tác B2B</h2>
          <p className="page-subtitle">Quản lý các chủ trạm sạc và đối tác kinh doanh</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus"></i>
          Thêm đối tác mới
        </button>
      </div>

      {/* Stats Summary */}
      <div className="stats-summary-bar">
        <div className="stat-item">
          <span className="stat-label">Tổng đối tác</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Đang hoạt động</span>
          <span className="stat-value highlight">{stats.active}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Chờ phê duyệt</span>
          <span className="stat-value">{stats.pending}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Tổng trạm</span>
          <span className="stat-value">{stats.totalStations}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Tổng doanh thu</span>
          <span className="stat-value highlight">{formatCurrency(stats.totalRevenue)}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="management-toolbar">
        <div className="search-filter-group">
          <div className="search-input-wrapper">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm đối tác..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="pending">Chờ phê duyệt</option>
            <option value="suspended">Tạm ngưng</option>
          </select>
        </div>
        <div className="toolbar-actions">
          <button className="btn-secondary">
            <i className="fas fa-download"></i>
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Partners Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Đối tác</th>
              <th>Người liên hệ</th>
              <th>Số trạm</th>
              <th>Doanh thu</th>
              <th>Phần của đối tác</th>
              <th>Hợp đồng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredPartners.map(partner => (
              <tr key={partner.id}>
                <td>
                  <div>
                    <strong>{partner.name}</strong>
                    <br />
                    <small>{partner.email}</small>
                  </div>
                </td>
                <td>
                  <div>
                    {partner.contactPerson}
                    <br />
                    <small>{partner.phone}</small>
                  </div>
                </td>
                <td>
                  <span className="badge info">{partner.stations} trạm</span>
                </td>
                <td>
                  <strong>{formatCurrency(partner.totalRevenue)}</strong>
                </td>
                <td>
                  <span className="text-success">{formatCurrency(partner.myShare)}</span>
                </td>
                <td>
                  <small>{partner.contractType}</small>
                </td>
                <td>
                  <span className={`status-badge ${partner.status === 'active' ? 'active' : 'pending'}`}>
                    {partner.status === 'active' ? 'Hoạt động' : 'Chờ phê duyệt'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Xem chi tiết">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn-icon" title="Chỉnh sửa">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-icon" title="Xem báo cáo">
                      <i className="fas fa-chart-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="table-pagination">
        <div className="pagination-info">
          Hiển thị 1-{filteredPartners.length} trong tổng số {partners.length} đối tác
        </div>
        <div className="pagination-controls">
          <button className="btn-pagination" disabled>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="btn-pagination active">1</button>
          <button className="btn-pagination">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerManagement;

