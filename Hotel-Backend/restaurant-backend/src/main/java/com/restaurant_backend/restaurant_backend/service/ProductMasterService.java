package com.restaurant_backend.restaurant_backend.service;

import com.restaurant_backend.restaurant_backend.entity.ProductMaster;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductMasterService {

    List<ProductMaster> findAll();

    ProductMaster findById(Long productId);

    ProductMaster save(ProductMaster product ,String categoryName , MultipartFile file) throws IOException;

    ProductMaster update(Long productId ,ProductMaster product, MultipartFile file, String categoryName) throws IOException;

    void deleteById(Long id);

    ProductMaster findByProductName(String productName);
    List<ProductMaster> getProductsByCategoryName(String categoryName);

    boolean existsByProductName(String productName);

}
