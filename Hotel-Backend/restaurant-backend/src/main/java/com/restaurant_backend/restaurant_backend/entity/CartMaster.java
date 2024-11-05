package com.restaurant_backend.restaurant_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "cartmaster")
public class CartMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cart_id;


//    @Column(name = "product_name")
//    private  String productName;

//    @Column(name = "product_price")
//    private int price;

//    @Column(name = "product_image")
//    private String productImage;

    @Column(name = "product_quantity")
    private  int productQuantity;
    @Column(name = "subtotal")
    private double subTotal;

    @Column(name = "discount_percentage")
    private  double discountPercentage;

    @Column(name = "discountamount")
    private  double discountAmount;

    @Column(name = "net_bill")
    private  double  netBill;

    @Column(name = "order_number")
    private String orderNumber;

//    @Column(name = "status")
//    private  String status;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name="customer_name")
    private String customerName;

    @Column(name="payment-type")
    private String paymentType;

    private String paymentId;

//    @OneToMany(mappedBy = "carts",cascade = CascadeType.MERGE)
//    private List<ProductMaster> products; ///

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "cart_product",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "cart_id")
    )
    private Set<ProductMaster> products = new HashSet<>();



    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private CustomerMaster customer;

    public CartMaster(){
        super();
    }

    public CartMaster(Long cart_id, int productQuantity, double subTotal, double discountPercentage, double discountAmount, double netBill, String orderNumber, LocalDate createdOn, String customerName, String paymentType, String paymentId, Set<ProductMaster> products, CustomerMaster customer) {
        this.cart_id = cart_id;
        this.productQuantity = productQuantity;
        this.subTotal = subTotal;
        this.discountPercentage = discountPercentage;
        this.discountAmount = discountAmount;
        this.netBill = netBill;
        this.orderNumber = orderNumber;
        this.createdOn = createdOn;
        this.customerName = customerName;
        this.paymentType = paymentType;
        this.paymentId = paymentId;
        this.products = products;
        this.customer = customer;
    }

    public Long getCart_id() {
        return cart_id;
    }

    public void setCart_id(Long cart_id) {
        this.cart_id = cart_id;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

    public double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    public double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public double getNetBill() {
        return netBill;
    }

    public void setNetBill(double netBill) {
        this.netBill = netBill;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public Set<ProductMaster> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductMaster> products) {
        this.products = products;
    }

    public CustomerMaster getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerMaster customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "CartMaster{" +
                "cart_id=" + cart_id +
                ", productQuantity=" + productQuantity +
                ", subTotal=" + subTotal +
                ", discountPercentage=" + discountPercentage +
                ", discountAmount=" + discountAmount +
                ", netBill=" + netBill +
                ", orderNumber='" + orderNumber + '\'' +
                ", createdOn=" + createdOn +
                ", customerName='" + customerName + '\'' +
                ", paymentType='" + paymentType + '\'' +
                ", paymentId='" + paymentId + '\'' +
                ", products=" + products +
                ", customer=" + customer +
                '}';
    }
}

