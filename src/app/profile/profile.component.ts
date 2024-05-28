import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataUploadService } from '../data-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any; // Переменная для хранения данных пользователя
  assessmentResults: any[] = []; // Массив для хранения результатов оценок
  expandedResultId: number | null = null; // Идентификатор раскрытого результата

  constructor(
    private userService: UserService,
    private dataUploadService: DataUploadService
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userService.getUserData().subscribe(
      (data: any) => {
        console.log('Данные пользователя:', data);
        this.userData = data;
        this.fetchAssessmentResults();
      },
      (error: any) => {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    );
  }

  fetchAssessmentResults(): void {
    this.dataUploadService.getAssessmentList().subscribe(
      (ids: number[]) => {
        console.log('Идентификаторы оценок пользователя:', ids);
        ids.forEach(id => {
          this.dataUploadService.getAssessmentResult(id).subscribe(
            (result: any) => {
              console.log('Результат оценки', id, ':', result);
              this.assessmentResults.push({
                id: id,
                data: result,
                expanded: false // Начально все результаты свернуты
              });
            },
            (error: any) => {
              console.error('Ошибка при получении результата оценки', id, ':', error);
            }
          );
        });
      },
      (error: any) => {
        console.error('Ошибка при получении списка оценок:', error);
      }
    );
  }

  toggleExpandResult(id: number): void {
    if (this.expandedResultId === id) {
      this.expandedResultId = null; // Свернуть результат, если уже открыт
    } else {
      this.expandedResultId = id; // Раскрыть результат
    }
  }

}
