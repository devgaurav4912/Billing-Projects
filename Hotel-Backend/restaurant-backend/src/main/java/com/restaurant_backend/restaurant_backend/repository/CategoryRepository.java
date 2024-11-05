package com.restaurant_backend.restaurant_backend.repository;

import com.restaurant_backend.restaurant_backend.entity.CategoryMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<CategoryMaster,Long> {

    @Query("SELECT c FROM CategoryMaster c WHERE c.categoryName = :categoryName")
    CategoryMaster findCategoryNameByCategoryName(@Param("categoryName") String categoryName);

    boolean existsByCategoryName(String categoryName);

    CategoryMaster findByCategoryName(String categoryName);


}
