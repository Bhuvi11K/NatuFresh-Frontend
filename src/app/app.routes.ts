import { Routes } from '@angular/router';
import { ProductCatalog } from './components/product-catalog/product-catalog';
import { Cart } from './components/cart/cart';
import { Profile } from './components/profile/profile';
import { Checkout } from './components/checkout/checkout';
import { Wishlist } from './components/wishlist/wishlist';

export const routes: Routes = [
  { path: '', component: ProductCatalog },
  { path: 'cart', component: Cart },
  { path: 'profile', component: Profile },
  { path: 'checkout', component: Checkout },
  { path: 'wishlist', component: Wishlist },
  { path: '**', redirectTo: '' },
];
