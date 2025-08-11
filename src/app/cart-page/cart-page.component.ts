import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary, product } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartData: cart[] | undefined

  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }



  constructor(private product: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.loadDetails();
  }



  removeToCart(cartid: number | undefined) {

    cartid && this.cartData && this.product.removeToCart(cartid).subscribe((result) => {
      this.loadDetails()
    })
  }

  loadDetails() {

    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

      if (!this.cartData.length) {
        this.route.navigate(['/'])
      }
    })
  }

  checkout() {
    this.route.navigate(['/check-out'])
  }
}
