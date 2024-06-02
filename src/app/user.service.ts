import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://madicalapp-api.onrender.com/api/user';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserData(): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get(`${this.baseUrl}/userdata`, { headers });
  }

  updateUserData(payload: { fullName: string; birthDate: string; contact: string }): Observable<string> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post(`${this.baseUrl}/user_data_update`, payload, { headers, responseType: 'text' }) as Observable<string>;
  }

  deleteAssessment(id: number): Observable<string> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.delete(`${this.baseUrl}/deleteAssessment/${id}`, { headers, responseType: 'text' }) as Observable<string>;
  }

  deleteAssessments(ids: number[]): Observable<string> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    const payload = { selectedAssessmentsId: ids };
    return this.http.delete(`${this.baseUrl}/deleteAssessments`, { headers, body: payload, responseType: 'text' }) as Observable<string>;
  }

  changePassword(payload: { password: string; newPassword: string; reNewPassword: string }): Observable<string> {
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

