package com.restaurant_backend.restaurant_backend.service.impl;

import com.restaurant_backend.restaurant_backend.entity.SettingMaster;
import com.restaurant_backend.restaurant_backend.repository.SettingMasterRepository;
import com.restaurant_backend.restaurant_backend.service.CloudinaryImageService;
import com.restaurant_backend.restaurant_backend.service.SettingMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SettingMasterServiceImpl implements SettingMasterService {

    @Autowired
    SettingMasterRepository settingMasterRepository;

    @Autowired
    CloudinaryImageService cloudinaryImageService;

    @Override
    public List<SettingMaster> getAllSettings() {
        return settingMasterRepository.findAll();
    }

//	@Override
//	public Optional<SettingMaster> getSettingById(long settingID) {
//		return settingMasterRepository.findById(settingID);
//	}

    @Override
    public SettingMaster createSetting(SettingMaster settingMaster, MultipartFile file) {
        Map<String, Object> logo = cloudinaryImageService.upload(file);
        String url = (String) logo.get("url");
        settingMaster.setBusinessLogo(url);
        return settingMasterRepository.save(settingMaster);
    }

    @Override
    public SettingMaster updateSetting(String businessName, SettingMaster settingMaster, MultipartFile file) {
        SettingMaster existingSetting = settingMasterRepository.findByBusinessName(businessName).orElse(null);
        System.out.println(businessName);
        System.out.println(existingSetting);
        if (existingSetting != null) {

            existingSetting.setSettingId(settingMaster.getSettingId());
            existingSetting.setBusinessName(settingMaster.getBusinessName());
            existingSetting.setBusinessMobile(settingMaster.getBusinessMobile());
            existingSetting.setBusinessEmail(settingMaster.getBusinessEmail());
            existingSetting.setBusinessAddress(settingMaster.getBusinessAddress());
            existingSetting.setBusinessGstNumber(settingMaster.getBusinessGstNumber());

            Map<String, Object> logo = cloudinaryImageService.upload(file);
            String url = (String) logo.get("url");
            existingSetting.setBusinessLogo(url);
            settingMasterRepository.save(existingSetting);
            return existingSetting;
        }
        return null;
    }

    @Override
    public void deleteSetting(long settingID) {
        settingMasterRepository.deleteById(settingID);
    }

    @Override
    public Optional<SettingMaster> findByBusinessName(String businessName) {
        return settingMasterRepository.findByBusinessName(businessName);

    }

}
