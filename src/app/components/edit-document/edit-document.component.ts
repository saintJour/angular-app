import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Document } from 'src/app/models/document.model';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { InstitutionService } from 'src/app/services/institution.service';
import { ProgramService } from 'src/app/services/program.service';
import { SemesterService } from 'src/app/services/semester.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {

  document: Document;
  docId: number;
  form: any;
  institutions: any;
  programs: any;
  semesters: any;
  courses: any;
  insId: number;
  programId: number;
  semId: number;
  year: number;

  constructor(
    private instSvc: InstitutionService,
    private programSvc: ProgramService,
    private semSvc: SemesterService,
    private courseSvc: CourseService,
    private docSvc: DocumentService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) { 
    this.year = new Date().getFullYear();

    instSvc.getAll().subscribe(data => {
      this.institutions = data;
    });

    this.actRoute.params
    .subscribe(params => {
      this.docId = params['id'];
    });

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      institution: [''],
      program: [''],
      semester: [''],
      CourseId: ['', Validators.required],
      type: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1980), Validators.max(this.year)]]
    });
  }

  ngOnInit() {
    this.docSvc.getOne(this.docId)
      .subscribe(doc => {
        this.document = doc;
        this.form.controls['name'].setValue(this.document.name);
        this.form.controls['description'].setValue(this.document.description);
        this.form.controls['type'].setValue(this.document.type);
        this.form.controls['year'].setValue(this.document.year);
    });
  }

  changeIns(event){
    this.programSvc.getAll(event.source.value.id).subscribe(data => {
      if (event.source.selected) {
        this.insId = event.source.value.id;
        this.programs = data;
      }
    });
  }

  changeProgram(event){
    this.semSvc.getAll(this.insId, event.source.value.id).subscribe(data => {
      if (event.source.selected) {
        this.programId = event.source.value.id;
        this.semesters = data;
      }
    });
  }

  changeSemester(event){
    this.courseSvc.getAll(this.insId, this.programId, event.source.value.id).subscribe(data => {
      if (event.source.selected) {
        this.courses = data;
      }
    });
  }

  update(){
    this.spinner.show();
    this.docSvc.update(this.docId, this.form.value)
    .subscribe(res => {
      if(res.status === 200){
        this.spinner.hide();
        this.notifier.notify( 'success', 'Documento editado satisfactoriamente');
        this.router.navigate(['/mydocs']);
      }
    },
    err => {
      this.spinner.hide();
      this.notifier.notify( 'error', 'No se ha podido editar el Documento');
      this.router.navigate(['/mydocs']);
    });
  }

}
