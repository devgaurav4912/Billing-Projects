import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PosComponent } from './pos/pos.component';
import { BillingComponent } from './billing/billing.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryFormComponent } from './add-category/add-category.component';
import { SettingMasterComponent } from './setting-master/setting-master.component';
import { ReportComponent } from './shared/report/report.component';
import { BillingTableComponent } from './billing-table/billing-table.component';

const routes: Routes = [
  {
  path :"login",
  component : LoginComponent
  },

  {path :"",
    component : PosComponent
    
  },
  {
    path :"product",
    component : AddProductComponent
    
  },
  {
    path :"category-list",
    component : CategoryListComponent
    
  },
  {
    path :"add-category",
    component : AddCategoryFormComponent,
    
  },
  {
    path :"setting-master",
    component : SettingMasterComponent,
  },
  {
    path :"billing",
    component : BillingComponent,
    },

    {
      path :"report",
      component : ReportComponent,
      },
      {
        path : "billing-table" , component : BillingTableComponent
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
