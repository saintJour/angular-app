import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any;
  hide = true;

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submit(){
    this.spinner.show();
    this.authSvc.login(this.form.value)
    .subscribe(res => {
      if(res.status == 200){
        console.log('RES_BODY', res.body);
        console.log('RES', res);
        localStorage.removeItem('token');
        localStorage.setItem('token', res.body.toString());
        localStorage.setItem('logged', 'ok');
        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('logged'));
        this.authSvc.emitTrue();
        this.spinner.hide();
        this.router.navigate(['/mydocs']);
      }
    },
    err => {
      this.spinner.hide();
      this.notifier.notify( 'error', 'No fue posible iniciar sesión');
    });
  }

}
