import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../shared/settings.service'; // Import the shared service
import { ApiService } from '../api.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  businessName: any = '';
  businessLogo: any = '';
  data: any = {};
  activeItem: string = '';



  constructor(
    private settingsService: SettingsService,
    private service: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.settingsService.businessName$.subscribe((name) => {
      this.businessName = name;
      console.log('business name response --> ' + name);
      this.getsetting();
    });
  
    this.settingsService.businessLogo$.subscribe((logo: string | ArrayBuffer | null) => {
      this.businessLogo = logo;
      this.getsetting();
    });
  }


  setActive(item: string) {
    this.activeItem = item;
    setTimeout(() => {
      this.activeItem = ''; // Reset after animation
    }, 300); // Match the duration of the animation
  }

  isActive(item: string): boolean {
    return this.activeItem === item;
  }

  getsetting() {
    this.service.getsetting().subscribe((obj: any) => {
      this.data = obj[0];
      console.log("setting object --> "+JSON.stringify(obj));
      this.cdr.detectChanges();
    });
  }
}
