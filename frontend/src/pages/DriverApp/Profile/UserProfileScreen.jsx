import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/UserProfile.css';

function UserProfileScreen() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Lấy thông tin user từ localStorage
        const loadUser = () => {
            try {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const userData = JSON.parse(userStr);
                    setUser({
                        email: userData.email || '',
                        fullName: userData.fullName || 'Người dùng',
                        phoneNumber: userData.phoneNumber || '',
                        role: userData.role || 'USER',
                    });
                } else {
                    // Nếu không có user, redirect về login
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error loading user:', error);
                navigate('/login');
            }
        };

        loadUser();
        document.title = 'Hồ Sơ Người Dùng';
    }, [navigate]);

    const handleSave = () => {
        // TODO: Gọi API để cập nhật thông tin user
        setIsEditing(false);
        // Cập nhật localStorage
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    };

    if (!user) {
        return <div className="loading">Đang tải...</div>;
    }

    return (
        <div className="user-profile-page">
            <div className="profile-container">
                {/* Header */}
                <div className="profile-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left"></i>
                        Quay lại
                    </button>
                    <h1>Hồ Sơ Của Tôi</h1>
                </div>

                {/* Profile Card */}
                <div className="profile-card">
                    <div className="profile-avatar-section">
                        <div className="avatar-wrapper">
                            <div className="avatar-large">
                                {user.fullName.charAt(0).toUpperCase()}
                            </div>
                            {!isEditing && (
                                <button className="avatar-edit-btn" onClick={() => setIsEditing(true)}>
                                    <i className="fas fa-camera"></i>
                                </button>
                            )}
                        </div>
                        <h2>{user.fullName}</h2>
                        <p className="user-email">{user.email}</p>
                        <span className="role-badge">{user.role}</span>
                    </div>

                    {/* Tabs */}
                    <div className="profile-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <i className="fas fa-user"></i>
                            Thông tin
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'sessions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('sessions')}
                        >
                            <i className="fas fa-plug"></i>
                            Phiên sạc
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
                            onClick={() => setActiveTab('payments')}
                        >
                            <i className="fas fa-credit-card"></i>
                            Thanh toán
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            <i className="fas fa-cog"></i>
                            Cài đặt
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {activeTab === 'profile' && (
                            <div className="profile-form">
                                <h3>Thông tin cá nhân</h3>
                                <div className="form-group">
                                    <label>Họ và tên</label>
                                    <input
                                        type="text"
                                        value={user.fullName}
                                        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled
                                        className="disabled"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="tel"
                                        value={user.phoneNumber}
                                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                                        disabled={!isEditing}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                                {isEditing ? (
                                    <div className="form-actions">
                                        <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                                            Hủy
                                        </button>
                                        <button className="btn-save" onClick={handleSave}>
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                ) : (
                                    <button className="btn-edit" onClick={() => setIsEditing(true)}>
                                        <i className="fas fa-edit"></i>
                                        Chỉnh sửa
                                    </button>
                                )}
                            </div>
                        )}

                        {activeTab === 'sessions' && (
                            <div className="sessions-list">
                                <h3>Lịch sử phiên sạc</h3>
                                <div className="empty-state">
                                    <i className="fas fa-plug"></i>
                                    <p>Chưa có phiên sạc nào</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'payments' && (
                            <div className="payments-list">
                                <h3>Lịch sử thanh toán</h3>
                                <div className="empty-state">
                                    <i className="fas fa-credit-card"></i>
                                    <p>Chưa có giao dịch nào</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="settings-section">
                                <h3>Cài đặt tài khoản</h3>
                                <div className="setting-item">
                                    <div>
                                        <h4>Thông báo</h4>
                                        <p>Nhận thông báo về phiên sạc và thanh toán</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <div>
                                        <h4>Email marketing</h4>
                                        <p>Nhận email về khuyến mãi và cập nhật</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <div>
                                        <h4>Đổi mật khẩu</h4>
                                        <p>Cập nhật mật khẩu của bạn</p>
                                    </div>
                                    <button className="btn-secondary">Đổi mật khẩu</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfileScreen;
