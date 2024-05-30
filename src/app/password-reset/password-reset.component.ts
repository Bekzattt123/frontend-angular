import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  code: string = '';
  newPassword: string = '';
  reNewPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.code = this.route.snapshot.paramMap.get('code') || '';
  }

  onSubmit(): void {
    if (this.newPassword !== this.reNewPassword) {
      alert('Пароли не совпадают.');
      return;
    }

    this.authService.resetPassword(this.code, this.newPassword, this.reNewPassword).subscribe(
      (response: any) => {
        alert('Пароль успешно изменен.');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при изменении пароля.');
      }
    );
  }
}
