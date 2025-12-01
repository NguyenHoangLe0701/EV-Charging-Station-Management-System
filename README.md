# EV-Charging-Station-Management-System
# 🚗 Hệ Thống Quản Lý Trạm Sạc Xe Điện

## 🎯 1. Mục Tiêu Dự Án
Xây dựng **Hệ Thống Quản Lý Trạm Sạc Xe Điện** sử dụng **kiến trúc microservices** với hỗ trợ đa mô hình kinh doanh **B2B** và **B2C**.  
Hệ thống phục vụ nhiều nhóm người dùng và đối tác:

### 👥 Actors & Người Dùng

#### 🚗 B2C - Người Dùng Cuối (Consumer)
- **Tài Xế Xe Điện (Driver)**: tìm trạm sạc, đặt chỗ, bắt đầu/kết thúc phiên sạc, thanh toán, xem báo cáo cá nhân.  
- **Khách Hàng Cá Nhân**: đăng ký tài khoản, quản lý hồ sơ, xem lịch sử sạc, thanh toán.

#### 🏢 B2B - Đối Tác Kinh Doanh (Business Partners)
- **Chủ Trạm Sạc (Station Owner)**: quản lý trạm sạc của mình, theo dõi doanh thu, quản lý nhân viên, báo cáo tài chính.
- **Nhà Đầu Tư Trạm Sạc (Investor)**: quản lý nhiều trạm sạc, phân tích ROI, quản lý danh mục đầu tư.
- **Nhân Viên Trạm Sạc (Station Staff)**: giám sát điểm sạc, xử lý thanh toán tại chỗ, hỗ trợ khách hàng.

#### 🏭 Nhà Cung Cấp & Quản Trị
- **Nhà Cung Cấp Thiết Bị (Equipment Provider)**: quản lý thiết bị sạc, bảo trì, cập nhật firmware.
- **Quản Trị Viên Hệ Thống (Admin)**: quản lý toàn bộ hệ thống, trạm sạc/điểm sạc, người dùng, gói dịch vụ, báo cáo & thống kê doanh thu.
- **Quản Lý Vùng (Regional Manager)**: quản lý nhiều trạm sạc trong khu vực, phân tích hiệu suất, tối ưu hóa phân bổ.  

---

## 👥 2. Đội Nhóm
**Quy mô đội**: 4–5 sinh viên (nếu >5 → chia thành các dự án riêng biệt).  

**Vai trò:**
- **Trưởng Nhóm Backend**: Xác thực, Dịch vụ Người dùng, Dịch vụ Trạm sạc  
- **Lập Trình Viên Backend**: Dịch vụ Phiên Sạc, Dịch vụ Thanh toán  
- **Trưởng Nhóm Frontend**: Giao diện Tài xế & Nhân viên  
- **Frontend/DevOps**: Giao diện Quản trị, Docker, CI/CD  
- **(Tùy chọn) QA/Tester**: test cases & kiểm thử hệ thống  

---

## 📦 3. Phạm Vi Dự Án

### ✅ Bao Gồm (MVP – 8 tuần)
- Xác thực & Phân quyền (JWT, điều khiển truy cập theo vai trò)  
- **Ứng dụng Tài xế (B2C)**: tìm kiếm trạm, đặt chỗ, bắt đầu/kết thúc sạc, thanh toán  
- **Ứng dụng Nhân viên**: quản lý phiên sạc, xác nhận thanh toán tại chỗ  
- **Cổng Quản trị**: quản lý trạm/điểm sạc, người dùng, gói dịch vụ, báo cáo  
- **Thanh toán**: Tích hợp VNPay/MoMo sandbox + ví điện tử demo  
- **Báo cáo & Phân tích**: cấp độ cá nhân và hệ thống  
- Triển khai với **Docker Compose**  

### 🚀 Giai Đoạn 2 - Mở Rộng B2B (12-16 tuần)
- **Quản lý Đối Tác (Partner Management)**
  - Đăng ký và quản lý chủ trạm sạc
  - Hợp đồng và thỏa thuận chia sẻ doanh thu
  - Quản lý tài khoản đối tác trên hệ thống
  
- **Quản lý Tài Chính B2B**
  - Thanh toán cho chủ trạm sạc (settlement)
  - Quản lý công nợ và hóa đơn
  - Báo cáo tài chính cho đối tác
  
- **Dashboard Đối Tác**
  - Dashboard riêng cho chủ trạm sạc
  - Theo dõi doanh thu real-time
  - Phân tích hiệu suất trạm sạc
  - Quản lý nhân viên trạm

