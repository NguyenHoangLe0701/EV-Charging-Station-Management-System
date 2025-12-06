package com.paymentservice.controller;

import com.paymentservice.dto.ApiResponse;
import com.paymentservice.dto.CreatePaymentRequest;
import com.paymentservice.dto.PaymentResponse;
import com.paymentservice.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    
    private final PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<PaymentResponse>> createPayment(
            @jakarta.validation.Valid @RequestBody CreatePaymentRequest request,
            HttpServletRequest httpRequest) {
        try {
            PaymentResponse response = paymentService.createPayment(request, httpRequest);
            return ResponseEntity.ok(ApiResponse.success("Payment created successfully", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Invalid payment method: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/vnpay/callback")
    public ResponseEntity<?> vnpayCallback(
            @RequestParam Map<String, String> params,
            HttpServletRequest request) {
        try {
            PaymentResponse paymentResponse = paymentService.processVNPayCallback(params);
            
            // Redirect to frontend success/failure page
            String redirectUrl = "http://localhost:5173/payment/result?status=" + 
                    paymentResponse.getStatus().toLowerCase() + 
                    "&transactionId=" + paymentResponse.getTransactionId();
            
            return ResponseEntity.status(HttpStatus.FOUND)
                    .header("Location", redirectUrl)
                    .build();
        } catch (Exception e) {
            try {
                String errorMessage = java.net.URLEncoder.encode(e.getMessage(), java.nio.charset.StandardCharsets.UTF_8);
                String redirectUrl = "http://localhost:5173/payment/result?status=failed&error=" + errorMessage;
                return ResponseEntity.status(HttpStatus.FOUND)
                        .header("Location", redirectUrl)
                        .build();
            } catch (Exception ex) {
                String redirectUrl = "http://localhost:5173/payment/result?status=failed";
                return ResponseEntity.status(HttpStatus.FOUND)
                        .header("Location", redirectUrl)
                        .build();
            }
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentById(@PathVariable Long id) {
        try {
            PaymentResponse response = paymentService.getPaymentById(id);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentByTransactionId(
            @PathVariable String transactionId) {
        try {
            PaymentResponse response = paymentService.getPaymentByTransactionId(transactionId);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getPaymentsByUserId(
            @PathVariable Long userId) {
        try {
            List<PaymentResponse> payments = paymentService.getPaymentsByUserId(userId);
            return ResponseEntity.ok(ApiResponse.success(payments));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getAllPayments() {
        try {
            List<PaymentResponse> payments = paymentService.getAllPayments();
            return ResponseEntity.ok(ApiResponse.success(payments));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<PaymentResponse>> updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        try {
            PaymentResponse response = paymentService.updatePaymentStatus(id, status);
            return ResponseEntity.ok(ApiResponse.success("Status updated successfully", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/revenue/statistics")
    public ResponseEntity<ApiResponse<com.paymentservice.dto.RevenueStatisticsResponse>> getRevenueStatistics(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        try {
            java.time.LocalDateTime start = startDate != null 
                    ? java.time.LocalDateTime.parse(startDate, java.time.format.DateTimeFormatter.ISO_DATE_TIME)
                    : java.time.LocalDateTime.now().minusMonths(6);
            java.time.LocalDateTime end = endDate != null
                    ? java.time.LocalDateTime.parse(endDate, java.time.format.DateTimeFormatter.ISO_DATE_TIME)
                    : java.time.LocalDateTime.now();
            
            com.paymentservice.dto.RevenueStatisticsResponse response = paymentService.getRevenueStatistics(start, end);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/revenue/total")
    public ResponseEntity<ApiResponse<java.math.BigDecimal>> getTotalRevenue(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        try {
            java.time.LocalDateTime start = startDate != null 
                    ? java.time.LocalDateTime.parse(startDate, java.time.format.DateTimeFormatter.ISO_DATE_TIME)
                    : java.time.LocalDateTime.now().minusMonths(1);
            java.time.LocalDateTime end = endDate != null
                    ? java.time.LocalDateTime.parse(endDate, java.time.format.DateTimeFormatter.ISO_DATE_TIME)
                    : java.time.LocalDateTime.now();
            
            java.math.BigDecimal revenue = paymentService.getTotalRevenue(start, end);
            return ResponseEntity.ok(ApiResponse.success(revenue));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/revenue/transactions")
    public ResponseEntity<ApiResponse<Long>> getTotalTransactions(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        try {
            java.time.LocalDateTime start = startDate != null 
                    ? java.time.LocalDateTime.parse(startDate, java.time.format.DateTimeFormatter.ISO_DATE_TIME)
                    : java.time.LocalDateTime.now().minusMonths(1);
            java.time.LocalDateTime end = endDate != null
                    ? java.time.LocalDateTime.parse(endDate, java.time.format.DateTimeFormatter.ISO_DATE_TIME)
                    : java.time.LocalDateTime.now();
            
            Long count = paymentService.getTotalTransactions(start, end);
            return ResponseEntity.ok(ApiResponse.success(count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}

