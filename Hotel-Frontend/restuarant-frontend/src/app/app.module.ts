import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { PosComponent } from './pos/pos.component';
import { BillingComponent } from './billing/billing.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './navbar/navbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { AddCategoryFormComponent } from './add-category/add-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddProductComponent } from './add-product/add-product.component';
import { MatInputModule } from '@angular/material/input';
import { SettingMasterComponent } from './setting-master/setting-master.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoaderComponent } from './shared/loader/loader.component';
import { AddCustomerFormComponent } from './add-customer-form/add-customer-form.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPrintModule } from 'ngx-print';
import { NumberToWordsPipe } from './number-to-words.pipe';
import { ReportComponent } from './shared/report/report.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BillingTableComponent } from './billing-table/billing-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatSortModule } from '@angular/material/sort';





@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        PosComponent,
        BillingComponent,
        NavbarComponent,
        CategoryListComponent,
        ConfirmdialogComponent,
        AddCategoryFormComponent,
        AddProductComponent,
        SettingMasterComponent,
        LoaderComponent,
        AddCustomerFormComponent,
        NumberToWordsPipe,
        ReportComponent,
        BillingTableComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatPaginatorModule,
        MatTableModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule, // Required for ngx-bootstrap animations
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        NgxPrintModule,
        NgxEchartsModule.forRoot({ echarts: () => import('echarts') }), // Ensure this line is correct
        MatSelectModule,
        MatOptionModule,
        MatSortModule,
        CurrencyPipe,
        MatCheckboxModule], providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
