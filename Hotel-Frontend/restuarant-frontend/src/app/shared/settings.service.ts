import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private data: any;

  // Define BehaviorSubjects with default values
  private businessNameSource = new BehaviorSubject<string>('Default Business Name');
  private businessLogoSource = new BehaviorSubject<string | ArrayBuffer | null>(null);

  // Expose the BehaviorSubjects as Observables
  businessName$ = this.businessNameSource.asObservable();
  businessLogo$ = this.businessLogoSource.asObservable();

  constructor(private apiservice: ApiService) {
    // Fetch settings from the API on service initialization
    this.loadSettings();
  }

  // Method to load settings from the API and update the BehaviorSubjects
  private loadSettings(): void {
    this.apiservice.getsetting().subscribe((obj: any) => {
      this.data = obj[0];
      if (this.data) {
        this.businessNameSource.next(this.data.businessName);
        this.businessLogoSource.next(this.data.businessLogo);
      }
    });
  }

  // Method to manually update the business name
  setBusinessName(name: string): void {
    this.businessNameSource.next(name);
  }

  // Method to manually update the business logo
  setBusinessLogo(logo: string | ArrayBuffer | null): void {
    this.businessLogoSource.next(logo);
  }
}
