import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerFormComponent } from '../add-customer-form/add-customer-form.component';
import { ProductMaster } from '../model/product';
import { PrintDataService } from '../shared/print-data.service';
import { LoaderService } from '../shared/loader.service';
import { ShareDataService } from '../shared/share-data.service';
import { CartService } from '../cart-service.service';
declare var Razorpay: any;

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  categories: any[] = [];
  categoryProducts: any[] = [];
  allProductsList: any[] = [];
  searchTerm: string = '';
  selectedCategoryName: string = 'All';
  cartProducts: ProductMaster[] = [];
  quantity: number = 1;
  selectedCustomerName : any;

  customers: any[] = []; 
  cartsList: any[] = []; 
  filteredCustomers: any[] = []; 
  searchCustomer: string = '';

  subtotal: number = 0; 
  productTotal: { [productId: string]: number } = {};
  data: any;
  selectedDiscount: number = 0; // To store the selected discount percentage
  netTotal: number = 0; // To store the total after discount
  selectedPaymentType : any 

  alerts: any[] = [];

  productCount : any;
  customerCount : any;
  placeOrderCount : any;

  paymentId : any;


  constructor(private service: ApiService,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private printDataService : PrintDataService,
              private loaderService : LoaderService,
              private shareService : ShareDataService,
              private cartService: CartService
              ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProducts();
    this.getAllCustomer();
    this.getAllCarts();
    this.cartProducts = this.cartService.getCartProducts();
  }

  getAllCategory() {
    this.service.fetchAllCategory().subscribe((res: any) => {
      console.log("categories res -->", res);
      this.categories = res;
    });
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe((res: any) => {
      console.log("res -allProducts-->", res);
      this.allProductsList = res;
      // Initially show all products
      this.categoryProducts = res;

      this.productCount = this.categoryProducts.length;

      this.shareService.setProductCount(this.productCount);


    });
  }

  onCategoryChange(event: any) {
    this.selectedCategoryName = event.target.value;
    if (this.selectedCategoryName === "All") {
      this.filterProducts(this.allProductsList);
    } else {
      this.getProductsByCategory(this.selectedCategoryName);
    }
  }

  getProductsByCategory(categoryName: string) {
    this.service.getProductsByCategoryName(categoryName).subscribe((res: any) => {
      console.log("products -->", res);
      this.filterProducts(res);
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    if (this.selectedCategoryName === "All") {
      this.filterProducts(this.allProductsList);
    } else {
      this.getProductsByCategory(this.selectedCategoryName);
    }
  }

  filterProducts(products: any[]) {
    if (this.searchTerm) {
      this.categoryProducts = products.filter(product =>
        product.productName.toLowerCase().includes(this.searchTerm)
      );
    } else {
      this.categoryProducts = products;
    }
  }

  getAllCustomer() {
    this.service.getAllCustomer().subscribe((res: any) => {
      console.log("Customer Res ==> ", res);
      this.customers = res; // Store all customers
      this.customerCount = this.customers.length;
      this.shareService.setCustomerCount(this.customerCount);
    });
  }

  filterCustomers() {
    if (this.searchCustomer) {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.customerFullName && 
        customer.customerFullName.toLowerCase().includes(this.searchCustomer.toLowerCase())
      );
    } else {
      this.filteredCustomers = []; // Clear the dropdown if no search term
    }
  }

  selectCustomer(customer: any) {
    this.searchCustomer = customer.customerFullName; // Show selected customer in the input
    this.filteredCustomers = []; // Clear the dropdown after selection
    console.log("Selected Customer:", customer);
    this.selectedCustomerName= customer.customerFullName;
    
    console.log("selected Customer name --> "+this.selectCustomer);
  }

  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(AddCustomerFormComponent, {
      width: '500px',
      height : '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh the customer list after adding a new customer
        this.getAllCustomer();
      }
    });
  }

  getProductById(productId: any) {
    this.service.getProductById(productId).subscribe((res: any) => {
      const existingProduct = this.cartProducts.find(product => product.productId === productId);
      
      if (!existingProduct) {
        res.productQuantity = 1; // Initialize the product quantity
        res.productTotal = Number(res.productPrice); // Ensure productPrice is a number
        this.cartProducts.push(res);
        this.productTotal[productId] = res.productTotal; // Assign total directly from the fetched product
      } else {
        existingProduct.productQuantity++;
        existingProduct.productTotal = existingProduct.productQuantity * Number(existingProduct.productPrice); // Ensure productPrice is a number
        this.productTotal[productId] = existingProduct.productTotal; 
      }
      this.updateSubtotal();
      console.log("onClick product obj --> ", res);
    });
    this.cartService.setCartProducts(this.cartProducts);
    
  }
  
  

  increaseQuantity(index: number): void {
    const product = this.cartProducts[index];
    product.productQuantity++;
    product.productTotal = product.productQuantity * Number(product.productPrice); // Ensure productPrice is a number
    this.productTotal[product.productId] = product.productTotal; // Update global productTotal
    this.updateSubtotal();
    
    // Trigger change detection
    this.cdr.detectChanges();

    this.updateSubtotal();
  }

  decreaseQuantity(index: number): void {
    const product = this.cartProducts[index];
    if (product.productQuantity > 1) {
      product.productQuantity--;
      product.productTotal = product.productQuantity * Number(product.productPrice); // Ensure productPrice is a number
      this.productTotal[product.productId] = product.productTotal; // Update global productTotal
      this.updateSubtotal();
      
      // Trigger change detection
      this.cdr.detectChanges();

      this.updateSubtotal();
    }
  }

  updateSubtotal(): void {
    this.subtotal = Object.values(this.productTotal)
      .reduce((acc, total) => acc + Number(total), 0); 
      this.applyDiscount();
  }

  applyDiscount(): void {
    // Calculate the discount amount
    const discountAmount = (this.selectedDiscount / 100) * this.subtotal;
    
    // Subtract the discount from subtotal to get the net total
    this.netTotal = this.subtotal - discountAmount;
  }

  removeFromCart(index: number): void {
    const product = this.cartProducts[index];
    delete this.productTotal[product.productId];
    this.cartProducts.splice(index, 1);
    this.updateSubtotal();
  }

  clearCart(): void {
    this.cartProducts = [];
    this.cartService.setCartProducts(this.cartProducts);
    this.productTotal = {}; 
    this.updateSubtotal();
  }

  postCart() {


    if(this.selectedCustomerName == undefined){
      this.snackBar.open('please select the customer!!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar-red']
      });
    }


    const cartData = {

    productName: "Product 1",
    price: 0,
    productImage: "image1.png",
    productQuantity: 2,
    subTotal: this.subtotal,
    discountPercentage: this.selectedDiscount,
    discountAmount: (this.selectedDiscount / 100) * this.subtotal,
    netBill: this.netTotal,
    orderNumber: "ORDER123",
    status: "PENDING",
    createdOn: new Date,
    customerName: this.selectedCustomerName,
    products: this.cartProducts.map(product=>({
            productId : product.productId,
            productName : product.productName ,
            productPrice: product.productPrice,
            productImage: product.productImage,
            createdOn : new Date,
            productQuantity : product.productQuantity,
            productTotal : product.productTotal,
    }))
  
    }

    console.log("product obj -->"+ cartData)
  
    this.service.postCart(cartData ,this.selectedCustomerName).subscribe((res:any)=>{
    console.log("==cart-post-res===> "+res)
    
    this.printDataService.setData(res);

    this.loaderService.hide();

    this.router.navigate(["/billing"])
    })
    
  }

  getAllCarts(){
    this.service.getAllCarts().subscribe((res:any)=>{
      this.cartsList = res;
      console.log("cart count --> "+res)
      this.placeOrderCount = this.cartsList.length;
      
      this.shareService.setPlaceOrderCount(this.placeOrderCount);
    })
  }

  closeAlert(index: number): void {
    this.alerts.splice(index, 1);
  }

  // payment gateway code //

  createTransaction(): void {

    if(this.selectedCustomerName == undefined){
      this.snackBar.open('please select the customer!!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar-red']
      });
    }else{

      ///////////////////////////////////////////////////////////
      console.log("AMOUNT --> "+this.netTotal);
      this.service.crateTrancsaction(this.netTotal)
      .subscribe((res:any)=>{
        console.log("TRANSACTION RES --> "+res);
        if(res === null){
          this.snackBar.open('please select Products', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-red']
          });
        }else{
          this.openTransactionModal(res);
        }
      },(error : any)=>{
        console.log("TRANSACTION-ERROR -->"+error)
      })

    }

   

  }

  openTransactionModal(response:any){
    var options = {
      orderId : response.orderId,
      key : response.key,
      amount : response.amount,
      currency : response.currency,
      name : response.name,
      description : response.description,
      image : 'https://cdn.pixabay.com/photo/2023/12/03/10/11/woman-8427201_640.png',
      handler : (res:any)=>{
        console.log("TRANSACTION ID @@@ --> "+res.razorpay_payment_id);
        this.paymentId = res.razorpay_payment_id;
        if(res!=null && res.razorpay_payment_id !=null){
          this.processResponse(res)
        }else{
          alert("Payment failed..");
        }
      },
      prefill :{
        name : "tronsoftech",
        email : "tron@gmail.com",
        contact : "9999999999"
      },
      notes : {
        address : "online shoping"
      },
      theme :{
        color : "#F37354"
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp:any){

    const cartData = {
      productName: "Product 1",
      price: 0,
      productImage: "image1.png",
      productQuantity: 2,
      subTotal: this.subtotal,
      discountPercentage: this.selectedDiscount,
      discountAmount: (this.selectedDiscount / 100) * this.subtotal,
      netBill: this.netTotal,
      orderNumber: "ORDER123",
      status: "PENDING",
      createdOn: new Date,
      customerName: this.selectedCustomerName,
      paymentId: this.paymentId, 
      paymentType :this.selectedPaymentType,
      products: this.cartProducts.map(product=>({
              productId : product.productId,
              productName : product.productName ,
              productPrice: product.productPrice,
              productImage: product.productImage,
              createdOn : new Date,
              productQuantity : product.productQuantity,
              productTotal : product.productTotal,
      }))
    
      }
  
      console.log("product obj -->"+ cartData)
    
      this.service.postCart(cartData ,this.selectedCustomerName).subscribe((res:any)=>{
      console.log("==cart-post-res===> "+res)
      
      this.printDataService.setData(res);
  
      this.loaderService.hide();
  
      })
    console.log(resp)
  }

}
