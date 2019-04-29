import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  
  public subject = new Subject<Boolean>();

  constructor() { 

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
