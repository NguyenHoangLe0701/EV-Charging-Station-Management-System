package com.paymentservice.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "com.paymentservice.client")
public class FeignConfig {
    // Feign client configuration
}

