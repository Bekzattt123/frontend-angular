import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataUploadService {

  private baseUrl = 'https://madicalapp-api.onrender.com/api/user';

  constructor(private http: HttpClient, private authService: AuthService) { }

  uploadTestResults(testData: any): Observable<string> {
    const authToken = this.authService.getAuthToken();

    if (!authToken) {
      throw new Error('No authentication token available.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });

    return this.http.post(`${this.baseUrl}/addTestResult`, testData, {
      headers,
      responseType: 'text' // Note the use of 'responseType'
    }) as Observable<string>;
  }

  getAssessmentList(): Observable<number[]> {
    const authToken = this.authService.getAuthToken();

    if (!authToken) {
      throw new Error('No authentication token available.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });

    return this.http.get<number[]>(`${this.baseUrl}/get_user_assessments`, { headers });
  }

  getAssessmentResult(id: number): Observable<any> {
    const authToken = this.authService.getAuthToken();

    if (!authToken) {
      throw new Error('No authentication token available.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });

    return this.http.get<any>(`${this.baseUrl}/get_assessment/${id}`, { headers });
  }
}
