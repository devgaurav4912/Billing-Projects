package com.restaurant_backend.restaurant_backend.service.impl;

import com.restaurant_backend.restaurant_backend.entity.CartMaster;
import com.restaurant_backend.restaurant_backend.repository.CartMasterRepository;
import com.restaurant_backend.restaurant_backend.service.CartMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CartServiceImpl implements CartMasterService {

    @Autowired
    CartMasterRepository cartMasterRepository;


    @Override
    public CartMaster save(CartMaster cartMaster){

        return cartMasterRepository.save(cartMaster);
    }

    @Override
    public CartMaster update(CartMaster product) {
        return cartMasterRepository.save(product);
    }


    @Override
    public List<CartMaster> findAll() {
        return cartMasterRepository.findAll();
    }


    @Override
    public CartMaster findById(Long productId) {
        return null;
    }


    @Override
    public void deleteById(Long id) {
        cartMasterRepository.deleteById(id);
    }

//    @Override
//    public List<CartMaster> getProductsByCategoryName(String categoryName) {
//        return null;
//    }
}
