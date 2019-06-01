import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Document } from '../models/document.model';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getDocs(){
    return this.http.get<Document[]>(`${API}/admin/documents`);
  }

  approve(id: number){
    return this.http.put(`${API}/admin/documents/${id}`, {}, {observe: 'response'});
  }

  delete(id: number){
    return this.http.delete(`${API}/admin/documents/${id}`, {observe: 'response'});
  }

}
