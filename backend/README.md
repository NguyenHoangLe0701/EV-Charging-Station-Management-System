# Backend - Microservices Architecture

## 📋 Tổng Quan

Backend được xây dựng theo kiến trúc **Microservices** sử dụng **Spring Boot** và **Spring Cloud**.

## 🏗️ Cấu Trúc Hệ Thống

```
backend/
├── common-lib/              # Thư viện dùng chung cho toàn bộ project
├── gateway/                 # Spring Boot API Gateway (Entry point)
├── services/                # Microservices Business Logic
│   ├── auth-service/
│   ├── user-service/
│   ├── station-service/
│   ├── charging-service/
│   ├── payment-service/
│   ├── notification-service/
│   └── reporting-service/
├── eureka-server/           # Service Discovery Server
├── config-server/           # Configuration Management Server
└── database/                # Database scripts và schemas
    ├── schemas/
    ├── migrations/
    └── seeds/
```

---

## 📁 Chi Tiết Các Thành Phần

### **common-lib/**
Thư viện dùng chung chứa:
- DTOs (Data Transfer Objects) dùng chung
- Utils và helper classes
- Constants và enums
- Exception handlers chung

**Sử dụng**: Tất cả các services import common-lib như một dependency Maven.

---

### **gateway/** (Port: 8080)
- **Chức năng**: Entry point duy nhất cho tất cả requests từ client
- **Công nghệ**: Spring Cloud Gateway
- **Routing**: Định tuyến requests đến các microservices tương ứng

**Routes:**
- `http://localhost:8080/api/auth/**` → auth-service
- `http://localhost:8080/api/users/**` → user-service
- `http://localhost:8080/api/stations/**` → station-service
- `http://localhost:8080/api/charging/**` → charging-service
- `http://localhost:8080/api/payments/**` → payment-service
- `http://localhost:8080/api/notifications/**` → notification-service
- `http://localhost:8080/api/reports/**` → reporting-service

---

### **services/** - Business Services

#### 1. **auth-service** (Port: 8081)
- **Chức năng**: Xác thực và Phân quyền (JWT)
- **Database**: `ev_charging_auth`
- **Dependencies**: Spring Security, JWT

#### 2. **user-service** (Port: 8082)
- **Chức năng**: Quản lý thông tin người dùng
- **Database**: `ev_charging_user`

#### 3. **station-service** (Port: 8083)
- **Chức năng**: Quản lý trạm sạc và điểm sạc
- **Database**: `ev_charging_station`

#### 4. **charging-service** (Port: 8084)
- **Chức năng**: Quản lý phiên sạc (bắt đầu/kết thúc sạc)
- **Database**: `ev_charging_session`
- **Dependencies**: OpenFeign (giao tiếp với các services khác)

#### 5. **payment-service** (Port: 8085)
- **Chức năng**: Xử lý thanh toán (VNPay, MoMo)
- **Database**: `ev_charging_payment`
- **Dependencies**: OpenFeign

#### 6. **notification-service** (Port: 8086)
- **Chức năng**: Quản lý thông báo cho người dùng
- **Database**: `ev_charging_notification`

#### 7. **reporting-service** (Port: 8087)
- **Chức năng**: Báo cáo & Phân tích
  - Báo cáo cá nhân cho Tài xế (số lần sạc, chi phí, lịch sử)
  - Thống kê doanh thu cho Admin (theo trạm, theo thời gian)
  - Phân tích xu hướng sử dụng hệ thống
- **Database**: `ev_charging_reporting`
- **Dependencies**: OpenFeign (giao tiếp với charging-service, payment-service, station-service)

---

### **Infrastructure Services**

#### **eureka-server** (Port: 8761)
- **Chức năng**: Service Discovery - Quản lý và tìm kiếm các microservices
- **Công nghệ**: Spring Cloud Netflix Eureka
- **Khởi chạy**: Cần khởi động đầu tiên

#### **config-server** (Port: 8888)
- **Chức năng**: Quản lý cấu hình tập trung cho tất cả services
- **Công nghệ**: Spring Cloud Config Server
- **Lưu ý**: Lưu trữ cấu hình trong `config-repo/`

---

