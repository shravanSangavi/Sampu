import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, orders } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  totalprice: number | undefined
  cartData: cart[] | undefined
  ordermsg: string | undefined
  constructor(private product: ProductService, private route: Router) { }
  ngOnInit() {

    this.product.currentCart().subscribe((result) => {

      let price = 0;
      this.cartData = result
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalprice = price + (price / 10) + 100 - (price / 10);
      console.warn(this.totalprice)

    })

  }

  orderNow(data: { email: string, address: string, contact: string }) {
    console.warn(data)
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalprice) {
      let orderData: orders = {
        ...data,
        totalprice: this.totalprice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.DeleteCartAfterCheckOut(item.id);
        }, 700);
      })

      this.product.OrderNow(orderData).subscribe((result) => {
        if (result) {
          this.ordermsg = "Order has been placed";
          setTimeout(() => {
            this.route.navigate(['/my-orders'])
            this.ordermsg = undefined
          }, 4000);
        }




      })


    }
  }

}
