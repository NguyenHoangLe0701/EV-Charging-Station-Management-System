// src/components/admin/ChargingSessionsManagement.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const ChargingSessionsManagement = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sessions] = useState([
    {
      id: 'SS001',
      user: 'Nguyễn Văn A',
      station: 'Vincom Đồng Khởi',
      charger: 'Charger #1',
      startTime: '2024-01-15 08:30',
      endTime: '2024-01-15 10:15',
      duration: '1h 45m',
      energy: '45.2 kWh',
      cost: '1,250,000 VNĐ',
      status: 'Hoàn thành'
    },
    {
      id: 'SS002',
      user: 'Trần Thị B',
      station: 'Saigon Centre',
      charger: 'Charger #3',
      startTime: '2024-01-15 09:00',
      endTime: null,
      duration: 'Đang sạc...',
      energy: '28.5 kWh',
      cost: '650,000 VNĐ',
      status: 'Đang sạc'
    },
    {
      id: 'SS003',
      user: 'Lê Văn C',
      station: 'Lotte Mart Q7',
      charger: 'Charger #2',
      startTime: '2024-01-14 14:20',
      endTime: '2024-01-14 16:45',
      duration: '2h 25m',
      energy: '62.8 kWh',
      cost: '1,850,000 VNĐ',
      status: 'Hoàn thành'
    },
  ]);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = 
      session.id.toLowerCase().includes(search.toLowerCase()) ||
      session.user.toLowerCase().includes(search.toLowerCase()) ||
      session.station.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === 'all' || session.status.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusClass = status === 'Hoàn thành' ? 'completed' : 
                       status === 'Đang sạc' ? 'charging' : 'cancelled';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  return (
    <div className="charging-sessions-management">
      <div className="page-header">
        <div>
          <h2>Quản lý Phiên Sạc</h2>
          <p className="page-subtitle">Theo dõi và quản lý tất cả các phiên sạc trong hệ thống</p>
        </div>
      </div>

      <div className="management-toolbar">
        <div className="search-filter-group">
          <div className="search-input-wrapper">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm theo ID, người dùng, trạm..."
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
            <option value="đang sạc">Đang sạc</option>
            <option value="hoàn thành">Hoàn thành</option>
            <option value="hủy">Đã hủy</option>
          </select>
        </div>

        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-label">Tổng phiên</span>
            <span className="stat-value">{sessions.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Đang sạc</span>
            <span className="stat-value highlight">{sessions.filter(s => s.status === 'Đang sạc').length}</span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Phiên</th>
              <th>Người dùng</th>
              <th>Trạm sạc</th>
              <th>Charger</th>
              <th>Bắt đầu</th>
              <th>Kết thúc</th>
              <th>Thời lượng</th>
              <th>Năng lượng</th>
              <th>Chi phí</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.length === 0 ? (
              <tr>
                <td colSpan="11" className="no-data">
                  <i className="fas fa-inbox"></i>
                  <p>Không tìm thấy phiên sạc nào</p>
                </td>
              </tr>
            ) : (
              filteredSessions.map(session => (
                <tr key={session.id}>
                  <td><strong>{session.id}</strong></td>
                  <td>{session.user}</td>
                  <td>{session.station}</td>
                  <td>{session.charger}</td>
                  <td>{session.startTime}</td>
                  <td>{session.endTime || '-'}</td>
                  <td>{session.duration}</td>
                  <td><strong>{session.energy}</strong></td>
                  <td><strong className="price">{session.cost}</strong></td>
                  <td>{getStatusBadge(session.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action btn-view" title="Xem chi tiết">
                        <i className="fas fa-eye"></i>
                      </button>
                      {session.status === 'Đang sạc' && (
                        <button className="btn-action btn-stop" title="Dừng sạc">
                          <i className="fas fa-stop"></i>
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

      {filteredSessions.length > 0 && (
        <div className="table-pagination">
          <span>Hiển thị 1-{filteredSessions.length} trong tổng số {sessions.length} phiên</span>
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

export default ChargingSessionsManagement;

