import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FooterComponent } from './components/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { VerifyComponent } from './components/verify/verify.component';
import { NavbarNoLoggedComponent } from './components/navbar-no-logged/navbar-no-logged.component';
import { NavbarLoggedComponent } from './components/navbar-logged/navbar-logged.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
import { MydocsComponent } from './components/mydocs/mydocs.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DocumentPreviewComponent } from './components/document-preview/document-preview.component';
import {MatChipsModule} from '@angular/material/chips';
import { StarRatingModule } from 'angular-star-rating';
import { DocumentDetailComponent } from './components/document-detail/document-detail.component';
import { EditDocumentComponent } from './components/edit-document/edit-document.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { InstitutionDetailComponent } from './components/institution-detail/institution-detail.component';
import { ProgramComponent } from './components/program/program.component';
import { SemesterComponent } from './components/semester/semester.component';
import { CourseComponent } from './components/course/course.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    VerifyComponent,
    NavbarNoLoggedComponent,
    NavbarLoggedComponent,
    ProfileComponent,
    MydocsComponent,
    DocumentPreviewComponent,
    DocumentDetailComponent,
    EditDocumentComponent,
    InstitutionsComponent,
    InstitutionDetailComponent,
    ProgramComponent,
    SemesterComponent,
    CourseComponent,
    SearchResultsComponent,
    DocumentUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NgxSpinnerModule,
    NotifierModule,
    MatChipsModule,
    MatExpansionModule,
    MatListModule,
    StarRatingModule.forRoot(),
    MatStepperModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
