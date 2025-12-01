import axios from 'axios';

// Cấu hình base URL - Thay đổi theo môi trường của bạn
// Tạm thời dùng direct service (port 8081) vì Gateway chưa chạy
// Sau khi khởi động Gateway, đổi lại thành: 'http://localhost:8080/api'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

// Tạo axios instance với config mặc định
const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào header
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response và lỗi
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // Có thể redirect về trang login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Service APIs
export const authService = {
  // Đăng ký
  register: async (userData) => {
    try {
      const response = await authApi.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await authApi.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy thông tin user hiện tại (nếu có endpoint này)
  getCurrentUser: async () => {
    try {
      const response = await authApi.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Đăng xuất (xóa token khỏi localStorage)
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    delete authApi.defaults.headers.common['Authorization'];
  },
};

export default authService;

