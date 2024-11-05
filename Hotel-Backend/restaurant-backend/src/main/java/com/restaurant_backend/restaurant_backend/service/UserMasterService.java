package com.restaurant_backend.restaurant_backend.service;

import com.restaurant_backend.restaurant_backend.entity.UserMaster;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserMasterService {

    List<UserMaster> findAll();

    UserMaster findByUserName(String user);

    UserMaster save(UserMaster user);

    UserMaster update(UserMaster user);

    void deleteById(Long id);
}
