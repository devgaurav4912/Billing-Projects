package com.restaurant_backend.restaurant_backend.repository;

import com.restaurant_backend.restaurant_backend.entity.CategoryMaster;
import com.restaurant_backend.restaurant_backend.entity.ProductMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductMaster,Long> {

    //this is method is used to find the product object by product name
    ProductMaster findByProductName(String productName);

    @Query("SELECT p FROM ProductMaster p WHERE p.categoryMaster.categoryName = :categoryName")
    List<ProductMaster> findByCategoryName(@Param("categoryName") String categoryName);

    boolean existsByProductName(String productName);

    long countByCategoryMaster(CategoryMaster categoryMaster);

}
