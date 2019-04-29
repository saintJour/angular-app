import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { InstitutionService } from '../../services/institution.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  institutions: any;
  form: any;
  hide = true;

  constructor(
    private userSvc: UserService,
    private instSvc: InstitutionService,
    private fb: FormBuilder
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
      program: ['']
    });

    console.log(this.form);

  }

  ngOnInit() {

  }

}
