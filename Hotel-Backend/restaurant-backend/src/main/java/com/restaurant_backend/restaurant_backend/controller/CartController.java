package com.restaurant_backend.restaurant_backend.controller;

import com.restaurant_backend.restaurant_backend.entity.CartMaster;
import com.restaurant_backend.restaurant_backend.entity.CustomerMaster;
import com.restaurant_backend.restaurant_backend.entity.ProductMaster;
import com.restaurant_backend.restaurant_backend.service.CartMasterService;
import com.restaurant_backend.restaurant_backend.service.CustomerMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/cartmaster")
@CrossOrigin
public class CartController {
    @Autowired
    CartMasterService cartMasterService;
    @Autowired
    CustomerMasterService customerMasterService;

    @PostMapping("/add-cart/{customerName}")
    ResponseEntity<CartMaster> saveCustomer(@RequestBody CartMaster cartMaster,
                                            @PathVariable String customerName) {
        if (cartMaster.getCreatedOn() == null) {
            cartMaster.setCreatedOn(LocalDate.now());
        }
        CustomerMaster customer = customerMasterService.findByName(customerName)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        cartMaster.setCustomer(customer);
        cartMaster.setOrderNumber(UUID.randomUUID().toString());



        CartMaster cartMaster1 = cartMasterService.save(cartMaster);
        return ResponseEntity.ok(cartMaster1);

    }

    @GetMapping("/getAllCarts")
    ResponseEntity<List<CartMaster>> getAllCarts(){
        return ResponseEntity.ok(cartMasterService.findAll());
    }


    @DeleteMapping("/delete/cart-product/{cartId}")
    public void deleteCartProduct(@PathVariable Long cartId){
        cartMasterService.deleteById(cartId);
    }


}
