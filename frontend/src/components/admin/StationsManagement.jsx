// src/components/admin/StationsManagement.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const StationsManagement = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [showModal, setShowModal] = useState(false);
  
  const [stations] = useState([
    { 
      id: 'STA001', 
      name: 'Vincom Đồng Khởi', 
      location: '72 Lê Thánh Tôn, Quận 1, TP.HCM',
      coordinates: '10.7769, 106.7009',
      status: 'Hoạt động', 
      ports: 8,
      activePorts: 6,
      availablePorts: 2,
      totalSessions: 450,
      revenue: 45000000,
      utilization: 85,
      avgRating: 4.8,
      lastMaintenance: '2024-01-10'
    },
    { 
      id: 'STA002', 
      name: 'Saigon Centre', 
      location: '65 Lê Lợi, Quận 1, TP.HCM',
      coordinates: '10.7756, 106.7019',
      status: 'Hoạt động', 
      ports: 6,
      activePorts: 4,
      availablePorts: 2,
      totalSessions: 320,
      revenue: 32000000,
      utilization: 78,
      avgRating: 4.6,
      lastMaintenance: '2024-01-08'
    },
    { 
      id: 'STA003', 
      name: 'Lotte Mart Q7', 
      location: '469 Nguyễn Hữu Thọ, Quận 7, TP.HCM',
      coordinates: '10.7311, 106.7216',
      status: 'Bảo trì', 
      ports: 10,
      activePorts: 0,
      availablePorts: 0,
      totalSessions: 280,
      revenue: 28000000,
      utilization: 0,
      avgRating: 4.5,
      lastMaintenance: '2024-01-15'
    },
    {
      id: 'STA004',
      name: 'Bitexco Tower',
      location: '19 Nguyễn Huệ, Quận 1, TP.HCM',
      coordinates: '10.7719, 106.7042',
      status: 'Hoạt động',
      ports: 12,
      activePorts: 9,
      availablePorts: 3,
      totalSessions: 520,
      revenue: 52000000,
      utilization: 82,
      avgRating: 4.9,
      lastMaintenance: '2024-01-12'
    },
    {
      id: 'STA005',
      name: 'Landmark 81',
      location: '208 Nguyễn Hữu Cảnh, Bình Thạnh, TP.HCM',
      coordinates: '10.7947, 106.7219',
      status: 'Hoạt động',
      ports: 15,
      activePorts: 12,
      availablePorts: 3,
      totalSessions: 680,
      revenue: 68000000,
      utilization: 88,
      avgRating: 4.7,
      lastMaintenance: '2024-01-11'
    }
  ]);

  const filteredStations = stations.filter(station => {
    const matchesSearch = 
      station.id.toLowerCase().includes(search.toLowerCase()) ||
      station.name.toLowerCase().includes(search.toLowerCase()) ||
      station.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === 'all' || station.status.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const totalStations = stations.length;
  const activeStations = stations.filter(s => s.status === 'Hoạt động').length;
  const maintenanceStations = stations.filter(s => s.status === 'Bảo trì').length;
  const totalPorts = stations.reduce((sum, s) => sum + s.ports, 0);
  const activePorts = stations.reduce((sum, s) => sum + s.activePorts, 0);
  const totalRevenue = stations.reduce((sum, s) => sum + s.revenue, 0);
  const avgUtilization = stations
    .filter(s => s.status === 'Hoạt động')
    .reduce((sum, s) => sum + s.utilization, 0) / activeStations;

  const getStatusBadge = (status) => {
    const statusClass = status === 'Hoạt động' ? 'active' : 
                       status === 'Bảo trì' ? 'maintenance' : 'inactive';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(2) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <div className="stations-management">
      <div className="page-header">
        <div>
          <h2>Quản lý Trạm Sạc</h2>
          <p className="page-subtitle">Quản lý tất cả các trạm sạc và điểm sạc trong hệ thống</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <i className="fas fa-download"></i>
            Xuất báo cáo
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <i className="fas fa-plus"></i>
            Thêm trạm mới
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="stats-cards-grid">
        <div className="stat-card stations-total">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
              <i className="fas fa-charging-station"></i>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i>
              <span>+2</span>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng số trạm</p>
            <h3 className="stat-value">{totalStations}</h3>
            <p className="stat-subtitle">Tất cả trạm sạc</p>
          </div>
        </div>

        <div className="stat-card stations-active">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Đang hoạt động</p>
            <h3 className="stat-value">{activeStations}</h3>
            <p className="stat-subtitle">{((activeStations / totalStations) * 100).toFixed(1)}% tổng số</p>
          </div>
        </div>

        <div className="stat-card stations-ports">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              <i className="fas fa-plug"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng cổng sạc</p>
            <h3 className="stat-value">{totalPorts}</h3>
            <p className="stat-subtitle">{activePorts} đang sử dụng</p>
          </div>
        </div>

        <div className="stat-card stations-utilization">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <i className="fas fa-chart-line"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tỷ lệ sử dụng TB</p>
            <h3 className="stat-value">{avgUtilization.toFixed(1)}%</h3>
            <p className="stat-subtitle">Trung bình</p>
          </div>
        </div>

        <div className="stat-card stations-revenue">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
              <i className="fas fa-dollar-sign"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng doanh thu</p>
            <h3 className="stat-value">{formatCurrency(totalRevenue)} VNĐ</h3>
            <p className="stat-subtitle">Tất cả trạm</p>
          </div>
        </div>

        <div className="stat-card stations-maintenance">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
              <i className="fas fa-tools"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Đang bảo trì</p>
            <h3 className="stat-value">{maintenanceStations}</h3>
            <p className="stat-subtitle">Cần xử lý</p>
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
              placeholder="Tìm kiếm theo ID, tên, địa chỉ..."
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
            <option value="bảo trì">Bảo trì</option>
            <option value="ngừng hoạt động">Ngừng hoạt động</option>
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
                <th>Tên trạm</th>
                <th>Địa chỉ</th>
                <th>Tổng cổng</th>
                <th>Đang dùng</th>
                <th>Còn trống</th>
                <th>Tỷ lệ sử dụng</th>
                <th>Tổng phiên</th>
                <th>Doanh thu</th>
                <th>Đánh giá</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.length === 0 ? (
                <tr>
                  <td colSpan="12" className="no-data">
                    <i className="fas fa-charging-station"></i>
                    <p>Không tìm thấy trạm sạc nào</p>
                  </td>
                </tr>
              ) : (
                filteredStations.map(station => (
                  <tr key={station.id}>
                    <td><strong className="station-id">{station.id}</strong></td>
                    <td>
                      <div className="station-info-cell">
                        <strong>{station.name}</strong>
                        <div className="station-meta">ID: {station.id}</div>
                      </div>
                    </td>
                    <td className="location-cell">
                      <div className="location-content">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{station.location}</span>
                      </div>
                    </td>
                    <td>
                      <strong className="ports-count">{station.ports}</strong>
                    </td>
                    <td>
                      <span className="in-use-badge">{station.activePorts}</span>
                    </td>
                    <td>
                      <span className="available-badge">{station.availablePorts}</span>
                    </td>
                    <td>
                      <div className="utilization-container">
                        <div className="utilization-bar">
                          <div 
                            className="utilization-fill" 
                            style={{ 
                              width: `${station.utilization}%`,
                              background: station.utilization > 80 ? '#10b981' : station.utilization > 50 ? '#f59e0b' : '#ef4444'
                            }}
                          ></div>
                        </div>
                        <span className="utilization-text">{station.utilization}%</span>
                      </div>
                    </td>
                    <td>
                      <strong className="sessions-count">{station.totalSessions}</strong>
                    </td>
                    <td>
                      <strong className="price">{formatCurrency(station.revenue)} VNĐ</strong>
                    </td>
                    <td>
                      <div className="rating-cell">
                        <i className="fas fa-star" style={{ color: '#fbbf24' }}></i>
                        <span>{station.avgRating}</span>
                      </div>
                    </td>
                    <td>{getStatusBadge(station.status)}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-view" title="Xem chi tiết">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn-action btn-edit" title="Chỉnh sửa">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn-action btn-manage" title="Quản lý cổng sạc">
                          <i className="fas fa-plug"></i>
                        </button>
                        {station.status === 'Hoạt động' && (
                          <button className="btn-action btn-maintenance" title="Đưa vào bảo trì">
                            <i className="fas fa-tools"></i>
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
        <div className="stations-grid">
          {filteredStations.length === 0 ? (
            <div className="no-data-card">
              <i className="fas fa-charging-station"></i>
              <p>Không tìm thấy trạm sạc nào</p>
            </div>
          ) : (
            filteredStations.map(station => (
              <div key={station.id} className="station-card">
                <div className="station-card-header">
                  <div className="station-card-icon">
                    <i className="fas fa-charging-station"></i>
                  </div>
                  <div className="station-card-status">
                    {getStatusBadge(station.status)}
                  </div>
                </div>
                <div className="station-card-body">
                  <h3 className="station-card-name">{station.name}</h3>
                  <p className="station-card-location">
                    <i className="fas fa-map-marker-alt"></i>
                    {station.location}
                  </p>
                  <div className="station-card-stats">
                    <div className="station-stat-item">
                      <span className="stat-label">Cổng</span>
                      <span className="stat-value">
                        {station.activePorts}/{station.ports}
                      </span>
                    </div>
                    <div className="station-stat-item">
                      <span className="stat-label">Sử dụng</span>
                      <span className="stat-value">{station.utilization}%</span>
                    </div>
                    <div className="station-stat-item">
                      <span className="stat-label">Phiên</span>
                      <span className="stat-value">{station.totalSessions}</span>
                    </div>
                  </div>
                  <div className="station-card-revenue">
                    <span className="revenue-label">Doanh thu</span>
                    <span className="revenue-value">{formatCurrency(station.revenue)} VNĐ</span>
                  </div>
                  <div className="station-card-rating">
                    <i className="fas fa-star" style={{ color: '#fbbf24' }}></i>
                    <span>{station.avgRating}</span>
                  </div>
                </div>
                <div className="station-card-footer">
                  <button className="btn-action btn-view" title="Xem chi tiết">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="btn-action btn-edit" title="Chỉnh sửa">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn-action btn-manage" title="Quản lý">
                    <i className="fas fa-cog"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {filteredStations.length > 0 && (
        <div className="table-pagination">
          <span className="pagination-info">
            Hiển thị 1-{filteredStations.length} trong tổng số {stations.length} trạm
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

export default StationsManagement;
