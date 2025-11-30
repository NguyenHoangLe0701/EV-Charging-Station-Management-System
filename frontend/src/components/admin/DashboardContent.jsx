// src/components/admin/DashboardContent.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminManagement.css';

const DashboardContent = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const energyData = [
    { day: 'T2', kWh: 1200, sessions: 45, revenue: 12500000 }, 
    { day: 'T3', kWh: 1800, sessions: 52, revenue: 15200000 }, 
    { day: 'T4', kWh: 1500, sessions: 48, revenue: 14500000 },
    { day: 'T5', kWh: 2200, sessions: 62, revenue: 18200000 }, 
    { day: 'T6', kWh: 2800, sessions: 68, revenue: 21000000 }, 
    { day: 'T7', kWh: 1900, sessions: 55, revenue: 16500000 }, 
    { day: 'CN', kWh: 1600, sessions: 50, revenue: 14800000 }
  ];

  const statusData = [
    { name: 'Hoạt động', value: 68, color: '#10b981' },
    { name: 'Đang sạc', value: 25, color: '#3b82f6' },
    { name: 'Bảo trì', value: 7, color: '#f59e0b' }
  ];

  const monthlyTrend = [
    { month: 'T1', revenue: 120, sessions: 420 },
    { month: 'T2', revenue: 135, sessions: 485 },
    { month: 'T3', revenue: 150, sessions: 520 },
    { month: 'T4', revenue: 145, sessions: 495 },
    { month: 'T5', revenue: 165, sessions: 580 },
    { month: 'T6', revenue: 180, sessions: 620 },
  ];

  const topStations = [
    { name: 'Vincom Đồng Khởi', sessions: 180, revenue: 45000000, utilization: 92 },
    { name: 'Saigon Centre', sessions: 150, revenue: 38000000, utilization: 85 },
    { name: 'Lotte Mart Q7', sessions: 135, revenue: 35000000, utilization: 78 },
    { name: 'Bitexco Tower', sessions: 125, revenue: 32000000, utilization: 72 },
  ];

  const recentSessions = [
    { id: 'SS001', user: 'Nguyễn Văn A', station: 'Vincom Đồng Khởi', time: '2 phút trước', status: 'Đang sạc', energy: '15.2 kWh' },
    { id: 'SS002', user: 'Trần Thị B', station: 'Saigon Centre', time: '8 phút trước', status: 'Đang sạc', energy: '22.8 kWh' },
    { id: 'SS003', user: 'Lê Văn C', station: 'Lotte Mart Q7', time: '15 phút trước', status: 'Hoàn thành', energy: '45.5 kWh' },
    { id: 'SS004', user: 'Phạm Văn D', station: 'Bitexco Tower', time: '23 phút trước', status: 'Đang sạc', energy: '18.3 kWh' },
  ];

  const alerts = [
    { type: 'warning', message: 'Vincom Đồng Khởi - Charger #3 cần bảo trì', time: '5 phút trước' },
    { type: 'info', message: 'Lotte Mart Q7 - Tất cả cổng đang bận', time: '12 phút trước' },
    { type: 'success', message: 'Thanh toán thành công - VNĐ 1,250,000', time: '18 phút trước' },
  ];

  const stats = {
    totalStations: 4,
    activeStations: 3,
    totalUsers: 560,
    activeUsers: 485,
    todaySessions: 12,
    todayRevenue: 28500000,
    todayEnergy: 12800,
    avgSessionTime: '2h 24m',
    utilizationRate: 76.5
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };

  return (
    <div className="dashboard-content">
      {/* Header với thời gian real-time */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Tổng Quan</h1>
          <p className="subtitle">
            Chào mừng trở lại! Đây là tổng quan về hệ thống của bạn
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

      {/* Alerts Banner */}
      {alerts.length > 0 && (
        <div className="alerts-banner">
          {alerts.slice(0, 2).map((alert, index) => (
            <div key={index} className={`alert-item ${alert.type}`}>
              <i className={`fas fa-${alert.type === 'warning' ? 'exclamation-triangle' : alert.type === 'info' ? 'info-circle' : 'check-circle'}`}></i>
              <span>{alert.message}</span>
              <span className="alert-time">{alert.time}</span>
            </div>
          ))}
          {alerts.length > 2 && (
            <button className="view-all-alerts" onClick={() => navigate('/admin/settings')}>
              Xem tất cả ({alerts.length})
            </button>
          )}
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary" onClick={() => navigate('/admin/stations')}>
          <div className="stat-icon">
            <i className="fas fa-charging-station"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalStations}</h3>
            <p>Trạm sạc</p>
            <div className="stat-details">
              <span className="stat-change positive">+1 tháng này</span>
              <span className="stat-sub">{stats.activeStations} đang hoạt động</span>
            </div>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>

        <div className="stat-card success" onClick={() => navigate('/admin/sessions')}>
          <div className="stat-icon">
            <i className="fas fa-plug"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.todaySessions}</h3>
            <p>Phiên sạc hôm nay</p>
            <div className="stat-details">
              <span className="stat-change positive">+3 so với hôm qua</span>
              <span className="stat-sub">TB: {stats.avgSessionTime}/phiên</span>
            </div>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>

        <div className="stat-card info" onClick={() => navigate('/admin/users')}>
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Người dùng</p>
            <div className="stat-details">
              <span className="stat-change positive">+12 tuần này</span>
              <span className="stat-sub">{stats.activeUsers} đang hoạt động</span>
            </div>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>

        <div className="stat-card warning" onClick={() => navigate('/admin/payments')}>
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

        <div className="stat-card danger">
          <div className="stat-icon">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="stat-content">
            <h3>{(stats.todayEnergy / 1000).toFixed(1)}K</h3>
            <p>kWh hôm nay</p>
            <div className="stat-details">
              <span className="stat-change">Trung bình: {(stats.todayEnergy / stats.todaySessions).toFixed(0)} kWh/phiên</span>
              <span className="stat-sub">{stats.todayEnergy.toLocaleString('vi-VN')} kWh</span>
            </div>
          </div>
        </div>

        <div className="stat-card secondary" onClick={() => navigate('/admin/reports')}>
          <div className="stat-icon">
            <i className="fas fa-percentage"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.utilizationRate}%</h3>
            <p>Tỷ lệ sử dụng</p>
            <div className="stat-details">
              <span className="stat-change positive">+2.1% so với tuần trước</span>
              <span className="stat-sub">19/25 cổng đang hoạt động</span>
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
          {/* Main Chart - Energy & Sessions */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <div>
                <h3>Năng lượng & Phiên sạc 7 ngày qua</h3>
                <span className="chart-subtitle">Biểu đồ tổng quan tuần này</span>
              </div>
              <select className="chart-filter">
                <option>7 ngày qua</option>
                <option>14 ngày qua</option>
                <option>30 ngày qua</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="colorKWh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
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
                    if (name === 'kWh') return `${value.toLocaleString('vi-VN')} kWh`;
                    if (name === 'revenue') return formatCurrency(value);
                    return value;
                  }}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="kWh" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fill="url(#colorKWh)"
                  name="Năng lượng (kWh)"
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#colorSessions)"
                  name="Số phiên"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Station Status Pie */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Trạng thái Trạm</h3>
                <span className="chart-subtitle">Phân bố hiện tại</span>
              </div>
              <div className="pie-total">100 trạm</div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie 
                  data={statusData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60}
                  outerRadius={100} 
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {statusData.map((item) => (
                <div key={item.name} className="legend-item">
                  <div className="legend-dot" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Xu hướng 6 tháng</h3>
                <span className="chart-subtitle">Doanh thu & Phiên sạc</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis yAxisId="left" stroke="#8b5cf6" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: 12, 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)' 
                  }}
                  formatter={(value, name) => {
                    if (name === 'revenue') return `${value}M VNĐ`;
                    return value;
                  }}
                />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="revenue" 
                  fill="#8b5cf6" 
                  radius={[8, 8, 0, 0]}
                  name="Doanh thu (M)"
                />
                <Bar 
                  yAxisId="right"
                  dataKey="sessions" 
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]}
                  name="Phiên sạc"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="dashboard-bottom">
          {/* Top Stations */}
          <div className="top-stations-card">
            <div className="card-header">
              <h3>
                <i className="fas fa-trophy"></i>
                Top Trạm Hiệu Suất
              </h3>
              <button className="btn-link" onClick={() => navigate('/admin/stations')}>
                Xem tất cả <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="stations-list">
              {topStations.map((station, index) => (
                <div key={index} className="station-rank-item">
                  <div className="rank-badge">#{index + 1}</div>
                  <div className="station-info">
                    <h4>{station.name}</h4>
                    <div className="station-stats">
                      <span><i className="fas fa-plug"></i> {station.sessions} phiên</span>
                      <span><i className="fas fa-dollar-sign"></i> {(station.revenue / 1000000).toFixed(1)}M</span>
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

          {/* Recent Sessions */}
          <div className="activity-card">
            <div className="card-header">
              <h3>
                <i className="fas fa-clock"></i>
                Phiên sạc gần đây
              </h3>
              <button className="btn-link" onClick={() => navigate('/admin/sessions')}>
                Xem tất cả <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="activity-list">
              {recentSessions.map(session => (
                <div key={session.id} className="activity-item">
                  <div className="activity-icon">
                    <i className={`fas fa-plug ${session.status === 'Đang sạc' ? 'pulsing' : ''}`}></i>
                  </div>
                  <div className="activity-content">
                    <p>
                      <strong>{session.user}</strong> 
                      {session.status === 'Đang sạc' ? ' đang sạc' : ' đã hoàn thành'} tại 
                      <strong> {session.station}</strong>
                    </p>
                    <div className="activity-details">
                      <span className="activity-time">{session.time}</span>
                      {session.energy && <span className="activity-energy">{session.energy}</span>}
                    </div>
                  </div>
                  <span className={`status-badge ${session.status === 'Đang sạc' ? 'charging' : 'completed'}`}>
                    {session.status}
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
              <button className="quick-action-btn primary" onClick={() => navigate('/admin/stations')}>
                <i className="fas fa-charging-station"></i>
                <span>Quản lý trạm</span>
              </button>
              <button className="quick-action-btn success" onClick={() => navigate('/admin/users')}>
                <i className="fas fa-user-plus"></i>
                <span>Thêm người dùng</span>
              </button>
              <button className="quick-action-btn info" onClick={() => navigate('/admin/reports')}>
                <i className="fas fa-chart-bar"></i>
                <span>Xem báo cáo</span>
              </button>
              <button className="quick-action-btn warning" onClick={() => navigate('/admin/packages')}>
                <i className="fas fa-box"></i>
                <span>Quản lý gói</span>
              </button>
              <button className="quick-action-btn danger" onClick={() => navigate('/admin/payments')}>
                <i className="fas fa-credit-card"></i>
                <span>Thanh toán</span>
              </button>
              <button className="quick-action-btn secondary" onClick={() => navigate('/admin/settings')}>
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

export default DashboardContent;
