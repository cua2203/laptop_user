import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart';
import { CheckoutService } from 'src/app/service/checkout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: any[] = [];
  selectedItems:any[] = [];
  total: number = 0;
  form!: FormGroup ;

  title = 'realtime-notifications-client';
  notifications: string[] = [];
  userId = 'user123'; // Thay đổi userId theo ý bạn

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router,
    private checkoutService : CheckoutService ,
    private toastr: ToastrService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.getCart();

    this.form = this.fb.group({
      fullname:['Phạm Tú Nhân', [Validators.required,Validators.minLength(12),Validators.maxLength(45)]],
      email:['phamtunhan01@gmail.com',[Validators.required,Validators.email]],
      address:['Vân Nghệ, Mai Động, Kim Động, Hưng Yên',[Validators.required,Validators.minLength(10),Validators.maxLength(45)]],
      phone: ['0364141626',[Validators.required,Validators.minLength(10)]]

    })

      // Đăng ký userId với server khi component được khởi tạo
      this.socketService.register(this.userId);

        // Lắng nghe thông báo từ server
      this.socketService.getMessage().subscribe((message: string) => {
        console.log('Notification received:', message);
      });
  
      this.selectedItems = this.items.filter(item => item.selected===true)



  }

 // Hàm gửi thông báo đến người dùng cụ thể
  sendNotification() {
    const recipientUserId = 'Admin'; // Thay đổi recipientUserId theo ý bạn
    const message = `Hello, this is a notification from ${this.userId}!`;
    this.socketService.sendNotification(recipientUserId, message);
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }


  async onSubmit() {
    try {
      if(!this.form.valid) {
        this.toastr.warning("Nhập đầy đủ thông tin !")
        return
      }
      if(this.selectedItems.length === 0){
        this.toastr.warning("Chưa có sản phẩm nào được chọn!")
        return
      }
      if(this.items.length === 0){
        this.toastr.warning("Chưa có sản phẩm nào trong giỏ hàng!")
        return
      }
      let data = {
        order: this.form.value,
        orderDetail: this.items
      };

      if(confirm('Đặt mua sản phẩm này ?')){
        await this.checkoutService.CreateOrder(data).toPromise().then(()=>{
          this.cartService.clearCartAfterCheckout(); 
          this.sendNotification(); 
          this.toastr.success("Success !")
  
        }  );

      }
      
    
    } catch (error) {
      console.error(error);
    }
  }

  getCart(){
    this.cartService.getItems().subscribe(items => {
      this.items = items;
    });

     this.total = this.items.reduce((total, item) => total + item.cartQuantity*item.price, 0);

  }

  clearCart() {
    this.cartService.clearCart();
  }

  decrease(id:number){
    this.cartService.decreaseQuantity(id)
    this.getCart()
  }
  increase(id:number){
    this.cartService.increaseQuantity(id)
    this.getCart()
  }
  delete(id:number){
    this.cartService.removeFromCart(id)
    this.getCart()
    this.toastr.warning("Deleted item !")
  }
  selecting(id:number){
    this.cartService.toggleSelect(id);
    this.selectedItems = this.items.filter(item => item.selected===true)
    console.log(this.selectedItems)
    this.toastr.success("Selected item !")
 
  }




}
