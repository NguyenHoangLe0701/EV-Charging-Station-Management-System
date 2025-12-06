package com.paymentservice.service;

import com.paymentservice.dto.CreatePaymentRequest;
import com.paymentservice.dto.PaymentResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;

public interface PaymentService {
    PaymentResponse createPayment(CreatePaymentRequest request, HttpServletRequest httpRequest);
    PaymentResponse processVNPayCallback(Map<String, String> params);
    PaymentResponse getPaymentById(Long id);
    PaymentResponse getPaymentByTransactionId(String transactionId);
    List<PaymentResponse> getPaymentsByUserId(Long userId);
    List<PaymentResponse> getAllPayments();
    PaymentResponse updatePaymentStatus(Long id, String status);
    
    // Revenue Statistics
    com.paymentservice.dto.RevenueStatisticsResponse getRevenueStatistics(java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
    java.math.BigDecimal getTotalRevenue(java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
    Long getTotalTransactions(java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
}

