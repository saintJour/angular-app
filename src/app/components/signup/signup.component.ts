import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { InstitutionService } from '../../services/institution.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProgramService } from '../../services/program.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  programs: any;
  institutions: any;
  form: any;
  hide = true;

  constructor(
    private userSvc: UserService,
    private instSvc: InstitutionService,
    private programSvc: ProgramService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) {

    instSvc.getAll().subscribe(data => {
      this.institutions = data;
    });
    
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      institution: [''],
      ProgramId: []
    });
  }

  ngOnInit() { }

  change(event){
    this.programSvc.getAll(event.source.value.id).subscribe(data => {
      if (event.source.selected) {
        this.programs = data;
      }
    });
  }

  submit(){
    this.spinner.show();
    this.userSvc.create(this.form.value).subscribe(res => {
      console.log(this.form.value);
      console.log('RESPONSE', res);
      if(res.status == 201){
        this.spinner.hide();
        this.notifier.notify( 'success', `Se ha creado la cuenta exitosamente. Hemos enviado un correo a ${this.form.value.email} para que verifiques tu cuenta` );
      }
    },
    err => {
      this.spinner.hide();
      this.notifier.notify( 'error', 'Hubo un error al crear la cuenta');
    });
  }

}
