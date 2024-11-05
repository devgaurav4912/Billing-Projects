import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SettingsService } from '../shared/settings.service';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-setting-master',
  templateUrl: './setting-master.component.html',
  styleUrl: './setting-master.component.css',
})
export class SettingMasterComponent {
  data: any;
  settingsForm: FormGroup = this.fb.group({});
  logoPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isLoading: boolean = false; // Loader flag
  // businessName: string = "Google";

  constructor(
    private fb: FormBuilder,
    private settingservice: ApiService,
    private snackBar: MatSnackBar,
    private settingsService: SettingsService,
    private loaderService : LoaderService
  ) {
    this.settingsForm = this.fb.group({
      settingId: ['', Validators.required],
      businessName: ['', Validators.required],
      businessMobile: ['', Validators.required],
      businessEmail: ['', [Validators.required, Validators.email]],
      businessAddress: ['', Validators.required],
      businessGstNumber: ['', Validators.required],
      businessLogo: [''],
    });
  }

  ngOnInit(): void {
    // this.settingservice.getSettingByBusinessName(this.businessName).subscribe(obj => {
    //   this.populateForm(obj);
    //    this.data = obj;
    // });
    this.getSetting();
  }

  getSetting() {
    this.settingservice.getsetting().subscribe((obj) => {
      if (obj != null) {
        this.populateForm(obj[0]);
        this.data = obj[0].businessName;
        this.settingsService.setBusinessName(obj[0].businessName);
        this.settingsService.setBusinessLogo(obj[0].businessLogo);
      } else {
        alert('Something went wrong');
      }
    });
  }

  private populateForm(data: any): void {
    this.settingsForm.patchValue({
      settingId: data.settingId,
      businessName: data.businessName,
      businessMobile: data.businessMobile,
      businessEmail: data.businessEmail,
      businessAddress: data.businessAddress,
      businessGstNumber: data.businessGstNumber,
    });
    this.logoPreview = data.businessLogo;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
        this.settingsService.setBusinessLogo(this.logoPreview); // Update business logo in the shared service
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(): Promise<void> {
    console.log('in submit');
    if (this.settingsForm.valid) {
      console.log('in valid if');
     // this.isLoading = true;
     this.loaderService.show();
      const settingMaster = this.settingsForm.value;

      if (this.selectedFile) {
        console.log('in image selected');
        this.uploadSetting(settingMaster, this.selectedFile);
      } else if (this.logoPreview) {
        // Fetch image from URL and convert to file
        try {
          const imageBlob = await this.settingservice
            .fetchImageFromURL(this.logoPreview as string)
            .toPromise();
          if (imageBlob) {
            console.log('in image not selected');

            const file = new File([imageBlob], 'businessLogo.jpg', {
              type: imageBlob.type,
            });
            this.uploadSetting(settingMaster, file);
          } else {
            this.showSnackBar('Settings updated successfully', 'Close', 'top');
          }
        } catch (error) {
          console.error('Error fetching image from URL', error);
         // this.isLoading = false;
          this.loaderService.hide();
        }
      }
    }
  }

  private uploadSetting(settingMaster: any, file: File): void {
    console.log('in uplod setting');
    this.settingservice.updateSetting(this.data, settingMaster, file).subscribe(
      (obj) => {
        if (obj != null) {
          this.populateForm(obj);
          //this.isLoading = false;
          this.loaderService.hide();
          this.getSetting();
          this.showSnackBar('setting updated successfully', 'Close', 'top');
        } else {
          //this.isLoading = false;
          this.loaderService.hide();
          this.showSnackBar('something wrong on server', 'Close', 'top');
        }
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Failed to update settings', 'Close', {
          duration: 3000, // Duration in milliseconds
        });
        this.isLoading = false;
        this.loaderService.hide();

      }
    );

    
  }

  private showSnackBar(
    message: string,
    action: string,
    position: 'top' | 'bottom'
  ): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: position,
    };
    this.snackBar.open(message, action, config);
  }
}
