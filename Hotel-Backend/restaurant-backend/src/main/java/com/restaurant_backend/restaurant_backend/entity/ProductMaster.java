package com.restaurant_backend.restaurant_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name = "productmaster")
public class ProductMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_price")
    private double productPrice;

    @Column(name = "product_image")
    private String productImage;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "product_quantity")
    private double productQuantity;

    @Column(name = "product_total")
    private double productTotal;


//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "category_id")
//    CategoryMaster categoryMaster;


//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name = "cart_id")
//    private CartMaster carts;

    @JsonIgnore
    @ManyToMany(mappedBy = "products")
    private Set<CartMaster> carts = new HashSet<>();


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryMaster categoryMaster;

    @JsonProperty("categoryName")//categoryName
    public String getCategoryName() {
        return categoryMaster != null ? categoryMaster.getCategoryName() : null;
    }

    public ProductMaster(){

    }
    public ProductMaster(Long productId, String productName, double productPrice, String productImage, LocalDate createdOn, double productQuantity, double productTotal, Set<CartMaster> carts, CategoryMaster categoryMaster) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImage = productImage;
        this.createdOn = createdOn;
        this.productQuantity = productQuantity;
        this.productTotal = productTotal;
        this.carts = carts;
        this.categoryMaster = categoryMaster;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public double getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(double productQuantity) {
        this.productQuantity = productQuantity;
    }

    public double getProductTotal() {
        return productTotal;
    }

    public void setProductTotal(double productTotal) {
        this.productTotal = productTotal;
    }

    public Set<CartMaster> getCarts() {
        return carts;
    }

    public void setCarts(Set<CartMaster> carts) {
        this.carts = carts;
    }

    public CategoryMaster getCategoryMaster() {
        return categoryMaster;
    }

    public void setCategoryMaster(CategoryMaster categoryMaster) {
        this.categoryMaster = categoryMaster;
    }

    @Override
    public String toString() {
        return "ProductMaster{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", productPrice=" + productPrice +
                ", productImage='" + productImage + '\'' +
                ", createdOn=" + createdOn +
                ", productQuantity=" + productQuantity +
                ", productTotal=" + productTotal +
                ", carts=" + carts +
                ", categoryMaster=" + categoryMaster +
                '}';
    }
}
