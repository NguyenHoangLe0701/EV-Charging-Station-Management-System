// src/components/admin/SettingsPage.jsx
import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Cài đặt chung', icon: 'fa-cog' },
    { id: 'notifications', label: 'Thông báo', icon: 'fa-bell' },
    { id: 'api', label: 'API & Integration', icon: 'fa-code' },
    { id: 'security', label: 'Bảo mật', icon: 'fa-shield-alt' },
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h2>Cài đặt Hệ thống</h2>
          <p className="page-subtitle">Quản lý cấu hình và tích hợp hệ thống</p>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`fas ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h3>Cài đặt chung</h3>
              <div className="settings-form">
                <div className="form-group">
                  <label>Tên hệ thống</label>
                  <input type="text" defaultValue="EV Charging Station Management" />
                </div>
                <div className="form-group">
                  <label>Email liên hệ</label>
                  <input type="email" defaultValue="admin@evcharge.vn" />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input type="tel" defaultValue="+84 123 456 789" />
                </div>
                <button className="btn-primary">Lưu thay đổi</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h3>Cài đặt thông báo</h3>
              <div className="settings-form">
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>Email thông báo khi có phiên sạc mới</span>
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>Thông báo khi trạm cần bảo trì</span>
                  </label>
                  <label>
                    <input type="checkbox" />
                    <span>Thông báo thanh toán thất bại</span>
                  </label>
                </div>
                <button className="btn-primary">Lưu thay đổi</button>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="settings-section">
              <h3>API & Tích hợp</h3>
              <div className="settings-form">
                <div className="form-group">
                  <label>API Gateway URL</label>
                  <input type="text" defaultValue="http://localhost:8080/api" readOnly />
                  <small>URL cơ sở cho tất cả API requests</small>
                </div>
                <div className="form-group">
                  <label>VNPay API Key</label>
                  <input type="password" placeholder="Nhập API key" />
                </div>
                <div className="form-group">
                  <label>MoMo API Key</label>
                  <input type="password" placeholder="Nhập API key" />
                </div>
                <button className="btn-primary">Lưu thay đổi</button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <h3>Bảo mật</h3>
              <div className="settings-form">
                <div className="form-group">
                  <label>Thay đổi mật khẩu Admin</label>
                  <input type="password" placeholder="Mật khẩu hiện tại" />
                  <input type="password" placeholder="Mật khẩu mới" />
                  <input type="password" placeholder="Xác nhận mật khẩu mới" />
                </div>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>Yêu cầu xác thực 2 yếu tố (2FA)</span>
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked />
                    <span>Giới hạn số lần đăng nhập sai</span>
                  </label>
                </div>
                <button className="btn-primary">Cập nhật bảo mật</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;