import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-logged',
  templateUrl: './navbar-logged.component.html',
  styleUrls: ['./navbar-logged.component.css']
})
export class NavbarLoggedComponent implements OnInit {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit() {
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('logged');
    this.authSvc.emitFalse();
    this.router.navigate(['']);
  }

  doSearch(query: string){
    if(query){
      this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/search/' + query]);
      });
    }
  }

}
