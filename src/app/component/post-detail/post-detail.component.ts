import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { config } from 'src/app/config/config';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post_id :any;
  post: any;
  constructor(private route: ActivatedRoute, private http: HttpClient){

    this.route.params.subscribe((params) => {
      this.post_id = params['id'];
    
  })
  }


  ngOnInit(): void {
    this.getPost();
    
  }

  getPost():void{
    this.http.get(`${config.baseUrl}comment/post/`+this.post_id).subscribe((data:any) => {
      this.post = data.results[0];
    
    });
  }

}

