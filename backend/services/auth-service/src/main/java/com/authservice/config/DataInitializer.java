package com.authservice.config;

import com.authservice.entity.User;
import com.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        // Tạo admin user nếu chưa tồn tại
        if (!userRepository.existsByEmail("admin@evcharge.vn")) {
            User admin = User.builder()
                    .email("admin@evcharge.vn")
                    .password(passwordEncoder.encode("12345"))
                    .fullName("System Administrator")
                    .role(User.Role.ADMIN)
                    .status(User.UserStatus.ACTIVE)
                    .build();
            
            userRepository.save(admin);
            log.info("✓ Admin user created: admin@evcharge.vn / 12345");
        } else {
            log.info("✓ Admin user already exists: admin@evcharge.vn");
        }
    }
}