### 🤖 Giai Đoạn 3 - AI & Tối Ưu Hóa (16-20 tuần)
- **AI Dự Báo Nhu Cầu**
  - Dự đoán nhu cầu sạc theo thời gian và địa điểm
  - Đề xuất vị trí tối ưu cho trạm sạc mới
  - Tối ưu hóa giá cả động (dynamic pricing)
  
- **Tối Ưu Hóa Vận Hành**
  - Phân tích xu hướng sử dụng
  - Đề xuất lịch bảo trì thông minh
  - Tối ưu hóa phân bổ nguồn lực
  
- **Tích hợp IoT**
  - Tích hợp phần cứng thực tế (thiết bị IoT sạc)
  - Giám sát thiết bị real-time
  - Cảnh báo sự cố tự động

### 🌐 Giai Đoạn 4 - Mở Rộng Quy Mô (20+ tuần)
- **Multi-Tenancy**
  - Hỗ trợ nhiều tổ chức/quốc gia
  - Quản lý đa ngôn ngữ và đa tiền tệ
  
- **Triển khai Nâng Cao**
  - Kubernetes cho production
  - Auto-scaling và load balancing
  - Disaster recovery và backup tự động
  
- **Tích hợp Bên Thứ Ba**
  - API mở cho đối tác
  - Webhook cho thông báo sự kiện
  - Tích hợp với hệ thống ERP/CRM  

---

## ⚙️ 4. Công Nghệ Sử Dụng

### 🎨 Frontend
- **React 18** (Vite Build Tool)
- **TypeScript** (cho type safety)
- **Tailwind CSS** & **Ant Design** (UI Library)
- **TanStack Query** (Data Fetching & Caching)
- **React Router DOM v7** (Routing)
- **Axios** (API Communication)
- **React Hook Form** (Form Handling)
- **WebSocket / StompJS** (Real-time features)

### ⚙️ Backend
- **Java 17+, 21+**
- **Spring Boot 3.0+**
- **Spring Cloud Gateway** (API Gateway)
- **Spring Cloud Netflix Eureka** (Service Discovery)
- **Spring Cloud Config** (Configuration Management)
- **MySQL 8+** (Database)
- **Redis** (Caching & Session Management)
- **JWT** (Authentication & Authorization)
- **OpenFeign** (Inter-service Communication)

### 🤖 AI/ML (Giai đoạn tương lai)
- **Python** (FastAPI)
- **TensorFlow / PyTorch** (Machine Learning)
- **Pandas / NumPy** (Data Processing)
- **Scikit-learn** (ML Models)

### 🚀 DevOps & Infrastructure
- **Docker** & **Docker Compose** (Containerization)
- **Kubernetes** (Orchestration - tương lai)
- **GitHub Actions** (CI/CD)
- **Nginx** (Reverse Proxy)

### 💳 Tích Hợp Bên Thứ Ba
- **VNPay / MoMo** (Payment Gateway)
- **Google Maps API** (Bản đồ & Định vị)
- **SendGrid / Twilio** (Email & SMS)
- **Firebase Cloud Messaging** (Push Notifications)

### 📊 Monitoring & Analytics
- **Prometheus** (Metrics)
- **Grafana** (Visualization)
- **ELK Stack** (Logging - tương lai)  

---

## 📅 5. Lộ Trình Phát Triển

### 🎯 Phase 1: MVP (8 tuần, ≥400 giờ)
- **Tuần 1–2**: Phân tích yêu cầu, thiết kế, thiết lập, Dịch vụ Xác thực & Người dùng  
- **Tuần 3–4**: Dịch vụ Trạm sạc, Dịch vụ Phiên Sạc, Dịch vụ Thanh toán  
- **Tuần 5–6**: Giao diện Frontend (Tài xế, Nhân viên, Quản trị)  
- **Tuần 7**: Tích hợp hệ thống & kiểm thử  
- **Tuần 8**: Demo, báo cáo, giao nộp cuối cùng

### 🏢 Phase 2: Mở Rộng B2B (12-16 tuần)
- **Tuần 9–10**: Thiết kế mô hình B2B, Partner Management Service
- **Tuần 11–12**: Dashboard đối tác, Quản lý tài chính B2B
- **Tuần 13–14**: Settlement & Payment cho đối tác
- **Tuần 15–16**: Testing & Optimization

