import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  token: string;

  constructor(
    private userSvc: UserService,
    private actRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) {
    this.actRoute.params
    .subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit() {}

  verify(){
    this.spinner.show();
    this.userSvc.verify(this.token)
    .subscribe(res => {
      if(res.status === 200){
        this.spinner.hide();
        this.notifier.notify( 'success', 'Su cuenta ha sido verificada exitosamente. Ahora puede Iniciar Sesión');
      }
    },
    err => {
      this.spinner.hide();
      this.notifier.notify( 'error', 'No ha sido posible verificar su cuenta');
    });
  }

}
