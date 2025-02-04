import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../config/config';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html'
})
export class UserdetailComponent implements OnInit {

  orders: any;
  form!: FormGroup ;

  constructor(private http : HttpClient, private fb: FormBuilder,  private router : Router,     private toastr: ToastrService,){
    this.form = this.fb.group({
      email:[null, [Validators.required,Validators.minLength(12),Validators.maxLength(45)]],
    })

  }
  ngOnInit(): void {
    
  }
  onSubmit():void{
    console.log(this.form.value)
    this.http.post<any>(`${config.baseUrl}order/requestEmailOtp`, this.form.value).subscribe(data=>{
     
        if(data.rs){
          this.router.navigate(['/verify-otp',this.form.value.email])
        }
        else{
          this.toastr.error(data.message)
        }
        
    })
  }

  getOrderByCusID(id:any) :void{
    this.http.get<any>(`${config.baseUrl}order/customer` + id).subscribe(data=>{
      this.orders = data.data;
    })
  }

}
