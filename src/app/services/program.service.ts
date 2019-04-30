import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Program } from '../models/program.model';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) { }

  getOne(institutionId: number, programId: number){
    return this.http.get<Program>(`${API}/institutions/${institutionId}/programs/${programId}`);
  }

  getAll(institutionId: number){
    return this.http.get<Program[]>(`${API}/institutions/${institutionId}/programs`);
  }

}
