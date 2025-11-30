// src/components/admin/PaymentsManagement.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const PaymentsManagement = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  
  const [payments] = useState([
    {
      id: 'PAY001',
      transactionId: 'TXN20240115001',
      user: 'Nguyễn Văn A',
      sessionId: 'SS001',
      amount: '1,250,000',
      method: 'VNPay',
      status: 'Thành công',
      date: '2024-01-15 10:20',
      fee: '5,000'
    },
    {
      id: 'PAY002',
      transactionId: 'TXN20240115002',
      user: 'Trần Thị B',
      sessionId: 'SS002',
      amount: '650,000',
      method: 'MoMo',
      status: 'Thành công',
      date: '2024-01-15 09:15',
      fee: '3,250'
    },
    {
      id: 'PAY003',
      transactionId: 'TXN20240114001',
      user: 'Lê Văn C',
      sessionId: 'SS003',
      amount: '1,850,000',
      method: 'Ví điện tử',
      status: 'Đang xử lý',
      date: '2024-01-14 16:50',
      fee: '9,250'
    },
    {
      id: 'PAY004',
      transactionId: 'TXN20240114002',
      user: 'Phạm Văn D',
      sessionId: 'SS004',
      amount: '950,000',
      method: 'VNPay',
      status: 'Thất bại',
      date: '2024-01-14 15:30',
      fee: '0'
    },
  ]);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(search.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      payment.user.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
      payment.status.toLowerCase().includes(filter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'Thành công')
    .reduce((sum, p) => sum + parseInt(p.amount.replace(/,/g, '')), 0);

  const totalTransactions = payments.length;
  const successRate = ((payments.filter(p => p.status === 'Thành công').length / totalTransactions) * 100).toFixed(1);

  const getStatusBadge = (status) => {
    const statusClass = status === 'Thành công' ? 'success' : 
                       status === 'Đang xử lý' ? 'pending' : 'failed';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const getMethodIcon = (method) => {
    const icons = {
      'VNPay': 'fa-credit-card',
      'MoMo': 'fa-mobile-alt',
      'Ví điện tử': 'fa-wallet'
    };
    return icons[method] || 'fa-money-bill-wave';
  };

  return (
    <div className="payments-management">
      <div className="page-header">
        <div>
          <h2>Quản lý Thanh toán</h2>
          <p className="page-subtitle">Theo dõi và quản lý tất cả các giao dịch thanh toán</p>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card revenue">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Tổng doanh thu</span>
            <span className="stat-value">{totalRevenue.toLocaleString('vi-VN')} VNĐ</span>
          </div>
        </div>
        <div className="stat-card transactions">
          <div className="stat-icon">
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Tổng giao dịch</span>
            <span className="stat-value">{totalTransactions}</span>
          </div>
        </div>
        <div className="stat-card success-rate">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Tỷ lệ thành công</span>
            <span className="stat-value">{successRate}%</span>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Đang xử lý</span>
            <span className="stat-value">{payments.filter(p => p.status === 'Đang xử lý').length}</span>
          </div>
        </div>
      </div>

      <div className="management-toolbar">
        <div className="search-filter-group">
          <div className="search-input-wrapper">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm theo ID, mã giao dịch, người dùng..."
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
            <option value="thành công">Thành công</option>
            <option value="đang xử lý">Đang xử lý</option>
            <option value="thất bại">Thất bại</option>
          </select>

          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="filter-select"
          >
            <option value="today">Hôm nay</option>
            <option value="week">7 ngày qua</option>
            <option value="month">Tháng này</option>
            <option value="all">Tất cả</option>
          </select>
        </div>

        <button className="btn-export">
          <i className="fas fa-download"></i>
          Xuất báo cáo
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã giao dịch</th>
              <th>Người dùng</th>
              <th>Phiên sạc</th>
              <th>Số tiền</th>
              <th>Phương thức</th>
              <th>Phí giao dịch</th>
              <th>Trạng thái</th>
              <th>Ngày giờ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-data">
                  <i className="fas fa-inbox"></i>
                  <p>Không tìm thấy giao dịch nào</p>
                </td>
              </tr>
            ) : (
              filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td><strong>{payment.id}</strong></td>
                  <td><code>{payment.transactionId}</code></td>
                  <td>{payment.user}</td>
                  <td>{payment.sessionId}</td>
                  <td><strong className="price">{payment.amount} VNĐ</strong></td>
                  <td>
                    <span className="payment-method">
                      <i className={`fas ${getMethodIcon(payment.method)}`}></i>
                      {payment.method}
                    </span>
                  </td>
                  <td>{payment.fee} VNĐ</td>
                  <td>{getStatusBadge(payment.status)}</td>
                  <td>{payment.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action btn-view" title="Xem chi tiết">
                        <i className="fas fa-eye"></i>
                      </button>
                      {payment.status === 'Thất bại' && (
                        <button className="btn-action btn-retry" title="Thử lại">
                          <i className="fas fa-redo"></i>
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

export default PaymentsManagement;

