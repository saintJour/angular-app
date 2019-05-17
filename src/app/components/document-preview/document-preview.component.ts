import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Document } from '../../models/document.model';
import { DocumentService } from 'src/app/services/document.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit {

  @Input() document: Document;
  @Input() isEditable: boolean;

  courseInfo: any;

  constructor(
    private courseSvc: CourseService,
    private docSvc: DocumentService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseInfo = this.courseSvc.getInfo(this.document.CourseId)
    .subscribe(data => {
      this.courseInfo = data;
      console.log(this.courseInfo);
    });
  }

  deleteDoc(event){
    event.stopPropagation();
    this.spinner.show();
    this.docSvc.delete(this.document.id)
    .subscribe(res => {
      if(res.status === 204){
        this.spinner.hide();
        this.notifier.notify('success', 'Se ha eliminado el documento');
        this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/mydocs']);
        });
      }
    },
    err => {
      this.spinner.hide();
      this.notifier.notify('error', 'No ha sido posible eliminar el documento');
    });
  }

}
