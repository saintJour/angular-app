import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/models/document.model';
import { DocumentService } from 'src/app/services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  documents: Document[];
  name: string;
  types: string[] = [];
  yearFrom: number;
  yearTo: number;
  yearValues: number[] = [];
  ratingFrom: number;
  ratingTo: number;
  ratingValues: number[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private docSvc: DocumentService
  ) {
    this.actRoute.queryParams
    .subscribe(params => {
      this.name = params['name'] || "";
      this.yearValues[0] = Number(params['yearFrom']) || 2000;
      this.yearValues[1] = Number(params['yearTo']) || new Date().getFullYear();
      this.ratingValues[0] = Number(params['ratingFrom']) || 1;
      this.ratingValues[1] = Number(params['ratingTo']) || 5;
      this.types = params['types'] || ["note", "book", "exam", "test"];
    });

    this.docSvc.filtered({
      name: this.name,
      yearFrom: this.yearValues[0],
      yearTo: this.yearValues[1],
      ratingFrom: this.ratingValues[0],
      ratingTo: this.ratingValues[1],
      types: this.types
    }).subscribe(docs => {
      this.documents = docs;
    });
   }

  ngOnInit() { }

  doFilter(){
    let params = {
      name: this.name,
      yearFrom: this.yearValues[0],
      yearTo: this.yearValues[1],
      ratingFrom: this.ratingValues[0],
      ratingTo: this.ratingValues[1],
      types: this.types
    };
    this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/advanced-search'], {queryParams: params});
    });
  }

}
