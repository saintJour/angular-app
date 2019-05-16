import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public subject: Subject<Boolean>;
  public value: Boolean;

  constructor(
    public authSvc: AuthService
  ){}

  ngOnInit() {
    if(localStorage.getItem('logged') === 'ok'){
      console.log('LOGGED: ', localStorage.getItem('logged'));
      this.value = true;
    }
    this.subject = this.authSvc.getSubject();
    console.log(this.subject);
    this.subject.subscribe(value => {
      this.value = value;
    });
  }

}
