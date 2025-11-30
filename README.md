# EV-Charging-Station-Management-System---Project
# 🚗 Hệ Thống Quản Lý Trạm Sạc Xe Điện

## 🎯 1. Mục Tiêu Dự Án
Xây dựng **Hệ Thống Quản Lý Trạm Sạc Xe Điện** sử dụng **kiến trúc microservices**.  
Hệ thống phục vụ 3 nhóm người dùng chính:

- **Tài Xế Xe Điện**: tìm trạm sạc, đặt chỗ, bắt đầu/kết thúc phiên sạc, thanh toán, xem báo cáo cá nhân.  
- **Nhân Viên Trạm Sạc**: giám sát điểm sạc, xử lý thanh toán tại chỗ.  
- **Quản Trị Viên**: quản lý trạm sạc/điểm sạc, người dùng, gói dịch vụ, báo cáo & thống kê doanh thu.  

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
- **Ứng dụng Tài xế**: tìm kiếm trạm, đặt chỗ, bắt đầu/kết thúc sạc, thanh toán  
- **Ứng dụng Nhân viên**: quản lý phiên sạc, xác nhận thanh toán tại chỗ  
- **Cổng Quản trị**: quản lý trạm/điểm sạc, người dùng, gói dịch vụ, báo cáo  
- **Thanh toán**: Tích hợp VNPay/MoMo sandbox + ví điện tử demo  
- **Báo cáo & Phân tích**: cấp độ cá nhân và hệ thống  
- Triển khai với **Docker Compose**  

### ❌ Ngoài Phạm Vi (giai đoạn tương lai)
- Tích hợp phần cứng thực tế (thiết bị IoT sạc)  
- AI dự đoán nhu cầu & đề xuất nâng cấp trạm  
- Triển khai với **Kubernetes**  

---

## ⚙️ 4. Công Nghệ Sử Dụng
- **Backend**: Java (Spring Boot), MySQL  
- **Frontend**: ReactJS (web responsive)  
- **Kiến trúc**: Microservices  
- **Triển khai**: Docker, Docker Compose  
- **Thanh toán**: VNPay/MoMo sandbox  
- **Bản đồ**: Google Maps API  
- **Quản lý Phiên bản**: GitHub  
- **Quản lý Dự án**: Jira  
- **Tài liệu**: Confluence  

---

## 📅 5. Lộ Trình (8 tuần, ≥400 giờ)
- **Tuần 1–2**: Phân tích yêu cầu, thiết kế, thiết lập, Dịch vụ Xác thực & Người dùng  
- **Tuần 3–4**: Dịch vụ Trạm sạc, Dịch vụ Phiên Sạc, Dịch vụ Thanh toán  
- **Tuần 5–6**: Giao diện Frontend (Tài xế, Nhân viên, Quản trị)  
- **Tuần 7**: Tích hợp hệ thống & kiểm thử  
- **Tuần 8**: Demo, báo cáo, giao nộp cuối cùng  

---

## 📊 6. Sản Phẩm Giao Nộp
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

---
