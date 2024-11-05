package com.restaurant_backend.restaurant_backend.repository;

import com.restaurant_backend.restaurant_backend.entity.CustomerMaster;
import com.restaurant_backend.restaurant_backend.entity.ProductMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<CustomerMaster,Long> {

//    @Query("SELECT p FROM CustomerMaster p WHERE p.categoryMaster.categoryName = :categoryName")
//    List<ProductMaster> findByCartByCustomerFullName(@Param("categoryName") String categoryName);

  Optional<CustomerMaster> findByCustomerFullName(String customerName);

  Optional<CustomerMaster> findByCustomerMobileNumber(String customerMobileNumber);
}
