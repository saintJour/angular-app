import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../models/rating.model';
import { environment } from '../../environments/environment';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Rating[]>(`${API}/ratings`);
  }

  create(data: any){
    return this.http.post(`${API}/ratings`, data, {observe: 'response'});
  }

  update(id: number, value: number){
    return this.http.put(`${API}/ratings/${id}`, {value: value});
  }

  delete(id: number){
    return this.http.delete(`${API}/ratings/${id}`, {observe: 'response'});
  }

}
