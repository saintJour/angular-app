import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/document.model';
import { CourseService } from 'src/app/services/course.service';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  docId: number;
  document: Document;
  page: number;
  courseInfo: any;
  numPages: number;
  logged: Boolean;
  saved: Boolean = false;
  
  constructor(
    private docSvc: DocumentService,
    private actRoute: ActivatedRoute,
    private courseSvc: CourseService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private authSvc: AuthService
  ) { 
    this.page = 1;

    this.actRoute.params
    .subscribe(params => {
      this.docId = params['id'];
    });

    this.docSvc.getOne(this.docId)
    .subscribe(doc => {
      this.document = doc;
      this.courseSvc.getInfo(this.document.CourseId)
      .subscribe(data => {
        this.courseInfo = data;
      });
    });

    this.authSvc.getSubject().subscribe(logged => {
      this.logged = logged;
    });

    this.docSvc.getSaved()
    .subscribe(savedDocs => {
      savedDocs.forEach(savedDoc => {
        if(savedDoc['DocumentId'] == this.docId){
          this.saved = true;
        }
      });
    });
  }

  ngOnInit() { }

  download(){
    this.spinner.show();
    let re = /(?:\.([^.]+))?$/;
    let docName = this.document.name + "." + re.exec(this.document.key)[1];
    this.docSvc.download(this.docId)
    .subscribe(res => {
      const blob = res.body;
      FileSaver.saveAs(blob, docName);
      this.spinner.hide();
      this.notifier.notify( 'success', 'Se ha descargado el documento');
    },
    err => {
      this.spinner.hide();
      this.notifier.notify( 'error', 'No fue posible descargar el documento');
      console.log(err);
    });
  }

  save(){
    this.docSvc.save(this.docId)
    .subscribe(res => {
      if(res.status === 201){
        this.notifier.notify( 'success', 'Se ha guardado el documento');
        this.saved = true;
      }
    },
    err => {
      this.notifier.notify( 'error', 'No fue posible guardar el documento');
    });
  }

  callBackFn(pdf: PDFDocumentProxy) {
    this.numPages = pdf.numPages;
 }

  next(){
    if(this.page < this.numPages) this.page = this.page + 1;
  }

  prev(){
    if(this.page > 1) this.page = this.page - 1;
  }

}
