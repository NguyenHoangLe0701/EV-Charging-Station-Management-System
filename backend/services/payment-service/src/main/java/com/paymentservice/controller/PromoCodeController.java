package com.paymentservice.controller;

import com.paymentservice.dto.ApiResponse;
import com.paymentservice.dto.ApplyPromoCodeRequest;
import com.paymentservice.dto.ApplyPromoCodeResponse;
import com.paymentservice.dto.PromoCodeRequest;
import com.paymentservice.dto.PromoCodeResponse;
import com.paymentservice.service.PromoCodeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promo-codes")
@RequiredArgsConstructor
public class PromoCodeController {
    
    private final PromoCodeService promoCodeService;

    @PostMapping
    public ResponseEntity<ApiResponse<PromoCodeResponse>> createPromoCode(
            @Valid @RequestBody PromoCodeRequest request) {
        try {
            PromoCodeResponse response = promoCodeService.createPromoCode(request);
            return ResponseEntity.ok(ApiResponse.success("Promo code created successfully", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PromoCodeResponse>> updatePromoCode(
            @PathVariable Long id,
            @Valid @RequestBody PromoCodeRequest request) {
        try {
            PromoCodeResponse response = promoCodeService.updatePromoCode(id, request);
            return ResponseEntity.ok(ApiResponse.success("Promo code updated successfully", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PromoCodeResponse>> getPromoCodeById(@PathVariable Long id) {
        try {
            PromoCodeResponse response = promoCodeService.getPromoCodeById(id);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ApiResponse<PromoCodeResponse>> getPromoCodeByCode(@PathVariable String code) {
        try {
            PromoCodeResponse response = promoCodeService.getPromoCodeByCode(code);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PromoCodeResponse>>> getAllPromoCodes(
            @RequestParam(required = false) Boolean active) {
        try {
            List<PromoCodeResponse> response;
            if (active != null && active) {
                response = promoCodeService.getActivePromoCodes();
            } else {
                response = promoCodeService.getAllPromoCodes();
            }
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePromoCode(@PathVariable Long id) {
        try {
            promoCodeService.deletePromoCode(id);
            return ResponseEntity.ok(ApiResponse.success("Promo code deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<ApplyPromoCodeResponse>> applyPromoCode(
            @Valid @RequestBody ApplyPromoCodeRequest request) {
        try {
            ApplyPromoCodeResponse response = promoCodeService.applyPromoCode(request);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}

