import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SemesterService } from 'src/app/services/semester.service';
import { InstitutionService } from 'src/app/services/institution.service';
import { ProgramService } from 'src/app/services/program.service';
import { CourseService } from 'src/app/services/course.service';
import { Institution } from 'src/app/models/institution.model';
import { Program } from 'src/app/models/program.model';
import { Semester } from 'src/app/models/semester.model';
import { Document } from '../../models/document.model';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courseId: number;
  documents: Document[];
  courseInfo: any;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private semesterSvc: SemesterService,
    private instSvc: InstitutionService,
    private programSvc: ProgramService,
    private courseSvc: CourseService
  ) { 
    this.actRoute.params
    .subscribe(params => {
      this.courseId = params['id'];
    });

    this.courseSvc.getDocumentsByCourseId(this.courseId)
    .subscribe(docs => {
      this.documents = docs;
    });

    this.courseSvc.getInfo(this.courseId)
    .subscribe(info => {
      this.courseInfo = info;
    });
  }

  ngOnInit() {
  }

}