### **database/**
Chứa các scripts database:
- **schemas/**: SQL scripts để tạo databases và cấu trúc cơ bản
- **migrations/**: Database migration scripts (quản lý thay đổi schema)
- **seeds/**: Seed data scripts (dữ liệu mẫu để test)

---

## 🚀 Thứ Tự Khởi Động Services

### **Bước 1: Infrastructure**
1. **eureka-server** (port 8761) - Service Discovery
2. **config-server** (port 8888) - Configuration Server (optional)

### **Bước 2: Business Services**
3. **auth-service** (port 8081)
4. **user-service** (port 8082)
5. **station-service** (port 8083)
6. **notification-service** (port 8086)

### **Bước 3: Services có Dependencies**
7. **charging-service** (port 8084) - cần station-service, payment-service
8. **payment-service** (port 8085) - cần notification-service
9. **reporting-service** (port 8087) - cần charging-service, payment-service, station-service

### **Bước 4: Gateway**
10. **gateway** (port 8080) - phải khởi động cuối cùng

---

## 📝 Cấu Hình Database

Mỗi service sử dụng database riêng biệt:

- `ev_charging_auth` - Auth Service
- `ev_charging_user` - User Service  
- `ev_charging_station` - Station Service
- `ev_charging_session` - Charging Service
- `ev_charging_payment` - Payment Service
- `ev_charging_notification` - Notification Service
- `ev_charging_reporting` - Reporting Service

**Lưu ý**: Đảm bảo MySQL đang chạy và cập nhật thông tin trong `application.yml` của mỗi service:
- `username`: root (hoặc user MySQL của bạn)
- `password`: password (hoặc password MySQL của bạn)

---

## 🔧 Yêu Cầu Hệ Thống

- **Java**: 17+
- **Maven**: 3.8+
- **MySQL**: 8.0+
- **IDE**: IntelliJ IDEA / Eclipse / VS Code

---

## 📚 Các Bước Tiếp Theo (Learning Path)

### **Phase 1: Setup & Cấu hình**
- [ ] Setup MySQL và tạo databases (xem `database/schemas/`)
- [ ] Cấu hình kết nối database trong mỗi service
- [ ] Build common-lib: `cd common-lib && mvn clean install`
- [ ] Test khởi động từng service

### **Phase 2: Auth Service (Tuần 1-2)**
- [ ] Tạo Entity (User, Role)
- [ ] Implement Repository layer
- [ ] Implement Service layer
- [ ] Implement Controller layer
- [ ] JWT Token generation & validation
- [ ] Spring Security configuration

### **Phase 3: User Service (Tuần 1-2)**
- [ ] Tạo Entity (User Profile)
- [ ] CRUD operations
- [ ] API endpoints
- [ ] Sử dụng common-lib cho DTOs

### **Phase 4: Station Service (Tuần 3-4)**
- [ ] Entity (Station, Charger)
- [ ] Business logic
- [ ] API endpoints

### **Phase 5: Charging & Payment Services (Tuần 3-4)**
- [ ] Entity design
- [ ] Integration với các services khác (OpenFeign)
- [ ] Business logic phức tạp

### **Phase 6: Reporting Service (Tuần 5-6)**
- [ ] Entity design (Report, Analytics)
- [ ] Feign Clients để gọi các services khác
- [ ] Business logic tổng hợp dữ liệu
- [ ] API endpoints cho báo cáo
- [ ] Dashboard data aggregation

### **Phase 7: Testing & Integration**
- [ ] Unit tests
- [ ] Integration tests
- [ ] Gateway routing test
- [ ] End-to-end testing

---

## 💡 Ghi Chú

- **common-lib**: Build và install vào local Maven repository trước khi build các services
  ```bash
  cd backend/common-lib
  mvn clean install
  ```

- Mỗi service là một **Spring Boot Application** độc lập
- Services giao tiếp với nhau qua **REST API** hoặc **OpenFeign**
- **Eureka Server** giúp services tự động discover và communicate
- **Gateway** là điểm vào duy nhất cho client, giúp quản lý routing, authentication, load balancing
- **Database scripts** trong `database/` giúp quản lý schema và dữ liệu mẫu

---

## 📖 Tài Liệu Tham Khảo

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Microservices Patterns](https://microservices.io/patterns/index.html)
