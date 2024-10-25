import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {config} from '../config/config';
import { IGetVariant } from '../model/laptop.model';


@Injectable({
  providedIn: 'root'
})
export class LaptopService {
  baseUrl = config.baseUrl

  constructor(private http: HttpClient) { }
  getWithVariant(id:any): Observable<any[]> {

    return this.http.get<any[]>(
      this.baseUrl+ `product/getWithVariant/`+id

    );
  }
  GetVariantByLaptopId(id: number): Observable<IGetVariant> {

    return this.http.get<IGetVariant>(
      this.baseUrl+'variant/getByLaptopId/' + id   
    );
  }

  GetAllVariant(query: any): Observable<any> {
    const searchString = query.searchString
      ? `&searchString=${query.searchString}`
      : '';
    const pageIndex = query.pageIndex ? `&pageIndex=${query.pageIndex}` : '';
    const pageSize = query.pageSize ? `&pageSize=${query.pageSize}` : '';
    const sort = `&sort=${query.sort}`;
    const brand =query.brand? `&brand=${query.brand}`:0;
    const category =query.category? `&category=${query.category}`:0;
    const price =query.price?`&price=${query.price}` :0;
    

    return this.http.get<any>(
       this.baseUrl+ `variant/getAll?+${searchString}${pageIndex}${pageSize}${sort}${brand}${category}${price}`
    );
  }


  getMewEst(number: number): Observable<any> {
    return this.http.get<IGetVariant>(
      this.baseUrl+'variant/newest/' + number
      
    );
  }

  getTopSelling(number: number): Observable<any> {
    return this.http.get<IGetVariant>(
      this.baseUrl+'variant/top_selling/' + number
      
    );
  }
}
