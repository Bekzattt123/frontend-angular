import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activate-acc',
  templateUrl: './activate-acc.component.html',
  styleUrls: ['./activate-acc.component.css']
})
export class ActivateAccComponent implements OnInit {
  activationCode: string = '';
  activationMessage: string = '';

  private apiUrl = 'https://madicalapp-api.onrender.com/api/auth/activate';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activationCode = this.route.snapshot.paramMap.get('activationCode') || '';
    this.activateAccount();
  }

  activateAccount(): void {
    this.http.get(`${this.apiUrl}/${this.activationCode}`, { responseType: 'text' })
      .subscribe(
        (response: string) => {
          this.activationMessage = response;
        },
        (error) => {
          console.error('Ошибка активации:', error);
          this.activationMessage = 'Произошла ошибка при активации аккаунта.';
        }
      );
  }
}

