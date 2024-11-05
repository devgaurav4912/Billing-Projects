package com.restaurant_backend.restaurant_backend.service;

import com.restaurant_backend.restaurant_backend.entity.CustomerMaster;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface CustomerMasterService  {

    List<CustomerMaster> findAll();

    CustomerMaster findById(Long customerId);

    CustomerMaster save(CustomerMaster customer);

    CustomerMaster update(CustomerMaster customerMaster);

    void deleteById(Long id);

    public Optional<CustomerMaster> findByName(String name);

   // List<CustomerMaster> getProductsByCategoryName(String categoryName);
}
