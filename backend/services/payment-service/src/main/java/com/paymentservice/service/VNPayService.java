package com.paymentservice.service;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface VNPayService {
    String createPaymentUrl(Long amount, String orderInfo, String orderId, HttpServletRequest request);
    Map<String, String> verifyPayment(Map<String, String> params);
    String hashAllFields(Map<String, String> fields);
}

