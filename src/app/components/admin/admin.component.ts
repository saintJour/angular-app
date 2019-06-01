import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Document } from 'src/app/models/document.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  documents: Document[];
  displayedColumns: string[];

  constructor(
    private adminSvc: AdminService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router
  ) {
    this.displayedColumns = ['name', 'description', 'type', 'year', 'actions'];

    this.adminSvc.getDocs()
    .subscribe(docs => {
      this.documents = docs;
    });
   }

  ngOnInit() {
  }

  approve(id: number){
    this.spinner.show();
    this.adminSvc.approve(id)
    .subscribe(res => {
      if(res.status == 200){
        this.spinner.hide();
        this.notifier.notify( 'success', 'El documento ha sido aprobado correctamente');
        this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/admin']);
        });
      }
    },
    err => {
      this.spinner.hide();
      this.notifier.notify( 'error', 'No se ha podido aprobar el documento');
    });
  }

  delete(id: number){
    this.spinner.show();
    this.adminSvc.delete(id)
    .subscribe(res => {
      if(res.status == 204){
        this.spinner.hide();
        this.notifier.notify( 'success', 'El documento ha sido eliminado correctamente');
        this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/admin']);
        });
      }
    },
    err => {
      this.spinner.hide();
      this.notifier.notify( 'error', 'No se ha podido eliminar el documento');
    });
  }

}
