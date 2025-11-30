# Database Schemas

Scripts để tạo databases và cấu trúc cơ bản.

## Tạo Databases

Chạy script này trong MySQL để tạo tất cả databases:

```sql
CREATE DATABASE IF NOT EXISTS ev_charging_auth;
CREATE DATABASE IF NOT EXISTS ev_charging_user;
CREATE DATABASE IF NOT EXISTS ev_charging_station;
CREATE DATABASE IF NOT EXISTS ev_charging_session;
CREATE DATABASE IF NOT EXISTS ev_charging_payment;
CREATE DATABASE IF NOT EXISTS ev_charging_notification;
```

Các tables sẽ được tạo tự động bởi Hibernate/JPA với `ddl-auto: update` trong application.yml của mỗi service.

