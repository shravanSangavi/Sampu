import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, signUp, } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  IsSellerloggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.IsSellerloggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
        // console.warn(result)
      })
  }

  Userlogin(data: Login) {

    // this.http.get('http://localhost:3000/seller',
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' })
      .subscribe((result: any) => {
        console.warn(result)
        if (result && result.body && result.body.length === 1) {
          this.isLoginError.emit(false)
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        } else {
          console.warn("login failed");
          this.isLoginError.emit(true)
        }
      })

  }

  
  reloadseller() {
    if (localStorage.getItem('seller')) {
      this.IsSellerloggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
}
