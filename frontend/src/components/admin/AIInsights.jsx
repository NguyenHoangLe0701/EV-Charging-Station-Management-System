// src/components/admin/AIInsights.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import aiService from '../../api/aiService';
import '../../styles/AdminManagement.css';

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError('');
    try {
      // Gọi AI Service để lấy insights thực tế từ Gemini AI
      const response = await aiService.getInsights();
      
      if (response.success && response.data) {
        // Set data từ AI Service
        setInsights(response.data.recommendations || []);
        setPredictions(response.data.predictions || []);
        setAnomalies(response.data.anomalies || []);
      } else {
        // Fallback to mock data nếu API trả về lỗi
        console.warn('AI Service returned error, using mock data');
        setMockData();
      }
      const mockInsights = [
        {
          id: 1,
          type: 'optimization',
          title: 'Tối ưu hóa vị trí trạm sạc',
          description: 'Phân tích cho thấy khu vực Q7 có nhu cầu cao nhưng thiếu trạm sạc. Đề xuất thêm 2 trạm mới.',
          impact: 'high',
          confidence: 92,
          action: 'Thêm trạm sạc mới',
          estimatedRevenue: 50000000
        },
        {
          id: 2,
          type: 'demand',
          title: 'Dự đoán nhu cầu tuần tới',
          description: 'Dựa trên dữ liệu lịch sử, nhu cầu sạc sẽ tăng 15% vào cuối tuần. Nên chuẩn bị thêm nhân viên.',
          impact: 'medium',
          confidence: 85,
          action: 'Tăng ca nhân viên',
          estimatedRevenue: 0
        },
        {
          id: 3,
          type: 'anomaly',
          title: 'Phát hiện bất thường',
          description: 'Trạm Vincom Đồng Khởi có thời gian sạc trung bình tăng 30% so với bình thường. Cần kiểm tra thiết bị.',
          impact: 'high',
          confidence: 88,
          action: 'Kiểm tra bảo trì',
          estimatedRevenue: 0
        },
        {
          id: 4,
          type: 'revenue',
          title: 'Cơ hội tăng doanh thu',
          description: 'Gói dịch vụ Premium có tỷ lệ chuyển đổi thấp. Đề xuất giảm giá 10% để tăng adoption rate.',
          impact: 'medium',
          confidence: 75,
          action: 'Điều chỉnh giá',
          estimatedRevenue: 20000000
        }
      ];

      const mockPredictions = [
        { month: 'T7', predicted: 650, actual: null, confidence: 85 },
        { month: 'T8', predicted: 720, actual: null, confidence: 82 },
        { month: 'T9', predicted: 680, actual: null, confidence: 80 },
        { month: 'T10', predicted: 750, actual: null, confidence: 78 },
        { month: 'T11', predicted: 800, actual: null, confidence: 75 },
        { month: 'T12', predicted: 850, actual: null, confidence: 73 }
      ];

      const mockAnomalies = [
        { station: 'Vincom Đồng Khởi', metric: 'Thời gian sạc TB', value: '3.2h', normal: '2.4h', deviation: '+33%', severity: 'high' },
        { station: 'Saigon Centre', metric: 'Tỷ lệ lỗi', value: '5.2%', normal: '1.5%', deviation: '+247%', severity: 'medium' },
        { station: 'Lotte Mart Q7', metric: 'Năng lượng tiêu thụ', value: '850 kWh', normal: '650 kWh', deviation: '+31%', severity: 'medium' }
      ];

      setInsights(mockInsights);
      setPredictions(mockPredictions);
      setAnomalies(mockAnomalies);
    } catch (err) {
      console.error('Error fetching AI insights:', err);
      setError('Không thể tải AI Insights. Đang sử dụng dữ liệu mẫu.');
      // Fallback to mock data
      setMockData();
    } finally {
      setLoading(false);
    }
  };

  const setMockData = () => {
    // Mock data fallback
    const mockInsights = [
      {
        id: 1,
        type: 'optimization',
        title: 'Tối ưu hóa vị trí trạm sạc',
        description: 'Phân tích cho thấy khu vực Q7 có nhu cầu cao nhưng thiếu trạm sạc. Đề xuất thêm 2 trạm mới.',
        impact: 'high',
        confidence: 92,
        action: 'Thêm trạm sạc mới',
        estimatedRevenue: 50000000
      },
      {
        id: 2,
        type: 'demand',
        title: 'Dự đoán nhu cầu tuần tới',
        description: 'Dựa trên dữ liệu lịch sử, nhu cầu sạc sẽ tăng 15% vào cuối tuần. Nên chuẩn bị thêm nhân viên.',
        impact: 'medium',
        confidence: 85,
        action: 'Tăng ca nhân viên',
        estimatedRevenue: 0
      },
      {
        id: 3,
        type: 'anomaly',
        title: 'Phát hiện bất thường',
        description: 'Trạm Vincom Đồng Khởi có thời gian sạc trung bình tăng 30% so với bình thường. Cần kiểm tra thiết bị.',
        impact: 'high',
        confidence: 88,
        action: 'Kiểm tra bảo trì',
        estimatedRevenue: 0
      },
      {
        id: 4,
        type: 'revenue',
        title: 'Cơ hội tăng doanh thu',
        description: 'Gói dịch vụ Premium có tỷ lệ chuyển đổi thấp. Đề xuất giảm giá 10% để tăng adoption rate.',
        impact: 'medium',
        confidence: 75,
        action: 'Điều chỉnh giá',
        estimatedRevenue: 20000000
      }
    ];

    const mockPredictions = [
      { month: 'T7', predicted: 650, actual: null, confidence: 85 },
      { month: 'T8', predicted: 720, actual: null, confidence: 82 },
      { month: 'T9', predicted: 680, actual: null, confidence: 80 },
      { month: 'T10', predicted: 750, actual: null, confidence: 78 },
      { month: 'T11', predicted: 800, actual: null, confidence: 75 },
      { month: 'T12', predicted: 850, actual: null, confidence: 73 }
    ];

    const mockAnomalies = [
      { station: 'Vincom Đồng Khởi', metric: 'Thời gian sạc TB', value: '3.2h', normal: '2.4h', deviation: '+33%', severity: 'high' },
      { station: 'Saigon Centre', metric: 'Tỷ lệ lỗi', value: '5.2%', normal: '1.5%', deviation: '+247%', severity: 'medium' },
      { station: 'Lotte Mart Q7', metric: 'Năng lượng tiêu thụ', value: '850 kWh', normal: '650 kWh', deviation: '+31%', severity: 'medium' }
    ];

    setInsights(mockInsights);
    setPredictions(mockPredictions);
    setAnomalies(mockAnomalies);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatCurrency = (value) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };

  if (loading) {
    return (
      <div className="ai-insights">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '32px', color: '#3b82f6' }}></i>
          <p style={{ marginTop: '10px', color: '#6b7280' }}>Đang phân tích dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-insights">
      <div className="page-header">
        <div>
          <h2>
            <i className="fas fa-brain" style={{ marginRight: '10px', color: '#8b5cf6' }}></i>
            AI Insights & Phân tích Thông minh
          </h2>
          <p className="page-subtitle">Phân tích dự đoán và đề xuất tối ưu từ AI (Gemini) & Machine Learning</p>
          {error && (
            <div style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <i className="fas fa-exclamation-triangle"></i> {error}
            </div>
          )}
        </div>
      </div>

      {/* Key Insights */}
      <div className="insights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {insights.map(insight => (
          <div key={insight.id} className="insight-card" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${getImpactColor(insight.impact)}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#1f2937' }}>{insight.title}</h3>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: getImpactColor(insight.impact) + '20',
                color: getImpactColor(insight.impact)
              }}>
                {insight.impact.toUpperCase()}
              </span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>{insight.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Độ tin cậy</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#3b82f6' }}>{insight.confidence}%</div>
              </div>
              {insight.estimatedRevenue > 0 && (
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Doanh thu ước tính</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>
                    {formatCurrency(insight.estimatedRevenue)}
                  </div>
                </div>
              )}
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '15px' }}>
              {insight.action}
            </button>
          </div>
        ))}
      </div>

      {/* Predictions Chart */}
      <div className="chart-card" style={{ marginBottom: '30px' }}>
        <div className="chart-header">
          <div>
            <h3>Dự đoán Doanh thu 6 tháng tới</h3>
            <span className="chart-subtitle">Dựa trên mô hình Machine Learning</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictions}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#8b5cf6" />
            <Tooltip 
              contentStyle={{ 
                borderRadius: 12, 
                border: 'none', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)' 
              }}
              formatter={(value) => `${value}M VNĐ`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="Dự đoán"
              dot={{ fill: '#8b5cf6', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Anomalies Detection */}
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <h3>
              <i className="fas fa-exclamation-triangle" style={{ color: '#f59e0b', marginRight: '10px' }}></i>
              Phát hiện Bất thường
            </h3>
            <span className="chart-subtitle">Các chỉ số bất thường cần chú ý</span>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Trạm sạc</th>
                <th>Chỉ số</th>
                <th>Giá trị hiện tại</th>
                <th>Giá trị bình thường</th>
                <th>Độ lệch</th>
                <th>Mức độ</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((anomaly, index) => (
                <tr key={index}>
                  <td><strong>{anomaly.station}</strong></td>
                  <td>{anomaly.metric}</td>
                  <td><strong>{anomaly.value}</strong></td>
                  <td>{anomaly.normal}</td>
                  <td>
                    <span style={{ 
                      color: getSeverityColor(anomaly.severity),
                      fontWeight: 'bold'
                    }}>
                      {anomaly.deviation}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge" style={{
                      backgroundColor: getSeverityColor(anomaly.severity) + '20',
                      color: getSeverityColor(anomaly.severity)
                    }}>
                      {anomaly.severity === 'high' ? 'Cao' : anomaly.severity === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;

