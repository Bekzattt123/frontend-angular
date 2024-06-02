import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs'; // Import Observable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable to hold error message

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    // Convert email to lowercase
    const emailLowerCase = this.email.toLowerCase();

    this.authService.login({ email: emailLowerCase, password: this.password }).subscribe(
      (response: any) => {
        console.log('Login successful!', response);

        if (response && response.accessToken) {
          if (response.accessToken === "The password was entered incorrectly!") {
            this.errorMessage = 'Email or password incorrect';
          } else if (response.accessToken === "Account not activated!") {
            this.errorMessage = 'Account not activated!';
          } else {
            // Assuming any other valid token indicates a successful login
            this.router.navigate(['/home']);
          }
        } else {
          // Handle unexpected format of response
          console.error('Login failed: Invalid response format');
          this.errorMessage = 'Invalid response from server.';
        }
      },
      (error: any) => {
        console.error('Login failed!', error);
        // Handle login errors
        this.errorMessage = 'Email or password is incorrect.'; // Set error message
      }
    );
  }
}

