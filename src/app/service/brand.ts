import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ibrand } from '../model/brand';
import { Observable } from 'rxjs';
import {config} from '../config/config';


@Injectable({
  providedIn: 'root',
})
export class brandService {
  api_url = config.baseUrl ;

  constructor(private http: HttpClient) {}


  getAll(): Observable<Ibrand[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Ibrand[]>(this.api_url + 'brand/getAll', httpOptions);
  }

}
