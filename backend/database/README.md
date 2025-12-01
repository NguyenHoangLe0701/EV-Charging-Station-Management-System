# Database Setup

Thư mục này chứa script để setup MySQL user cho tất cả microservices.

## 📋 Nguyên tắc Microservices

Trong kiến trúc **Microservices**, mỗi service tự quản lý database riêng của mình:
- **Database per Service**: Mỗi service có database riêng biệt
- **Schema Management**: Mỗi service tự quản lý schema thông qua JPA/Hibernate (`ddl-auto: update`)
- **Migrations**: Mỗi service tự quản lý migrations (nếu cần) trong thư mục riêng của service

## 🗄️ Databases

Dự án sử dụng các databases sau (mỗi service một database):

- `ev_charging_auth` - Auth Service (port 8081)
- `ev_charging_user` - User Service (port 8082)
- `ev_charging_station` - Station Service (port 8083)
- `ev_charging_session` - Charging Service (port 8084)
- `ev_charging_payment` - Payment Service (port 8085)
- `ev_charging_notification` - Notification Service (port 8086)
- `ev_charging_reporting` - Reporting Service (port 8087)

**Lưu ý**: Databases sẽ được tạo tự động khi service khởi động (nhờ `createDatabaseIfNotExist=true` trong connection string).

## ⚙️ Cấu hình MySQL User

### Tạo User MySQL

Nếu gặp lỗi "Access denied for user 'evchargingstation'@'localhost'", bạn cần tạo user MySQL:

**Cách 1: Sử dụng script SQL (Khuyến nghị)**

1. Mở file `setup-user.sql` và kiểm tra mật khẩu (dòng 5)
2. Chạy script với quyền root:
   ```bash
   mysql -u root -p < database/setup-user.sql
   ```

**Cách 2: Tạo thủ công**

Kết nối MySQL với quyền root:
```bash
mysql -u root -p
```

Sau đó chạy các lệnh sau:
```sql
-- Tạo user
CREATE USER 'evchargingstation'@'localhost' IDENTIFIED BY '07012005';

-- Cấp quyền cho tất cả databases
GRANT ALL PRIVILEGES ON ev_charging_*.* TO 'evchargingstation'@'localhost';
GRANT CREATE ON *.* TO 'evchargingstation'@'localhost';

-- Áp dụng thay đổi
FLUSH PRIVILEGES;
```

### Kiểm tra User đã được tạo

```sql
SELECT User, Host FROM mysql.user WHERE User = 'evchargingstation';
SHOW GRANTS FOR 'evchargingstation'@'localhost';
```

### Test kết nối

```bash
mysql -u evchargingstation -p
# Nhập mật khẩu: 07012005
```

## 📝 Quản lý Database trong Microservices

### Schema Management

Mỗi service tự quản lý schema thông qua:
- **JPA/Hibernate**: Tự động tạo/update tables với `ddl-auto: update` (development)
- **Flyway/Liquibase**: Có thể thêm vào từng service nếu cần migrations (production)

### Ví dụ: Thêm migration vào một service

Nếu cần migrations cho một service cụ thể, tạo thư mục trong service đó:
```
services/auth-service/
├── src/main/resources/
│   └── db/migration/  # Flyway migrations (nếu dùng Flyway)
│       └── V1__initial_schema.sql
```

### Seed Data

Nếu cần seed data, tạo trong từng service:
- Test data: Tạo trong `@PostConstruct` hoặc test classes
- Initial data: Tạo migration script trong service đó

## 🔧 Xử lý lỗi

### Lỗi "Access denied for user 'evchargingstation'@'localhost'"

**Nguyên nhân:**
- User MySQL chưa được tạo
- Mật khẩu không đúng
- User không có quyền truy cập

**Giải pháp:**
1. Tạo user MySQL bằng script `setup-user.sql` (xem trên)
2. Kiểm tra mật khẩu trong file `backend/.env` khớp với mật khẩu trong MySQL
3. Đảm bảo MySQL service đang chạy:
   ```powershell
   net start MySQL80
   ```

### Lỗi "Unknown database"

Databases sẽ được tạo tự động khi service khởi động (nhờ `createDatabaseIfNotExist=true` trong connection string).

Nếu vẫn lỗi, tạo thủ công:
```sql
CREATE DATABASE IF NOT EXISTS ev_charging_auth;
CREATE DATABASE IF NOT EXISTS ev_charging_user;
-- ... các database khác
```

## 📚 Tài liệu tham khảo

- [MySQL User Management](https://dev.mysql.com/doc/refman/8.0/en/user-account-management.html)
- [MySQL Privileges](https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html)
