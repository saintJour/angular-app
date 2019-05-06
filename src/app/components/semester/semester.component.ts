import { Component, OnInit } from '@angular/core';
import { Semester } from 'src/app/models/semester.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SemesterService } from 'src/app/services/semester.service';
import { Institution } from 'src/app/models/institution.model';
import { Program } from 'src/app/models/program.model';
import { InstitutionService } from 'src/app/services/institution.service';
import { ProgramService } from 'src/app/services/program.service';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  institutionId: number;
  programId: number;
  semesterId: number;
  courses: Course[];
  institution: Institution;
  program: Program;
  semester: Semester;

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

    this.courseSvc.getAll(this.institutionId, this.programId, this.semesterId)
    .subscribe(data => {
      this.courses = data;
    });

   }

  ngOnInit() {
  }

}
