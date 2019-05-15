import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { SemesterService } from 'src/app/services/semester.service';
import { CourseService } from 'src/app/services/course.service';
import { InstitutionService } from 'src/app/services/institution.service';
import { ProgramService } from 'src/app/services/program.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {

  firstFormGroup: any;
  secondFormGroup: any;
  form: any;
  selectedFile: any;
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
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) { 

    this.year = new Date().getFullYear();

    instSvc.getAll().subscribe(data => {
      this.institutions = data;
    });

    this.firstFormGroup = this.fb.group({
      document: ['', Validators.required],
      description: ['', Validators.required],
      name: ['', Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      institution: [''],
      program: [''],
      semester: [''],
      CourseId: [Validators.required],
      type: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1980), Validators.max(this.year)]]
    });
  }

  ngOnInit() {
  }

  changeFileInput(e) {
    this.selectedFile = e.target.files[0];
    this.firstFormGroup.get('name').setValue(this.selectedFile.name.replace(/\.[^/.]+$/, ""));
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

  submit(){
    this.spinner.show();
    this.form = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
    console.log("Merged Form: ", this.form);
    this.docSvc.upload(this.form, this.selectedFile)
    .subscribe(res => {
      if(res.status == 201){
        this.spinner.hide();
        this.notifier.notify( 'success', 'Se ha subido el documento correctamente. Una vez aprobado por los administradores será visible en la aplicación');
      }
    }, err => {
      this.spinner.hide();
      this.notifier.notify( 'error', 'Hubo un error al subir el documento');
      console.log('ERROR: ', err);
    });
  }

}
