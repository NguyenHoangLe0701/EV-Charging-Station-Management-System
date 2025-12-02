import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Tạo axios instance
const dashboardApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token
dashboardApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý response
dashboardApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Dashboard Service APIs
export const dashboardService = {
  // Lấy tổng quan dashboard
  getDashboardStats: async () => {
    try {
      const response = await dashboardApi.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy dữ liệu biểu đồ năng lượng
  getEnergyData: async (period = 'week') => {
    try {
      const response = await dashboardApi.get(`/dashboard/energy?period=${period}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy trạng thái trạm
  getStationStatus: async () => {
    try {
      const response = await dashboardApi.get('/dashboard/stations/status');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy top trạm
  getTopStations: async (limit = 5) => {
    try {
      const response = await dashboardApi.get(`/dashboard/stations/top?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy phiên sạc gần đây
  getRecentSessions: async (limit = 10) => {
    try {
      const response = await dashboardApi.get(`/dashboard/sessions/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy cảnh báo
  getAlerts: async (limit = 10) => {
    try {
      const response = await dashboardApi.get(`/dashboard/alerts?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy tình trạng hệ thống
  getSystemHealth: async () => {
    try {
      const response = await dashboardApi.get('/dashboard/system/health');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy xu hướng tháng
  getMonthlyTrend: async (months = 6) => {
    try {
      const response = await dashboardApi.get(`/dashboard/trends/monthly?months=${months}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy hoạt động real-time
  getRealTimeActivity: async () => {
    try {
      const response = await dashboardApi.get('/dashboard/activity/realtime');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy performance metrics
  getPerformanceMetrics: async () => {
    try {
      const response = await dashboardApi.get('/dashboard/performance');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy activity log
  getActivityLog: async (page = 0, size = 20) => {
    try {
      const response = await dashboardApi.get(`/dashboard/activity/log?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default dashboardService;

