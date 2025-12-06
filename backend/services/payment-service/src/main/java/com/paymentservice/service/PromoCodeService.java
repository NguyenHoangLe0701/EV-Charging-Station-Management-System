package com.paymentservice.service;

import com.paymentservice.dto.ApplyPromoCodeRequest;
import com.paymentservice.dto.ApplyPromoCodeResponse;
import com.paymentservice.dto.PromoCodeRequest;
import com.paymentservice.dto.PromoCodeResponse;

import java.util.List;

public interface PromoCodeService {
    PromoCodeResponse createPromoCode(PromoCodeRequest request);
    PromoCodeResponse updatePromoCode(Long id, PromoCodeRequest request);
    PromoCodeResponse getPromoCodeById(Long id);
    PromoCodeResponse getPromoCodeByCode(String code);
    List<PromoCodeResponse> getAllPromoCodes();
    List<PromoCodeResponse> getActivePromoCodes();
    void deletePromoCode(Long id);
    ApplyPromoCodeResponse applyPromoCode(ApplyPromoCodeRequest request);
}

