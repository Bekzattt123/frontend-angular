import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService to get the auth token

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://madicalapp-api.onrender.com/api/user';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserData(): Observable<any> {
    // Get the authentication token from the AuthService
    const authToken = this.authService.getAuthToken();

    // Set up the request headers with the authentication token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // Include the token in the headers
    });

    // Make the HTTP GET request with the headers
    return this.http.get(`${this.baseUrl}/userdata`, { headers });
  }

  updateUserData(payload: { fullName: string; birthDate: string; contact: string }): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.baseUrl}/user_data_update`, payload, { headers });
  }

  deleteAssessment(id: number): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.delete(`${this.baseUrl}/deleteAssessment/${id}`, { headers });
  }

  deleteAssessments(ids: number[]): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    const payload = { selectedAssessmentsId: ids };

    return this.http.delete(`${this.baseUrl}/deleteAssessments`, { headers, body: payload });
  }

  changePassword(payload: { password: string; newPassword: string; reNewPassword: string }): Observable<any> {
    const authToken = this.authService.getAuthToken();

    if (!authToken) {
      throw new Error('No authentication token available.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.baseUrl}/update-password`, payload, { headers, responseType: 'text' }) as Observable<string>;
  }
}
