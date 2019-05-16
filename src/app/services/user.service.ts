import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User){
    return this.http.post(`${API}/register`, user, { responseType: 'text', observe: 'response' });
  }

  verify(token: string){
    return this.http.get(`${API}/register/verify/?emailToken=${token}`, {observe: 'response'});
  }

}
