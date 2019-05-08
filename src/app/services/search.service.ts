import { Injectable } from '@angular/core';
import { Document } from '../models/document.model';
import { Course } from '../models/course.model';
import { Institution } from '../models/institution.model';
import { Program } from '../models/program.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  
  searchDocuments(term: string){
    return this.http.post<Document[]>(`${API}/search`, {type: 4, term: term}, {observe: 'response'});
  }

  searchInstitutions(term: string){
    return this.http.post<Institution[]>(`${API}/search`, {type: 1, term: term}, {observe: 'response'});
  }

  searchPrograms(term: string){
    return this.http.post<Program[]>(`${API}/search`, {type: 2, term: term}, {observe: 'response'});
  }

  searchCourses(term: string){
    return this.http.post<Course[]>(`${API}/search`, {type: 3, term: term}, {observe: 'response'});
  }

}
