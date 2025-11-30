# Database

Thư mục chứa các scripts và schemas database cho dự án.

## 📁 Cấu trúc

```
database/
├── schemas/      # Database schemas (SQL scripts để tạo databases)
├── migrations/   # Database migration scripts
└── seeds/        # Seed data scripts (dữ liệu mẫu)
```

## 🗄️ Databases

Dự án sử dụng các databases sau:

- `ev_charging_auth` - Auth Service
- `ev_charging_user` - User Service
- `ev_charging_station` - Station Service
- `ev_charging_session` - Charging Service
- `ev_charging_payment` - Payment Service
- `ev_charging_notification` - Notification Service
- `ev_charging_reporting` - Reporting Service

## 📝 Sử dụng

1. **Schemas**: Tạo databases và cấu trúc cơ bản
2. **Migrations**: Quản lý thay đổi database schema theo thời gian
3. **Seeds**: Chèn dữ liệu mẫu để test

