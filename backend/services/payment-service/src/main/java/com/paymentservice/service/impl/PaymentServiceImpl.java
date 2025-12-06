package com.paymentservice.service.impl;

import com.paymentservice.dto.CreatePaymentRequest;
import com.paymentservice.dto.PaymentResponse;
import com.paymentservice.dto.RevenueStatisticsResponse;
import com.paymentservice.entity.Payment;
import com.paymentservice.repository.PaymentRepository;
import com.paymentservice.service.PaymentService;
import com.paymentservice.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    
    private final PaymentRepository paymentRepository;
    private final VNPayService vnPayService;

    @Override
    @Transactional
    public PaymentResponse createPayment(CreatePaymentRequest request, HttpServletRequest httpRequest) {
        // Validate payment method
        Payment.PaymentMethod paymentMethod;
        try {
            paymentMethod = Payment.PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid payment method: " + request.getPaymentMethod() + 
                    ". Supported methods: VNPAY, MOMO, WALLET, CASH, BANK_TRANSFER");
        }
        
        Payment payment = Payment.builder()
                .userId(request.getUserId())
                .chargingSessionId(request.getChargingSessionId())
                .amount(request.getAmount())
                .paymentMethod(paymentMethod)
                .status(Payment.PaymentStatus.PENDING)
                .transactionId(UUID.randomUUID().toString())
                .build();

        payment = paymentRepository.save(payment);

        // If VNPay, create payment URL
        String paymentUrl = null;
        if (request.getPaymentMethod().equalsIgnoreCase("VNPAY")) {
            Long amountInVnd = request.getAmount().longValue();
            String orderInfo = request.getOrderInfo() != null ? request.getOrderInfo() : 
                    "Thanh toan don hang " + payment.getId();
            paymentUrl = vnPayService.createPaymentUrl(amountInVnd, orderInfo, 
                    payment.getTransactionId(), httpRequest);
        }

        PaymentResponse response = PaymentResponse.fromEntity(payment);
        response.setPaymentUrl(paymentUrl);
        return response;
    }

    @Override
    @Transactional
    public PaymentResponse processVNPayCallback(Map<String, String> params) {
        Map<String, String> verificationResult = vnPayService.verifyPayment(params);
        
        if (!"true".equals(verificationResult.get("isValid"))) {
            throw new RuntimeException("Invalid payment signature");
        }

        String transactionId = params.get("vnp_TxnRef");
        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        String responseCode = verificationResult.get("responseCode");
        
        if ("00".equals(responseCode)) {
            payment.setStatus(Payment.PaymentStatus.COMPLETED);
            payment.setPaidAt(LocalDateTime.now());
            payment.setGatewayResponse(params.toString());
            if (verificationResult.get("transactionId") != null) {
                payment.setTransactionId(verificationResult.get("transactionId"));
            }
        } else {
            payment.setStatus(Payment.PaymentStatus.FAILED);
            payment.setGatewayResponse(params.toString());
        }

        payment = paymentRepository.save(payment);
        return PaymentResponse.fromEntity(payment);
    }

    @Override
    public PaymentResponse getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return PaymentResponse.fromEntity(payment);
    }

    @Override
    public PaymentResponse getPaymentByTransactionId(String transactionId) {
        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return PaymentResponse.fromEntity(payment);
    }

    @Override
    public List<PaymentResponse> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByUserId(userId).stream()
                .map(PaymentResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(PaymentResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PaymentResponse updatePaymentStatus(Long id, String status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setStatus(Payment.PaymentStatus.valueOf(status.toUpperCase()));
        payment = paymentRepository.save(payment);
        return PaymentResponse.fromEntity(payment);
    }

    @Override
    public RevenueStatisticsResponse getRevenueStatistics(LocalDateTime startDate, LocalDateTime endDate) {
        List<Payment> payments = paymentRepository.getCompletedPaymentsByDateRange(startDate, endDate);
        
        BigDecimal totalRevenue = payments.stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Long totalTransactions = (long) payments.size();
        BigDecimal averageTransaction = totalTransactions > 0 
                ? totalRevenue.divide(BigDecimal.valueOf(totalTransactions), 2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;
        
        // Daily revenue
        Map<LocalDate, List<Payment>> dailyPayments = payments.stream()
                .filter(p -> p.getPaidAt() != null)
                .collect(Collectors.groupingBy(p -> p.getPaidAt().toLocalDate()));
        
        List<RevenueStatisticsResponse.DailyRevenueData> dailyRevenue = dailyPayments.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    BigDecimal dayRevenue = entry.getValue().stream()
                            .map(Payment::getAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    return RevenueStatisticsResponse.DailyRevenueData.builder()
                            .date(entry.getKey().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                            .revenue(dayRevenue)
                            .transactionCount((long) entry.getValue().size())
                            .build();
                })
                .collect(Collectors.toList());
        
        // Monthly revenue
        Map<String, List<Payment>> monthlyPayments = payments.stream()
                .filter(p -> p.getPaidAt() != null)
                .collect(Collectors.groupingBy(p -> {
                    LocalDate date = p.getPaidAt().toLocalDate();
                    return String.format("%02d/%d", date.getMonthValue(), date.getYear());
                }));
        
        List<RevenueStatisticsResponse.MonthlyRevenueData> monthlyRevenue = monthlyPayments.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    BigDecimal monthRevenue = entry.getValue().stream()
                            .map(Payment::getAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    return RevenueStatisticsResponse.MonthlyRevenueData.builder()
                            .month(entry.getKey())
                            .revenue(monthRevenue)
                            .transactionCount((long) entry.getValue().size())
                            .build();
                })
                .collect(Collectors.toList());
        
        // Payment method stats
        Map<Payment.PaymentMethod, List<Payment>> methodPayments = payments.stream()
                .collect(Collectors.groupingBy(Payment::getPaymentMethod));
        
        List<RevenueStatisticsResponse.PaymentMethodStats> paymentMethodStats = methodPayments.entrySet().stream()
                .map(entry -> {
                    BigDecimal methodRevenue = entry.getValue().stream()
                            .map(Payment::getAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    double percentage = totalRevenue.compareTo(BigDecimal.ZERO) > 0
                            ? methodRevenue.divide(totalRevenue, 4, RoundingMode.HALF_UP)
                                    .multiply(BigDecimal.valueOf(100))
                                    .doubleValue()
                            : 0.0;
                    return RevenueStatisticsResponse.PaymentMethodStats.builder()
                            .paymentMethod(entry.getKey().name())
                            .amount(methodRevenue)
                            .count((long) entry.getValue().size())
                            .percentage(percentage)
                            .build();
                })
                .collect(Collectors.toList());
        
        return RevenueStatisticsResponse.builder()
                .totalRevenue(totalRevenue)
                .totalTransactions(totalTransactions)
                .averageTransaction(averageTransaction)
                .dailyRevenue(dailyRevenue)
                .monthlyRevenue(monthlyRevenue)
                .paymentMethodStats(paymentMethodStats)
                .build();
    }

    @Override
    public BigDecimal getTotalRevenue(LocalDateTime startDate, LocalDateTime endDate) {
        List<Payment> payments = paymentRepository.getCompletedPaymentsByDateRange(startDate, endDate);
        return payments.stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public Long getTotalTransactions(LocalDateTime startDate, LocalDateTime endDate) {
        List<Payment> payments = paymentRepository.getCompletedPaymentsByDateRange(startDate, endDate);
        return (long) payments.size();
    }
}

