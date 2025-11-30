# Reporting Service

## 📋 Tổng Quan

**reporting-service** cung cấp các tính năng báo cáo và phân tích cho hệ thống EV Charging Station Management.

## 🎯 Chức Năng Chính

### 1. **Báo Cáo Cá Nhân (User Reports)**
- Số lần sạc của người dùng
- Tổng chi phí đã thanh toán
- Lịch sử các phiên sạc
- Thống kê sử dụng theo thời gian

### 2. **Thống Kê Doanh Thu (Revenue Reports)**
- Doanh thu theo trạm sạc
- Doanh thu theo thời gian (ngày, tuần, tháng, năm)
- So sánh doanh thu giữa các trạm
- Top trạm có doanh thu cao nhất

### 3. **Phân Tích Hệ Thống (System Analytics)**
- Phân tích xu hướng sử dụng
- Thống kê điểm sạc được sử dụng nhiều nhất
- Thời gian sạc trung bình
- Tỷ lệ sử dụng các trạm sạc

## 🔧 Công Nghệ

- **Framework**: Spring Boot 3.2.0
- **Database**: MySQL (`ev_charging_reporting`)
- **Service Discovery**: Eureka Client
- **Inter-service Communication**: OpenFeign
- **Port**: 8087

## 📊 Database

**Database**: `ev_charging_reporting`

Các bảng chính:
- `reports` - Lưu các báo cáo đã tạo
- `user_statistics` - Thống kê cá nhân của người dùng
- `revenue_statistics` - Thống kê doanh thu
- `system_analytics` - Phân tích hệ thống

## 🔌 Inter-Service Communication

Service này sử dụng **OpenFeign** để giao tiếp với:

- **charging-service**: Lấy thông tin phiên sạc
- **payment-service**: Lấy thông tin thanh toán
- **station-service**: Lấy thông tin trạm sạc

## 🚀 API Endpoints (Dự kiến)

### User Reports
- `GET /api/reports/user/{userId}/summary` - Tổng quan báo cáo cá nhân
- `GET /api/reports/user/{userId}/history` - Lịch sử phiên sạc
- `GET /api/reports/user/{userId}/spending` - Chi phí theo thời gian

### Revenue Reports
- `GET /api/reports/revenue/daily` - Doanh thu theo ngày
- `GET /api/reports/revenue/monthly` - Doanh thu theo tháng
- `GET /api/reports/revenue/station/{stationId}` - Doanh thu theo trạm
- `GET /api/reports/revenue/comparison` - So sánh doanh thu

### System Analytics
- `GET /api/reports/analytics/usage-trends` - Xu hướng sử dụng
- `GET /api/reports/analytics/popular-stations` - Trạm phổ biến nhất
- `GET /api/reports/analytics/utilization` - Tỷ lệ sử dụng

## 📝 Development Notes

### Dependencies
- Cần các services sau đã chạy:
  - charging-service
  - payment-service
  - station-service

### Data Aggregation
- Service có thể lưu trữ dữ liệu tổng hợp để tối ưu hiệu suất
- Có thể sử dụng scheduled tasks để cập nhật thống kê định kỳ

### Performance Considerations
- Sử dụng caching cho các báo cáo thường xuyên truy cập
- Cân nhắc sử dụng read replicas cho database nếu cần

