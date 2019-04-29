import { Component, OnInit } from '@angular/core';
import {MyserviceService} from './services/myservice.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public $subject: Subject<Boolean>;

  constructor(

    public myservice: MyserviceService
    
    ){}

  ngOnInit() {
    this.$subject = this.myservice.getSubject();
    this.$subject.subscribe();
    console.log(this.$subject);
}

}
