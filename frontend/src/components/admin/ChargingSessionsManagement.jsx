// src/components/admin/ChargingSessionsManagement.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const ChargingSessionsManagement = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  
  const [sessions] = useState([
    {
      id: 'SS001',
      user: 'Nguyễn Văn A',
      userEmail: 'nguyenvana@email.com',
      station: 'Vincom Đồng Khởi',
      stationId: 'STA001',
      charger: 'Charger #1',
      chargerId: 'CP001',
      startTime: '2024-01-15 08:30',
      endTime: '2024-01-15 10:15',
      duration: 105, // minutes
      energy: 45.2,
      cost: 1250000,
      status: 'Hoàn thành',
      paymentStatus: 'Đã thanh toán'
    },
    {
      id: 'SS002',
      user: 'Trần Thị B',
      userEmail: 'tranthib@email.com',
      station: 'Saigon Centre',
      stationId: 'STA002',
      charger: 'Charger #3',
      chargerId: 'CP003',
      startTime: '2024-01-15 09:00',
      endTime: null,
      duration: null,
      energy: 28.5,
      cost: 650000,
      status: 'Đang sạc',
      paymentStatus: 'Chưa thanh toán'
    },
    {
      id: 'SS003',
      user: 'Lê Văn C',
      userEmail: 'levanc@email.com',
      station: 'Lotte Mart Q7',
      stationId: 'STA003',
      charger: 'Charger #2',
      chargerId: 'CP002',
      startTime: '2024-01-14 14:20',
      endTime: '2024-01-14 16:45',
      duration: 145,
      energy: 62.8,
      cost: 1850000,
      status: 'Hoàn thành',
      paymentStatus: 'Đã thanh toán'
    },
    {
      id: 'SS004',
      user: 'Phạm Văn D',
      userEmail: 'phamvand@email.com',
      station: 'Bitexco Tower',
      stationId: 'STA004',
      charger: 'Charger #5',
      chargerId: 'CP005',
      startTime: '2024-01-14 10:15',
      endTime: '2024-01-14 10:30',
      duration: 15,
      energy: 5.2,
      cost: 150000,
      status: 'Đã hủy',
      paymentStatus: 'Đã hoàn tiền'
    },
    {
      id: 'SS005',
      user: 'Hoàng Thị E',
      userEmail: 'hoangthie@email.com',
      station: 'Vincom Đồng Khởi',
      stationId: 'STA001',
      charger: 'Charger #2',
      chargerId: 'CP002',
      startTime: '2024-01-13 11:45',
      endTime: '2024-01-13 13:20',
      duration: 95,
      energy: 38.5,
      cost: 1050000,
      status: 'Hoàn thành',
      paymentStatus: 'Đã thanh toán'
    },
  ]);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = 
      session.id.toLowerCase().includes(search.toLowerCase()) ||
      session.user.toLowerCase().includes(search.toLowerCase()) ||
      session.station.toLowerCase().includes(search.toLowerCase()) ||
      session.userEmail.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === 'all' || session.status.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const totalSessions = sessions.length;
  const activeSessions = sessions.filter(s => s.status === 'Đang sạc').length;
  const completedSessions = sessions.filter(s => s.status === 'Hoàn thành').length;
  const cancelledSessions = sessions.filter(s => s.status === 'Đã hủy').length;
  const totalEnergy = sessions
    .filter(s => s.status === 'Hoàn thành' || s.status === 'Đang sạc')
    .reduce((sum, s) => sum + s.energy, 0);
  const totalRevenue = sessions
    .filter(s => s.status === 'Hoàn thành')
    .reduce((sum, s) => sum + s.cost, 0);
  const avgDuration = sessions
    .filter(s => s.duration)
    .reduce((sum, s) => sum + s.duration, 0) / sessions.filter(s => s.duration).length;

  const getStatusBadge = (status) => {
    const statusClass = status === 'Hoàn thành' ? 'completed' : 
                       status === 'Đang sạc' ? 'charging' : 'cancelled';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'Đang sạc...';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <div className="charging-sessions-management">
      <div className="page-header">
        <div>
          <h2>Quản lý Phiên Sạc</h2>
          <p className="page-subtitle">Theo dõi và quản lý tất cả các phiên sạc trong hệ thống</p>
        </div>
        <div className="header-actions">
          <button className="btn-export">
            <i className="fas fa-download"></i>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="stats-cards-grid">
        <div className="stat-card sessions-total">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
              <i className="fas fa-plug"></i>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i>
              <span>+15.3%</span>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng phiên</p>
            <h3 className="stat-value">{totalSessions}</h3>
            <p className="stat-subtitle">Tất cả phiên sạc</p>
          </div>
        </div>

        <div className="stat-card sessions-active">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <i className="fas fa-bolt"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Đang sạc</p>
            <h3 className="stat-value">{activeSessions}</h3>
            <p className="stat-subtitle">Phiên đang hoạt động</p>
          </div>
        </div>

        <div className="stat-card sessions-completed">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Hoàn thành</p>
            <h3 className="stat-value">{completedSessions}</h3>
            <p className="stat-subtitle">{((completedSessions / totalSessions) * 100).toFixed(1)}% tổng số</p>
          </div>
        </div>

        <div className="stat-card sessions-energy">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <i className="fas fa-battery-full"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng năng lượng</p>
            <h3 className="stat-value">{totalEnergy.toFixed(1)} kWh</h3>
            <p className="stat-subtitle">Đã sạc</p>
          </div>
        </div>

        <div className="stat-card sessions-revenue">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
              <i className="fas fa-dollar-sign"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Doanh thu</p>
            <h3 className="stat-value">{formatCurrency(totalRevenue)} VNĐ</h3>
            <p className="stat-subtitle">Từ phiên hoàn thành</p>
          </div>
        </div>

        <div className="stat-card sessions-avg-duration">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
              <i className="fas fa-clock"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Thời gian TB</p>
            <h3 className="stat-value">{formatDuration(avgDuration)}</h3>
            <p className="stat-subtitle">Mỗi phiên</p>
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
              placeholder="Tìm kiếm theo ID, người dùng, trạm, email..."
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
            <option value="đã hủy">Đã hủy</option>
          </select>

          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả thời gian</option>
            <option value="today">Hôm nay</option>
            <option value="week">7 ngày qua</option>
            <option value="month">Tháng này</option>
          </select>
        </div>

        <div className="toolbar-actions">
          <button className="btn-secondary">
            <i className="fas fa-filter"></i>
            Lọc nâng cao
          </button>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="table-container enhanced-table-container">
        <table className="data-table enhanced-table">
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
              <th>Thanh toán</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.length === 0 ? (
              <tr>
                <td colSpan="12" className="no-data">
                  <i className="fas fa-inbox"></i>
                  <p>Không tìm thấy phiên sạc nào</p>
                </td>
              </tr>
            ) : (
              filteredSessions.map(session => (
                <tr key={session.id}>
                  <td>
                    <strong className="session-id">{session.id}</strong>
                  </td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">
                        {session.user.charAt(0)}
                      </div>
                      <div>
                        <div className="user-name">{session.user}</div>
                        <div className="user-email">{session.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="station-cell">
                      <i className="fas fa-map-marker-alt"></i>
                      <div>
                        <div className="station-name">{session.station}</div>
                        <div className="station-id">{session.stationId}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="charger-badge">{session.charger}</span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <div>{session.startTime.split(' ')[0]}</div>
                      <div className="time-cell">{session.startTime.split(' ')[1]}</div>
                    </div>
                  </td>
                  <td>
                    {session.endTime ? (
                      <div className="date-cell">
                        <div>{session.endTime.split(' ')[0]}</div>
                        <div className="time-cell">{session.endTime.split(' ')[1]}</div>
                      </div>
                    ) : (
                      <span className="no-end-time">-</span>
                    )}
                  </td>
                  <td>
                    <span className="duration-badge">
                      {formatDuration(session.duration)}
                    </span>
                  </td>
                  <td>
                    <strong className="energy-value">
                      {session.energy.toFixed(1)} kWh
                    </strong>
                  </td>
                  <td>
                    <strong className="price">{formatCurrency(session.cost)} VNĐ</strong>
                  </td>
                  <td>{getStatusBadge(session.status)}</td>
                  <td>
                    <span className={`payment-status ${session.paymentStatus === 'Đã thanh toán' ? 'paid' : session.paymentStatus === 'Chưa thanh toán' ? 'pending' : 'refunded'}`}>
                      {session.paymentStatus}
                    </span>
                  </td>
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
                      {session.status === 'Đã hủy' && (
                        <button className="btn-action btn-refund" title="Hoàn tiền">
                          <i className="fas fa-undo"></i>
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
          <span className="pagination-info">
            Hiển thị 1-{filteredSessions.length} trong tổng số {sessions.length} phiên
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

export default ChargingSessionsManagement;
