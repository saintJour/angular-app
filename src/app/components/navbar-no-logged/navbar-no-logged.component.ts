import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-navbar-no-logged',
  templateUrl: './navbar-no-logged.component.html',
  styleUrls: ['./navbar-no-logged.component.css']
})
export class NavbarNoLoggedComponent implements OnInit {

  query: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  goToSignup(){
    this.router.navigate(['/signup']);
  }

  doSearch(query: string){
    if(query){
      this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/search/' + query]);
      });
    }
  }

}
