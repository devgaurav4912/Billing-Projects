package com.restaurant_backend.restaurant_backend.controller;

import com.restaurant_backend.restaurant_backend.entity.CategoryMaster;
import com.restaurant_backend.restaurant_backend.entity.ProductMaster;
import com.restaurant_backend.restaurant_backend.service.CategoryMasterService;
import com.restaurant_backend.restaurant_backend.service.ProductMasterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/product")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductMasterService productMasterService;

    @Autowired
    private CategoryMasterService categoryMasterService;

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductMaster>> getAllProducts() {
        return ResponseEntity.ok(productMasterService.findAll());
    }

    @GetMapping("/category/{categoryName}")
    public List<ProductMaster> getProductsByCategoryName(@PathVariable String categoryName) {
        return productMasterService.getProductsByCategoryName(categoryName);

    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductMaster> getProductById(@PathVariable Long productId) {
        return ResponseEntity.ok(productMasterService.findById(productId));
    }

    @PostMapping("/add-product/{categoryName}")
    ResponseEntity<ProductMaster> saveProduct(@RequestPart("product") ProductMaster product,
                                              @RequestParam("file") MultipartFile file,
                                              @PathVariable("categoryName") String categoryName
    ) {
        try {

            if (productMasterService.existsByProductName(product.getProductName())) {
                // Return 409 Conflict status if the category name already exists
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }
            ProductMaster savedProduct = productMasterService.save(product, categoryName, file);
            return ResponseEntity.ok(savedProduct);

        } catch (IOException e) {

            return ResponseEntity.status(500).body(null);
        }
    }


    @PutMapping("/updateProduct/{productId}/{categoryName}")
    public ResponseEntity<ProductMaster> updateProduct(@RequestPart(value = "product") ProductMaster product,
                                                       @RequestParam(value = "file",required = false) MultipartFile file,
                                                       @PathVariable(value = "productId",required = false)Long productId,
                                                       @PathVariable("categoryName")String  categoryName
    ) {
        //ProductMaster updateProduct = null;

        logger.info("Received product for update. ID: {}, Category Name: {}", productId, product.getCategoryName());

        try {
//            if (product.getProductId() == null) {
//                // Fetch the product by name
//                ProductMaster existingProduct = productMasterService.findByProductName(product.getProductName());
//                if (existingProduct == null) {
//                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Product not found
//                }
//                product.setProductId(existingProduct.getProductId());
//            }            updateProduct = productMasterService.update(productId ,product,file);
            product.setProductId(productId);

//            if (product.getCategoryName() != null) {
//                CategoryMaster categoryMaster = categoryMasterService.findByCategoryName(product.getCategoryName());
//
//                logger.info("Received product for update. ID: {}, Category Name: {}", productId, product.getCategoryName());
//                System.out.println("CATEGORY NAME ==> "+product.getCategoryName());
//                if (categoryMaster != null) {
//                    product.setCategoryMaster(categoryMaster);
//                    logger.info("CATEGORY NAME ==> "+product.getCategoryName());
//
//                } else {
//                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Category not found
//                }
//            }
            product = productMasterService.update(productId ,product,file,categoryName);
            return ResponseEntity.ok(product);

        } catch (IOException e) {

            return ResponseEntity.status(500).body(null);

        }

    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id) {
        productMasterService.deleteById(id);
    }


}
