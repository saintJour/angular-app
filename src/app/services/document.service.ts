import { Injectable } from '@angular/core';
import { Document } from '../models/document.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  create(document: Document){

  }

  getAllFromCurrentUser(){
    return this.http.get<Document[]>(`${API}/profile/documents`, {observe: 'response'});
  }

  getOne(id: number){
    return this.http.get<Document>(`${API}/documents/${id}`, {observe: 'response'});
  }

}
