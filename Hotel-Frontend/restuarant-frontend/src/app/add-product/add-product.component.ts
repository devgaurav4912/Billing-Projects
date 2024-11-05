import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../shared/loader.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: any[] = [];
  addProductForm: FormGroup;
  selectedFile: File | null = null;
  searchText: string = '';
  products: any[] = [];
  displayedColumns: string[] = ['name', 'image', 'price', 'action'];
  productId : any
  productImageUrl :any
  updateData : boolean =false
  selectedCategoryName : any

  dataSource = new MatTableDataSource<any>(this.products);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('fileInput') fileInput: ElementRef | undefined;


  constructor(private service: ApiService,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private loaderService: LoaderService,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer) {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      productImage: ['', Validators.required],
      productPrice: ['', Validators.required],
      categoryName: ['', Validators.required],
      productImageUrl: [''] 
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProducts();

    // Set up search filter
    this.dataSource.filterPredicate = (data, filter: string) => {
      const dataStr = `${data.productName} ${data.productPrice}`;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getProductImages(imageName: any, product?: any) {
    this.service.getImages(imageName).subscribe((res: Blob) => {
      const objectURL = URL.createObjectURL(res);
      product.productImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  onUpdate(id: any) {
    this.productId = id;
    console.log("PRODUCT ID --> "+id)
    this.service.getProductById(id).subscribe((res:any)=>{
      console.log("PRODUCT BY ID RES --> "+JSON.stringify(res));
      this.addProductForm.patchValue({
        productName: res.productName,
        productPrice: res.productPrice,
        productImage: res.productImage,
        categoryName: res.categoryName, // Assuming categoryName is part of the response
        productImageUrl : res.productImage
    });
    
    if (res.productImage) {
      this.getProductImages(res.categoryImage); // Set `categoryImageUrl` for existing image
    }
    
     this.productImageUrl = res.productImage;

     // this.categoryName = res.categoryName;

      console.log("===ADD FORM DATA== --> " + JSON.stringify(this.addProductForm.value))
      console.log("PRODUCT IMAGE URL -->" +this.productImageUrl)
        //console.log("product form data data ---> "+this.addProductForm)
        this.updateData=true;
    })
  }


  // onFileChange(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   console.log("selected image -s-> " + this.selectedFile);
  //   if (this.selectedFile) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.productImageUrl = reader.result as string; 
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  //   this.fileInput!.nativeElement.value = '';

  // }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("Selected image: ", this.selectedFile);
  
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productImageUrl = reader.result as string;
  
        // Clear the file input after the image URL is set
        this.clearFileInput();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  // Method to clear the file input
  clearFileInput() {
    this.fileInput!.nativeElement.value = '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  getAllCategory() {
    this.service.fetchAllCategory().subscribe((res: any) => {
      console.log("categories res -->" + res);
      this.categories = res;
    });
  }

  

  getAllProducts() {
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res;
      console.log("list of product res --> " + res);
      this.dataSource.data = this.products; // Update the dataSource with the fetched products

      this.products.forEach( product =>{
        this.getProductImages(product.productImage,product)
      })
    }, (error: any) => {
      console.error("Error fetching products: ", error);
    });
  }

 

  deleteProduct(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100px'; // Adjust the width as needed
    dialogConfig.position = { top: '20%', left: '35%' };
    
    const dialogRef = this.dialog.open(ConfirmdialogComponent , {
      data :{message: 'Are you sure you want to delete this product !!',
            isWarning :false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteProduct(id).subscribe(() => {
          this.getAllProducts();
          this.snackBar.open('Your product has been deleted', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dataSource.data = this.dataSource.data.filter(item => item.productId !== id);
        });
      }
    });

  }

  postProduct() {

    if(this.updateData){

      this.loaderService.show();

      const formData = new FormData();

      const productData = this.addProductForm.value;

      

      console.log("///add form value///->"+ productData.categoryName);

      formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
      if (this.selectedFile) {

        formData.append('file', this.selectedFile);
      }
     // formData.append('file', this.selectedFile);
      
      
      this.service.updateProduct(this.productId ,productData.categoryName ,  formData  , this.selectedFile ).
      subscribe((res:any)=>{
        console.log("PRODUCT UPDATED RESPONSE --> "+ res)
        this.loaderService.hide();
          this.addProductForm.reset(); 
          this.snackBar.open("Product Updated Successful!!", "Close", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.getAllProducts();
        this.resetForm();
      },(error:any)=>{
      //   if (error.status === 409) {
      //     this.snackBar.open('Product is already present!!', 'Close', {
      //       duration: 3000,
      //       horizontalPosition: 'left',
      //       verticalPosition: 'bottom',
      //     });     
      //     this.loaderService.hide();
      //   } else {
      //     alert("An error occurred: " + error.message);
      // }

      this.loaderService.hide();

        console.error("Error adding product: ", error);
      })
    }else{

      
      this.loaderService.show();

      const productData = this.addProductForm.value;
      const formData = new FormData();
      
      formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
   //   formData.append('file', this.selectedFile);

   if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }
      
      console.log("Form Value: ", productData);
      console.log("categoryName --> " + productData.categoryName);
      
      this.service.addProduct(formData, this.selectedFile, productData.categoryName)
        .subscribe((res: any) => {
          console.log("product res -->", res);
          
          //this.router.navigate([""]);
          this.loaderService.hide();
          this.addProductForm.reset(); 
          this.snackBar.open("Product added Successfuly", "Close", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.getAllProducts(); // Fetch the updated product list after adding a product
        }, (error: any) => 
          {if (error.status === 409) {
          this.snackBar.open('Product is already present!!', 'Close', {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });   
          this.loaderService.hide();  
        } else {
          alert("An error occurred: " + error.message);
      }

          console.error("Error adding product: ", error);
          this.loaderService.hide();
        });
    }

    this.productImageUrl ="";
    //this.fileInput!.nativeElement.value = '';

    }

    // resetForm() {
    //   this.addProductForm.reset(); // Reset the form fields
    //   this.selectedFile = null; // Clear the selected file
    //   this.addProductForm.markAsPristine(); // Mark the form as pristine (untouched)
    //   this.addProductForm.markAsUntouched(); // Mark the form as untouched
    // }

    resetForm() {
      this.addProductForm.reset(); // Reset the form fields
      this.selectedFile = null; // Clear the selected file
  
      if (this.fileInput) {
        this.fileInput.nativeElement.value = ''; // Clear the file input
      }
  
      this.addProductForm.markAsPristine(); // Mark the form as pristine (untouched)
      this.addProductForm.markAsUntouched(); // Mark the form as untouched

      
    }

    

}
