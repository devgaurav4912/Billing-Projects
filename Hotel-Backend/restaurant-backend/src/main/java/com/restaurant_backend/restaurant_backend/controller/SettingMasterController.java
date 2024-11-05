package com.restaurant_backend.restaurant_backend.controller;

import com.restaurant_backend.restaurant_backend.entity.SettingMaster;
import com.restaurant_backend.restaurant_backend.service.SettingMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin
public class SettingMasterController {

    @Autowired
    SettingMasterService settingMasterService;

    @GetMapping
    public List<SettingMaster> getAllSettings() {
        return settingMasterService.getAllSettings();
    }

//	@GetMapping("/{settingId}")
//	public Optional<SettingMaster> getSettingById(@PathVariable long settingId) {
//		return settingMasterService.getSettingById(settingId);
//	}

    @PutMapping("/{businessName}")
    public SettingMaster updateSetting(@PathVariable("businessName") String businessName,
                                       @RequestPart("settingmaster") SettingMaster settingMaster,
                                           @RequestParam("businessLogo") MultipartFile file) {
        System.out.println(settingMaster);
        System.out.println(businessName);
    return settingMasterService.updateSetting(businessName, settingMaster, file);
    }

    @GetMapping("/{businessName}")
    public Optional<SettingMaster> findByBusinessName(@PathVariable String businessName) {
        return settingMasterService.findByBusinessName(businessName);
    }

    @PostMapping
    public SettingMaster createSetting(@RequestPart("settingMasterObject") SettingMaster settingMaster,
                                       @RequestParam("businessLogo") MultipartFile file) {
        return settingMasterService.createSetting(settingMaster, file);
    }

    @DeleteMapping("/{settingId}")
    public void deleteSetting(@PathVariable long settingId) {
        settingMasterService.deleteSetting(settingId);

    }

}