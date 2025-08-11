import { EventEmitter, Injectable } from '@angular/core';
import { Login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) { }
  invalidUserAuth = new EventEmitter<boolean>(false)
  userSinup(user: signUp) {
    this.http.post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }

      })
  }

  userLogin(data: Login) {
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result) => {
      debugger;
      if (result && result.body?.length) {
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      } else {
        this.invalidUserAuth.emit(true)
      }
    })
  }

  reloadAuth() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }
}
