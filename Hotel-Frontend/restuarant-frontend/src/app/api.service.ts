import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //urlVariable :string = "http://localhost:8090";

  baseUrlLogin: string = 'http://localhost:8090/api/user';

  baseUrCategory: string = 'http://localhost:8090/api/category';

  baseUrlProduct: string = 'http://localhost:8090/api/product';

  baseUrlCart : string ="http://localhost:8090/api/cartmaster";

  baseUrlCustomer : string ="http://localhost:8090/api/customer";

  baseurl = "http://localhost:8090/api/settings";


  // login Api

  loginUser(obj: any) {
    return this.http.post(`${this.baseUrlLogin}/login`, obj, {
      responseType: 'text',
    });
  }

  //Category Api

  fetchAllCategory() {
    return this.http.get(`${this.baseUrCategory}/getAllCategory`);
  }

  postCategory(formData: FormData, file: any) {
    return this.http.post(`${this.baseUrCategory}/create-category`, formData);
  }

  getCategoryById(categoryId: any) {
    return this.http.get(`${this.baseUrCategory}/${categoryId}`);
  }

  updateCategory(id: any, formData: FormData, file?: any) {
    return this.http.put(
      `${this.baseUrCategory}/updateCategory/${id}`,
      formData
    );
  }

  deleteCategory(id: any) {
    return this.http.delete(`${this.baseUrCategory}/delete/${id}`);
  }

  //Product Api

  addProduct(formData: FormData, file: any, categoryName: string) {
    return this.http.post(
      `${this.baseUrlProduct}/add-product/${categoryName}`,
      formData
    );
  }

  updateProduct(productId:any , categoryName :string ,formData: FormData, file?: any  ) {
    return this.http.put(`${this.baseUrlProduct}/updateProduct/${productId}/${categoryName}`,formData
    );
  }

  getProductsByCategoryName(categoryName: any) {
    return this.http.get(`${this.baseUrlProduct}/category/${categoryName}`);
  }

  getAllProducts() {
    return this.http.get(`${this.baseUrlProduct}/getAllProducts`);
  }

  
  getProductById(productId:any){
    return (this.http.get(`${this.baseUrlProduct}/${productId}`));
  }

  deleteProduct(productId:any){
    return (this.http.delete(`${this.baseUrlProduct}/delete/${productId}`));
  }

//cartmaster

postCart(cartObj: any , customerName: any) {
  return (this.http.post(`${this.baseUrlCart}/add-cart/${customerName}`,cartObj,{ responseType: 'text' } ));

}

getAllCarts(){
  return (this.http.get(`${this.baseUrlCart}/getAllCarts`));
}

  //setting master

  updateSetting(businessName: string, settingMaster: any, file: File): Observable<any> {
    console.log("in service update")
    const formData = new FormData();
    formData.append('settingmaster', new Blob([JSON.stringify(settingMaster)], { type: 'application/json' }));
    formData.append('businessLogo', file);
  
    return this.http.put(`${this.baseurl}/${businessName}`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json' 
      })
    });
  }

  getSettingByBusinessName(businessName: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/${businessName}`);
  }
  getsetting() {
    return this.http.get<any>(`${this.baseurl}`);
  }

  fetchImageFromURL(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }


  //Customer Master 

  addCustomer(customerObj: any) {
    return this.http.post(`${this.baseUrlCustomer}/addCustomer`, customerObj , {responseType: 'text',});
  }

  getAllCustomer(){
    return this.http.get(`${this.baseUrlCustomer}/getAllCustomer`)
  }

  //payment gateway api

  crateTrancsaction(amount : any){
    return this.http.get(`http://localhost:8090/api/payment/createTransaction/${amount}`)
   }


   //get images from backend

  //  getImages(imageName : any){
  //   return this.http.get(`http://localhost:8090/restaurant/api/images`)
  // }

  getImages(imageName: any) {
    return this.http.get(`http://localhost:8090/restaurant/api/images?image=${imageName}`, { responseType: 'blob' });
}


}
