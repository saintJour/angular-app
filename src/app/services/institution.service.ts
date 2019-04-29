import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Institution } from '../models/institution.model';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpClient) { }

  getOne(id: number){
    return this.http.get<Institution>(`${API}/institutions/${id}`);
  }

  getAll(){
    return this.http.get<Institution[]>(`${API}/institutions`);
  }

}
