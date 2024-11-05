package com.restaurant_backend.restaurant_backend.controller;

import com.restaurant_backend.restaurant_backend.dto.LoginRequest;
import com.restaurant_backend.restaurant_backend.entity.UserMaster;
import com.restaurant_backend.restaurant_backend.service.UserMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserMasterService userService;



//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
//
//        UserMaster userCheck = userService.findByUserName(loginRequest.getUserName());
//
//        if (userCheck != null &&
//                userCheck.getUserName().equals(loginRequest.getUserName()) &&
//                userCheck.getPassword().equals(loginRequest.getPassword())) {
//            return ResponseEntity.ok("Login successful");
//        } else if (userCheck == null) {
//            return ResponseEntity.status(404).body("User not found");
//        } else {
//            return ResponseEntity.status(401).body("Invalid credentials");
//
//        }

  //  }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        UserMaster userCheck = userService.findByUserName(loginRequest.getUserName());

        if (userCheck == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (userCheck.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}

