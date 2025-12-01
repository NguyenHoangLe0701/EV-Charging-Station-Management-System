-- Script để tạo user MySQL cho dự án EV Charging Station
-- Chạy script này với quyền root: mysql -u root -p < setup-user.sql

-- Tạo user (thay 'your_password' bằng mật khẩu thật của bạn)
CREATE USER IF NOT EXISTS 'evchargingstation'@'localhost' IDENTIFIED BY '07012005';

-- Cấp quyền cho tất cả databases của dự án
GRANT ALL PRIVILEGES ON ev_charging_auth.* TO 'evchargingstation'@'localhost';
GRANT ALL PRIVILEGES ON ev_charging_user.* TO 'evchargingstation'@'localhost';
GRANT ALL PRIVILEGES ON ev_charging_station.* TO 'evchargingstation'@'localhost';
GRANT ALL PRIVILEGES ON ev_charging_session.* TO 'evchargingstation'@'localhost';
GRANT ALL PRIVILEGES ON ev_charging_payment.* TO 'evchargingstation'@'localhost';
GRANT ALL PRIVILEGES ON ev_charging_notification.* TO 'evchargingstation'@'localhost';
GRANT ALL PRIVILEGES ON ev_charging_reporting.* TO 'evchargingstation'@'localhost';

-- Cấp quyền tạo database (nếu chưa tồn tại)
GRANT CREATE ON *.* TO 'evchargingstation'@'localhost';

-- Áp dụng thay đổi
FLUSH PRIVILEGES;

-- Kiểm tra user đã được tạo
SELECT User, Host FROM mysql.user WHERE User = 'evchargingstation';

-- Hiển thị quyền của user
SHOW GRANTS FOR 'evchargingstation'@'localhost';

