package com.restaurant_backend.restaurant_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "categorymaster")
public class CategoryMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_image")
    private String categoryImage;

    @Column(name = "status")
    private String status;

    @JsonIgnore
    @Column(name = "created_on")
    private LocalDate createdOn;


//    @OneToMany(mappedBy = "categoryMaster")
//    private List<ProductMaster> productList;

    @OneToMany(mappedBy = "categoryMaster" ,
            cascade =  CascadeType.ALL)
    private List<ProductMaster> productsList;

    public CategoryMaster(){
        super();
    }
    public CategoryMaster(Long categoryId, String categoryName, String categoryImage, String status, LocalDate createdOn, List<ProductMaster> productsList) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
        this.status = status;
        this.createdOn = createdOn;
        this.productsList = productsList;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryImage() {
        return categoryImage;
    }

    public void setCategoryImage(String categoryImage) {
        this.categoryImage = categoryImage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public List<ProductMaster> getProductsList() {
        return productsList;
    }

    public void setProductsList(List<ProductMaster> productsList) {
        this.productsList = productsList;
    }

    @Override
    public String toString() {
        return "CategoryMaster{" +
                "categoryId=" + categoryId +
                ", categoryName='" + categoryName + '\'' +
                ", categoryImage='" + categoryImage + '\'' +
                ", status='" + status + '\'' +
                ", createdOn=" + createdOn +
                ", productsList=" + productsList +
                '}';
    }
}
