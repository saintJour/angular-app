import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Course } from 'src/app/models/course.model';
import { Program } from 'src/app/models/program.model';
import { Institution } from 'src/app/models/institution.model';
import { Document } from '../../models/document.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  documents: Document[];
  courses: Course[];
  programs: Program[];
  institutions: Institution[];
  query: string;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private searchSvc: SearchService
  ) { 
    this.actRoute.params
    .subscribe(params => {
      this.query = params['query'];
    });

    this.searchSvc.searchDocuments(this.query)
    .subscribe(results => {
      this.documents = results.body;
      console.log(this.documents);
    });

    this.searchSvc.searchCourses(this.query)
    .subscribe(results => {
      this.courses = results.body;
    });

    this.searchSvc.searchPrograms(this.query)
    .subscribe(results => {
      this.programs = results.body;
    });

    this.searchSvc.searchInstitutions(this.query)
    .subscribe(results => {
      this.institutions = results.body;
    });
  }

  ngOnInit() {
  }

  goToAdvanced(){
    this.router.navigate(['/advanced-search', {name: this.query}]);
  }

}
