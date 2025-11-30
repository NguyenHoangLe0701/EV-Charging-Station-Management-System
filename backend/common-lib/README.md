# Common Library

Thư viện chung cho tất cả các microservices trong dự án.

## 📦 Nội dung

Thư viện này chứa các thành phần dùng chung:

- **DTOs** (Data Transfer Objects) - Các object chuyển dữ liệu giữa services
- **Constants** - Hằng số dùng chung
- **Exceptions** - Custom exceptions
- **Utilities** - Các hàm tiện ích
- **Enums** - Các enum dùng chung
- **Configurations** - Cấu hình chung

## 🔧 Sử dụng

Để sử dụng common-lib trong các services khác, thêm dependency vào `pom.xml`:

```xml
<dependency>
    <groupId>com.evcharging</groupId>
    <artifactId>common-lib</artifactId>
    <version>1.0.0</version>
</dependency>
```

## 📁 Cấu trúc

```
common-lib/
├── src/main/java/com/evcharging/common/
│   ├── dto/           # DTOs chung
│   ├── exception/     # Custom exceptions
│   ├── constant/      # Constants
│   ├── util/          # Utilities
│   ├── enums/         # Enums
│   └── config/        # Configurations
└── pom.xml
```

