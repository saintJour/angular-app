import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/document.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  docId: number;
  document: Document;
  page: number;

  constructor(
    private docSvc: DocumentService,
    private actRoute: ActivatedRoute
  ) { 
    this.actRoute.params
    .subscribe(params => {
      this.docId = params['id'];
    });

    this.docSvc.getOne(this.docId)
    .subscribe(doc => {
      this.document = doc;
    });
  }

  ngOnInit() {
  }

}
