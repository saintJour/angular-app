import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { Document } from '../../models/document.model'

@Component({
  selector: 'app-saved-documents',
  templateUrl: './saved-documents.component.html',
  styleUrls: ['./saved-documents.component.css']
})
export class SavedDocumentsComponent implements OnInit {

  documents: Document[] = [];

  constructor(
    private docSvc: DocumentService
  ) { }

  ngOnInit() {
    this.docSvc.getSaved()
    .subscribe(savedDocs => {
      savedDocs.forEach(savedDoc => {
        this.documents.push(savedDoc["Document"]);
      })
    });
  }

}
