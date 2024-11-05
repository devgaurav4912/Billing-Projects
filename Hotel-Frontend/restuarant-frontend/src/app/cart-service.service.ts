import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductMaster } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProductsSubject = new BehaviorSubject<ProductMaster[]>([]);
  cartProducts$ = this.cartProductsSubject.asObservable();

  setCartProducts(products: ProductMaster[]): void {
    this.cartProductsSubject.next(products);
  }

  getCartProducts(): ProductMaster[] {
    return this.cartProductsSubject.getValue();
  }
}
