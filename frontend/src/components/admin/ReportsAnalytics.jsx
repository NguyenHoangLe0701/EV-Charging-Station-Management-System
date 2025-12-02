// src/components/admin/ReportsAnalytics.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart } from 'recharts';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminManagement.css';

const ReportsAnalytics = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedStation, setSelectedStation] = useState('all');
  const [exportLoading, setExportLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Auto refresh effect
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setRefreshKey(prev => prev + 1);
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Sample data
  const revenueData = [
    { month: 'T1', revenue: 120000000, sessions: 450, energy: 12000, users: 420 },
    { month: 'T2', revenue: 135000000, sessions: 520, energy: 13500, users: 485 },
    { month: 'T3', revenue: 150000000, sessions: 580, energy: 15000, users: 520 },
    { month: 'T4', revenue: 145000000, sessions: 550, energy: 14500, users: 495 },
    { month: 'T5', revenue: 165000000, sessions: 620, energy: 16500, users: 580 },
    { month: 'T6', revenue: 180000000, sessions: 680, energy: 18000, users: 620 },
  ];

  const stationPerformance = [
    { station: 'Vincom Đồng Khởi', revenue: 45000000, sessions: 180, utilization: 85, energy: 4500 },
    { station: 'Saigon Centre', revenue: 38000000, sessions: 150, utilization: 78, energy: 3800 },
    { station: 'Lotte Mart Q7', revenue: 35000000, sessions: 135, utilization: 72, energy: 3500 },
    { station: 'Bitexco Tower', revenue: 32000000, sessions: 125, utilization: 68, energy: 3200 },
  ];

  const userDistribution = [
    { name: 'Gói Cơ Bản', value: 245, color: '#3b82f6', revenue: 12250000 },
    { name: 'Gói Tiêu Chuẩn', value: 189, color: '#10b981', revenue: 28350000 },
    { name: 'Gói Premium', value: 92, color: '#f59e0b', revenue: 27600000 },
    { name: 'Gói VIP', value: 34, color: '#ef4444', revenue: 17000000 },
  ];

  const dailyStats = [
    { day: 'T2', revenue: 8500000, sessions: 32, energy: 850, avgTime: 2.1 },
    { day: 'T3', revenue: 9200000, sessions: 35, energy: 920, avgTime: 2.3 },
    { day: 'T4', revenue: 7800000, sessions: 29, energy: 780, avgTime: 2.0 },
    { day: 'T5', revenue: 10500000, sessions: 40, energy: 1050, avgTime: 2.4 },
    { day: 'T6', revenue: 9800000, sessions: 37, energy: 980, avgTime: 2.2 },
    { day: 'T7', revenue: 11500000, sessions: 43, energy: 1150, avgTime: 2.5 },
    { day: 'CN', revenue: 8800000, sessions: 33, energy: 880, avgTime: 2.1 },
  ];

  const hourlyDistribution = [
    { hour: '00-02', sessions: 12, revenue: 2400000 },
    { hour: '02-04', sessions: 8, revenue: 1600000 },
    { hour: '04-06', sessions: 15, revenue: 3000000 },
    { hour: '06-08', sessions: 45, revenue: 9000000 },
    { hour: '08-10', sessions: 68, revenue: 13600000 },
    { hour: '10-12', sessions: 82, revenue: 16400000 },
    { hour: '12-14', sessions: 95, revenue: 19000000 },
    { hour: '14-16', sessions: 88, revenue: 17600000 },
    { hour: '16-18', sessions: 92, revenue: 18400000 },
    { hour: '18-20', sessions: 75, revenue: 15000000 },
    { hour: '20-22', sessions: 58, revenue: 11600000 },
    { hour: '22-24', sessions: 32, revenue: 6400000 },
  ];

  const paymentMethods = [
    { method: 'VNPay', count: 245, revenue: 98000000, percentage: 45 },
    { method: 'MoMo', count: 189, revenue: 75600000, percentage: 35 },
    { method: 'ZaloPay', count: 68, revenue: 27200000, percentage: 12 },
    { method: 'Thẻ tín dụng', count: 34, revenue: 34000000, percentage: 8 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };

  const handleExport = async (format = 'pdf') => {
    setExportLoading(true);
    // Simulate export
    setTimeout(() => {
      alert(`Đang xuất báo cáo định dạng ${format.toUpperCase()}...`);
      setExportLoading(false);
    }, 1500);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Calculate summary stats
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSessions = revenueData.reduce((sum, item) => sum + item.sessions, 0);
  const avgRevenuePerSession = totalRevenue / totalSessions;
  const growthRate = ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100).toFixed(1);

  return (
    <div className="reports-analytics" key={refreshKey}>
      <div className="page-header">
        <div>
          <h2>Báo cáo & Phân tích</h2>
          <p className="page-subtitle">Phân tích chi tiết về hiệu suất và xu hướng hệ thống</p>
        </div>
        <div className="period-selector">
          <div className="filter-group">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="period-select"
            >
              <option value="week">7 ngày qua</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm này</option>
              <option value="custom">Tùy chọn</option>
            </select>
            <button 
              className="btn-icon" 
              onClick={handleRefresh}
              title="Làm mới dữ liệu"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
            <button 
              className={`btn-icon ${autoRefresh ? 'active' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
              title="Tự động làm mới"
            >
              <i className="fas fa-clock"></i>
            </button>
            <button 
              className="btn-icon"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              title="Bộ lọc nâng cao"
            >
              <i className="fas fa-filter"></i>
            </button>
          </div>
          <div className="export-group">
            <button 
              className="btn-export" 
              onClick={() => handleExport('pdf')}
              disabled={exportLoading}
            >
              <i className={`fas fa-${exportLoading ? 'spinner fa-spin' : 'download'}`}></i>
              {exportLoading ? 'Đang xuất...' : 'Xuất PDF'}
            </button>
            <button 
              className="btn-export" 
              onClick={() => handleExport('excel')}
              disabled={exportLoading}
            >
              <i className="fas fa-file-excel"></i>
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-item">
              <label>Trạm sạc</label>
              <select 
                value={selectedStation} 
                onChange={(e) => setSelectedStation(e.target.value)}
              >
                <option value="all">Tất cả trạm</option>
                <option value="1">Vincom Đồng Khởi</option>
                <option value="2">Saigon Centre</option>
                <option value="3">Lotte Mart Q7</option>
                <option value="4">Bitexco Tower</option>
              </select>
            </div>
            <div className="filter-item">
              <label>Từ ngày</label>
              <input 
                type="date" 
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
            </div>
            <div className="filter-item">
              <label>Đến ngày</label>
              <input 
                type="date" 
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
            <button 
              className="btn-primary"
              onClick={() => setShowAdvancedFilters(false)}
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="analytics-stats">
        <div className="stat-card enhanced">
          <div className="stat-icon blue">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Tăng trưởng doanh thu</span>
            <span className="stat-value positive">+{growthRate}%</span>
            <span className="stat-change">so với tháng trước</span>
            <span className="stat-amount">{formatCurrency(totalRevenue)}</span>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>
        <div className="stat-card enhanced">
          <div className="stat-icon green">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Người dùng mới</span>
            <span className="stat-value positive">+42</span>
            <span className="stat-change">tháng này</span>
            <span className="stat-amount">Tổng: {revenueData[revenueData.length - 1].users}</span>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>
        <div className="stat-card enhanced">
          <div className="stat-icon orange">
            <i className="fas fa-plug"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Phiên sạc trung bình</span>
            <span className="stat-value">2.4h</span>
            <span className="stat-change">mỗi phiên</span>
            <span className="stat-amount">Tổng: {totalSessions} phiên</span>
          </div>
        </div>
        <div className="stat-card enhanced">
          <div className="stat-icon purple">
            <i className="fas fa-percentage"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Tỷ lệ sử dụng</span>
            <span className="stat-value">76.5%</span>
            <span className="stat-change">tổng công suất</span>
            <span className="stat-amount">TB: {formatCurrency(avgRevenuePerSession)}/phiên</span>
          </div>
          <div className="stat-trend up">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Main Revenue & Sessions Trend */}
        <div className="chart-card full-width enhanced">
          <div className="chart-header">
            <div>
              <h3>Xu hướng Doanh thu & Phiên sạc</h3>
              <span className="chart-subtitle">6 tháng gần nhất - Tổng doanh thu: {formatCurrency(totalRevenue)}</span>
            </div>
            <div className="chart-actions">
              <button className="chart-action-btn" title="Phóng to">
                <i className="fas fa-expand"></i>
              </button>
              <button className="chart-action-btn" title="Tải xuống">
                <i className="fas fa-download"></i>
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis yAxisId="left" stroke="#3b82f6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 12, 
                  border: 'none', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  padding: '12px'
                }}
                formatter={(value, name) => {
                  if (name === 'revenue') return formatCurrency(value);
                  if (name === 'energy') return `${value} kWh`;
                  return value;
                }}
              />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                fill="url(#colorRevenue)"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Doanh thu (VNĐ)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="sessions" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Số phiên sạc"
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Station Performance */}
        <div className="chart-card enhanced">
          <div className="chart-header">
            <div>
              <h3>Hiệu suất Trạm</h3>
              <span className="chart-subtitle">Top 4 trạm hàng đầu</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stationPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="station" type="category" width={120} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 12, 
                  border: 'none', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
                formatter={(value) => {
                  if (typeof value === 'number' && value > 1000) {
                    return formatCurrency(value);
                  }
                  return value;
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Doanh thu" radius={[0, 8, 8, 0]} />
              <Bar dataKey="sessions" fill="#10b981" name="Số phiên" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Package Distribution */}
        <div className="chart-card enhanced">
          <div className="chart-header">
            <div>
              <h3>Phân bố Gói Dịch Vụ</h3>
              <span className="chart-subtitle">Số người đăng ký & Doanh thu</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={userDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={110}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={3}
              >
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => {
                  if (name === 'value') {
                    return [`${value} người`, 'Số người đăng ký'];
                  }
                  return formatCurrency(props.payload.revenue);
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-details">
            {userDistribution.map((item) => (
              <div key={item.name} className="pie-detail-item">
                <div className="detail-color" style={{ backgroundColor: item.color }}></div>
                <div className="detail-info">
                  <span className="detail-name">{item.name}</span>
                  <span className="detail-value">{item.value} người - {formatCurrency(item.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Stats */}
        <div className="chart-card full-width enhanced">
          <div className="chart-header">
            <div>
              <h3>Thống kê Hàng tuần</h3>
              <span className="chart-subtitle">Doanh thu, phiên sạc và năng lượng theo ngày</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" stroke="#3b82f6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 12, 
                  border: 'none', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
                formatter={(value, name) => {
                  if (name === 'revenue') return formatCurrency(value);
                  if (name === 'energy') return `${value} kWh`;
                  if (name === 'avgTime') return `${value}h`;
                  return value;
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Doanh thu" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="right" dataKey="sessions" fill="#10b981" name="Số phiên" radius={[8, 8, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="avgTime" stroke="#f59e0b" strokeWidth={3} name="Thời gian TB (h)" dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Distribution */}
        <div className="chart-card full-width enhanced">
          <div className="chart-header">
            <div>
              <h3>Phân bố theo Giờ trong Ngày</h3>
              <span className="chart-subtitle">Số phiên sạc và doanh thu theo từng khung giờ</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={hourlyDistribution}>
              <defs>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenueHour" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" stroke="#10b981" />
              <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 12, 
                  border: 'none', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
                formatter={(value, name) => {
                  if (name === 'revenue') return formatCurrency(value);
                  return value;
                }}
              />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="sessions" stroke="#10b981" fill="url(#colorSessions)" name="Số phiên" />
              <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRevenueHour)" name="Doanh thu" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="chart-card enhanced">
          <div className="chart-header">
            <div>
              <h3>Phương thức Thanh toán</h3>
              <span className="chart-subtitle">Phân bố theo phương thức</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={paymentMethods}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 12, 
                  border: 'none', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
                formatter={(value, name) => {
                  if (name === 'revenue') return formatCurrency(value);
                  if (name === 'count') return `${value} giao dịch`;
                  return `${value}%`;
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Doanh thu" radius={[8, 8, 0, 0]} />
              <Bar dataKey="count" fill="#10b981" name="Số giao dịch" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="detailed-reports">
        <div className="section-header">
          <h3>
            <i className="fas fa-file-alt"></i>
            Báo cáo Chi tiết
          </h3>
          <button className="btn-link" onClick={() => navigate('/admin/reports')}>
            Xem tất cả <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="reports-list">
          <div className="report-item enhanced">
            <div className="report-icon">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <div className="report-content">
              <h4>Báo cáo Doanh thu Tháng 6/2024</h4>
              <p>Báo cáo chi tiết doanh thu, phân tích xu hướng và dự đoán</p>
              <div className="report-meta">
                <span><i className="fas fa-calendar"></i> 30/06/2024</span>
                <span><i className="fas fa-file-pdf"></i> PDF</span>
                <span><i className="fas fa-weight"></i> 2.4 MB</span>
              </div>
            </div>
            <div className="report-actions">
              <button className="btn-download" title="Tải xuống">
                <i className="fas fa-download"></i>
              </button>
              <button className="btn-view" title="Xem trước">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>
          <div className="report-item enhanced">
            <div className="report-icon">
              <i className="fas fa-charging-station"></i>
            </div>
            <div className="report-content">
              <h4>Báo cáo Sử dụng Trạm Q2/2024</h4>
              <p>Phân tích hiệu suất và tỷ lệ sử dụng các trạm sạc</p>
              <div className="report-meta">
                <span><i className="fas fa-calendar"></i> 30/06/2024</span>
                <span><i className="fas fa-file-excel"></i> Excel</span>
                <span><i className="fas fa-weight"></i> 1.8 MB</span>
              </div>
            </div>
            <div className="report-actions">
              <button className="btn-download" title="Tải xuống">
                <i className="fas fa-download"></i>
              </button>
              <button className="btn-view" title="Xem trước">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>
          <div className="report-item enhanced">
            <div className="report-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="report-content">
              <h4>Báo cáo Người dùng Q2/2024</h4>
              <p>Thống kê người dùng mới, gói dịch vụ và hành vi sử dụng</p>
              <div className="report-meta">
                <span><i className="fas fa-calendar"></i> 30/06/2024</span>
                <span><i className="fas fa-file-pdf"></i> PDF</span>
                <span><i className="fas fa-weight"></i> 3.1 MB</span>
              </div>
            </div>
            <div className="report-actions">
              <button className="btn-download" title="Tải xuống">
                <i className="fas fa-download"></i>
              </button>
              <button className="btn-view" title="Xem trước">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
