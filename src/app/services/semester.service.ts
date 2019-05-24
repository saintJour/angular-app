import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Semester } from '../models/semester.model';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(private http: HttpClient) { }
  
  getAll(institutionId: number, programId: number){
    return this.http.get<Semester[]>(`${API}/institutions/${institutionId}/programs/${programId}/semesters`);
  }

  getAllByProgramId(id: number){
    return this.http.get<Semester[]>(`${API}/program/${id}/semesters`);
  }

  getOne(institutionId: number, programId: number, semesterId: number){
    return this.http.get<Semester>(`${API}/institutions/${institutionId}/programs/${programId}/semesters/${semesterId}`);
  }

}