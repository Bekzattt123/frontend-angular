import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // добавляем FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import {NgOptimizedImage} from "@angular/common";
import { PdfdownloaderComponent } from './pdfdownloader/pdfdownloader.component';
import {DataUploadService} from "./data-upload.service";
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { MailsendedComponent } from './mailsended/mailsended.component';
import { ActivateAccComponent } from './activate-acc/activate-acc.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ProfileComponent,
    PdfdownloaderComponent,
    PasswordResetComponent,
    PasswordForgottenComponent,
    PasswordChangeComponent,
    MailsendedComponent,
    ActivateAccComponent



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // добавляем FormsModule
    AppRoutingModule,
    NgOptimizedImage
  ],
  providers: [DataUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }


