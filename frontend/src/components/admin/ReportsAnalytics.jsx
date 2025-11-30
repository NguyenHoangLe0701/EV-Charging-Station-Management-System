// src/components/admin/ReportsAnalytics.jsx
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/AdminManagement.css';

const ReportsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Sample data
  const revenueData = [
    { month: 'T1', revenue: 120000000, sessions: 450 },
    { month: 'T2', revenue: 135000000, sessions: 520 },
    { month: 'T3', revenue: 150000000, sessions: 580 },
    { month: 'T4', revenue: 145000000, sessions: 550 },
    { month: 'T5', revenue: 165000000, sessions: 620 },
    { month: 'T6', revenue: 180000000, sessions: 680 },
  ];

  const stationPerformance = [
    { station: 'Vincom Đồng Khởi', revenue: 45000000, sessions: 180, utilization: 85 },
    { station: 'Saigon Centre', revenue: 38000000, sessions: 150, utilization: 78 },
    { station: 'Lotte Mart Q7', revenue: 35000000, sessions: 135, utilization: 72 },
    { station: 'Bitexco Tower', revenue: 32000000, sessions: 125, utilization: 68 },
  ];

  const userDistribution = [
    { name: 'Gói Cơ Bản', value: 245, color: '#3b82f6' },
    { name: 'Gói Tiêu Chuẩn', value: 189, color: '#10b981' },
    { name: 'Gói Premium', value: 92, color: '#f59e0b' },
    { name: 'Gói VIP', value: 34, color: '#ef4444' },
  ];

  const dailyStats = [
    { day: 'T2', revenue: 8500000, sessions: 32 },
    { day: 'T3', revenue: 9200000, sessions: 35 },
    { day: 'T4', revenue: 7800000, sessions: 29 },
    { day: 'T5', revenue: 10500000, sessions: 40 },
    { day: 'T6', revenue: 9800000, sessions: 37 },
    { day: 'T7', revenue: 11500000, sessions: 43 },
    { day: 'CN', revenue: 8800000, sessions: 33 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="reports-analytics">
      <div className="page-header">
        <div>
          <h2>Báo cáo & Phân tích</h2>
          <p className="page-subtitle">Phân tích chi tiết về hiệu suất và xu hướng hệ thống</p>
        </div>
        <div className="period-selector">
          <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
            <option value="week">7 ngày qua</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
            <option value="year">Năm này</option>
          </select>
          <button className="btn-export">
            <i className="fas fa-download"></i>
            Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="analytics-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Tăng trưởng doanh thu</span>
            <span className="stat-value positive">+15.2%</span>
            <span className="stat-change">so với tháng trước</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Người dùng mới</span>
            <span className="stat-value positive">+42</span>
            <span className="stat-change">tháng này</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-plug"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Phiên sạc trung bình</span>
            <span className="stat-value">2.4h</span>
            <span className="stat-change">mỗi phiên</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <i className="fas fa-percentage"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Tỷ lệ sử dụng</span>
            <span className="stat-value">76.5%</span>
            <span className="stat-change">tổng công suất</span>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>Xu hướng Doanh thu & Phiên sạc</h3>
            <span className="chart-subtitle">6 tháng gần nhất</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') return `${(value / 1000000).toFixed(1)}M VNĐ`;
                  return value;
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Doanh thu (VNĐ)"
                dot={{ r: 5 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="sessions" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Số phiên sạc"
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Hiệu suất Trạm</h3>
            <span className="chart-subtitle">Top 4 trạm hàng đầu</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="station" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip 
                formatter={(value) => {
                  if (typeof value === 'number' && value > 1000) {
                    return `${(value / 1000000).toFixed(1)}M VNĐ`;
                  }
                  return value;
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Doanh thu" />
              <Bar dataKey="sessions" fill="#10b981" name="Số phiên" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Phân bố Gói Dịch Vụ</h3>
            <span className="chart-subtitle">Số người đăng ký</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>Thống kê Hàng tuần</h3>
            <span className="chart-subtitle">Doanh thu và phiên sạc theo ngày</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') return `${(value / 1000000).toFixed(1)}M VNĐ`;
                  return value;
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Doanh thu" />
              <Bar yAxisId="right" dataKey="sessions" fill="#10b981" name="Số phiên" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="detailed-reports">
        <h3>Báo cáo Chi tiết</h3>
        <div className="reports-list">
          <div className="report-item">
            <i className="fas fa-file-alt"></i>
            <div>
              <h4>Báo cáo Doanh thu Tháng 6/2024</h4>
              <p>Báo cáo chi tiết doanh thu, phân tích xu hướng và dự đoán</p>
            </div>
            <button className="btn-download">
              <i className="fas fa-download"></i>
            </button>
          </div>
          <div className="report-item">
            <i className="fas fa-file-alt"></i>
            <div>
              <h4>Báo cáo Sử dụng Trạm Q2/2024</h4>
              <p>Phân tích hiệu suất và tỷ lệ sử dụng các trạm sạc</p>
            </div>
            <button className="btn-download">
              <i className="fas fa-download"></i>
            </button>
          </div>
          <div className="report-item">
            <i className="fas fa-file-alt"></i>
            <div>
              <h4>Báo cáo Người dùng Q2/2024</h4>
              <p>Thống kê người dùng mới, gói dịch vụ và hành vi sử dụng</p>
            </div>
            <button className="btn-download">
              <i className="fas fa-download"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;

