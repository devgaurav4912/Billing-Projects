package com.restaurant_backend.restaurant_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customermaser")
public class CustomerMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customer_id;

    @Column(name = "customer_name",unique = true)
    private String customerFullName;

    @Column(name = "customer_mobile")
    private String customerMobileNumber;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @OneToMany(mappedBy = "customer" , cascade = CascadeType.ALL)
    Set<CartMaster> cartMasters = new HashSet<>();

    public  CustomerMaster(){
        super();
    }

    public CustomerMaster(Long customer_id, String customerFullName, String customerMobileNumber, LocalDate createdOn, Set<CartMaster> cartMasters) {
        this.customer_id = customer_id;
        this.customerFullName = customerFullName;
        this.customerMobileNumber = customerMobileNumber;
        this.createdOn = createdOn;
        this.cartMasters = cartMasters;
    }

    public Long getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Long customer_id) {
        this.customer_id = customer_id;
    }

    public String getCustomerFullName() {
        return customerFullName;
    }

    public void setCustomerFullName(String customerFullName) {
        this.customerFullName = customerFullName;
    }

    public String getCustomerMobileNumber() {
        return customerMobileNumber;
    }

    public void setCustomerMobileNumber(String customerMobileNumber) {
        this.customerMobileNumber = customerMobileNumber;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public Set<CartMaster> getCartMasters() {
        return cartMasters;
    }

    public void setCartMasters(Set<CartMaster> cartMasters) {
        this.cartMasters = cartMasters;
    }

    @Override
    public String toString() {
        return "CustomerMaster{" +
                "customer_id=" + customer_id +
                ", customerFullName='" + customerFullName + '\'' +
                ", customerMobileNumber='" + customerMobileNumber + '\'' +
                ", createdOn=" + createdOn +
                ", cartMasters=" + cartMasters +
                '}';
    }
}
