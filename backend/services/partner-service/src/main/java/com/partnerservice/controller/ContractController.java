package com.partnerservice.controller;

import com.partnerservice.dto.ApiResponse;
import com.partnerservice.dto.ContractRequest;
import com.partnerservice.dto.ContractResponse;
import com.partnerservice.entity.PartnerContract;
import com.partnerservice.service.ContractService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners/contracts")
@RequiredArgsConstructor
public class ContractController {
    
    private final ContractService contractService;

    @PostMapping
    public ResponseEntity<ApiResponse<ContractResponse>> createContract(
            @Valid @RequestBody ContractRequest request) {
        try {
            ContractResponse response = contractService.createContract(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Tạo hợp đồng thành công", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ContractResponse>> getContractById(@PathVariable Long id) {
        try {
            ContractResponse response = contractService.getContractById(id);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContractResponse>>> getAllContracts(
            @RequestParam(required = false) Long partnerId,
            @RequestParam(required = false) PartnerContract.ContractStatus status) {
        try {
            List<ContractResponse> contracts;
            if (partnerId != null && status != null) {
                contracts = contractService.getContractsByPartnerId(partnerId).stream()
                        .filter(c -> c.getStatus() == status)
                        .toList();
            } else if (partnerId != null) {
                contracts = contractService.getContractsByPartnerId(partnerId);
            } else if (status != null) {
                contracts = contractService.getContractsByStatus(status);
            } else {
                contracts = contractService.getAllContracts();
            }
            return ResponseEntity.ok(ApiResponse.success(contracts));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/partner/{partnerId}")
    public ResponseEntity<ApiResponse<List<ContractResponse>>> getContractsByPartnerId(
            @PathVariable Long partnerId) {
        try {
            List<ContractResponse> contracts = contractService.getContractsByPartnerId(partnerId);
            return ResponseEntity.ok(ApiResponse.success(contracts));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/partner/{partnerId}/active")
    public ResponseEntity<ApiResponse<ContractResponse>> getActiveContractByPartnerId(
            @PathVariable Long partnerId) {
        try {
            ContractResponse contract = contractService.getActiveContractByPartnerId(partnerId);
            return ResponseEntity.ok(ApiResponse.success(contract));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/generate-number")
    public ResponseEntity<ApiResponse<String>> generateContractNumber() {
        try {
            String contractNumber = contractService.generateContractNumber();
            return ResponseEntity.ok(ApiResponse.success(contractNumber));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ContractResponse>> updateContract(
            @PathVariable Long id,
            @Valid @RequestBody ContractRequest request) {
        try {
            ContractResponse response = contractService.updateContract(id, request);
            return ResponseEntity.ok(ApiResponse.success("Cập nhật hợp đồng thành công", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<ApiResponse<ContractResponse>> activateContract(@PathVariable Long id) {
        try {
            ContractResponse response = contractService.activateContract(id);
            return ResponseEntity.ok(ApiResponse.success("Kích hoạt hợp đồng thành công", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PatchMapping("/{id}/terminate")
    public ResponseEntity<ApiResponse<ContractResponse>> terminateContract(@PathVariable Long id) {
        try {
            ContractResponse response = contractService.terminateContract(id);
            return ResponseEntity.ok(ApiResponse.success("Chấm dứt hợp đồng thành công", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteContract(@PathVariable Long id) {
        try {
            contractService.deleteContract(id);
            return ResponseEntity.ok(ApiResponse.success("Xóa hợp đồng thành công", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}

