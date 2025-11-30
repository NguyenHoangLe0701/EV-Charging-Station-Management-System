// src/components/admin/ServicePackagesManagement.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const ServicePackagesManagement = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const [packages] = useState([
    {
      id: 'PKG001',
      name: 'Gói Cơ Bản',
      price: '50,000',
      duration: '30 ngày',
      discount: '5%',
      energyLimit: '100 kWh',
      status: 'Kích hoạt',
      subscribers: 245,
      description: 'Gói phù hợp cho người dùng mới'
    },
    {
      id: 'PKG002',
      name: 'Gói Tiêu Chuẩn',
      price: '150,000',
      duration: '30 ngày',
      discount: '10%',
      energyLimit: '300 kWh',
      status: 'Kích hoạt',
      subscribers: 189,
      description: 'Gói phổ biến nhất, tiết kiệm 10%'
    },
    {
      id: 'PKG003',
      name: 'Gói Premium',
      price: '300,000',
      duration: '30 ngày',
      discount: '15%',
      energyLimit: '500 kWh',
      status: 'Kích hoạt',
      subscribers: 92,
      description: 'Gói cao cấp với nhiều ưu đãi'
    },
    {
      id: 'PKG004',
      name: 'Gói VIP',
      price: '500,000',
      duration: '30 ngày',
      discount: '20%',
      energyLimit: 'Unlimited',
      status: 'Kích hoạt',
      subscribers: 34,
      description: 'Gói đặc biệt không giới hạn'
    },
  ]);

  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(search.toLowerCase()) ||
    pkg.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalSubscribers = packages.reduce((sum, pkg) => sum + pkg.subscribers, 0);

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa gói dịch vụ này?')) {
      // Handle delete logic
      console.log('Delete package:', id);
    }
  };

  return (
    <div className="service-packages-management">
      <div className="page-header">
        <div>
          <h2>Quản lý Gói Dịch Vụ</h2>
          <p className="page-subtitle">Quản lý các gói dịch vụ và ưu đãi cho người dùng</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus"></i>
          Thêm gói mới
        </button>
      </div>

      <div className="stats-summary-bar">
        <div className="stat-item">
          <span className="stat-label">Tổng số gói</span>
          <span className="stat-value">{packages.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Tổng người đăng ký</span>
          <span className="stat-value highlight">{totalSubscribers}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Gói đang hoạt động</span>
          <span className="stat-value">{packages.filter(p => p.status === 'Kích hoạt').length}</span>
        </div>
      </div>

      <div className="management-toolbar">
        <div className="search-input-wrapper">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Tìm kiếm gói dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="packages-grid">
        {filteredPackages.map(pkg => (
          <div key={pkg.id} className="package-card">
            <div className="package-header">
              <div>
                <h3>{pkg.name}</h3>
                <span className="package-id">{pkg.id}</span>
              </div>
              <span className={`status-badge ${pkg.status === 'Kích hoạt' ? 'active' : 'inactive'}`}>
                {pkg.status}
              </span>
            </div>

            <div className="package-price">
              <span className="price-amount">{pkg.price} VNĐ</span>
              <span className="price-period">/{pkg.duration}</span>
            </div>

            <div className="package-features">
              <div className="feature-item">
                <i className="fas fa-percentage"></i>
                <span>Giảm giá: <strong>{pkg.discount}</strong></span>
              </div>
              <div className="feature-item">
                <i className="fas fa-bolt"></i>
                <span>Giới hạn: <strong>{pkg.energyLimit}</strong></span>
              </div>
              <div className="feature-item">
                <i className="fas fa-users"></i>
                <span>Người đăng ký: <strong>{pkg.subscribers}</strong></span>
              </div>
            </div>

            <p className="package-description">{pkg.description}</p>

            <div className="package-actions">
              <button className="btn-secondary" onClick={() => handleEdit(pkg)}>
                <i className="fas fa-edit"></i>
                Chỉnh sửa
              </button>
              <button className="btn-danger" onClick={() => handleDelete(pkg.id)}>
                <i className="fas fa-trash"></i>
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="no-data-message">
          <i className="fas fa-box-open"></i>
          <p>Không tìm thấy gói dịch vụ nào</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingPackage ? 'Chỉnh sửa gói dịch vụ' : 'Thêm gói dịch vụ mới'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Form thêm/chỉnh sửa gói dịch vụ sẽ được hiển thị ở đây...</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Hủy
              </button>
              <button className="btn-primary">
                {editingPackage ? 'Cập nhật' : 'Tạo mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePackagesManagement;

