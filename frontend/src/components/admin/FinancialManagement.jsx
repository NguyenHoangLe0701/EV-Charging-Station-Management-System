// src/components/admin/FinancialManagement.jsx
// Quản lý tài chính và thanh toán
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/AdminManagement.css';

const FinancialManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedView, setSelectedView] = useState('revenue');

  // Mock data
  const revenueData = [
    { month: 'T1', revenue: 420000000, cost: 84000000, profit: 336000000 },
    { month: 'T2', revenue: 485000000, cost: 97000000, profit: 388000000 },
    { month: 'T3', revenue: 520000000, cost: 104000000, profit: 416000000 },
    { month: 'T4', revenue: 495000000, cost: 99000000, profit: 396000000 },
    { month: 'T5', revenue: 580000000, cost: 116000000, profit: 464000000 },
    { month: 'T6', revenue: 620000000, cost: 124000000, profit: 496000000 },
  ];

  const dailyRevenue = [
    { day: 'T2', revenue: 12500000, transactions: 45 },
    { day: 'T3', revenue: 15200000, transactions: 52 },
    { day: 'T4', revenue: 14500000, transactions: 48 },
    { day: 'T5', revenue: 18200000, transactions: 62 },
    { day: 'T6', revenue: 21000000, transactions: 68 },
    { day: 'T7', revenue: 16500000, transactions: 55 },
    { day: 'CN', revenue: 14800000, transactions: 50 },
  ];

  const paymentMethods = [
    { method: 'VNPay', amount: 1500000000, percentage: 45, count: 1250 },
    { method: 'MoMo', amount: 1200000000, percentage: 36, count: 980 },
    { method: 'Ví điện tử', amount: 680000000, percentage: 19, count: 520 },
  ];

  const settlements = [
    {
      id: 'ST001',
      partner: 'Công ty TNHH Trạm Sạc Việt Nam',
      period: 'Tháng 6/2024',
      totalRevenue: 620000000,
      platformFee: 124000000,
      partnerShare: 496000000,
      status: 'Đã thanh toán',
      paymentDate: '01/07/2024',
      invoice: 'INV-2024-001',
    },
    {
      id: 'ST002',
      partner: 'EV Station Solutions',
      period: 'Tháng 6/2024',
      totalRevenue: 310000000,
      platformFee: 62000000,
      partnerShare: 248000000,
      status: 'Đã thanh toán',
      paymentDate: '01/07/2024',
      invoice: 'INV-2024-002',
    },
    {
      id: 'ST003',
      partner: 'Công ty TNHH Trạm Sạc Việt Nam',
      period: 'Tháng 5/2024',
      totalRevenue: 580000000,
      platformFee: 116000000,
      partnerShare: 464000000,
      status: 'Đã thanh toán',
      paymentDate: '01/06/2024',
      invoice: 'INV-2024-003',
    },
  ];

  const stats = {
    totalRevenue: 3120000000,
    totalCost: 624000000,
    netProfit: 2496000000,
    pendingSettlements: 93000000,
    avgTransaction: 145000,
    totalTransactions: 21500,
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };

  return (
    <div className="management-page">
      <div className="page-header">
        <div>
          <h2>Quản Lý Tài Chính</h2>
          <p className="page-subtitle">Theo dõi doanh thu, chi phí và thanh toán</p>
        </div>
        <div className="header-actions">
          <select className="filter-select" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
            <option value="year">Năm nay</option>
          </select>
          <button className="btn-primary">
            <i className="fas fa-download"></i>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="stats-grid">
        <div className="stat-card success">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3>{(stats.totalRevenue / 1000000000).toFixed(2)}B</h3>
            <p>Tổng doanh thu</p>
            <div className="stat-details">
              <span className="stat-change positive">+18.5% so với kỳ trước</span>
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <i className="fas fa-receipt"></i>
          </div>
          <div className="stat-content">
            <h3>{(stats.totalCost / 1000000).toFixed(0)}M</h3>
            <p>Tổng chi phí</p>
            <div className="stat-details">
              <span className="stat-change">20% doanh thu</span>
            </div>
          </div>
        </div>

        <div className="stat-card primary">
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <h3>{(stats.netProfit / 1000000000).toFixed(2)}B</h3>
            <p>Lợi nhuận ròng</p>
            <div className="stat-details">
              <span className="stat-change positive">+22.3% so với kỳ trước</span>
            </div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>{(stats.pendingSettlements / 1000000).toFixed(0)}M</h3>
            <p>Chờ thanh toán</p>
            <div className="stat-details">
              <span className="stat-change">3 đối tác</span>
            </div>
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
                <h3>Doanh thu & Lợi nhuận 6 tháng</h3>
                <span className="chart-subtitle">Phân tích tài chính chi tiết</span>
              </div>
              <div className="chart-controls">
                <button 
                  className={`chart-btn ${selectedView === 'revenue' ? 'active' : ''}`}
                  onClick={() => setSelectedView('revenue')}
                >
                  Doanh thu
                </button>
                <button 
                  className={`chart-btn ${selectedView === 'profit' ? 'active' : ''}`}
                  onClick={() => setSelectedView('profit')}
                >
                  Lợi nhuận
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueData}>
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
                  dataKey="revenue" 
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]}
                  name="Doanh thu"
                />
                <Bar 
                  dataKey="cost" 
                  fill="#f59e0b" 
                  radius={[8, 8, 0, 0]}
                  name="Chi phí"
                />
                <Bar 
                  dataKey="profit" 
                  fill="#3b82f6" 
                  radius={[8, 8, 0, 0]}
                  name="Lợi nhuận"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Methods */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Phương thức thanh toán</h3>
                <span className="chart-subtitle">Phân bố theo phương thức</span>
              </div>
            </div>
            <div className="payment-methods-list">
              {paymentMethods.map((method, index) => (
                <div key={index} className="payment-method-item">
                  <div className="method-info">
                    <div className="method-name">
                      <i className={`fas fa-${method.method === 'VNPay' ? 'credit-card' : method.method === 'MoMo' ? 'mobile-alt' : 'wallet'}`}></i>
                      <span>{method.method}</span>
                    </div>
                    <div className="method-stats">
                      <strong>{formatCurrency(method.amount)}</strong>
                      <small>{method.count} giao dịch</small>
                    </div>
                  </div>
                  <div className="method-bar">
                    <div 
                      className="method-bar-fill" 
                      style={{ width: `${method.percentage}%`, background: method.method === 'VNPay' ? '#10b981' : method.method === 'MoMo' ? '#f59e0b' : '#3b82f6' }}
                    ></div>
                    <span className="method-percentage">{method.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settlements Table */}
        <div className="settlements-section">
          <div className="card-header">
            <h3>
              <i className="fas fa-receipt"></i>
              Lịch sử Thanh toán Đối tác
            </h3>
            <button className="btn-link">
              Xem tất cả <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Đối tác</th>
                  <th>Kỳ thanh toán</th>
                  <th>Tổng doanh thu</th>
                  <th>Phí nền tảng</th>
                  <th>Phần đối tác</th>
                  <th>Trạng thái</th>
                  <th>Ngày thanh toán</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map(settlement => (
                  <tr key={settlement.id}>
                    <td><strong>{settlement.partner}</strong></td>
                    <td>{settlement.period}</td>
                    <td>{formatCurrency(settlement.totalRevenue)}</td>
                    <td>{formatCurrency(settlement.platformFee)}</td>
                    <td><span className="text-success">{formatCurrency(settlement.partnerShare)}</span></td>
                    <td>
                      <span className={`status-badge ${settlement.status === 'Đã thanh toán' ? 'completed' : 'pending'}`}>
                        {settlement.status}
                      </span>
                    </td>
                    <td>{settlement.paymentDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="Xem hóa đơn">
                          <i className="fas fa-file-invoice"></i>
                        </button>
                        <button className="btn-icon" title="Tải xuống">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
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

export default FinancialManagement;

