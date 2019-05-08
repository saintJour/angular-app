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

  institutionId: number;
  semesterId: number;
  programId: number;
  courseId: number;
  documents: Document[];
  institution: Institution;
  program: Program;
  semester: Semester;
  course: Course;

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
      this.institutionId = params['institutionId'];
      this.programId = params['programId'];
      this.semesterId = params['semesterId'];
      this.courseId = params['courseId'];
    });

    this.instSvc.getOne(this.institutionId)
    .subscribe(data => {
      this.institution = data;
    });

    this.programSvc.getOne(this.institutionId, this.programId)
    .subscribe(data => {
      this.program = data;
    });

    this.semesterSvc.getOne(this.institutionId, this.programId, this.semesterId)
    .subscribe(data => {
      this.semester = data;
    });

    this.courseSvc.getOne(this.institutionId, this.programId, this.semesterId, this.courseId)
    .subscribe(data => {
      console.log('DATA COURSE: ', data);
      this.course = data;
    });

    this.courseSvc.getDocuments(this.institutionId, this.programId, this.semesterId, this.courseId)
    .subscribe(data => {
      this.documents = data;
    });
  }

  ngOnInit() {
  }

}
