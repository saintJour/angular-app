import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution.model';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.css']
})
export class InstitutionsComponent implements OnInit {

  institutions: Institution[];

  constructor(
    private insSvc: InstitutionService
  ) { 
    this.insSvc.getAll()
    .subscribe(data => {
      this.institutions = data;
    });
  }

  ngOnInit() {
  }

}
