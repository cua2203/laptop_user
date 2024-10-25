import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config/config';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts :any;
  tags: any;

  
  activeTab: string = 'all';

    constructor(private http: HttpClient){
      
    }
  ngOnInit(): void {
   this.getPost();
   this.getTags()
  }

  getPost():void{
    this.http.get(`${config.baseUrl}comment/post`).subscribe((data:any) => {
      this.posts = data.results;
      console.log(this.posts)
    });
  }

  getTags():void{
    this.http.get(`${config.baseUrl}comment/tags`).subscribe((data:any) => {
      this.tags = data.results;
      console.log(this.tags)
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    console.log(tab)
    console.log(this.activeTab)
  }

}
