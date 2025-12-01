package com.authservice.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {
    private String secret = "ev-charging-station-management-system-secret-key-2024-very-secure";
    private Long expiration = 86400000L; // 24 hours in milliseconds
}

