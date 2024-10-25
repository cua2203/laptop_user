import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'LaptopAZ';

  ngAfterViewInit() {
 
    this.makeScript('slide');
    this.makeScript('tab_gallery');
   
  }

  makeScript(src: string) {
    const mainscript = document.createElement('script');
    mainscript.src = './assets/js/'+ src+'.js';

    document.body.appendChild(mainscript);
  }

}
