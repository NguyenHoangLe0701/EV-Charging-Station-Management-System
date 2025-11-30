// src/components/admin/StationsManagement.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const StationsManagement = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
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
      totalSessions: 450,
      revenue: '45,000,000',
      utilization: 85
    },
    { 
      id: 'STA002', 
      name: 'Saigon Centre', 
      location: '65 Lê Lợi, Quận 1, TP.HCM',
      coordinates: '10.7756, 106.7019',
      status: 'Hoạt động', 
      ports: 6,
      activePorts: 4,
      totalSessions: 320,
      revenue: '32,000,000',
      utilization: 78
    },
    { 
      id: 'STA003', 
      name: 'Lotte Mart Q7', 
      location: '469 Nguyễn Hữu Thọ, Quận 7, TP.HCM',
      coordinates: '10.7311, 106.7216',
      status: 'Bảo trì', 
      ports: 10,
      activePorts: 0,
      totalSessions: 280,
      revenue: '28,000,000',
      utilization: 0
    },
    {
      id: 'STA004',
      name: 'Bitexco Tower',
      location: '19 Nguyễn Huệ, Quận 1, TP.HCM',
      coordinates: '10.7719, 106.7042',
      status: 'Hoạt động',
      ports: 12,
      activePorts: 9,
      totalSessions: 520,
      revenue: '52,000,000',
      utilization: 82
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

  const getStatusBadge = (status) => {
    const statusClass = status === 'Hoạt động' ? 'active' : 
                       status === 'Bảo trì' ? 'maintenance' : 'inactive';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  return (
    <div className="stations-management">
      <div className="page-header">
        <div>
          <h2>Quản lý Trạm Sạc</h2>
          <p className="page-subtitle">Quản lý tất cả các trạm sạc và điểm sạc trong hệ thống</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus"></i>
          Thêm trạm mới
        </button>
      </div>

      <div className="stats-summary-bar">
        <div className="stat-item">
          <span className="stat-label">Tổng số trạm</span>
          <span className="stat-value">{stations.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Đang hoạt động</span>
          <span className="stat-value highlight">{stations.filter(s => s.status === 'Hoạt động').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Tổng cổng sạc</span>
          <span className="stat-value">{stations.reduce((sum, s) => sum + s.ports, 0)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Cổng đang dùng</span>
          <span className="stat-value">{stations.reduce((sum, s) => sum + s.activePorts, 0)}</span>
        </div>
      </div>

      <div className="management-toolbar">
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
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên trạm</th>
              <th>Địa chỉ</th>
              <th>Tổng cổng</th>
              <th>Đang dùng</th>
              <th>Tỷ lệ sử dụng</th>
              <th>Tổng phiên</th>
              <th>Doanh thu</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredStations.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-data">
                  <i className="fas fa-charging-station"></i>
                  <p>Không tìm thấy trạm sạc nào</p>
                </td>
              </tr>
            ) : (
              filteredStations.map(station => (
                <tr key={station.id}>
                  <td><strong>{station.id}</strong></td>
                  <td>
                    <div className="station-info">
                      <strong>{station.name}</strong>
                    </div>
                  </td>
                  <td className="location-cell">
                    <i className="fas fa-map-marker-alt"></i>
                    {station.location}
                  </td>
                  <td><strong>{station.ports}</strong></td>
                  <td>
                    <span className={station.activePorts > 0 ? 'in-use' : ''}>
                      {station.activePorts}
                    </span>
                  </td>
                  <td>
                    <div className="utilization-bar">
                      <div 
                        className="utilization-fill" 
                        style={{ width: `${station.utilization}%` }}
                      ></div>
                      <span>{station.utilization}%</span>
                    </div>
                  </td>
                  <td>{station.totalSessions}</td>
                  <td><strong className="price">{station.revenue} VNĐ</strong></td>
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
    </div>
  );
};

export default StationsManagement;