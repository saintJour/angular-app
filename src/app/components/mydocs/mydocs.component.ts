import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document.model';

@Component({
  selector: 'app-mydocs',
  templateUrl: './mydocs.component.html',
  styleUrls: ['./mydocs.component.css']
})
export class MydocsComponent implements OnInit {

  documents: Document[];

  constructor(
    private docSvc: DocumentService
  ) { 
    this.docSvc.getAllFromCurrentUser()
    .subscribe(data => {
      console.log(data.body);
      this.documents = data.body;
    });
  }

  ngOnInit() {
    
  }

}