### 🤖 Phase 3: AI & Tối Ưu Hóa (16-20 tuần)
- **Tuần 17–18**: Xây dựng AI Service, Data Collection
- **Tuần 19–20**: ML Models cho dự báo nhu cầu
- **Tuần 21–22**: Tích hợp IoT, Real-time Monitoring
- **Tuần 23–24**: Dynamic Pricing, Optimization Algorithms

### 🌐 Phase 4: Scale & Enterprise (20+ tuần)
- **Tuần 25+**: Multi-tenancy, Internationalization
- **Tuần 26+**: Kubernetes Migration
- **Tuần 27+**: API Gateway mở, Third-party Integrations  

---

## 📊 6. Sản Phẩm Giao Nộp

### 📦 MVP (Phase 1)
- **Hệ thống MVP** hoạt động được triển khai qua Docker Compose  
- **Tài liệu (Confluence)**:  
  - Tổng quan Dự án  
  - Yêu cầu & Use Cases  
  - Kiến trúc Hệ thống & ERD  
  - Tài liệu API  
  - Hướng dẫn DevOps & Triển khai  
  - Ghi chú Cuộc họp & Báo cáo Sprint  
- **Codebase** trên GitHub với các pipeline CI/CD  
- **Jira**: sprint backlog & báo cáo  
- **Demo & Slide Thuyết trình**

### 🚀 Các Giai Đoạn Tiếp Theo
- **B2B Platform**: Dashboard đối tác, Quản lý tài chính
- **AI/ML Services**: Dự báo nhu cầu, Tối ưu hóa
- **Enterprise Features**: Multi-tenancy, API mở

---

## 🏗️ 7. Kiến Trúc Hệ Thống

### 📁 Cấu Trúc Dự Án

```
EV-Charging-Station-Management-System/
├── backend/
│   ├── common-lib/              # Shared libraries cho tất cả services
│   ├── gateway/                 # Spring Cloud API Gateway
│   ├── eureka-server/          # Service Discovery
│   ├── config-server/          # Configuration Management
│   ├── services/               # Microservices
│   │   ├── auth-service/       # Xác thực & Phân quyền
│   │   ├── user-service/       # Quản lý người dùng
│   │   ├── station-service/    # Quản lý trạm sạc
│   │   ├── charging-service/   # Quản lý phiên sạc
│   │   ├── payment-service/    # Xử lý thanh toán
│   │   ├── notification-service/ # Thông báo
│   │   ├── reporting-service/  # Báo cáo & Phân tích
│   │   ├── partner-service/    # Quản lý đối tác B2B (tương lai)
│   │   ├── settlement-service/ # Thanh toán cho đối tác (tương lai)
│   │   └── ai-service/         # AI/ML Services (tương lai)
│   └── database/               # Database schemas & migrations
│
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── driver/         # Driver app
│   │   │   └── partner/       # Partner dashboard (tương lai)
│   │   ├── pages/             # Page components
│   │   ├── routes/            # Routing
│   │   ├── context/           # React Context (Auth, etc.)
│   │   ├── api/               # API clients
│   │   └── styles/            # CSS files
│   └── package.json
│
└── README.md
```

### 🔄 Microservices Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    API Gateway (8080)                    │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐
│ Auth Service │  │ User Service │  │ Station Svc  │
│   (8081)     │  │   (8082)     │  │   (8083)    │
└──────────────┘  └──────────────┘  └──────────────┘
        │                 │                 │
┌───────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐
│ Charging Svc │  │ Payment Svc  │  │ Reporting   │
│   (8084)     │  │   (8085)     │  │   (8087)    │
└──────────────┘  └──────────────┘  └──────────────┘
        │                 │                 │
┌───────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐
│ Notification │  │ Partner Svc  │  │ AI Service  │
│   (8086)     │  │   (8088)     │  │   (8089)    │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🎯 8. Tính Năng Chi Tiết

### 🚗 B2C - Người Dùng Cuối

#### 📱 Ứng Dụng Tài Xế
- **Tìm Kiếm & Đặt Chỗ**
  - Tìm trạm sạc gần nhất
  - Xem thông tin chi tiết trạm (số cổng, giá, đánh giá)
  - Đặt chỗ trước (reservation)
  - Lưu trạm yêu thích
  
- **Quản Lý Phiên Sạc**
  - Bắt đầu/kết thúc phiên sạc
  - Theo dõi tiến trình sạc real-time
  - Xem lịch sử phiên sạc
  
- **Thanh Toán**
  - Thanh toán qua VNPay/MoMo
  - Quản lý ví điện tử
  - Lịch sử giao dịch
  
