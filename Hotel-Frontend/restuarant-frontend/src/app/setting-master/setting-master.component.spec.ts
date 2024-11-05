import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMasterComponent } from './setting-master.component';

describe('SettingMasterComponent', () => {
  let component: SettingMasterComponent;
  let fixture: ComponentFixture<SettingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
