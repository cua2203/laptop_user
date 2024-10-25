import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
    api_url = config.baseUrl ;

    constructor(private http: HttpClient) {}

    CreateOrder(data:any):Observable<any>{

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
          };
       return this.http.post<any>(this.api_url + 'order/create',data,httpOptions)

    }



 

}