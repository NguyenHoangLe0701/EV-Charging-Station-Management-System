// src/components/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Gọi API đăng nhập từ backend
      const response = await authService.login({
        email: formData.email,
        password: formData.password
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

        // Redirect dựa trên role
        if (role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/driver/profile');
        }
      }
    } catch (err) {
      // Xử lý lỗi từ API
      const errorMessage = err?.message || err?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại!';
      setError(errorMessage);
      console.error('Login error:', err);
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
            <p>Hi chào bạn! Đăng nhập để tiếp tục</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <h2>Đăng nhập</h2>

            <div className="auth-input-group icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="admin@evcharge.vn (Admin) hoặc email của bạn"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-input-group icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
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
              className="auth-btn-login"
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <p className="auth-login-link">
              Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;