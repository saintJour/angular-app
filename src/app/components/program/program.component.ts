import { Component, OnInit } from '@angular/core';
import { Semester } from 'src/app/models/semester.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SemesterService } from 'src/app/services/semester.service';
import { Institution } from 'src/app/models/institution.model';
import { Program } from 'src/app/models/program.model';
import { InstitutionService } from 'src/app/services/institution.service';
import { ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  semesters: Semester[];
  institutionId: number;
  programId: number;
  institution: Institution;
  program: Program;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private semesterSvc: SemesterService,
    private instSvc: InstitutionService,
    private programSvc: ProgramService
  ) {
    this.actRoute.params
    .subscribe(params => {
      this.programId = params['id'];
    });

    this.programSvc.getOneById(this.programId)
    .subscribe(data => {
      this.program = data;
      this.instSvc.getOne(this.program.InstitutionId)
      .subscribe(data => {
        this.institution = data;
      });
    });

    this.semesterSvc.getAllByProgramId(this.programId)
    .subscribe(data => {
      this.semesters = data;
    });

   }

  ngOnInit() {
  }

}
