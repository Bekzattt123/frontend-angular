import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataUploadService } from '../data-upload.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any; // Переменная для хранения данных пользователя
  assessmentResults: any[] = []; // Массив для хранения результатов оценок
  expandedResultId: number | null = null; // Идентификатор раскрытого результата
  selectedAssessments: number[] = []; // Массив для хранения выбранных результатов для удаления

  constructor(
    private userService: UserService,
    private dataUploadService: DataUploadService
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userService.getUserData().pipe(
      map((data: any) => {
        console.log('Данные пользователя:', data);
        this.userData = data;
        this.fetchAssessmentResults(); // Вызов функции fetchAssessmentResults() для загрузки данных оценки
      })
    ).subscribe(
      () => {},
      (error: any) => {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    );
  }

  fetchAssessmentResults(): void {
    this.dataUploadService.getAssessmentList().pipe(
      map((ids: number[]) => {
        console.log('Идентификаторы оценок пользователя:', ids);
        const assessmentObservables: Observable<any>[] = ids.reverse().map(id => {
          return this.dataUploadService.getAssessmentResult(id).pipe(
            map(result => ({
              id: id,
              data: result,
              expanded: false // Начально все результаты свернуты
            }))
          );
        });

        forkJoin(assessmentObservables).subscribe(results => {
          this.assessmentResults = results;
          console.log('Все результаты оценок загружены:', this.assessmentResults);
        });
      })
    ).subscribe(
      () => {},
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

  updateUserData(): void {
    this.userService.updateUserData(this.userData).subscribe(
      response => {
        console.log('Данные пользователя обновлены:', response);
        alert('User data updated successfully');
      },
      error => {
        console.error('Ошибка при обновлении данных пользователя:', error);
        alert('Failed to update user data');
      }
    );
  }

  deleteAssessment(id: number): void {
    this.userService.deleteAssessment(id).subscribe(
      response => {
        console.log(`Оценка с id ${id} удалена:`, response);
        this.assessmentResults = this.assessmentResults.filter(result => result.id !== id);
      },
      error => {
        console.error('Ошибка при удалении оценки:', error);
      }
    );
  }

  deleteSelectedAssessments(): void {
    if (this.selectedAssessments.length > 0) {
      this.userService.deleteAssessments(this.selectedAssessments).subscribe(
        response => {
          console.log('Выбранные оценки удалены:', response);
          this.assessmentResults = this.assessmentResults.filter(result => !this.selectedAssessments.includes(result.id));
          this.selectedAssessments = []; // Очистить выбранные оценки после удаления
        },
        error => {
          console.error('Ошибка при удалении выбранных оценок:', error);
        }
      );
    }
  }

  toggleSelection(id: number): void {
    const index = this.selectedAssessments.indexOf(id);
    if (index > -1) {
      this.selectedAssessments.splice(index, 1); // Удалить из выбранных
    } else {
      this.selectedAssessments.push(id); // Добавить в выбранные
    }
  }
}


