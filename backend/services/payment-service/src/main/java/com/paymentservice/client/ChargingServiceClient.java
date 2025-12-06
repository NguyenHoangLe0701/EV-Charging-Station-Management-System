package com.paymentservice.client;

import com.paymentservice.dto.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;

@FeignClient(name = "charging-service", path = "/api/charging")
public interface ChargingServiceClient {
    
    @GetMapping("/sessions/{id}")
    ApiResponse<Object> getChargingSession(@PathVariable Long id);
    
    @GetMapping("/sessions/revenue")
    ApiResponse<Double> getTotalRevenue(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    );
    
    @GetMapping("/sessions/count")
    ApiResponse<Long> countSessionsByStatus(@RequestParam String status);
}

