package com.restaurant_backend.restaurant_backend.service;

import com.restaurant_backend.restaurant_backend.entity.SettingMaster;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface SettingMasterService {


    List<SettingMaster> getAllSettings();

    // Optional<SettingMaster> getSettingById(long settingId);

    SettingMaster createSetting(SettingMaster settingMaster, MultipartFile file);

    SettingMaster updateSetting(String businessName, SettingMaster settingMaster,MultipartFile file);

    void deleteSetting(long settingId);

    Optional<SettingMaster> findByBusinessName(String businessName);
}