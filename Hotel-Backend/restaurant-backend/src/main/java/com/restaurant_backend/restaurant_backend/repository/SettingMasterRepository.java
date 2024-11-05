package com.restaurant_backend.restaurant_backend.repository;

import com.restaurant_backend.restaurant_backend.entity.SettingMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SettingMasterRepository extends JpaRepository<SettingMaster, Long> {

    @Query("SELECT s FROM SettingMaster s WHERE s.businessName = :businessName")
    Optional<SettingMaster> findByBusinessName(@Param("businessName") String businessName);
    // SettingMaster findByBusinessName(String businessName);, nativeQuery = true

}
