import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  passwordFieldType: string = 'password';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }
  loginUser() {
    this.submitted = true;
  
    // Mark all controls as touched to show validation errors
    this.loginForm.markAllAsTouched();
  
    if (this.loginForm.invalid) {
      return;  // Prevent submission if the form is invalid
    }
  
    // Proceed with login if the form is valid
    this.apiService.loginUser(this.loginForm.value).subscribe((res: any) => {
      console.log("login response ==> " + res);
      if (res === "Login successful") {
        this.snackBar.open("Login successful", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.route.navigate([""]);

      // } else if (res.trim() ===  "Invalid credentials") {
      //   this.snackBar.open("Invalid credentials!", "Close", {
      //     duration: 3000,
      //     verticalPosition: 'top',
      //     horizontalPosition: 'center'
      //   });
      //   console.log("=====LOGIN-UNSUCCESSFULL=1==")
      // } else {
      //   this.snackBar.open("An unexpected error occurred.", "Close", {
      //     duration: 3000,
      //     verticalPosition: 'top',
      //     horizontalPosition: 'center'
      //   });
      //   console.log("=====LOGIN-UNSUCCESSFULL=2==")
      }

      console.log("=====LOGIN-UNSUCCESSFULL=3==")

    },

    (error) => {
      // Handle error responses using HTTP status codes
      if (error.status === 401) {
        this.snackBar.open("Invalid credentials!", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        console.log("=====LOGIN-UNSUCCESSFUL: Invalid credentials==");
      } else if (error.status === 404) {
        this.snackBar.open("User not found!", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        console.log("=====LOGIN-UNSUCCESSFUL: User not found==");
      } else {
        // Handle any other errors
        this.snackBar.open("An unexpected error occurred.", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        console.log("=====LOGIN-UNSUCCESSFUL: Unexpected error==");
      }
    }
  );
  

    // this.snackBar.open("Invalid Credentials!", "Close", {
    //   duration: 3000,
    //   verticalPosition: 'top',
    //   horizontalPosition: 'center'
    // });
   // console.log("=====LOGIN-UNSUCCESSFULL=4==")

  }
  

  // loginUser() {
  //   this.submitted = true;

  //   if (this.loginForm.invalid) {
  //     return;  // Prevent submission if the form is invalid
  //   }

  //   this.apiService.loginUser(this.loginForm.value).subscribe((res: any) => {
  //     console.log("login response ==> " + res);
  //     if (res === "Login successful") {
  //       this.snackBar.open("Login successful", "Close", {
  //         duration: 3000,
  //         verticalPosition: 'top',
  //         horizontalPosition: 'center'
  //       });
  //       this.route.navigate([""]);
  //     } else if (res === "Invalid credentials" || res === "User not found") {
  //       this.snackBar.open("Invalid Credentials!", "Close", {
  //         duration: 3000,
  //         verticalPosition: 'top',
  //         horizontalPosition: 'center'
  //       });
  //     } else {
  //       this.snackBar.open("An unexpected error occurred.", "Close", {
  //         duration: 3000,
  //         verticalPosition: 'top',
  //         horizontalPosition: 'center'
  //       });
  //     }
  //   });
  // }
}
