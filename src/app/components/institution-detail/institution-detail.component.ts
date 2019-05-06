import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { InstitutionService } from '../../services/institution.service';
import { Program } from '../../models/program.model';
import { Institution } from '../../models/institution.model';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.css']
})
export class InstitutionDetailComponent implements OnInit {

  programs: Program[];
  institutionId: number;
  institution: Institution;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private programSvc: ProgramService,
    private instSvc: InstitutionService
  ) { 
    this.actRoute.params
    .subscribe(params => {
      this.institutionId = params['id'];
    });

    this.instSvc.getOne(this.institutionId)
    .subscribe(data => {
      this.institution = data;
    }, err =>{
      this.router.navigate(['']);
    });
    
    this.programSvc.getAll(this.institutionId)
    .subscribe(data => {
      this.programs = data;
    });
  }

  ngOnInit() {
  }

}
