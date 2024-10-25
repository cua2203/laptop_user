import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { config } from '../config/config';

@Component({
  selector: 'app-verifyOtp',
  templateUrl: './verifyOtp.component.html'
})
export class VerifyOtpComponent implements OnInit {

  orders: any;
  form!: FormGroup ;
  email: any;
  listOrders: any;
  customer: any;


  constructor(private http : HttpClient, private fb: FormBuilder,private route: ActivatedRoute, private toastr: ToastrService ,private router : Router, private cookie: CookieService){

    this.route.params.subscribe((params) => {
      this.email = params['email'];
      
    });

    this.form = this.fb.group({
      otp:[null, [Validators.required,Validators.minLength(12),Validators.maxLength(45)]],
      email:[this.email, Validators.required]
    })

  

  }
  ngOnInit(): void {
   
  }

  setCookie(){
    this.cookie.set('user_email', this.email,0.2,'/','localhost',true,'Lax');
  }
  onSubmit():void{
    console.log(this.form.value)
    this.http.post<any>(`${config.baseUrl}order/verifyEmailOrder`, this.form.value).subscribe(data=>{
      console.log(data)
      if(data.rs){
        
        this.listOrders = data.data;

        this.router.navigate(['/manage-order',this.email])

        this.setCookie();

        this.toastr.success('Mã OTP đã được xác nhận');

      }
      else{
        this.toastr.warning('Mã OTP không chính xác');
        this.form.reset()
      }
     
    })
  }



  getOrderByCusID(id:any) :void{
    this.http.get<any>(`${config.baseUrl}order/customer` + id).subscribe(data=>{
     
      this.orders = data.data;
    })
  }

}
