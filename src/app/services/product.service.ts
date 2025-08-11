import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, orders, product } from '../data-type';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  filtered!: product[];
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }


  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  productlist() {
    return this.http.get<product[]>('http://localhost:3000/products')
  }

  productDelete(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  productEdit(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  //  productUpdate(id:string){
  //   return this.http.post<product>(`http://localhost:3000/products/${id}` data);
  // }

  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,
      product
    );
  }
  Papularproducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=4')
  }
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  SearchProducts(query?: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }


  removefromcart(productId: number) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
      console.warn(items)
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() {

    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id)
  }

  OrderNow(data: orders) {
    return this.http.post('http://localhost:3000/orders', data)
  }

  myOrders() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<orders[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  DeleteCartAfterCheckOut(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      if (result) {
        this.cartData.emit([]);
      }

    })
  }
  cancelOrder(OrderId: number) {

    return this.http.delete('http://localhost:3000/orders/' + OrderId)
  }
  
}
