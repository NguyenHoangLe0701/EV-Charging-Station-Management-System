# Hướng dẫn Setup và Chạy Ứng dụng Android

## 📋 Yêu cầu

- Android Studio Hedgehog (2023.1.1) trở lên
- JDK 17 hoặc cao hơn
- Android SDK API Level 24 (Android 7.0) trở lên
- Backend API đang chạy trên `http://localhost:8080`

## 🚀 Các bước Setup

### 1. Mở Project trong Android Studio

```bash
# Mở folder mobile trong Android Studio
File > Open > chọn folder mobile/
```

### 2. Cấu hình API Base URL

#### Cho Android Emulator:
Mặc định đã được cấu hình trong `RetrofitModule.kt`:
```kotlin
private const val BASE_URL = "http://10.0.2.2:8080/api/"
```

#### Cho thiết bị thật:
1. Tìm IP của máy tính:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
2. Cập nhật trong `RetrofitModule.kt`:
```kotlin
private const val BASE_URL = "http://YOUR_PC_IP:8080/api/"
```

### 3. Cấu hình Google Maps API Key (Tùy chọn)

Nếu sử dụng tính năng Map:

1. Lấy API key từ [Google Cloud Console](https://console.cloud.google.com/)
2. Thêm vào `app/src/main/res/values/strings.xml`:
```xml
<string name="google_maps_key">YOUR_API_KEY_HERE</string>
```

### 4. Sync Gradle

```
File > Sync Project with Gradle Files
```

### 5. Chạy ứng dụng

1. Kết nối thiết bị hoặc tạo Emulator
2. Chạy:
   ```
   Run > Run 'app'
   ```

## 📱 Các màn hình

### Authentication
- **Login Screen**: Đăng nhập với email/password
- **Register Screen**: Đăng ký tài khoản mới

### Home
- **Home Screen**: Dashboard với danh sách trạm gần đây

## 🔧 Cấu trúc Dự án

```
mobile/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/evcharging/mobile/
│   │   │   │   ├── data/          # Data layer
│   │   │   │   │   ├── api/       # API services
│   │   │   │   │   ├── local/     # Local storage
│   │   │   │   │   ├── model/     # Data models
│   │   │   │   │   └── repository/# Repository layer
│   │   │   │   ├── ui/            # UI layer
│   │   │   │   │   ├── auth/      # Auth screens
│   │   │   │   │   ├── home/      # Home screens
│   │   │   │   │   ├── navigation/# Navigation
│   │   │   │   │   └── theme/     # Theme & styling
│   │   │   │   └── di/            # Dependency Injection
│   │   │   └── res/               # Resources
│   │   └── test/                  # Tests
│   └── build.gradle.kts
└── build.gradle.kts
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký

### Stations
- `GET /api/stations` - Lấy danh sách trạm
- `GET /api/stations/{id}` - Lấy chi tiết trạm

### Charging Sessions
- `GET /api/charging/sessions/user/{userId}` - Lấy lịch sử sạc
- `POST /api/charging/sessions/start` - Bắt đầu sạc
- `POST /api/charging/sessions/{id}/stop` - Dừng sạc

## 🐛 Troubleshooting

### Lỗi kết nối API
- Kiểm tra backend đang chạy: `http://localhost:8080/api/auth/health`
- Kiểm tra IP address nếu dùng thiết bị thật
- Kiểm tra firewall/antivirus đang chặn cổng 8080

### Lỗi build Gradle
- Clean project: `Build > Clean Project`
- Rebuild: `Build > Rebuild Project`
- Invalidate caches: `File > Invalidate Caches`

### Lỗi Hilt
- Đảm bảo đã thêm `@HiltAndroidApp` vào Application class
- Đảm bảo đã thêm `@AndroidEntryPoint` vào Activity/Fragment

## 📝 Ghi chú

- Token được lưu tự động sau khi login thành công
- Token được tự động thêm vào headers của các API request
- App sử dụng DataStore để lưu trữ local data (thay thế SharedPreferences)

