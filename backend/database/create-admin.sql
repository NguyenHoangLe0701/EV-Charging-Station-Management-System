-- Script để tạo admin user trong database
-- Chạy script này nếu muốn tạo admin user thủ công

USE ev_charging_auth;

-- Kiểm tra và tạo admin user
-- Lưu ý: Mật khẩu "12345" đã được mã hóa bằng BCrypt
-- Hash này tương ứng với mật khẩu "12345"

INSERT INTO users (email, password, full_name, role, status, created_at)
SELECT 
    'admin@evcharge.vn',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- BCrypt hash của "12345"
    'System Administrator',
    'ADMIN',
    'ACTIVE',
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'admin@evcharge.vn'
);

-- Kiểm tra user đã được tạo
SELECT id, email, full_name, role, status, created_at 
FROM users 
WHERE email = 'admin@evcharge.vn';

