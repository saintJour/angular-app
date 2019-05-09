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

  upload(params){
    let formData = new FormData();
    formData.append('document', params.File);
    formData.append('name', params.name);
    formData.append('CourseId', params.CourseId);
    formData.append('description', params.description);
    formData.append('type', params.type);
    formData.append('year', params.year);
    params.tags.forEach(tags => {
      formData.append('tags', tags);
    });
    return this.http.post(`${API}/profile/documents`, formData, {observe: 'response'});
  }

  getAllFromCurrentUser(){
    return this.http.get<Document[]>(`${API}/profile/documents`, {observe: 'response'});
  }

  getOne(id: number){
    return this.http.get<Document>(`${API}/documents/${id}`, {observe: 'response'});
  }

}
