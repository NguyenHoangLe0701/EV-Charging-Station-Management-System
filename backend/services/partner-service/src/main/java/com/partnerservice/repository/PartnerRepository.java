package com.partnerservice.repository;

import com.partnerservice.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long> {
    Optional<Partner> findByEmail(String email);
    List<Partner> findByStatus(Partner.PartnerStatus status);
    
    @Query("SELECT p FROM Partner p WHERE p.companyName LIKE %:keyword% OR p.contactPerson LIKE %:keyword% OR p.email LIKE %:keyword%")
    List<Partner> searchPartners(@Param("keyword") String keyword);
    
    @Query("SELECT COUNT(p) FROM Partner p WHERE p.status = :status")
    Long countByStatus(Partner.PartnerStatus status);
}

