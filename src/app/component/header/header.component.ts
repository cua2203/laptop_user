import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  customerEmail: any;
  constructor( private cookie: CookieService){

    this.customerEmail = this.cookie.get('user_email')

  }

}
