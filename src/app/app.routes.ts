import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
//import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent

    },
    {
        path: 'seller-auth',
        component: SellerAuthComponent
    },
    {
        path: 'seller-home',
        component: SellerHomeComponent,
        canActivate: [authGuard]
    },
    {
        component: SellerAddProductComponent,
        path: 'app-seller-add-product',
        canActivate: [authGuard]
    },
    {
        component: SellerUpdateProductComponent,
        path: 'app-seller-update-product/:id',
        canActivate: [authGuard]
    },
    {
        component: SearchComponent,
        path: 'app-search/:query'
        
    },
     {
        component: FooterComponent,
        path: 'app-footer'
 
    },
    {
        component: ProductDetailsComponent,
        path: 'details/:productId'
 
    },
    {
        component: UserAuthComponent,
        path: 'user-auth'
 
    },
    {
        component: CartPageComponent,
        path: 'cart-Page'
 
    },
    {
        component: CheckOutComponent,
        path: 'check-out'
 
    },{
        component:MyOrdersComponent,
        path:'my-orders'
    }
];               
