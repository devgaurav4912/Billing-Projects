package com.restaurant_backend.restaurant_backend.service;

import com.restaurant_backend.restaurant_backend.entity.CartMaster;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CartMasterService {

    List<CartMaster> findAll();

    CartMaster findById(Long productId);

    CartMaster save(CartMaster cartMaster);

    CartMaster update(CartMaster product);

    void deleteById(Long id);

    //List<CartMaster> getProductsByCategoryName(String categoryName);
}
