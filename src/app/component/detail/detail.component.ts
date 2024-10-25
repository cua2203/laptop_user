import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGetVariant } from 'src/app/model/laptop.model';
import { CartService } from 'src/app/service/cart';
import { LaptopService } from 'src/app/service/laptop.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {config} from '../../config/config';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  form!:FormGroup;
  comments:any;

  id: number =0 ;
  variant : IGetVariant ={
    variant_id :0, 
    laptop_name:'', 
    image :'', 
    price :0, 
    quantity:0,
    ram :'',
    storage : '', 
    cpu : '',
    description :'', 
    pin : '',
  };
  Variants!:IGetVariant[];

  activeTab: string = 'description';


  constructor( private route: ActivatedRoute,private http: HttpClient, private service: LaptopService,private cartService: CartService,private toastr: ToastrService,  private fb: FormBuilder,private cookie: CookieService){
    let email = this.cookie.get('user_email')
    this.form = this.fb.group({
      
      email:[email,[Validators.required,Validators.email,Validators.minLength(10),Validators.maxLength(45)]],
      rate:[5,[Validators.required]],
      text:[null,[Validators.required,Validators.minLength(10),Validators.maxLength(200)]],
      laptop_id:[null,[Validators.required]],

    })
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.getVariants(this.id)
      this.getComment()
      
    });
    
  }

  getComment(){
    this.http.get<any>(`${config.baseUrl}/comment/getById/` + this.id).subscribe(data=>{
     
      console.log(data)
      this.comments=data;
      console.log(this.id)
    })
  }

  onComment(){
    this.form.value.email = this.cookie.get('user_email');
    this.form.value.laptop_id = this.id;
    if(this.form.value.email.length==0){
      this.toastr.warning('Vui lòng đăng nhập để bình luận!', 'Thất bại',{
        progressBar: true,
        timeOut: 2000,
      });
      return;
    }
    console.log(this.form.value)
    console.log(this.form.invalid)
 

    this.http.post<any>(`${config.baseUrl}/comment/create`,this.form.value).subscribe(data=>{
      console.log(data);
      this.getComment()
    })


  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  Choose(i:number){
    this.variant =this.Variants[i]; 
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Success!');
  }

  getVariants(id:number){
    this.service.GetVariantByLaptopId(id).subscribe((data:any)=>{
      this.Variants=data;
      this.variant=this.Variants[0]
    })
 
  }

  addToCart(product: any) {
    if(this.variant.quantity===0){
      this.toastr.warning('Sản phẩm tạm hết hàng!', 'Thất bại',{
        progressBar: true,
        timeOut: 2000,
      });
      return;

    }
    this.cartService.addToCart(product);

    this.toastr.success('Đã thêm vào giỏ hàng !', 'Success!',{
      progressBar: true,
      timeOut: 2000,
    });
  }


}
