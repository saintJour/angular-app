import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/models/document.model';
import { DocumentService } from 'src/app/services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { HttpParams } from '@angular/common/http';

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
  tags: any[] = [];
  providedTags: Tag[];

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private docSvc: DocumentService,
    private tagSvc: TagService
  ) {
    this.tagSvc.getAll()
    .subscribe(tags => {
      this.providedTags = tags;
    });

    this.actRoute.queryParams
    .subscribe(params => {
      this.name = params['name'] || "";
      this.yearValues[0] = Number(params['yearFrom']) || 2000;
      this.yearValues[1] = Number(params['yearTo']) || new Date().getFullYear();
      this.ratingValues[0] = Number(params['ratingFrom']) || 1;
      this.ratingValues[1] = Number(params['ratingTo']) || 5;
      this.types = params['types'] || ["note", "book", "exam", "test"];
      if(params['tags']){
        params['tags'].forEach(tag => {
          this.tags.push({id: 0, display: tag})
        });
      }
    });

    let params = {
      name: this.name,
      yearFrom: this.yearValues[0],
      yearTo: this.yearValues[1],
      ratingFrom: this.ratingValues[0],
      ratingTo: this.ratingValues[1],
      types: this.types
    };

    let sTags = [];
    this.tags.forEach(tag => {
      sTags.push(tag.display);
    });
    params['tags'] = sTags;

    this.docSvc.filtered(params).subscribe(docs => {
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

    let sTags = [];
    this.tags.forEach(tag => {
      sTags.push(tag.display);
    });
    params['tags'] = sTags;

    this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/advanced-search'], {queryParams: params});
    });
  }

}
