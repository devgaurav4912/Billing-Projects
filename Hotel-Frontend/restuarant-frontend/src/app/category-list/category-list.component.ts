import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { AddCategoryFormComponent } from '../add-category/add-category.component';
import { Router } from '@angular/router';
import { ShareDataService } from '../shared/share-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['SL', 'categoryImage', 'CategoryName','Status', 'Action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  recordId!:number;
  selectedId:boolean =false;
  categoryList : any[]=[];
  categoryCount? : number


  constructor(
    private service: ApiService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router : Router,
    private dataservice : ShareDataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }


  getCategoryImages(imageName: any, category: any) {
    this.service.getImages(imageName).subscribe((res: Blob) => {
      const objectURL = URL.createObjectURL(res);
      category.categoryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  getAllCategory() {
    this.service.fetchAllCategory().subscribe((res: any) => {
      this.dataSource.data = res;
      this.categoryList = res;

      this.categoryList.forEach(category =>{
        this.getCategoryImages(category.categoryImage ,category)

        console.log("categories images ->"+category.categoryImage);
      })
      console.log("Category list count ==> " + this.categoryList.length);
      this.categoryCount = this.categoryList.length;
  
      // Navigate with queryParams correctly
      //this.router.navigate(["/report"], { queryParams: { count: this.categoryCount } });


      console.log("category count --1-->"+ this.categoryCount)
      this.dataservice.setCategoryCount(this.categoryCount);

      console.log("category count --2-->"+ this.categoryCount)

    });
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  deleteCategory(id: any , status:any) {

    if(status === "Active"){

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '100px'; // Adjust the width as needed
      dialogConfig.position = { top: '20%', left: '35%' };
      
      const dialogRef = this.dialog.open(ConfirmdialogComponent , {
        data :{message: 'Deleting this category will also remove all associated products. Are you sure you want to proceed?',
              isWarning :true
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.deleteCategory(id).subscribe(() => {
            this.getAllCategory();
            this.snackBar.open('Your category has been deleted', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.dataSource.data = this.dataSource.data.filter(item => item.category_id !== id);
          });
        }
      });

    }else{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '100px'; // Adjust the width as needed
      dialogConfig.position = { top: '20%', left: '35%' };
      const dialogRef = this.dialog.open(ConfirmdialogComponent ,{
        data :{message: 'Are you sure you want to delete this category?'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.deleteCategory(id).subscribe(() => {
            this.getAllCategory();
            this.snackBar.open('Your category has been deleted', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.dataSource.data = this.dataSource.data.filter(item => item.category_id !== id);
          });
        }
      });

    }
  
  }

 
  
  

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryFormComponent ,{
      height:'500px',
      width :'500px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('New category added', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
        this.getAllCategory();
      }
    });
  }

  onUpdate(id: any) {
    //this.selectedId = id;
    const dialogRef = this.dialog.open(AddCategoryFormComponent, {
      data: { categoryId: id },
      height:'550px',
      width :'500px', 

    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Category is updated!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
        this.getAllCategory();
      }
    });
  }


  

  
}


 // onUpdate(id :any){
  //   // console.log("category-id --> "+id)
  //    const dialogRef = this.dialog.open(AddCategoryFormComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.snackBar.open('category is updated!', 'Close', {
  //         duration: 3000,
  //         horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: ['custom-snackbar']
  //       });
  //       this.getAllCategory();
  //     }
  //   });
  //   }

  // }
