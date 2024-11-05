import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategoryFormComponent } from './add-category.component';


describe('AddCategoryComponent', () => {
  let component: AddCategoryFormComponent;
  let fixture: ComponentFixture<AddCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCategoryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});