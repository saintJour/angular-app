import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Document } from '../../models/document.model';

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
    private courseSvc: CourseService
  ) { }

  ngOnInit() {
    this.courseInfo = this.courseSvc.getInfo(this.document.CourseId)
    .subscribe(data => {
      this.courseInfo = data;
      console.log(this.courseInfo);
    });
  }

}
