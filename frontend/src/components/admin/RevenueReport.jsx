// src/components/admin/RevenueReport.jsx
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/AdminManagement.css';

const RevenueReport = () => {
  const [period, setPeriod] = useState('month');

  const monthlyData = [
    { month: 'T1', revenue: 120000000, target: 150000000, growth: 0 },
    { month: 'T2', revenue: 135000000, target: 150000000, growth: 12.5 },
    { month: 'T3', revenue: 150000000, target: 150000000, growth: 11.1 },
    { month: 'T4', revenue: 145000000, target: 160000000, growth: -3.3 },
    { month: 'T5', revenue: 165000000, target: 160000000, growth: 13.8 },
    { month: 'T6', revenue: 180000000, target: 170000000, growth: 9.1 },
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
    { station: 'Vincom Đồng Khởi', revenue: 45000000, percentage: 25 },
    { station: 'Saigon Centre', revenue: 38000000, percentage: 21.1 },
    { station: 'Lotte Mart Q7', revenue: 35000000, percentage: 19.4 },
    { station: 'Bitexco Tower', revenue: 32000000, percentage: 17.8 },
  ];

  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const avgDailyRevenue = totalRevenue / 30;
  const totalSessions = dailyData.reduce((sum, item) => sum + item.sessions, 0);
  const avgRevenuePerSession = totalRevenue / totalSessions;

  const displayData = period === 'month' ? monthlyData : dailyData;

  return (
    <div className="revenue-report">
      <div className="page-header">
        <div>
          <h2>Báo cáo Doanh thu</h2>
          <p className="page-subtitle">Phân tích chi tiết doanh thu và hiệu suất kinh doanh</p>
        </div>
        <div className="header-actions">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="period-select">
            <option value="month">Theo tháng</option>
            <option value="day">Theo ngày</option>
          </select>
          <button className="btn-export">
            <i className="fas fa-download"></i>
            Xuất Excel
          </button>
        </div>
      </div>

      <div className="revenue-stats">
        <div className="stat-card total-revenue">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Tổng doanh thu {period === 'month' ? '6 tháng' : '7 ngày'}</span>
            <span className="stat-value">{(period === 'month' ? totalRevenue : dailyData.reduce((s, d) => s + d.revenue, 0)).toLocaleString('vi-VN')} VNĐ</span>
          </div>
        </div>
        <div className="stat-card avg-daily">
          <div className="stat-icon">
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Doanh thu trung bình/ngày</span>
            <span className="stat-value">{avgDailyRevenue.toLocaleString('vi-VN')} VNĐ</span>
          </div>
        </div>
        <div className="stat-card per-session">
          <div className="stat-icon">
            <i className="fas fa-plug"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Doanh thu/phiên trung bình</span>
            <span className="stat-value">{avgRevenuePerSession.toLocaleString('vi-VN')} VNĐ</span>
          </div>
        </div>
        <div className="stat-card growth">
          <div className="stat-icon">
            <i className="fas fa-arrow-up"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Tăng trưởng</span>
            <span className="stat-value positive">+15.2%</span>
            <span className="stat-change">so với kỳ trước</span>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>Xu hướng Doanh thu {period === 'month' ? '6 tháng qua' : '7 ngày qua'}</h3>
            <span className="chart-subtitle">So sánh với mục tiêu</span>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={period === 'month' ? 'month' : 'day'} />
              <YAxis />
              <Tooltip 
                formatter={(value) => `${(value / 1000000).toFixed(1)}M VNĐ`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.3}
                name="Doanh thu thực tế"
              />
              {period === 'month' && (
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#ef4444" 
                  fill="#ef4444"
                  fillOpacity={0.1}
                  strokeDasharray="5 5"
                  name="Mục tiêu"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Doanh thu theo Trạm</h3>
            <span className="chart-subtitle">Tháng này</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="station" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip 
                formatter={(value) => `${(value / 1000000).toFixed(1)}M VNĐ`}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="revenue-table-card">
          <div className="chart-header">
            <h3>Chi tiết Doanh thu theo Trạm</h3>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Trạm sạc</th>
                  <th>Doanh thu</th>
                  <th>Tỷ lệ</th>
                  <th>Xu hướng</th>
                </tr>
              </thead>
              <tbody>
                {stationRevenue.map((item, index) => (
                  <tr key={index}>
                    <td><strong>{item.station}</strong></td>
                    <td><strong className="price">{(item.revenue / 1000000).toFixed(1)}M VNĐ</strong></td>
                    <td>
                      <div className="percentage-bar">
                        <div 
                          className="percentage-fill" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                        <span>{item.percentage}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="trend positive">
                        <i className="fas fa-arrow-up"></i>
                        +5.2%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;