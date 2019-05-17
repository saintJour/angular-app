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

  upload(params, file){
    const formData = new FormData();
    formData.append('document', file);
    /* if(params.tags){
      params.tags.forEach(tags => {
        formData.append('tags', tags);
      });
    } */
    /* new Response(formData).text().then(console.log); */
    console.log(params);
    return this.http.post(
      `${API}/profile/documents`, 
      formData, 
      {
        params: params,
        observe: 'response'
      }
    );
  }
  
  download(id: number){
    return this.http.get(`${API}/documents/${id}/download`, {responseType: 'blob', observe: 'response'});
  }

  getAllFromCurrentUser(){
    return this.http.get<Document[]>(`${API}/profile/documents`);
  }

  getOne(id: number){
    return this.http.get<Document>(`${API}/documents/${id}`);
  }

  update(id: number, document: any){
    return this.http.put(`${API}/profile/documents/${id}`, document, {observe: 'response'});
  }

  delete(id: number){
    return this.http.delete(`${API}/profile/documents/${id}`, {observe: 'response'});
  }

}
