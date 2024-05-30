import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {ProfileComponent} from "./profile/profile.component";
import {PdfdownloaderComponent} from "./pdfdownloader/pdfdownloader.component";
import {PasswordForgottenComponent} from "./password-forgotten/password-forgotten.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {MailsendedComponent} from "./mailsended/mailsended.component";
import {PasswordChangeComponent} from "./password-change/password-change.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'downloader', component: PdfdownloaderComponent},
  { path: 'password-forgotten', component: PasswordForgottenComponent },
  { path: 'recover-password/:code', component: PasswordResetComponent },
  { path: 'mailsended', component: MailsendedComponent },
  { path: 'password-change', component: PasswordChangeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

