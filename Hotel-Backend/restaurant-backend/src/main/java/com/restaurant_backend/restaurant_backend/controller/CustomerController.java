package com.restaurant_backend.restaurant_backend.controller;

import com.restaurant_backend.restaurant_backend.entity.CategoryMaster;
import com.restaurant_backend.restaurant_backend.entity.CustomerMaster;
import com.restaurant_backend.restaurant_backend.entity.ProductMaster;
import com.restaurant_backend.restaurant_backend.repository.CustomerRepository;
import com.restaurant_backend.restaurant_backend.service.CustomerMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerMasterService customerMasterService;

    @Autowired
    CustomerRepository customerRepository;

//    @PostMapping("/addCustomer")
//    ResponseEntity<CustomerMaster> saveCustomer(@RequestBody CustomerMaster customerMaster) {
//
//        if (customerMaster.getCreatedOn() == null) {
//            customerMaster.setCreatedOn(LocalDate.now());
//        }
//        Optional<CustomerMaster> existingCustomer = customerRepository.findByCustomerFullName(customerMaster.getCustomerFullName());
//        if (existingCustomer.isPresent()) {
//        //    throw new RuntimeException("Customer with the same name already exists");
//            return ResponseEntity.status(500).body(null);
//
//        }else {
//            CustomerMaster customerMaster1 = customerMasterService.save(customerMaster);
//            return ResponseEntity.ok(customerMaster1);
//        }
//    }

    @PostMapping("/addCustomer")
    ResponseEntity<String> saveCustomer(@RequestBody CustomerMaster customerMaster) {

        if (customerMaster.getCreatedOn() == null) {
            customerMaster.setCreatedOn(LocalDate.now());
        }

        Optional<CustomerMaster> existingCustomer = customerRepository.findByCustomerMobileNumber(customerMaster.getCustomerMobileNumber());

        if (existingCustomer.isPresent()) {
            // Send a custom message with the status code 409 (Conflict)
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Customer with this mobile number already exists");
        } else {
            CustomerMaster customerMaster1 = customerMasterService.save(customerMaster);
            // Send the saved customer object back with a 200 OK status
            return ResponseEntity.ok("Customer added successfully");
        }
    }


    @PutMapping("update/{customerId}")
    CustomerMaster updateCustomer(@RequestBody CustomerMaster customerMaster,
                                                  @PathVariable Long customerId) {
        if (customerMaster.getCreatedOn() == null) {
            customerMaster.setCreatedOn(LocalDate.now());
        }

        customerMaster.setCustomer_id(customerId);

        return  customerMasterService.save(customerMaster);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerMaster> getCategoryById(@PathVariable Long customerId) {
        return ResponseEntity.ok(customerMasterService.findById(customerId));
    }

    @GetMapping("/getAllCustomer")
    public ResponseEntity<List<CustomerMaster>> getAllProducts() {
        return ResponseEntity.ok(customerMasterService.findAll());
    }

}
