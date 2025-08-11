import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login, signUp } from '../data-type';
import { NgIf } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgIf],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private route: Router) { }

  showLogin = false;
    authError:String='';
  ngOnInit(): void {
    this.seller.reloadseller()
  }

  signUp(data: signUp): void {
    //console.warn(data);
    this.seller.userSignUp(data)
  }
  Login(data: Login): void {
    debugger;
    this.authError="";
    console.warn(data);
    this.seller.Userlogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is not correct";
      }
    })
  }

  openLogin() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }



}
