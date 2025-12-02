// src/components/admin/RevenueReport.jsx
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../../styles/AdminManagement.css';

const RevenueReport = () => {
  const [period, setPeriod] = useState('month');
  const [dateRange, setDateRange] = useState('6months');

  const monthlyData = [
    { month: 'T1', revenue: 120000000, target: 150000000, growth: 0, sessions: 320 },
    { month: 'T2', revenue: 135000000, target: 150000000, growth: 12.5, sessions: 380 },
    { month: 'T3', revenue: 150000000, target: 150000000, growth: 11.1, sessions: 420 },
    { month: 'T4', revenue: 145000000, target: 160000000, growth: -3.3, sessions: 410 },
    { month: 'T5', revenue: 165000000, target: 160000000, growth: 13.8, sessions: 450 },
    { month: 'T6', revenue: 180000000, target: 170000000, growth: 9.1, sessions: 480 },
  ];

  const dailyData = [
    { day: '01', revenue: 5800000, sessions: 22 },
    { day: '02', revenue: 6200000, sessions: 24 },
    { day: '03', revenue: 5500000, sessions: 21 },
    { day: '04', revenue: 6800000, sessions: 26 },
    { day: '05', revenue: 7200000, sessions: 28 },
    { day: '06', revenue: 6500000, sessions: 25 },
    { day: '07', revenue: 7500000, sessions: 29 },
  ];

  const stationRevenue = [
    { station: 'Vincom Đồng Khởi', revenue: 45000000, percentage: 25, sessions: 180, color: '#3b82f6' },
    { station: 'Saigon Centre', revenue: 38000000, percentage: 21.1, sessions: 152, color: '#10b981' },
    { station: 'Lotte Mart Q7', revenue: 35000000, percentage: 19.4, sessions: 140, color: '#f59e0b' },
    { station: 'Bitexco Tower', revenue: 32000000, percentage: 17.8, sessions: 128, color: '#ef4444' },
    { station: 'Landmark 81', revenue: 30000000, percentage: 16.7, sessions: 120, color: '#8b5cf6' },
  ];

  const totalRevenue = period === 'month' 
    ? monthlyData.reduce((sum, item) => sum + item.revenue, 0)
    : dailyData.reduce((sum, item) => sum + item.revenue, 0);
  
  const avgDailyRevenue = period === 'month' 
    ? totalRevenue / 180 
    : totalRevenue / 7;
  
  const totalSessions = period === 'month'
    ? monthlyData.reduce((sum, item) => sum + item.sessions, 0)
    : dailyData.reduce((sum, item) => sum + item.sessions, 0);
  
  const avgRevenuePerSession = totalRevenue / totalSessions;
  const targetRevenue = period === 'month' 
    ? monthlyData.reduce((sum, item) => sum + item.target, 0)
    : 0;
  const achievementRate = period === 'month' ? ((totalRevenue / targetRevenue) * 100).toFixed(1) : 0;

  const displayData = period === 'month' ? monthlyData : dailyData;

  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(2) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toLocaleString('vi-VN');
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="revenue-report">
      <div className="page-header">
        <div>
          <h2>Báo cáo Doanh thu</h2>
          <p className="page-subtitle">Phân tích chi tiết doanh thu và hiệu suất kinh doanh</p>
        </div>
        <div className="header-actions">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)} 
            className="period-select"
          >
            <option value="6months">6 tháng qua</option>
            <option value="3months">3 tháng qua</option>
            <option value="year">Năm nay</option>
            <option value="custom">Tùy chọn</option>
          </select>
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)} 
            className="period-select"
          >
            <option value="month">Theo tháng</option>
            <option value="day">Theo ngày</option>
          </select>
          <button className="btn-export">
            <i className="fas fa-download"></i>
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="revenue-stats-grid">
        <div className="stat-card revenue-total">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i>
              <span>+15.2%</span>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng doanh thu</p>
            <h3 className="stat-value">{formatCurrency(totalRevenue)} VNĐ</h3>
            <p className="stat-subtitle">
              {period === 'month' ? '6 tháng qua' : '7 ngày qua'}
            </p>
          </div>
        </div>

        <div className="stat-card revenue-avg">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <i className="fas fa-calendar-day"></i>
            </div>
            <div className="stat-trend neutral">
              <i className="fas fa-minus"></i>
              <span>0%</span>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Doanh thu TB/ngày</p>
            <h3 className="stat-value">{formatCurrency(avgDailyRevenue)} VNĐ</h3>
            <p className="stat-subtitle">Trung bình hàng ngày</p>
          </div>
        </div>

        <div className="stat-card revenue-per-session">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <i className="fas fa-plug"></i>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i>
              <span>+8.5%</span>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Doanh thu/phiên TB</p>
            <h3 className="stat-value">{formatCurrency(avgRevenuePerSession)} VNĐ</h3>
            <p className="stat-subtitle">{totalSessions.toLocaleString('vi-VN')} phiên</p>
          </div>
        </div>

        {period === 'month' && (
          <div className="stat-card revenue-achievement">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                <i className="fas fa-bullseye"></i>
              </div>
              <div className="stat-trend positive">
                <i className="fas fa-check-circle"></i>
                <span>{achievementRate}%</span>
              </div>
            </div>
            <div className="stat-card-body">
              <p className="stat-label">Đạt mục tiêu</p>
              <h3 className="stat-value">{achievementRate}%</h3>
              <p className="stat-subtitle">Mục tiêu: {formatCurrency(targetRevenue)} VNĐ</p>
            </div>
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card main-chart">
          <div className="chart-header">
            <div>
              <h3>Xu hướng Doanh thu {period === 'month' ? '6 tháng qua' : '7 ngày qua'}</h3>
              <p className="chart-subtitle">So sánh với mục tiêu và số phiên</p>
            </div>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color" style={{ background: '#3b82f6' }}></span>
                Doanh thu
              </span>
              {period === 'month' && (
                <span className="legend-item">
                  <span className="legend-color" style={{ background: '#ef4444' }}></span>
                  Mục tiêu
                </span>
              )}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey={period === 'month' ? 'month' : 'day'} 
                stroke="#64748b"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#64748b"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip 
                formatter={(value) => `${formatCurrency(value)} VNĐ`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
                name="Doanh thu thực tế"
              />
              {period === 'month' && (
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#ef4444" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="Mục tiêu"
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card pie-chart">
          <div className="chart-header">
            <h3>Phân bổ theo Trạm</h3>
            <p className="chart-subtitle">Tháng này</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stationRevenue}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ station, percentage }) => `${station}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
              >
                {stationRevenue.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${formatCurrency(value)} VNĐ`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card bar-chart">
          <div className="chart-header">
            <h3>Doanh thu theo Trạm</h3>
            <p className="chart-subtitle">Top 5 trạm hàng đầu</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                type="number"
                stroke="#64748b"
                tickFormatter={(value) => formatCurrency(value)}
              />
              <YAxis 
                type="category" 
                dataKey="station" 
                stroke="#64748b"
                width={150}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                formatter={(value) => `${formatCurrency(value)} VNĐ`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#3b82f6"
                radius={[0, 8, 8, 0]}
                name="Doanh thu"
              >
                {stationRevenue.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enhanced Revenue Table */}
      <div className="revenue-table-card">
        <div className="table-header">
          <div>
            <h3>Chi tiết Doanh thu theo Trạm</h3>
            <p className="table-subtitle">Phân tích chi tiết từng trạm sạc</p>
          </div>
          <button className="btn-secondary">
            <i className="fas fa-filter"></i>
            Lọc nâng cao
          </button>
        </div>
        <div className="table-container">
          <table className="data-table enhanced-table">
            <thead>
              <tr>
                <th>Trạm sạc</th>
                <th>Doanh thu</th>
                <th>Số phiên</th>
                <th>TB/phiên</th>
                <th>Tỷ lệ</th>
                <th>Xu hướng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {stationRevenue.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="station-cell">
                      <div className="station-color" style={{ background: item.color }}></div>
                      <strong>{item.station}</strong>
                    </div>
                  </td>
                  <td>
                    <strong className="price">{formatCurrency(item.revenue)} VNĐ</strong>
                  </td>
                  <td>
                    <span className="sessions-count">{item.sessions}</span>
                  </td>
                  <td>
                    <span className="avg-session">
                      {formatCurrency(item.revenue / item.sessions)} VNĐ
                    </span>
                  </td>
                  <td>
                    <div className="percentage-bar-container">
                      <div className="percentage-bar">
                        <div 
                          className="percentage-fill" 
                          style={{ 
                            width: `${item.percentage}%`,
                            background: item.color
                          }}
                        ></div>
                      </div>
                      <span className="percentage-text">{item.percentage}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="trend positive">
                      <i className="fas fa-arrow-up"></i>
                      +5.2%
                    </span>
                  </td>
                  <td>
                    <button className="btn-action btn-view" title="Xem chi tiết">
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;
