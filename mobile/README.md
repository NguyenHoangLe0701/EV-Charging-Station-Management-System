# EV Charging Station - Android App

Ứng dụng Android cho hệ thống quản lý trạm sạc EV được xây dựng bằng **Jetpack Compose** và **MVVM Architecture**.

## 🏗️ Kiến trúc

```
mobile/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/evcharging/mobile/
│   │   │   │   ├── data/          # Data layer (API, Repository, Models)
│   │   │   │   ├── ui/            # UI layer (Compose screens, ViewModels)
│   │   │   │   └── di/            # Dependency Injection (Hilt)
│   │   │   └── res/
│   │   └── test/
│   └── build.gradle.kts
├── build.gradle.kts
└── settings.gradle.kts
```

## 🛠️ Công nghệ sử dụng

- **Jetpack Compose** - Modern Android UI toolkit
- **MVVM Architecture** - Model-View-ViewModel pattern
- **Hilt** - Dependency Injection
- **Retrofit** - HTTP client for API calls
- **DataStore** - Modern data storage (thay thế SharedPreferences)
- **Coroutines & Flow** - Asynchronous programming
- **Material Design 3** - UI components
- **Navigation Compose** - Navigation between screens
- **ViewModel & StateFlow** - Data management

## 📱 Các màn hình chính

### ✅ Đã triển khai:

1. **Authentication**
   - ✅ Login Screen với validation
   - ✅ Register Screen với validation

2. **Home**
   - ✅ Dashboard với thông tin người dùng
   - ✅ Danh sách trạm gần nhất

### 🚧 Cần triển khai tiếp:

3. **Map** - Hiển thị trạm sạc trên bản đồ
4. **Charging Sessions** - Lịch sử và quản lý phiên sạc
5. **Profile** - Thông tin người dùng và cài đặt

## 🔗 API Integration

Backend API Gateway được cấu hình trong `RetrofitModule.kt`:

- **Android Emulator**: `http://10.0.2.2:8080/api`
- **Thiết bị thật**: `http://YOUR_PC_IP:8080/api`

### Endpoints được tích hợp:

- `/api/auth/login` - Đăng nhập
- `/api/auth/register` - Đăng ký
- `/api/stations` - Lấy danh sách trạm
- `/api/stations/{id}` - Chi tiết trạm
- `/api/charging/sessions/**` - Quản lý phiên sạc

## 🚀 Setup và Chạy

Xem file [SETUP.md](./SETUP.md) để biết chi tiết các bước setup.

### Quick Start:

1. Mở project trong Android Studio
2. Sync Gradle files
3. Cấu hình API Base URL trong `RetrofitModule.kt`
4. Chạy ứng dụng trên emulator hoặc thiết bị thật

## 📦 Cấu trúc MVVM

### Data Layer (`data/`)
- **api/**: Retrofit API services
- **model/**: Data models (DTOs)
- **repository/**: Repository pattern implementation
- **local/**: Local storage (DataStore)

### UI Layer (`ui/`)
- **auth/**: Authentication screens và ViewModels
- **home/**: Home screen và ViewModel
- **navigation/**: Navigation setup
- **theme/**: Material Design theme

### Dependency Injection (`di/`)
- Hilt modules để inject dependencies

## 🔐 Authentication Flow

1. User nhập email/password
2. ViewModel gọi Repository
3. Repository gọi API service
4. Response được lưu vào DataStore
5. Token tự động được thêm vào headers cho các request tiếp theo

## 📝 Ghi chú

- Token được tự động lưu sau khi login thành công
- Token được tự động thêm vào headers của các API request
- Sử dụng DataStore thay vì SharedPreferences
- Material Design 3 với theme màu xanh lá (EV Charging)

## 🔄 Tiếp theo

Các tính năng cần triển khai:

1. ✅ Authentication (Login/Register)
2. ✅ Home screen với danh sách trạm
3. 🚧 Map screen với Google Maps
4. 🚧 Charging session management
5. 🚧 Profile & Settings
6. 🚧 Push notifications
7. 🚧 Payment integration

## 📚 Tài liệu tham khảo

- [Jetpack Compose](https://developer.android.com/jetpack/compose)
- [MVVM Architecture](https://developer.android.com/jetpack/guide)
- [Hilt](https://developer.android.com/training/dependency-injection/hilt-android)
- [Retrofit](https://square.github.io/retrofit/)
- [Material Design 3](https://m3.material.io/)
