import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {

  const sellerService = inject(SellerService);
  //inject(Router)
   if(localStorage.getItem('seller')){
       return true;
      }
      return sellerService.IsSellerloggedIn;
};