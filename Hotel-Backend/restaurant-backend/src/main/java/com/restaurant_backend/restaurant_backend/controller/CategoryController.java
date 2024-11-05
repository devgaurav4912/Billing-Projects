package com.restaurant_backend.restaurant_backend.controller;

import com.restaurant_backend.restaurant_backend.entity.CategoryMaster;
import com.restaurant_backend.restaurant_backend.service.CategoryMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    CategoryMasterService categoryMasterService;


    @PostMapping("/create-category")
    ResponseEntity<CategoryMaster> saveCategory(@RequestPart("category") CategoryMaster category,
                                                 @RequestParam("file") MultipartFile file) throws IOException {

        // Check if the category name already exists
        if (categoryMasterService.existsByName(category.getCategoryName())) {
            // Return 409 Conflict status if the category name already exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        System.out.println("Received Category: " + category);
        System.out.println("Received File: " + file.getOriginalFilename());

        CategoryMaster categoryMaster = categoryMasterService.save(category,file);

        return ResponseEntity.ok(null);

    }

    @GetMapping("/getAllCategory")
    public ResponseEntity<List<CategoryMaster>> getAllCategory() {
        return ResponseEntity.ok(categoryMasterService.findAll());
    }


    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryMaster> getCategoryById(@PathVariable Long categoryId) {
        return ResponseEntity.ok(categoryMasterService.findById(categoryId));
    }

    @PutMapping("/updateCategory/{id}")
    public ResponseEntity<CategoryMaster> updateCategory(@PathVariable("id") Long id,
                                         @RequestPart("category") CategoryMaster category,
                                         @RequestParam(value = "file",required = false) MultipartFile file) {

//        if (categoryMasterService.existsByName(category.getCategoryName())) {
//            // Return 409 Conflict status if the category name already exists
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
//        }
        category.setCategoryId(id);
//        if (file != null && !file.isEmpty()) {
//            return categoryMasterService.update(category, file);
//        } else {
             categoryMasterService.update(category, file);

        return ResponseEntity.ok(null);

    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@PathVariable("id") Long id) {
        categoryMasterService.deleteById(id);
    }
}


