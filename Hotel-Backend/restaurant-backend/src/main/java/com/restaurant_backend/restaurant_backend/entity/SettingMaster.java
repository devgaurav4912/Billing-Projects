package com.restaurant_backend.restaurant_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "setting_master")
public class SettingMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long settingId;

    @Column(name = "business_name")
    private String businessName;

    @Column(name = "business_mobile")
    private String businessMobile;

    @Column(name = "business_email")
    private String businessEmail;

    @Column(name = "business_address")
    private String businessAddress;

    @Column(name = "business_Gst_number")
    private String businessGstNumber;

    @Column(name = "business_logo")
    private String businessLogo;

    public  SettingMaster(){
        super();
    }
    public SettingMaster(Long settingId, String businessName, String businessMobile, String businessEmail, String businessAddress, String businessGstNumber, String businessLogo) {
        this.settingId = settingId;
        this.businessName = businessName;
        this.businessMobile = businessMobile;
        this.businessEmail = businessEmail;
        this.businessAddress = businessAddress;
        this.businessGstNumber = businessGstNumber;
        this.businessLogo = businessLogo;
    }

    public Long getSettingId() {
        return settingId;
    }

    public void setSettingId(Long settingId) {
        this.settingId = settingId;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBusinessMobile() {
        return businessMobile;
    }

    public void setBusinessMobile(String businessMobile) {
        this.businessMobile = businessMobile;
    }

    public String getBusinessEmail() {
        return businessEmail;
    }

    public void setBusinessEmail(String businessEmail) {
        this.businessEmail = businessEmail;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public String getBusinessGstNumber() {
        return businessGstNumber;
    }

    public void setBusinessGstNumber(String businessGstNumber) {
        this.businessGstNumber = businessGstNumber;
    }

    public String getBusinessLogo() {
        return businessLogo;
    }

    public void setBusinessLogo(String businessLogo) {
        this.businessLogo = businessLogo;
    }

    @Override
    public String toString() {
        return "SettingMaster{" +
                "settingId=" + settingId +
                ", businessName='" + businessName + '\'' +
                ", businessMobile='" + businessMobile + '\'' +
                ", businessEmail='" + businessEmail + '\'' +
                ", businessAddress='" + businessAddress + '\'' +
                ", businessGstNumber='" + businessGstNumber + '\'' +
                ", businessLogo='" + businessLogo + '\'' +
                '}';
    }
}
