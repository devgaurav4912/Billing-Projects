package com.restaurant_backend.restaurant_backend.controller;

import com.restaurant_backend.restaurant_backend.entity.TransactionDetails;
import com.restaurant_backend.restaurant_backend.service.impl.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

//    // Endpoint to create a Razorpay order
//    @PostMapping("/create-order")
//    public ResponseEntity<Map<String, Object>> createOrder(@RequestParam double amount, @RequestParam String currency) {
//        try {
//            // Call service to create the order and get the response
//            Map<String, Object> orderResponse = paymentService.createOrder(amount, currency);
//
//            // Return the order details as a response
//            return ResponseEntity.ok(orderResponse);
//        } catch (RazorpayException e) {
//            // Handle any errors that occur during Razorpay order creation
//            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
//        }
//    }

    @GetMapping({"/createTransaction/{amount}"})
    public TransactionDetails createStatement(@PathVariable(name = "amount")Double amount){
        return paymentService.createTransaction(amount);
    }
}

