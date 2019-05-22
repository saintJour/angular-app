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
  types: string[];
  selectedTypes: string[];
  yearFrom: string;
  yearTo: string;
  yearValues: string[];
  ratingFrom: string;
  ratingTo: string;
  ratingValues: string[];

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private docSvc: DocumentService
  ) {
    this.yearValues = ["1980", "2019"];
    this.ratingValues = ["1", "5"];
    this.name = this.actRoute.snapshot.paramMap.get('name');
    this.docSvc.filtered({
      name: this.name
    }).subscribe(docs => {
      this.documents = docs;
    });
   }

  ngOnInit() {
    
  }

}
