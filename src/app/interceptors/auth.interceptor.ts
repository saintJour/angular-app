import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService,  public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('REQ_URL', request.url);
    if(request.url.includes('profile') || request.url.includes('ratings') || request.url.includes('admin')){
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // ok
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('401 from: ', request.url);
              localStorage.removeItem('token');
              localStorage.removeItem('logged');
              return this.router.navigate(['/login']);
            }
          }
        }
      )
    );
  }
}