import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  private categoryCount: any;
  private productCount : any;
  private customerCount : any;
  private placeOrderCount :any;

  private monthlySalesData: any[] = [];

  

  setCategoryCount(count: number) {
    this.categoryCount = count;
  }

  getCategoryCount(): number {
    return this.categoryCount;
  }


  setProductCount(count: number) {
    this.productCount = count;
  }

  getProductCount(): number {
    return this.productCount;
  }


  setCustomerCount(count: number) {
    this.customerCount = count;
  }

  getCustomerCount(): number {
    return this.customerCount;
  }


  setPlaceOrderCount(count: number) {
    this.placeOrderCount = count;
  }

  getPlaceOrderCount(): number {
    return this.placeOrderCount;
  }


  setMonthlySalesData(data: any[]) {
    this.monthlySalesData = data;
  }

  getMonthlySalesData() {
    return this.monthlySalesData;
  }
  
}
