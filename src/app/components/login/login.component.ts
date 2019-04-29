import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../../services/myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private mySvc: MyserviceService
  ) { }

  ngOnInit() {
  }

  emitTrue() {
    this.mySvc.emitTrue();
  }

  emitFalse() {
    this.mySvc.emitFalse();
  }

}
