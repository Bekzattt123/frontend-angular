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

  uploadTestResults(testData: any): Observable<any> {
    const authToken = this.authService.getAuthToken();

    if (!authToken) {
      throw new Error('No authentication token available.');
    }

    // Prepare headers with Authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });

    // Make HTTP POST request to upload test results
    return this.http.post<any>(`${this.baseUrl}/addTestResult`, testData, { headers });
  }
}

