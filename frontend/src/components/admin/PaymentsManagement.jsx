// src/components/admin/PaymentsManagement.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const PaymentsManagement = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const [payments] = useState([
    {
      id: 'PAY001',
      transactionId: 'TXN20240115001',
      user: 'Nguyễn Văn A',
      userEmail: 'nguyenvana@email.com',
      sessionId: 'SS001',
      amount: 1250000,
      method: 'VNPay',
      status: 'Thành công',
      date: '2024-01-15 10:20',
      fee: 5000,
      type: 'Charging'
    },
    {
      id: 'PAY002',
      transactionId: 'TXN20240115002',
      user: 'Trần Thị B',
      userEmail: 'tranthib@email.com',
      sessionId: 'SS002',
      amount: 650000,
      method: 'MoMo',
      status: 'Thành công',
      date: '2024-01-15 09:15',
      fee: 3250,
      type: 'Charging'
    },
    {
      id: 'PAY003',
      transactionId: 'TXN20240114001',
      user: 'Lê Văn C',
      userEmail: 'levanc@email.com',
      sessionId: 'SS003',
      amount: 1850000,
      method: 'Ví điện tử',
      status: 'Đang xử lý',
      date: '2024-01-14 16:50',
      fee: 9250,
      type: 'Charging'
    },
    {
      id: 'PAY004',
      transactionId: 'TXN20240114002',
      user: 'Phạm Văn D',
      userEmail: 'phamvand@email.com',
      sessionId: 'SS004',
      amount: 950000,
      method: 'VNPay',
      status: 'Thất bại',
      date: '2024-01-14 15:30',
      fee: 0,
      type: 'Charging'
    },
    {
      id: 'PAY005',
      transactionId: 'TXN20240113001',
      user: 'Hoàng Thị E',
      userEmail: 'hoangthie@email.com',
      sessionId: 'SS005',
      amount: 2100000,
      method: 'MoMo',
      status: 'Thành công',
      date: '2024-01-13 11:45',
      fee: 10500,
      type: 'Charging'
    },
  ]);

  const filteredPayments = payments
    .filter(payment => {
      const matchesSearch = 
        payment.id.toLowerCase().includes(search.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(search.toLowerCase()) ||
        payment.user.toLowerCase().includes(search.toLowerCase()) ||
        payment.userEmail.toLowerCase().includes(search.toLowerCase());
      
      const matchesFilter = filter === 'all' || 
        payment.status.toLowerCase().includes(filter.toLowerCase());
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch(sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalRevenue = payments
    .filter(p => p.status === 'Thành công')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalTransactions = payments.length;
  const successTransactions = payments.filter(p => p.status === 'Thành công').length;
  const successRate = ((successTransactions / totalTransactions) * 100).toFixed(1);
  const totalFees = payments
    .filter(p => p.status === 'Thành công')
    .reduce((sum, p) => sum + p.fee, 0);
  const pendingCount = payments.filter(p => p.status === 'Đang xử lý').length;
  const failedCount = payments.filter(p => p.status === 'Thất bại').length;

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="payments-management">
      <div className="page-header">
        <div>
          <h2>Quản lý Thanh toán</h2>
          <p className="page-subtitle">Theo dõi và quản lý tất cả các giao dịch thanh toán</p>
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
        <div className="stat-card revenue-stat">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i>
              <span>+12.5%</span>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng doanh thu</p>
            <h3 className="stat-value">{formatCurrency(totalRevenue)} VNĐ</h3>
            <p className="stat-subtitle">{successTransactions} giao dịch thành công</p>
          </div>
        </div>

        <div className="stat-card transactions-stat">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
              <i className="fas fa-exchange-alt"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng giao dịch</p>
            <h3 className="stat-value">{totalTransactions}</h3>
            <p className="stat-subtitle">Tất cả giao dịch</p>
          </div>
        </div>

        <div className="stat-card success-rate-stat">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tỷ lệ thành công</p>
            <h3 className="stat-value">{successRate}%</h3>
            <p className="stat-subtitle">{failedCount} giao dịch thất bại</p>
          </div>
        </div>

        <div className="stat-card pending-stat">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <i className="fas fa-clock"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Đang xử lý</p>
            <h3 className="stat-value">{pendingCount}</h3>
            <p className="stat-subtitle">Cần xử lý</p>
          </div>
        </div>

        <div className="stat-card fees-stat">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
              <i className="fas fa-coins"></i>
            </div>
          </div>
          <div className="stat-card-body">
            <p className="stat-label">Tổng phí giao dịch</p>
            <h3 className="stat-value">{formatCurrency(totalFees)} VNĐ</h3>
            <p className="stat-subtitle">Phí đã thu</p>
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
              placeholder="Tìm kiếm theo ID, mã giao dịch, người dùng, email..."
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
              <th>
                <button 
                  className="sortable-header"
                  onClick={() => handleSort('id')}
                >
                  ID
                  {sortBy === 'id' && (
                    <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                  )}
                </button>
              </th>
              <th>Mã giao dịch</th>
              <th>Người dùng</th>
              <th>Phiên sạc</th>
              <th>
                <button 
                  className="sortable-header"
                  onClick={() => handleSort('amount')}
                >
                  Số tiền
                  {sortBy === 'amount' && (
                    <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                  )}
                </button>
              </th>
              <th>Phương thức</th>
              <th>Phí</th>
              <th>
                <button 
                  className="sortable-header"
                  onClick={() => handleSort('status')}
                >
                  Trạng thái
                  {sortBy === 'status' && (
                    <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                  )}
                </button>
              </th>
              <th>
                <button 
                  className="sortable-header"
                  onClick={() => handleSort('date')}
                >
                  Ngày giờ
                  {sortBy === 'date' && (
                    <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                  )}
                </button>
              </th>
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
                  <td><strong className="payment-id">{payment.id}</strong></td>
                  <td>
                    <code className="transaction-code">{payment.transactionId}</code>
                  </td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">
                        {payment.user.charAt(0)}
                      </div>
                      <div>
                        <div className="user-name">{payment.user}</div>
                        <div className="user-email">{payment.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="session-badge">{payment.sessionId}</span>
                  </td>
                  <td>
                    <strong className="price amount-cell">
                      {formatCurrency(payment.amount)} VNĐ
                    </strong>
                  </td>
                  <td>
                    <span className="payment-method-badge">
                      <i className={`fas ${getMethodIcon(payment.method)}`}></i>
                      {payment.method}
                    </span>
                  </td>
                  <td>
                    <span className="fee-amount">
                      {payment.fee > 0 ? formatCurrency(payment.fee) : '-'} VNĐ
                    </span>
                  </td>
                  <td>{getStatusBadge(payment.status)}</td>
                  <td>
                    <div className="date-cell">
                      <div>{payment.date.split(' ')[0]}</div>
                      <div className="time-cell">{payment.date.split(' ')[1]}</div>
                    </div>
                  </td>
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
                      {payment.status === 'Đang xử lý' && (
                        <button className="btn-action btn-cancel" title="Hủy giao dịch">
                          <i className="fas fa-times"></i>
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

      {filteredPayments.length > 0 && (
        <div className="table-pagination">
          <span className="pagination-info">
            Hiển thị 1-{filteredPayments.length} trong tổng số {payments.length} giao dịch
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

export default PaymentsManagement;
