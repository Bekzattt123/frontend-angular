import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  fullName: string = '';
  birthDate: Date | undefined;
  gender: string = '';
  lastDiagnosis: number = 0;
  contact: string = '';
  rePassword: string = '';
  registrationMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    const registrationData = {
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      birthDate: this.birthDate,
      gender: this.gender,
      lastDiagnosis: this.lastDiagnosis,
      contact: this.contact,
      rePassword: this.rePassword
    };

    this.authService.register(registrationData).subscribe(
      (response: string) => {
        if(response=="New user registered?Email-error!UserExists"){
          alert(response);
        }else{
        alert("Success!Activate your email!");
        this.router.navigate(['/login']);}
      },
      (error: any) => {
        console.error('Registration failed:', error);
        this.registrationMessage = 'Registration failed: ' + error.error;
      }
    );
  }
}
