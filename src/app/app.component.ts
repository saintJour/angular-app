import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  logged: Boolean;

  constructor(
    public authSvc: AuthService
  ){
    // make any request to check if token is expirated
    if(localStorage.getItem('logged') === 'ok'){
      console.log('LOGGED: ', localStorage.getItem('logged'));
      this.authSvc.emitTrue();
      this.logged = true;
    }
    this.authSvc.getSubject().subscribe(logged => {
      this.logged = logged;
    });
  }

  ngOnInit() {
    
  }

}
