import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Subject, BehaviorSubject } from 'rxjs';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public subject = new BehaviorSubject<Boolean>(false);

  constructor(
    private http: HttpClient
  ) { }

  login(data){
    return this.http.post(`${API}/login`, data, { observe: 'response' });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  emitTrue(){
    this.subject.next(true);
  }
  
  emitFalse(){
    this.subject.next(false);
  }

  getSubject(){
    return this.subject;
  }

}
