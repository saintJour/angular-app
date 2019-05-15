import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/document.model';
import { CourseService } from 'src/app/services/course.service';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

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

  constructor(
    private docSvc: DocumentService,
    private actRoute: ActivatedRoute,
    private courseSvc: CourseService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
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
  }

  ngOnInit() {
  }

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
