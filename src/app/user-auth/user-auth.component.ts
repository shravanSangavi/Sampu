import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, Login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  constructor(private user: UserService, private product: ProductService) { }
  showLogin = true;
  error: string = '';

  ngOnInit() {
    this.user.reloadAuth();
  }

  Sinup(data: signUp) {
    this.user.userSinup(data)
  }

  Login(data: Login): void {
    debugger;
    console.warn(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((isError) => {
      if (isError) {
        this.error = "User not found";
      } else {
        this.localCartToDbCart();
      }
    })
  }

  openLogin() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }

  localCartToDbCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id

    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {

        let cartData: cart = {

          ...product,
          productId: product.id,
          userId


        };
        delete cartData.id
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("data is stored in DB");
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')
          }
        }, 500);
      });

    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 3000);

  }


}
