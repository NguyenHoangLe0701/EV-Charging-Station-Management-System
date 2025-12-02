// src/components/admin/PartnerDashboard.jsx
// Dashboard cho Chủ trạm sạc (B2B Partner)
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminManagement.css';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedStation, setSelectedStation] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data cho chủ trạm sạc
  const myStations = [
    { id: 1, name: 'Vincom Đồng Khởi', location: '72 Lê Thánh Tôn, Q1', status: 'active', ports: 8, activePorts: 6 },
    { id: 2, name: 'Saigon Centre', location: '65 Lê Lợi, Q1', status: 'active', ports: 6, activePorts: 4 },
  ];

  const revenueData = [
    { day: 'T2', revenue: 12500000, sessions: 45, settlement: 10000000 },
    { day: 'T3', revenue: 15200000, sessions: 52, settlement: 12160000 },
    { day: 'T4', revenue: 14500000, sessions: 48, settlement: 11600000 },
    { day: 'T5', revenue: 18200000, sessions: 62, settlement: 14560000 },
    { day: 'T6', revenue: 21000000, sessions: 68, settlement: 16800000 },
    { day: 'T7', revenue: 16500000, sessions: 55, settlement: 13200000 },
    { day: 'CN', revenue: 14800000, sessions: 50, settlement: 11840000 },
  ];

  const monthlyRevenue = [
    { month: 'T1', total: 420000000, myShare: 336000000, platformFee: 84000000 },
    { month: 'T2', total: 485000000, myShare: 388000000, platformFee: 97000000 },
    { month: 'T3', total: 520000000, myShare: 416000000, platformFee: 104000000 },
    { month: 'T4', total: 495000000, myShare: 396000000, platformFee: 99000000 },
    { month: 'T5', total: 580000000, myShare: 464000000, platformFee: 116000000 },
    { month: 'T6', total: 620000000, myShare: 496000000, platformFee: 124000000 },
  ];

  const stationPerformance = [
    { name: 'Vincom Đồng Khởi', sessions: 180, revenue: 45000000, utilization: 92, myShare: 36000000 },
    { name: 'Saigon Centre', sessions: 150, revenue: 38000000, utilization: 85, myShare: 30400000 },
  ];

  const settlementHistory = [
    { id: 'ST001', period: 'Tháng 6/2024', totalRevenue: 620000000, platformFee: 124000000, myShare: 496000000, status: 'Đã thanh toán', date: '01/07/2024' },
    { id: 'ST002', period: 'Tháng 5/2024', totalRevenue: 580000000, platformFee: 116000000, myShare: 464000000, status: 'Đã thanh toán', date: '01/06/2024' },
    { id: 'ST003', period: 'Tháng 4/2024', totalRevenue: 495000000, platformFee: 99000000, myShare: 396000000, status: 'Đã thanh toán', date: '01/05/2024' },
  ];

  const stats = {
    totalStations: myStations.length,
    activeStations: myStations.filter(s => s.status === 'active').length,
    todayRevenue: 28500000,
    todaySessions: 12,
    monthlyRevenue: 620000000,
    monthlySettlement: 496000000,
    pendingSettlement: 28500000,
    totalPorts: myStations.reduce((sum, s) => sum + s.ports, 0),
    activePorts: myStations.reduce((sum, s) => sum + s.activePorts, 0),
    utilizationRate: 76.5,
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };

  return (
    <div className="dashboard-content">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Chủ Trạm Sạc</h1>
          <p className="subtitle">
            Quản lý trạm sạc và theo dõi doanh thu của bạn
            <span className="live-indicator">
              <span className="pulse"></span>
              Live
            </span>
          </p>
        </div>
        <div className="header-info">
          <div className="date-info">
            <i className="fas fa-calendar"></i>
            <span>{currentTime.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="time-info">
            <i className="fas fa-clock"></i>
            <span>{currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary" onClick={() => navigate('/admin/partner/stations')}>
          <div className="stat-icon">
            <i className="fas fa-charging-station"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalStations}</h3>
            <p>Trạm sạc của tôi</p>
            <div className="stat-details">
              <span className="stat-change positive">{stats.activeStations} đang hoạt động</span>
              <span className="stat-sub">{stats.totalPorts} cổng sạc</span>
            </div>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>

        <div className="stat-card success" onClick={() => navigate('/admin/partner/revenue')}>
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3>{(stats.todayRevenue / 1000000).toFixed(1)}M</h3>
            <p>Doanh thu hôm nay</p>
            <div className="stat-details">
              <span className="stat-change positive">+15.2% so với hôm qua</span>
              <span className="stat-sub">{formatCurrency(stats.todayRevenue)}</span>
            </div>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <i className="fas fa-wallet"></i>
          </div>
          <div className="stat-content">
            <h3>{(stats.monthlySettlement / 1000000).toFixed(0)}M</h3>
            <p>Doanh thu tháng này</p>
            <div className="stat-details">
              <span className="stat-change positive">80% chia sẻ</span>
              <span className="stat-sub">{formatCurrency(stats.monthlySettlement)}</span>
            </div>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>{(stats.pendingSettlement / 1000000).toFixed(1)}M</h3>
            <p>Chờ thanh toán</p>
            <div className="stat-details">
              <span className="stat-change">Sẽ thanh toán 01/07</span>
              <span className="stat-sub">{formatCurrency(stats.pendingSettlement)}</span>
            </div>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-icon">
            <i className="fas fa-plug"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.todaySessions}</h3>
            <p>Phiên sạc hôm nay</p>
            <div className="stat-details">
              <span className="stat-change positive">+3 so với hôm qua</span>
              <span className="stat-sub">{stats.activePorts}/{stats.totalPorts} cổng đang dùng</span>
            </div>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">
            <i className="fas fa-percentage"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.utilizationRate}%</h3>
            <p>Tỷ lệ sử dụng</p>
            <div className="stat-details">
              <span className="stat-change positive">+2.1% so với tuần trước</span>
              <span className="stat-sub">{stats.activePorts}/{stats.totalPorts} cổng</span>
            </div>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-main">
        <div className="charts-section">
          {/* Revenue Chart */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <div>
                <h3>Doanh thu & Thanh toán 7 ngày qua</h3>
                <span className="chart-subtitle">Tổng doanh thu và phần chia sẻ của bạn</span>
              </div>
              <select className="chart-filter" value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)}>
                <option value="all">Tất cả trạm</option>
                {myStations.map(station => (
                  <option key={station.id} value={station.id}>{station.name}</option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSettlement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis yAxisId="left" stroke="#10b981" />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: 12, 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    padding: '12px'
                  }}
                  formatter={(value, name) => {
                    if (name === 'revenue' || name === 'settlement') return formatCurrency(value);
                    return value;
                  }}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                  name="Tổng doanh thu"
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="settlement" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#colorSettlement)"
                  name="Phần của tôi (80%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Revenue Breakdown */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Doanh thu 6 tháng</h3>
                <span className="chart-subtitle">Phân tích chi tiết</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#8b5cf6" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: 12, 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)' 
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend />
                <Bar 
                  dataKey="myShare" 
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]}
                  name="Phần của tôi"
                />
                <Bar 
                  dataKey="platformFee" 
                  fill="#f59e0b" 
                  radius={[8, 8, 0, 0]}
                  name="Phí nền tảng"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="dashboard-bottom">
          {/* Station Performance */}
          <div className="top-stations-card">
            <div className="card-header">
              <h3>
                <i className="fas fa-trophy"></i>
                Hiệu suất Trạm Sạc
              </h3>
              <button className="btn-link" onClick={() => navigate('/admin/partner/stations')}>
                Xem chi tiết <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="stations-list">
              {stationPerformance.map((station, index) => (
                <div key={index} className="station-rank-item">
                  <div className="rank-badge">#{index + 1}</div>
                  <div className="station-info">
                    <h4>{station.name}</h4>
                    <div className="station-stats">
                      <span><i className="fas fa-plug"></i> {station.sessions} phiên</span>
                      <span><i className="fas fa-dollar-sign"></i> {(station.myShare / 1000000).toFixed(1)}M</span>
                      <span><i className="fas fa-chart-line"></i> {station.utilization}%</span>
                    </div>
                  </div>
                  <div className="utilization-indicator">
                    <div 
                      className="utilization-bar-small" 
                      style={{ width: `${station.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settlement History */}
          <div className="activity-card">
            <div className="card-header">
              <h3>
                <i className="fas fa-receipt"></i>
                Lịch sử Thanh toán
              </h3>
              <button className="btn-link" onClick={() => navigate('/admin/partner/settlement')}>
                Xem tất cả <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="activity-list">
              {settlementHistory.map(settlement => (
                <div key={settlement.id} className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-money-bill-wave"></i>
                  </div>
                  <div className="activity-content">
                    <p>
                      <strong>{settlement.period}</strong>
                    </p>
                    <div className="activity-details">
                      <span className="activity-time">{settlement.date}</span>
                      <span className="activity-energy">{formatCurrency(settlement.myShare)}</span>
                    </div>
                    <div className="settlement-breakdown">
                      <small>Tổng: {formatCurrency(settlement.totalRevenue)} | Phí: {formatCurrency(settlement.platformFee)}</small>
                    </div>
                  </div>
                  <span className={`status-badge ${settlement.status === 'Đã thanh toán' ? 'completed' : 'pending'}`}>
                    {settlement.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-card">
            <div className="card-header">
              <h3>
                <i className="fas fa-bolt"></i>
                Thao tác nhanh
              </h3>
            </div>
            <div className="quick-actions-grid">
              <button className="quick-action-btn primary" onClick={() => navigate('/admin/partner/stations')}>
                <i className="fas fa-charging-station"></i>
                <span>Quản lý trạm</span>
              </button>
              <button className="quick-action-btn success" onClick={() => navigate('/admin/partner/revenue')}>
                <i className="fas fa-chart-line"></i>
                <span>Xem doanh thu</span>
              </button>
              <button className="quick-action-btn info" onClick={() => navigate('/admin/partner/settlement')}>
                <i className="fas fa-receipt"></i>
                <span>Thanh toán</span>
              </button>
              <button className="quick-action-btn warning" onClick={() => navigate('/admin/partner/staff')}>
                <i className="fas fa-users"></i>
                <span>Nhân viên</span>
              </button>
              <button className="quick-action-btn danger" onClick={() => navigate('/admin/partner/reports')}>
                <i className="fas fa-file-alt"></i>
                <span>Báo cáo</span>
              </button>
              <button className="quick-action-btn secondary" onClick={() => navigate('/admin/partner/settings')}>
                <i className="fas fa-cog"></i>
                <span>Cài đặt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;

