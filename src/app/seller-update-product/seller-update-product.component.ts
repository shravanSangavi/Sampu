import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { SellerHomeComponent } from '../seller-home/seller-home.component';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';


@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage:undefined | string;
  constructor(private productlistss: ProductService, private route:ActivatedRoute){}

  
   ngOnInit(): void {
let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
productId &&
    this.productlistss.productEdit(productId).subscribe((data)=>{
     console.log(data)
     this.productData=data
    })

  }

UpSubmit(data:any){
   if (this.productData) {
      data.id = this.productData.id;
    }
    this.productlistss.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has updated';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    console.warn(data);
}
}

