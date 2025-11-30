# Database Migrations

Scripts migration để quản lý thay đổi database schema.

## Quy tắc đặt tên

- `001_initial_schema.sql`
- `002_add_user_roles.sql`
- `003_add_station_location.sql`
- ...

## Lưu ý

Trong giai đoạn phát triển, có thể sử dụng Hibernate auto-update. 
Sang production, nên sử dụng migration scripts này để quản lý schema changes.

