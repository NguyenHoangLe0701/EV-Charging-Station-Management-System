package com.paymentservice.service.impl;

import com.paymentservice.dto.ApplyPromoCodeRequest;
import com.paymentservice.dto.ApplyPromoCodeResponse;
import com.paymentservice.dto.PromoCodeRequest;
import com.paymentservice.dto.PromoCodeResponse;
import com.paymentservice.entity.PromoCode;
import com.paymentservice.repository.PromoCodeRepository;
import com.paymentservice.service.PromoCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PromoCodeServiceImpl implements PromoCodeService {
    
    private final PromoCodeRepository promoCodeRepository;

    @Override
    @Transactional
    public PromoCodeResponse createPromoCode(PromoCodeRequest request) {
        // Check if code already exists
        if (promoCodeRepository.findByCode(request.getCode()).isPresent()) {
            throw new RuntimeException("Promo code already exists: " + request.getCode());
        }

        PromoCode promoCode = PromoCode.builder()
                .code(request.getCode().toUpperCase())
                .description(request.getDescription())
                .discountType(PromoCode.DiscountType.valueOf(request.getDiscountType()))
                .discountValue(request.getDiscountValue())
                .minOrderAmount(request.getMinOrderAmount())
                .maxDiscountAmount(request.getMaxDiscountAmount())
                .usageLimit(request.getUsageLimit())
                .usageLimitPerUser(request.getUsageLimitPerUser() != null ? request.getUsageLimitPerUser() : 1)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .usedCount(0)
                .build();

        promoCode = promoCodeRepository.save(promoCode);
        return PromoCodeResponse.fromEntity(promoCode);
    }

    @Override
    @Transactional
    public PromoCodeResponse updatePromoCode(Long id, PromoCodeRequest request) {
        PromoCode promoCode = promoCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promo code not found"));

        // Check if code is being changed and new code already exists
        if (!promoCode.getCode().equals(request.getCode().toUpperCase())) {
            if (promoCodeRepository.findByCode(request.getCode().toUpperCase()).isPresent()) {
                throw new RuntimeException("Promo code already exists: " + request.getCode());
            }
        }

        promoCode.setCode(request.getCode().toUpperCase());
        promoCode.setDescription(request.getDescription());
        promoCode.setDiscountType(PromoCode.DiscountType.valueOf(request.getDiscountType()));
        promoCode.setDiscountValue(request.getDiscountValue());
        promoCode.setMinOrderAmount(request.getMinOrderAmount());
        promoCode.setMaxDiscountAmount(request.getMaxDiscountAmount());
        promoCode.setUsageLimit(request.getUsageLimit());
        promoCode.setUsageLimitPerUser(request.getUsageLimitPerUser());
        promoCode.setStartDate(request.getStartDate());
        promoCode.setEndDate(request.getEndDate());
        if (request.getIsActive() != null) {
            promoCode.setIsActive(request.getIsActive());
        }

        promoCode = promoCodeRepository.save(promoCode);
        return PromoCodeResponse.fromEntity(promoCode);
    }

    @Override
    public PromoCodeResponse getPromoCodeById(Long id) {
        PromoCode promoCode = promoCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promo code not found"));
        return PromoCodeResponse.fromEntity(promoCode);
    }

    @Override
    public PromoCodeResponse getPromoCodeByCode(String code) {
        PromoCode promoCode = promoCodeRepository.findByCode(code.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Promo code not found"));
        return PromoCodeResponse.fromEntity(promoCode);
    }

    @Override
    public List<PromoCodeResponse> getAllPromoCodes() {
        return promoCodeRepository.findAll().stream()
                .map(PromoCodeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<PromoCodeResponse> getActivePromoCodes() {
        return promoCodeRepository.findAll().stream()
                .filter(PromoCode::isValid)
                .map(PromoCodeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deletePromoCode(Long id) {
        if (!promoCodeRepository.existsById(id)) {
            throw new RuntimeException("Promo code not found");
        }
        promoCodeRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ApplyPromoCodeResponse applyPromoCode(ApplyPromoCodeRequest request) {
        PromoCode promoCode = promoCodeRepository.findByCodeAndIsActiveTrue(request.getCode().toUpperCase())
                .orElseThrow(() -> new RuntimeException("Mã khuyến mãi không tồn tại hoặc đã hết hạn"));

        // Validate promo code
        if (!promoCode.isValid()) {
            return ApplyPromoCodeResponse.builder()
                    .isValid(false)
                    .message("Mã khuyến mãi đã hết hạn hoặc đã hết lượt sử dụng")
                    .build();
        }

        // Check minimum order amount
        if (request.getOrderAmount().compareTo(promoCode.getMinOrderAmount()) < 0) {
            return ApplyPromoCodeResponse.builder()
                    .isValid(false)
                    .message("Đơn hàng phải có giá trị tối thiểu " + 
                            promoCode.getMinOrderAmount() + " VNĐ")
                    .build();
        }

        // Check usage limit
        if (promoCode.getUsedCount() >= promoCode.getUsageLimit()) {
            return ApplyPromoCodeResponse.builder()
                    .isValid(false)
                    .message("Mã khuyến mãi đã hết lượt sử dụng")
                    .build();
        }

        // Calculate discount
        BigDecimal discountAmount;
        if (promoCode.getDiscountType() == PromoCode.DiscountType.PERCENTAGE) {
            discountAmount = request.getOrderAmount()
                    .multiply(promoCode.getDiscountValue())
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            
            // Apply max discount limit
            if (discountAmount.compareTo(promoCode.getMaxDiscountAmount()) > 0) {
                discountAmount = promoCode.getMaxDiscountAmount();
            }
        } else {
            discountAmount = promoCode.getDiscountValue();
        }

        // Ensure discount doesn't exceed order amount
        if (discountAmount.compareTo(request.getOrderAmount()) > 0) {
            discountAmount = request.getOrderAmount();
        }

        BigDecimal finalAmount = request.getOrderAmount().subtract(discountAmount);

        return ApplyPromoCodeResponse.builder()
                .isValid(true)
                .message("Áp dụng mã khuyến mãi thành công")
                .discountAmount(discountAmount)
                .finalAmount(finalAmount)
                .promoCode(promoCode.getCode())
                .discountType(promoCode.getDiscountType().name())
                .build();
    }
}

