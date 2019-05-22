import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MydocsComponent } from './components/mydocs/mydocs.component';
import { DocumentDetailComponent } from './components/document-detail/document-detail.component';
import { EditDocumentComponent } from './components/edit-document/edit-document.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { InstitutionDetailComponent } from './components/institution-detail/institution-detail.component';
import { ProgramComponent } from './components/program/program.component';
import { SemesterComponent } from './components/semester/semester.component';
import { CourseComponent } from './components/course/course.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'verify/:token', component: VerifyComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'mydocs', component: MydocsComponent},
  { path: 'documents/:id', component: DocumentDetailComponent},
  { path: 'edit-document/:id', component: EditDocumentComponent},
  { path: 'institutions', component: InstitutionsComponent},
  { path: 'institutions/:id', component: InstitutionDetailComponent},
  { path: 'institutions/:institutionId/programs/:programId', component: ProgramComponent},
  { path: 'institutions/:institutionId/programs/:programId/semesters/:semesterId', component: SemesterComponent},
  { path: 'institutions/:institutionId/programs/:programId/semesters/:semesterId/courses/:courseId', component: CourseComponent},
  { path: 'search/:query', component: SearchResultsComponent},
  { path: 'upload', component: DocumentUploadComponent},
  { path: 'advanced-search', component: AdvancedSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}