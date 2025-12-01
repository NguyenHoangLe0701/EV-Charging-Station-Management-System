// src/components/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setLoading(true);

    try {
      // Gọi API đăng ký từ backend
      const response = await authService.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.name,
        phoneNumber: formData.phoneNumber || undefined
      });

      if (response.success && response.data) {
        const { token, userId, email, fullName, role } = response.data;
        
        // Lưu token và thông tin user vào localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify({
          userId,
          email,
          fullName,
          role: role.toLowerCase()
        }));
        localStorage.setItem('isAdmin', role === 'ADMIN' ? 'true' : 'false');

        // Redirect đến trang phù hợp
        if (role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/driver/profile');
        }
      }
    } catch (err) {
      // Xử lý lỗi từ API
      const errorMessage = err?.message || err?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
      setError(errorMessage);
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-icon">EV</div>
            <h1>EV Station</h1>
            <p>Hệ thống quản lý trạm sạc xe điện thông minh</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <h2>Tạo tài khoản mới</h2>
            <p className="auth-subtitle">Tham gia mạng lưới trạm sạc xe điện hiện đại</p>

            <div className="auth-input-group icon">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="auth-input-group icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email của bạn"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-input-group icon">
              <i className="fas fa-phone"></i>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Số điện thoại (tùy chọn)"
                value={formData.phoneNumber}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>

            <div className="auth-input-group icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                minLength={6}
              />
            </div>

            <div className="auth-input-group icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            {error && (
              <div className="auth-error-message" style={{
                color: '#ef4444',
                backgroundColor: '#fee2e2',
                padding: '0.75rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="auth-btn-register"
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>

            <p className="auth-login-link">
              Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;