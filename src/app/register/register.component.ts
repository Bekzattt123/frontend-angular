import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Импорт сервиса AuthService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = ''; // Свойство для хранения email
  password: string = ''; // Свойство для хранения пароля
  fullName: string = ''; // Свойство для хранения полного имени
  birthDate: Date | undefined; // Свойство для хранения даты рождения
  gender: string = ''; // Свойство для хранения пола
  lastDiagnosis: number = 0; // Свойство для хранения последнего диагноза
  contact: string = ''; // Свойство для хранения контактной информации
  rePassword: string = ''; // Свойство для хранения повторного ввода пароля

  constructor(private authService: AuthService) { }

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

    // Отправляем данные для регистрации на сервер через AuthService без ожидания ответа
    this.authService.register(registrationData).subscribe(
      () => {
        console.log('Registration successful!');
        // Дополнительная логика после успешной регистрации
      },
      (error: any) => {
        console.error('Registration failed:', error);
        // Обработка ошибок регистрации
      }
    );
  }
}
