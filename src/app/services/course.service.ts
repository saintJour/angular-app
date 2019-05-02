import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getOne(institutionId: number, CourseId: number){
    return this.http.get<Course>(`${API}/institutions/${institutionId}/Courses/${CourseId}`);
  }

  getAll(institutionId: number){
    return this.http.get<Course[]>(`${API}/institutions/${institutionId}/Courses`);
  }

  getInfo(id: number){
    return this.http.get(`${API}/course_info/${id}`); 
  }

}