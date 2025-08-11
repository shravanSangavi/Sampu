import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'
import { NgIf, NgSwitch, NgSwitchCase, NgFor, CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { json } from 'stream/consumers';
import { SellerService } from '../services/seller.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, NgSwitch, NgSwitchCase, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  filtered: undefined | product[]
  constructor(private route: Router, private product: ProductService, private http: HttpClient, private seller: SellerService) {
  }
  productsearch: undefined | product[]
  menuType: string = 'default';
  sellerName: string = "";
  userName: string = "";
  cartItems = 0;
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      // console.warn(val.url)
      if (val.url) {
        // if(localStorage.getItem('seller') && val.url('seller')){
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          if (sellerStore) {
            let sellerData = JSON.parse(sellerStore);
            if (Array.isArray(sellerData)) {
              sellerData = sellerData[0];
            }

            this.sellerName = sellerData?.name;
            this.menuType = 'seller';
          }
          // let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          // this.sellerName = sellerData.name;
          // this.menuType = 'seller';
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'users';
          this.product.getCartList(userData.id);
        }
        else {
          this.menuType = 'default';
        }
      }

      // this.seller.IsSellerloggedIn.subscribe((isLoggedIn) => {
      //   if (isLoggedIn) {
      //     this.menuType = 'seller';
      //   } else {
      //     this.menuType = 'default';
      //   }
      // });
    })

    let Cart = localStorage.getItem('localCart')
    if (Cart) {
      this.cartItems = JSON.parse(Cart).length;
    }
    this.product.cartData.subscribe((data) => {
      this.cartItems = data.length;
    })
  }

  logout() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  userLogout() {
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {

    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.SearchProducts(element.value).subscribe((result) => {
        // if(result.length>5){
        //   result.length=length
        // }
        this.productsearch = result;
      })

    }

  }

  searchblurhide() {
    this.productsearch = undefined;
  }

  Submitsearch(val: string) {
    this.route.navigate([`app-search/${val}`]);
  }
  redirectToDetails(id: number) {
    debugger
    this.route.navigate(['/details/' + id])
  }
}
