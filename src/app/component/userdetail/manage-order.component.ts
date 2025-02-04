import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../config/config';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',

})
export class ManageOrderComponent implements OnInit {

  @ViewChild('detailDiv') myDiv!: ElementRef;
  isDivVisible = false;
  orderId:any;

  email:any;
  orders:any[]=[];
  orderDetail:any[]=[];
  customer:any;
  status:any;


  constructor(private http : HttpClient, private fb: FormBuilder,  private router : Router,     private toastr: ToastrService,private route: ActivatedRoute,  private cookie: CookieService){

    this.route.params.subscribe((params) => {
      this.email = params['email'];
      
    });

  }
  ngOnInit(): void {
    this.getCustomerByEmail();
    this.getOrderByEmail();
   

  }

  logOut(){
    this.cookie.delete('user_email');
    window.location.reload();
    
  }

  toggleDiv(id:any) {
    this.isDivVisible = !this.isDivVisible;
    this.orderId = id;
    this.getOrderDetail()
    this.status = this.orders.find((order :any) => order.order_id===id).status;
    console.log(this.status)
    
  }

  close(){
    this.isDivVisible = !this.isDivVisible;
  }

  getCustomerByEmail():void{
    this.http.post<any>(`${config.baseUrl}order/get_customer_by_email`,{email:this.email}).subscribe(data=>{
      this.customer = data.data[0];
    })
  }


  getOrderByEmail():void {
    this.http.post<any>(`${config.baseUrl}order/get_by_email`,{email:this.email}).subscribe(data=>{
      this.orders = data.data;
      
    })
  }

  getOrderDetail():void {
    this.http.get<any>(`${config.baseUrl}order/OrderDetail/`+this.orderId).subscribe(data=>{
      this.orderDetail = data.data;

    })
  }

  cancel():void{
    if(confirm('Hủy đơn hàng này ')){
      this.http.put<any>(`${config.baseUrl}order/cancel/`+this.orderId,{}).subscribe(data=>{
        console.log(data)
        if(data.rs){
             this.toastr.success(data.message)
             window.location.reload();
        }

        this.getOrderByEmail();
      })
    }
  }



  





}
