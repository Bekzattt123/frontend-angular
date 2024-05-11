import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://madicalapp-api.onrender.com/api/auth';
  private authToken: string | null = null; // Variable to store the auth token

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Check if the response contains an access token
        if (response.accessToken) {
          // Store the auth token in local storage
          this.authToken = response.accessToken;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    // Check if the auth token is present
    return !!this.authToken;
  }

  logout(): void {
    // Clear the authentication token
    this.authToken = null;
  }

  getAuthToken(): string | null {
    // Return the auth token
    return this.authToken;
  }

  register(registrationData: {
    password: string;
    gender: string;
    rePassword: string;
    contact: string;
    fullName: string;
    birthDate: Date | undefined;
    email: string;
    lastDiagnosis: number;
  }): Observable<any> {
    // Make HTTP POST request to your backend API
    return this.http.post<any>(`${this.baseUrl}/register`, registrationData);
  }
}
