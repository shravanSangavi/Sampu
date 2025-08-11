import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  constructor(private product:ProductService){}
  AddproductMessage: string|undefined

  Submit(data:product) {
    console.warn(data)
     this.product.addProduct(data).subscribe((result)=>{
      console.warn(result)
     if(result){
      this.AddproductMessage="Product Added Sucessfully"
     }
     })
    setTimeout(() => {
      this.AddproductMessage=undefined
    }, 3000);
    
    
  }
}
