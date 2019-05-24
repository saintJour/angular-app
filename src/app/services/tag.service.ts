import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag.model';
import { environment } from '../../environments/environment';

const API: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Tag[]>(`${API}/tags`);
  }

}
