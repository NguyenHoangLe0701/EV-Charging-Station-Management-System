# Auth Service

Service xử lý xác thực và phân quyền người dùng trong hệ thống EV Charging Station Management.

## Chức năng

- ✅ Đăng ký tài khoản mới (Register)
- ✅ Đăng nhập (Login) với JWT Token
- ✅ Xác thực JWT Token
- ✅ Mã hóa mật khẩu bằng BCrypt
- ✅ Validation dữ liệu đầu vào

## API Endpoints

### 1. Đăng ký (Register)

**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "Nguyễn Văn A",
  "phoneNumber": "0123456789"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "userId": 1,
    "email": "user@example.com",
    "fullName": "Nguyễn Văn A",
    "role": "USER"
  }
}
```

### 2. Đăng nhập (Login)

**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "userId": 1,
    "email": "user@example.com",
    "fullName": "Nguyễn Văn A",
    "role": "USER"
  }
}
```

### 3. Health Check

**GET** `/api/auth/health`

**Response:**
```
Auth Service is running
```

## Cấu hình

### Database

- **Database:** `ev_charging_auth`
- **Port:** 3306 (MySQL)

### JWT Configuration

Trong `application.yml`:

```yaml
jwt:
  secret: your-secret-key
  expiration: 86400000 # 24 hours (milliseconds)
```

### Port

Service chạy trên port: **8081**

## Cấu trúc Database

### Bảng `users`

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key |
| email | VARCHAR(255) | Email (unique) |
| password | VARCHAR(255) | Mật khẩu đã mã hóa |
| full_name | VARCHAR(255) | Họ tên |
| phone_number | VARCHAR(20) | Số điện thoại |
| role | ENUM | USER, ADMIN |
| status | ENUM | ACTIVE, INACTIVE, SUSPENDED |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |

## Validation Rules

### Register
- Email: Required, phải là email hợp lệ, không được trùng
- Password: Required, tối thiểu 6 ký tự
- FullName: Required, tối thiểu 2 ký tự
- PhoneNumber: Optional

### Login
- Email: Required, phải là email hợp lệ
- Password: Required

## Security Features

- ✅ BCrypt password hashing
- ✅ JWT Token authentication
- ✅ Role-based access (USER, ADMIN)
- ✅ Account status management (ACTIVE, INACTIVE, SUSPENDED)
- ✅ CORS configuration (có thể mở rộng)

## Testing với Postman/cURL

### Register
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "phoneNumber": "0123456789"
  }'
```

### Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Lưu ý

1. Đảm bảo MySQL đang chạy và database `ev_charging_auth` có thể được tạo tự động
2. Đảm bảo Eureka Server đang chạy trên port 8761 (nếu sử dụng service discovery)
3. JWT secret key nên được thay đổi trong production và lưu trữ an toàn
4. Token mặc định có thời hạn 24 giờ

