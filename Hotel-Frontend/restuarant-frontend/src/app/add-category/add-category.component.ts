import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../shared/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  selectedFile!: File;
 // isSubmitting: boolean = false;
  selectedId!:any;
  categoryId?: any;
  updateData :boolean=false;
  categoryImageUrl? : String 




  constructor(
    public dialogRef: MatDialogRef<AddCategoryFormComponent>,
    private service: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private routVaule : ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar
    
    
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      status :['' , Validators.required],
      categoryImage: ['', Validators.required]
    });
    this.categoryId = data?.categoryId; 
    console.log("CATEGORY_ID --> "+this.categoryId)
  }

  ngOnInit(): void {
    this.getDataFormUrl();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.postCategory();
  }

  getCategoryImage(categoryImage: any): void {
    this.service.getImages(categoryImage).subscribe((res: Blob) => {
      this.categoryImageUrl = URL.createObjectURL(res); // Convert Blob to URL and set `categoryImageUrl`
      console.log("Generated category image URL: ", this.categoryImageUrl);
    }, (error) => {
      console.error("Error fetching image: ", error);
    });
  }

  getDataFormUrl() {
    this.service.getCategoryById(this.categoryId)
      .subscribe((resp: any) => {
        console.log("Get by ID response data ---> ", resp);
        this.categoryForm.patchValue(resp);
  
        if (resp.categoryImage) {
          this.getCategoryImage(resp.categoryImage); // Set `categoryImageUrl` for existing image
        }
  
        this.updateData = true;
      }, (error) => {
        console.error("Error fetching category by ID: ", error);
      });
  }

  // getDataFormUrl(){
  //   //this.routVaule.paramMap.subscribe((param:any)=>{
  //   // console.log("CATEGORY-ID -->"+param.get("id"));
  //    //this.selectedId = param.get("id");
  //     this.service.getCategoryById(this.categoryId)
  //     .subscribe((resp:any)=>{
  //       console.log("get by id response data ---> "+resp)
  //       this.categoryForm.patchValue(resp);

  //       console.log("categoryImageUrl 1-->" +resp.categoryImage)

  //       if (resp.categoryImage) {
  //         this.getCategoryImage(resp.categoryImage); // Set `categoryImageUrl` for existing image
  //       }

  //       console.log("categoryImageUrl 2-->" +this.categoryImageUrl)
  //       console.log("Updated category data ---> "+this.categoryForm)
  //       this.updateData=true;
  //     })

  // }


  // onFileChange(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   console.log("selected image -s-> " + this.selectedFile);
  //   if (this.selectedFile) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.categoryImageUrl = reader.result as string; // Generate the preview URL
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  // }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("selected image --> ", this.selectedFile);
    
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.categoryImageUrl = reader.result as string; // Generate the preview URL
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  

  // postCategory() {

  //  if(this.updateData){

  //   //if (this.isSubmitting) return;

  //   //this.isSubmitting = true;
  //   this.loaderService.show();

  //     const formData = new FormData();

  //     if (this.selectedFile) {
  //       formData.append('file', this.selectedFile);
  //   }

  //     formData.append('category', new Blob([JSON.stringify( this.categoryForm.value)],{type:'application/json'}));
  //     formData.append('file', this.selectedFile);
     

  //     this.service.updateCategory(this.categoryId,formData,this.selectedFile).subscribe((res: any) => {
  //       console.log("Post Res --> "+res)
  //       this.dialogRef.close(this.categoryForm.value);
  //      // this.isSubmitting = false;

  //       this.loaderService.hide();

  //     },(error: any) => {
  //       console.error("Error adding product: ", error);
  //     //  this.isSubmitting = false;
  //       this.loaderService.hide();
  //     });
    

  //  }else{
  //  // if (this.isSubmitting) return;

  //   //this.isSubmitting = true;
  //   this.loaderService.show();

  //     const formData = new FormData();

  //     formData.append('category', new Blob([JSON.stringify( this.categoryForm.value)],{type:'application/json'}));
  //     formData.append('file', this.selectedFile);

  //     console.log("before --> " + this.categoryForm.value);
  //     console.log("before --> " + this.selectedFile);


  //     this.service.postCategory(formData ,this.selectedFile).subscribe((res: any) => {
  //       console.log("Post Res --> "+res)
  //       this.dialogRef.close(this.categoryForm.value);
  //     //  this.isSubmitting = false;
  //       this.loaderService.hide();


  //     },(error: any) => {
  //       console.error("Error adding product: ", error);
  //      // this.isSubmitting = false;
  //       this.loaderService.hide();
  //     });
  //  }
      
  //   }

  postCategory() {
    
    this.loaderService.show();
    console.log('Loader should be visible now');
  
    const formData = new FormData();
  
    if (this.updateData) {
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
  
      formData.append('category', new Blob([JSON.stringify(this.categoryForm.value)], { type: 'application/json' }));
      formData.append('file', this.selectedFile);
  
      this.service.updateCategory(this.categoryId, formData, this.selectedFile).subscribe((res: any) => {
        console.log("Post Res --> " + res);
        this.dialogRef.close(this.categoryForm.value);
        this.loaderService.hide();
        console.log('Loader should be hidden now'); // Debugging line
      }, (error: any) => {
      //   if (error.status === 409) {
      //     this.snackBar.open('Category is already present!!', 'Close', {
      //       duration: 3000,
      //       horizontalPosition: 'center',
      //       verticalPosition: 'bottom',
      //     });     
      //   } else {
      //     alert("An error occurred: " + error.message);
      // }
        console.error("Error adding product: ", error);
        this.loaderService.hide();
        console.log('Loader should be hidden now on error'); // Debugging line
      });
    } else {
      formData.append('category', new Blob([JSON.stringify(this.categoryForm.value)], { type: 'application/json' }));
      formData.append('file', this.selectedFile);
  
      this.service.postCategory(formData, this.selectedFile).subscribe((res: any) => {
        console.log("Post category Res --> " + res);
        this.dialogRef.close(this.categoryForm.value);
        this.loaderService.hide();
        console.log('Loader should be hidden now'); 
      }, (error: any) => {

        if (error.status === 409) {
          this.snackBar.open('Category is already present!!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });     
        } else {
          alert("An error occurred: " + error.message);
      }

        console.error("Error adding product: ", error);
        this.loaderService.hide();
        console.log('Loader should be hidden now on error');
      });
    }
  }
  

    
  }

