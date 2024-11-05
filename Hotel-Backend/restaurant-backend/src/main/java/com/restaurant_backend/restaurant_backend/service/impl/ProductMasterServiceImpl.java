package com.restaurant_backend.restaurant_backend.service.impl;

import com.restaurant_backend.restaurant_backend.customexception.ResourceNotFoundException;
import com.restaurant_backend.restaurant_backend.entity.CategoryMaster;
import com.restaurant_backend.restaurant_backend.entity.ProductMaster;
import com.restaurant_backend.restaurant_backend.repository.CategoryRepository;
import com.restaurant_backend.restaurant_backend.repository.ProductRepository;
import com.restaurant_backend.restaurant_backend.service.CloudinaryImageService;
import com.restaurant_backend.restaurant_backend.service.ProductMasterService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductMasterServiceImpl implements ProductMasterService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CloudinaryImageService cloudinaryImageService;

    public static  String path = System.getProperty("user.dir") + "/src/main/webapp/images";


    @Autowired
    SessionFactory sessionFactory;



    @Override
    public ProductMaster save(ProductMaster product, String categoryName, MultipartFile file) throws IOException {

        CategoryMaster category = categoryRepository.findCategoryNameByCategoryName(categoryName);

        product.setCategoryMaster(category);


        if (product.getCreatedOn() == null) {
            product.setCreatedOn(LocalDate.now());
        }

//        Map<String, Object> uploadResult = cloudinaryImageService.upload(file);
//        String imageUrl = (String) uploadResult.get("url");
//        // Setting the image URL to the product
//        product.setProductImage(imageUrl);

        if (file != null && !file.isEmpty()) {
            String oldFilePath = path + File.separator + product.getProductImage();
            File oldFile = new File(oldFilePath);
            if (oldFile.exists()) {
                oldFile.delete();
            }

            String fileName = file.getOriginalFilename();
            String randomId = UUID.randomUUID().toString();
            String newFileName = randomId.concat(fileName.substring(fileName.lastIndexOf(".")));
            String newFilePath = path + File.separator + newFileName;

            Files.copy(file.getInputStream(), Paths.get(newFilePath));
            product.setProductImage(newFileName);
        }


        ProductMaster savedProduct = productRepository.save(product);

        updateCategoryStatus(category);


        return savedProduct;
    }


    @Override
    public List<ProductMaster> findAll() {

        return productRepository.findAll();
    }

    @Override
    public ProductMaster findById(Long productId) {

        Optional<ProductMaster> result = productRepository.findById(productId);

        ProductMaster product = null;

        if (result.isPresent()) {

            product = result.get();
        } else {

            throw new RuntimeException("Did not find Product Id - " + productId);
        }
        return product;
    }


    public void deleteById(Long productId) {
        // Find the product by its ID
        ProductMaster product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Get the associated category
        CategoryMaster category = product.getCategoryMaster();

        // Delete the product
        productRepository.delete(product);

        // Update the category status based on the new product count
        updateCategoryStatus(category);
    }


    // Helper method to update the category status
    private void updateCategoryStatus(CategoryMaster category) {
        // Count the number of products associated with the category
        long productCount = productRepository.countByCategoryMaster(category);

        // Set category status based on product count
        if (productCount > 0) {
            category.setStatus("Active");
        } else {
            category.setStatus("Inactive");
        }

        // Save the updated category status
        categoryRepository.save(category);
    }



   // @Override
//    public ProductMaster update(Long productId ,ProductMaster product, MultipartFile file, String categoryName) {
//        Transaction transaction = null;
//        try  {
//
//            Session session = sessionFactory.openSession();
//
//            transaction = session.beginTransaction();
//
//            CategoryMaster category = categoryRepository.findCategoryNameByCategoryName(categoryName);
//            product.setCategoryMaster(category);
//
//            if (product.getCreatedOn() == null) {
//                // Setting the current time to the product
//                product.setCreatedOn(LocalDate.now());
//            }
////            Map<String, Object> uploadResult = cloudinaryImageService.upload(file);
////            String imageUrl = (String) uploadResult.get("url");
////            // Setting the image URL to the product
////            product.setProductImage(imageUrl);
//
//            if (file != null && !file.isEmpty()) {
//                Map<String, Object> uploadResult = cloudinaryImageService.upload(file);
//                String imageUrl = (String) uploadResult.get("url");
//                product.setProductImage(imageUrl);
//            }
//
//            session.update(product);
//
//            transaction.commit();
//
//        } catch (Exception e) {
//
//        }
//
//        return product;
//    }


    public ProductMaster update(Long productId, ProductMaster product, MultipartFile file, String categoryName) throws IOException {

        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();

            // Fetch the existing product from the database
            ProductMaster existingProduct = session.get(ProductMaster.class, productId);
            if (existingProduct == null) {
                throw new IllegalArgumentException("Product with ID " + productId + " not found.");
            }

            // Find the category by name
            CategoryMaster category = categoryRepository.findCategoryNameByCategoryName(categoryName);
            if (category != null) {
                existingProduct.setCategoryMaster(category);
            } else {
                throw new IllegalArgumentException("Category with name " + categoryName + " not found.");
            }

            // Set the createdOn date if it's null
            if (existingProduct.getCreatedOn() == null) {
                existingProduct.setCreatedOn(LocalDate.now());
            }

            // Handle file upload if a file is provided
//            if (file != null && !file.isEmpty()) {
//                Map<String, Object> uploadResult = cloudinaryImageService.upload(file);
//                String imageUrl = (String) uploadResult.get("url");
//                existingProduct.setProductImage(imageUrl);
//            }


            if (file != null && !file.isEmpty()) {
                String oldFilePath = path + File.separator + existingProduct.getProductImage();
                File oldFile = new File(oldFilePath);
                if (oldFile.exists()) {
                    oldFile.delete();
                }

                String fileName = file.getOriginalFilename();
                String randomId = UUID.randomUUID().toString();
                String newFileName = randomId.concat(fileName.substring(fileName.lastIndexOf(".")));
                String newFilePath = path + File.separator + newFileName;

                Files.copy(file.getInputStream(), Paths.get(newFilePath));
                existingProduct.setProductImage(newFileName);
            }

            // Update other fields in existingProduct with values from product
            existingProduct.setProductName(product.getProductName());
           // existingProduct.setProductDescription(product.getProductDescription());
            existingProduct.setProductQuantity(product.getProductQuantity());
            existingProduct.setProductPrice(product.getProductPrice());
            // Set other fields as needed

            // Update the product
            session.update(existingProduct);

            transaction.commit();
            return existingProduct;


        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw e; // or log the exception
        }
    }


//    @Override
//    public void deleteById(Long id) {
//        productRepository.deleteById(id);
//
//    }



    public ProductMaster findByProductName(String productName) {
        return productRepository.findByProductName(productName);
    }

    @Override
    public List<ProductMaster> getProductsByCategoryName(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }

    @Override
    public boolean existsByProductName(String productName) {
       return productRepository.existsByProductName(productName);
    }
}
