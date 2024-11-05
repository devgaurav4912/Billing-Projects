package com.restaurant_backend.restaurant_backend.service.impl;

import com.restaurant_backend.restaurant_backend.entity.CustomerMaster;
import com.restaurant_backend.restaurant_backend.repository.CustomerRepository;
import com.restaurant_backend.restaurant_backend.service.CustomerMasterService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerMasterServiceImpl implements CustomerMasterService {

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    SessionFactory sessionFactory;

    @Override
    public List<CustomerMaster> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public CustomerMaster findById(Long customerId) {
        Optional<CustomerMaster> result =customerRepository.findById(customerId);

        CustomerMaster customer =null;

        if(result.isPresent()){

            customer =result.get();
        }else{

            throw  new RuntimeException("Did not find Product Id - "+customerId);
        }
        return customer;
    }


//    @Override
//    public CustomerMaster save(CustomerMaster customer) {
//        if (customer.getCreatedOn() == null) {
//            customer.setCreatedOn(LocalDate.now());
//        }
//        return customerRepository.save(customer);
//    }

    public CustomerMaster save(CustomerMaster customerMaster) {

        return customerRepository.save(customerMaster);
    }


    @Override
    public CustomerMaster update(CustomerMaster customerMaster)  {
        return customerRepository.save(customerMaster);
    }

    @Override
    public void deleteById(Long id) {
        customerRepository.deleteById(id);
    }

    public Optional<CustomerMaster> findByName(String name) {
        return customerRepository.findByCustomerFullName(name);
    }
}
