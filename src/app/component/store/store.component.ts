import { Component, OnInit } from '@angular/core';
import { LaptopService } from 'src/app/service/laptop.service';
import { brandService } from 'src/app/service/brand';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config/config';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  Variant: any[]=[];
  Brands : any[]=[];
  Category:any[]=[];;

  totalPage:number=0;
  numbers: number[]=[]

  price : number = 0;
  ram : number = 0;
  storage : number = 0;
  cpu : number = 0;
  imageUrl = config.imageUrl;


  query={
    pageIndex:1,
    pageSize:8,
    searchString:'',
    sort:1,
    brand:'all',
    category:'all',
    price:'0'
  }

  constructor(private laptopService : LaptopService ,private brandService : brandService,private route: ActivatedRoute,private http: HttpClient,) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query.brand = params['brand']? params['brand'] : 'all';
      this.query.category = params['category']? params['category'] : 'all';
      this.GetVariant(this.query);
    });

  
  }
  priceFilterChange(){
    
    this.GetVariant(this.query)
  }

  GetVariant(data:any){
  
    this.laptopService.GetAllVariant(data).subscribe((data)=>{
      this.Variant=data.data
      this.totalPage= data.totalPage
      this.numbers = Array.from({ length: this.totalPage }, (_, index) => index + 1);
   

    })

    this.GetBrand()
    this.getAllCategory()
  }

  setPage(page:number){
    this.query.pageIndex=page;
    this.GetVariant(this.query)

  }
  previousPage(){
    if(   this.query.pageIndex>1){
      this.query.pageIndex-=1;
      this.GetVariant(this.query)
    }
  }
  nextPage(){
    if(   this.query.pageIndex<this.totalPage){
      this.query.pageIndex+=1;
      this.GetVariant(this.query)
    }
  }

  GetBrand(){
    this.brandService.getAll().subscribe((data)=>{this.Brands=data})
  }

  getAllCategory(){
    this.http.get<any>(`${config.baseUrl}category/getAll`).subscribe(data=>{
      this.Category=data

    })
  }
      

  categoryChange(){
    this.GetVariant(this.query)
   
  }
  pageSizeChange(){
    this.GetVariant(this.query)
  }

  brandChange(){
    this.GetVariant(this.query)
   
  }
  sortChange(){
    this.GetVariant(this.query)
  }

}
