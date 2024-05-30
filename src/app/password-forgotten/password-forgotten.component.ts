// password-forgotten.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.css']
})
export class PasswordForgottenComponent {
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.requestPasswordReset(this.email).subscribe(
      (response: any) => {
        alert('Письмо с инструкциями по восстановлению пароля было отправлено.');
        this.router.navigate(['/mailsended']);
      },
      (error: any) => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке запроса на восстановление пароля.');
      }
    );
  }
}

