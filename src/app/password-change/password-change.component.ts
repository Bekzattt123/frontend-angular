// password-change.component.ts
import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Импортируем UserService
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {
  currentPassword: string = '';
  newPassword: string = '';
  reNewPassword: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    if (this.newPassword !== this.reNewPassword) {
      alert('Пароли не совпадают.');
      return;
    }

    const payload = {
      password: this.currentPassword,
      newPassword: this.newPassword,
      reNewPassword: this.reNewPassword
    };

    this.userService.changePassword(payload).subscribe(
      response => {
        alert('Пароль успешно изменен.');
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при изменении пароля.');
      }
    );
  }
}

