package com.paymentservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "promo_codes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromoCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(nullable = false, length = 200)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiscountType discountType;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal discountValue;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal minOrderAmount; // Minimum order amount to use this code

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal maxDiscountAmount; // Maximum discount amount (for percentage)

    @Column(nullable = false)
    private Integer usageLimit; // Total usage limit

    @Column(nullable = false)
    private Integer usedCount = 0; // Current usage count

    @Column(nullable = false)
    private Integer usageLimitPerUser = 1; // Usage limit per user

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @Column(nullable = false)
    private Boolean isActive = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum DiscountType {
        PERCENTAGE, // Discount by percentage
        FIXED_AMOUNT // Discount by fixed amount
    }

    public boolean isValid() {
        LocalDateTime now = LocalDateTime.now();
        return isActive 
            && now.isAfter(startDate) 
            && now.isBefore(endDate)
            && usedCount < usageLimit;
    }
}

