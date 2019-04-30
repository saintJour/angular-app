import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MydocsComponent } from './components/mydocs/mydocs.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'verify', component: VerifyComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'mydocs', component: MydocsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}