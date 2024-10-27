import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { LaptopService } from 'src/app/service/laptop.service';
import { brandService } from 'src/app/service/brand';
import { Ibrand } from 'src/app/model/brand';
import { CookieService } from 'ngx-cookie-service';
import { config } from 'src/app/config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('suggestionsDiv') suggestionsDiv!: ElementRef;
  @ViewChild('myDiv') myDiv!: ElementRef;

  constructor(
    private service: LaptopService,
    private http: HttpClient,
    private brandService: brandService,
    private cookie: CookieService
  ) {}
  isDivVisible = false;
  customerEmail: any;
  imageUrl = config.imageUrl;

  Category: any;
  Variant: any[] = [];
  laptops: any[] = [];
  lapDHKT: any[] = [];
  laptopGaming: any = [];
  newEst: any[] = [];
  topSelling: any[] = [];
  lapMongNhe: any[] = [];
  brand: Ibrand[] = [];
  query = {
    pageIndex: 1,
    pageSize: 10,
    searchString: '',
    sort: 1,
    brand: 'all',
  };

  ngOnInit(): void {
    this.getProduct();
    this.getNewEst();
    this.getTopSelling();
    this.getLaptopGaming();
    this.getLaptopDHKT();
    this.getLaptopMongNhe();
    this.getAllCategory();
    this.getAllBrand();

    this.customerEmail = this.cookie.get('user_email');
  }

  getProduct() {
    this.service.getWithVariant(1).subscribe((data) => {
      this.laptops = data;
    });
  }

  toggleDiv() {
    this.isDivVisible = !this.isDivVisible;
  }
  getAllCategory() {
    this.http
      .get<any>(`${config.baseUrl}/category/getAll`)
      .subscribe((data) => {
        this.Category = data;
      });
  }

  getAllBrand() {
    this.brandService.getAll().subscribe((data) => {
      this.brand = data;
    });
  }

  getLaptopGaming() {
    this.service.getWithVariant(2).subscribe((data) => {
      this.laptopGaming = data;
    });
  }

  getLaptopDHKT() {
    this.service.getWithVariant(3).subscribe((data) => {
      this.lapDHKT = data;
    });
  }

  getLaptopMongNhe() {
    this.service.getWithVariant(4).subscribe((data) => {
      this.lapMongNhe = data;
    });
  }

  onSearch() {
    this.GetVariant(this.query);
    // console.log(this.Variant);
    // console.log(this.query.searchString)
    if (this.query.searchString.length > 0) {
      this.toggleDiv();
    }
  }

  getNewEst() {
    this.service.getMewEst(4).subscribe((data) => {
      this.newEst = data;
    });
  }

  getTopSelling() {
    this.service.getTopSelling(4).subscribe((data) => {
      this.topSelling = data;
      console.log(this.topSelling);
    });
  }

  GetVariant(data: any) {
    this.service.GetAllVariant(data).subscribe((data) => {
      this.Variant = data.data;
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (
      this.suggestionsDiv &&
      !this.suggestionsDiv.nativeElement.contains(event.target) &&
      !this.myDiv.nativeElement.contains(event.target)
    ) {
      this.isDivVisible = false;
      this.query.searchString = '';
    }
    if (
      this.myDiv.nativeElement.contains(event.target) &&
      this.query.searchString.length !== 0
    ) {
      this.isDivVisible = true;
      console.log(this.query.searchString.length);
    }
  }
}
