// cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.cartSubject.next([...this.items]);
    }
  }

  getItems() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: any) {
    const existingItem = this.items.find(item => item.variant_id === product.variant_id);

    if (existingItem) {
      // Nếu sản phẩm đã tồn tại, chỉ tăng số lượng
      existingItem.cartQuantity+=1;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới
      this.items.push({ ...product, cartQuantity: 1, selected: false  });
    }

    this.updateCart();
  }

  removeFromCart(productId: number) {
    // Xóa sản phẩm từ giỏ hàng
    this.items = this.items.filter(item => item.variant_id !== productId);

    this.updateCart();
  }

  toggleSelect(productId: number) {
    // Chuyển đổi trạng thái chọn của sản phẩm
    const product = this.items.find(item => item.variant_id === productId);
    if (product) {
      product.selected = !product.selected;
      this.updateCart();
    }
  }

  getSelectedItems() {
    // Lấy danh sách các sản phẩm được chọn
    return this.items.filter(item => item.selected);
  }

  clearCart() {

    this.items = [];
    this.cartSubject.next([]);
    localStorage.removeItem('cartItems');
  }

  clearCartAfterCheckout(){
    this.items=this.items.filter(item => !item.selected)
    this.updateCart();


  }
  increaseQuantity(productId: number) {
    // Tăng số lượng của sản phẩm
    const product = this.items.find(item => item.variant_id == productId);
    if (product) {
      product.cartQuantity++;
      this.updateCart();
    }
  }

  decreaseQuantity(productId: number) {
    // Giảm số lượng của sản phẩm
    const product = this.items.find(item => item.variant_id == productId);
    if (product && product.cartQuantity > 1) {
      product.cartQuantity--;
      this.updateCart();
    }
  }

  private updateCart() {
    this.cartSubject.next([...this.items]);
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
}
