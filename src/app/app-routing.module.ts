import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { DetailComponent } from './component/detail/detail.component';
import { CartComponent } from './component/cart/cart.component';
import { StoreComponent } from './component/store/store.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { VerifyOtpComponent } from './userdetail/verifyOtp.component';
import { ManageOrderComponent } from './userdetail/manage-order.component';
import { AuthGuard } from './auth.guard';
import { PostsComponent } from './component/posts/posts.component';
import { PostDetailComponent } from './component/post-detail/post-detail.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'detail/:id', component: DetailComponent},
  { path: 'cart', component: CartComponent},
  {path:'store', component: StoreComponent},
  {path:'post', component: PostsComponent},
  {path:'post/:id', component: PostDetailComponent},
  {path:'user-detail', component: UserdetailComponent},
  {path:'verify-otp/:email', component: VerifyOtpComponent},
  {path:'manage-order/:email', canActivate: [AuthGuard], component:ManageOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
