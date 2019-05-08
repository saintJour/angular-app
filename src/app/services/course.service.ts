import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { Document } from '../models/document.model';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getOne(institutionId: number, programId:number, semesterId: number, courseId: number){
    return this.http.get<Course>(`${API}/institutions/${institutionId}/programs/${programId}/semesters/${semesterId}/courses/${courseId}`);
  }

  getAll(institutionId: number, programId: number, semesterId: number){
    return this.http.get<Course[]>(`${API}/institutions/${institutionId}/programs/${programId}/semesters/${semesterId}/courses`);
  }

  getInfo(id: number){
    return this.http.get(`${API}/course_info/${id}`); 
  }

  getDocuments(institutionId: number, programId:number, semesterId: number, courseId: number){
    return this.http.get<Document[]>(`${API}/institutions/${institutionId}/programs/${programId}/semesters/${semesterId}/courses/${courseId}/documents`);
  }

}