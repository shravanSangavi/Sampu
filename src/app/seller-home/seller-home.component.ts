import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import{ FaIconComponent } from '@fortawesome/angular-fontawesome'
import{faTrash,faEdit }from '@fortawesome/free-solid-svg-icons'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, FaIconComponent,RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  constructor(private productlistss: ProductService) { }

  productList: undefined | product[]
  ProductMessage: undefined | string
  faCoffee = faTrash;
  iconEdit=faEdit;

  ngOnInit() {
  this.lists()
  }

  Deleteproduct(id: number) {
    this.productlistss.productDelete(id).subscribe((result) => {
      if (result) {
        this.ProductMessage = 'Product Deleted Successfully'
      }
      this.lists()
    })

     setTimeout(() => {
      this.ProductMessage=undefined
    }, 3000);
  }

lists(){
    this.productlistss.productlist().subscribe((result) => {
      this.productList = result;
    })
    }

}
