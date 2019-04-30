import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
}
