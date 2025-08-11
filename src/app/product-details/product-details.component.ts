import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  displayproduct: undefined | product;
  constructor(private activeroute: ActivatedRoute, private products: ProductService) { }

  ngOnInit() {

    let productId = this.activeroute.snapshot.paramMap.get('productId')
    productId && this.products.productEdit(productId).subscribe((result) => {
      this.displayproduct = result
    })

    let cartData = localStorage.getItem('localCart')
    if (productId && cartData) {

      let items = JSON.parse(cartData);
      items = items.filter((item: product) => productId == item.id.toString())
      if (items.length) {
        this.removeCart = true
      } else {
        this.removeCart = false
      }
    }
  let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.products.getCartList(userId);

        this.products.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
       if(item.length){
       this.cartData=item[0];
        this.removeCart=true;
       }
        })
      }
      
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  Addtocart() {
    if (this.displayproduct) {
      this.displayproduct.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.products.localAddToCart(this.displayproduct);
        this.removeCart = true
      }
      else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.displayproduct,
          userId,
          productId: this.displayproduct.id,
        }
         delete cartData.id;
        this.products.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert('product has beeen added')
            console.warn("data is stored in DB");
             this.products.getCartList(userId);
           this.removeCart=true
          }
        })
      }

    }
  }

  // removeToCart(productId: number) {
  //   debugger;
  //   this.products.removefromcart(productId);
  //   this.removeCart = false
  // }

   removeToCart(productId:number){
    if(!localStorage.getItem('user')){
this.products.removefromcart(productId)
    }else{
    //  console.warn("cartData", this.cartData);
      debugger;
      this.cartData &&this.products.removeToCart(this.cartData?.id).subscribe((result)=>{

        let user=localStorage.getItem('user');
        let userID=user && JSON.parse(user).id;
        this.products.getCartList(userID);
      })
    }
    this.removeCart=false
  }
} 