- **Báo Cáo Cá Nhân**
  - Thống kê số lần sạc
  - Tổng chi phí
  - Phân tích thói quen sử dụng

### 🏢 B2B - Đối Tác Kinh Doanh

#### 🏪 Dashboard Chủ Trạm Sạc
- **Quản Lý Trạm Sạc**
  - Thêm/sửa/xóa trạm sạc
  - Quản lý điểm sạc (charging points)
  - Cấu hình giá sạc
  - Quản lý nhân viên trạm
  
- **Theo Dõi Doanh Thu**
  - Doanh thu real-time
  - Báo cáo theo ngày/tuần/tháng
  - Phân tích xu hướng
  - Top điểm sạc hiệu quả
  
- **Quản Lý Tài Chính**
  - Xem hóa đơn thanh toán từ hệ thống
  - Theo dõi công nợ
  - Lịch sử giao dịch settlement
  
- **Báo Cáo & Phân Tích**
  - Tỷ lệ sử dụng trạm
  - Thời gian sạc trung bình
  - Phân tích khách hàng
  - Dự báo nhu cầu (AI)

#### 💼 Quản Lý Đối Tác (Admin)
- **Đăng Ký & Phê Duyệt**
  - Đăng ký chủ trạm sạc mới
  - Phê duyệt hợp đồng
  - Quản lý thông tin đối tác
  
- **Hợp Đồng & Chính Sách**
  - Tạo hợp đồng chia sẻ doanh thu
  - Cấu hình tỷ lệ chia sẻ
  - Quản lý chính sách khuyến mãi
  
- **Settlement & Thanh Toán**
  - Tính toán doanh thu cho đối tác
  - Tạo hóa đơn thanh toán
  - Quản lý công nợ

### 🤖 AI & Tối Ưu Hóa

#### 📊 Dự Báo Nhu Cầu
- Dự đoán nhu cầu sạc theo thời gian
- Phân tích xu hướng theo địa điểm
- Đề xuất vị trí tối ưu cho trạm mới

#### 💰 Dynamic Pricing
- Điều chỉnh giá theo nhu cầu
- Tối ưu hóa doanh thu
- Chương trình khuyến mãi thông minh

#### 🔧 Tối Ưu Hóa Vận Hành
- Lịch bảo trì thông minh
- Phân bổ nguồn lực tối ưu
- Cảnh báo sự cố dự đoán

---

## 🚀 9. Hướng Dẫn Cài Đặt

### Yêu Cầu Hệ Thống
- **Node.js** 18+ và npm
- **Java** 17+, 21+
- **Maven** 3.8+
- **MySQL** 8+
- **Redis** (optional, cho caching)
- **Docker** & **Docker Compose** (recommended)

### Bước 1: Clone Repository
```bash
git clone https://github.com/your-username/EV-Charging-Station-Management-System.git
cd EV-Charging-Station-Management-System
```

### Bước 2: Cấu Hình Database
```bash
cd backend/database
mysql -u root -p < setup-user.sql
```

### Bước 3: Cấu Hình Environment Variables
Tạo file `.env` trong thư mục `backend/`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=evchargingstation
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

### Bước 4: Khởi Động Backend Services
```bash
# Khởi động Eureka Server trước
cd backend/eureka-server
mvn spring-boot:run

# Khởi động Config Server
cd backend/config-server
mvn spring-boot:run

# Khởi động API Gateway
cd backend/gateway
mvn spring-boot:run

# Khởi động các services (trong terminal riêng)
cd backend/services/auth-service
mvn spring-boot:run
# ... tương tự cho các services khác
```

### Bước 5: Khởi Động Frontend
```bash
cd frontend
npm install
npm run dev
```

### Bước 6: Truy Cập Ứng Dụng
- **Frontend**: http://localhost:5173
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761

---

## 📄 10. License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 11. Acknowledgments

- **Spring Boot** - Backend framework
- **React** - Frontend library
- **Tailwind CSS** - UI styling
- **Font Awesome** - Icons
- **Recharts** - Data visualization
- **Ant Design** - UI components

---

## 📞 12. Liên Hệ & Đóng Góp

- **Repository**: [GitHub](https://github.com/your-username/EV-Charging-Station-Management-System)
- **Issues**: [GitHub Issues](https://github.com/your-username/EV-Charging-Station-Management-System/issues)
- **Documentation**: [Wiki](https://github.com/your-username/EV-Charging-Station-Management-System/wiki)

---

**⭐ Nếu dự án này hữu ích, hãy cho một star!****  

---
