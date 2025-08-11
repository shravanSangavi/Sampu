import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, orders } from '../data-type';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {

  myordersData: orders[] | undefined

  constructor(private products: ProductService) { }

  ngOnInit() {
this.getOrders();

  }
  cancelOrders(orderId:number|undefined) {
    orderId && this.products.cancelOrder(orderId).subscribe((result) => {
      this.getOrders();
    })
  }

  getOrders(){
      this.products.myOrders().subscribe((result) => {
      console.warn(result)
      this.myordersData = result

    })
  }

}
