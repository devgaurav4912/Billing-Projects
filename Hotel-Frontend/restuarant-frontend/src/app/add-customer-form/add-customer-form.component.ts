// add-customer-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { delay, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.css']
})
export class AddCustomerFormComponent {
  addCustomerForm: FormGroup;
  @Output() customerAdded = new EventEmitter<void>();
  alerts: any[] = [];



  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCustomerFormComponent>,
    private service : ApiService,
    private snackBar: MatSnackBar
  ) {
    this.addCustomerForm = this.fb.group({
      customerFullName: ['', Validators.required],
      customerMobileNumber: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    if (this.addCustomerForm.valid) {
      this.service.addCustomer(this.addCustomerForm.value).subscribe((res:any)=>{
        console.log("Add-customer-res"+res)
        this.snackBar.open('Cusstomer added successfuly!!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }); 
        
      },(error:any)=>{
        if (error.status === 409) {
          this.snackBar.open('Customer with this mobile number already present!!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });     
        } else {
          alert("An error occurred: " + error.message);
      }
      })
      
      this.customerAdded.emit();
      this.dialogRef.close(this.addCustomerForm.value);
    }
  }

  saveCustomerData() {
    return of(true).pipe(delay(1000)); // Replace with actual save logic
  }

  closeAlert(index: number): void {
    this.alerts.splice(index, 1);
  }
}
