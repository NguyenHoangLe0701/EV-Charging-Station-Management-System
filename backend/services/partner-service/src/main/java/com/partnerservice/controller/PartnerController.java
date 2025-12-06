package com.partnerservice.controller;

import com.partnerservice.dto.ApiResponse;
import com.partnerservice.dto.PartnerRequest;
import com.partnerservice.dto.PartnerResponse;
import com.partnerservice.entity.Partner;
import com.partnerservice.service.PartnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
@RequiredArgsConstructor
public class PartnerController {
    private final PartnerService partnerService;

    @PostMapping
    public ResponseEntity<ApiResponse<PartnerResponse>> createPartner(@Valid @RequestBody PartnerRequest request) {
        try {
            PartnerResponse response = partnerService.createPartner(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Tạo đối tác thành công", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PartnerResponse>> getPartnerById(@PathVariable Long id) {
        try {
            PartnerResponse response = partnerService.getPartnerById(id);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PartnerResponse>>> getAllPartners(
            @RequestParam(required = false) Partner.PartnerStatus status,
            @RequestParam(required = false) String search) {
        try {
            List<PartnerResponse> partners;
            if (search != null && !search.isEmpty()) {
                partners = partnerService.searchPartners(search);
            } else if (status != null) {
                partners = partnerService.getPartnersByStatus(status);
            } else {
                partners = partnerService.getAllPartners();
            }
            return ResponseEntity.ok(ApiResponse.success(partners));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PartnerResponse>> updatePartner(
            @PathVariable Long id,
            @Valid @RequestBody PartnerRequest request) {
        try {
            PartnerResponse response = partnerService.updatePartner(id, request);
            return ResponseEntity.ok(ApiResponse.success("Cập nhật đối tác thành công", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<PartnerResponse>> updatePartnerStatus(
            @PathVariable Long id,
            @RequestParam Partner.PartnerStatus status) {
        try {
            PartnerResponse response = partnerService.updatePartnerStatus(id, status);
            return ResponseEntity.ok(ApiResponse.success("Cập nhật trạng thái thành công", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePartner(@PathVariable Long id) {
        try {
            partnerService.deletePartner(id);
            return ResponseEntity.ok(ApiResponse.success("Xóa đối tác thành công", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/stats/count")
    public ResponseEntity<ApiResponse<Long>> countPartnersByStatus(
            @RequestParam Partner.PartnerStatus status) {
        try {
            Long count = partnerService.countPartnersByStatus(status);
            return ResponseEntity.ok(ApiResponse.success(count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}

