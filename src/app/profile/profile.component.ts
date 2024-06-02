import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataUploadService } from '../data-upload.service';
import { concatMap, map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any;
  assessmentResults: any[] = [];
  expandedResultId: number | null = null;
  selectedAssessments: number[] = [];

  constructor(
    private userService: UserService,
    private dataUploadService: DataUploadService
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userService.getUserData().pipe(
      concatMap((data: any) => {
        console.log('Данные пользователя:', data);
        this.userData = data;
        return this.fetchAssessmentResults();
      })
    ).subscribe(
      () => {},
      (error: any) => {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    );
  }

  fetchAssessmentResults(): Observable<void> {
    return this.dataUploadService.getAssessmentList().pipe(
      concatMap((ids: number[]) => {
        console.log('Идентификаторы оценок пользователя:', ids);
        ids.reverse();
        return from(ids).pipe(
          concatMap((id: number) => {
            return this.dataUploadService.getAssessmentResult(id).pipe(
              map((result: any) => {
                console.log('Результат оценки', id, ':', result);
                this.assessmentResults.push({
                  id: id,
                  data: result,
                  expanded: false
                });
              })
            );
          })
        );
      })
    );
  }

  toggleExpandResult(id: number): void {
    if (this.expandedResultId === id) {
      this.expandedResultId = null;
    } else {
      this.expandedResultId = id;
    }
  }

  toggleSelection(id: number): void {
    const index = this.selectedAssessments.indexOf(id);
    if (index > -1) {
      this.selectedAssessments.splice(index, 1);
    } else {
      this.selectedAssessments.push(id);
    }
  }

  updateUserData(): void {
    this.userService.updateUserData(this.userData).subscribe(
      response => {
        console.log('Данные пользователя обновлены:', response);
      },
      error => {
        console.error('Ошибка при обновлении данных пользователя:', error);
      }
    );
  }

  deleteAssessment(id: number): void {
    this.userService.deleteAssessment(id).subscribe(
      response => {
        console.log('Оценка удалена:', response);
        this.assessmentResults = this.assessmentResults.filter(result => result.id !== id);
      },
      error => {
        console.error('Ошибка при удалении оценки:', error);
      }
    );
  }

  deleteSelectedAssessments(): void {
    this.userService.deleteAssessments(this.selectedAssessments).subscribe(
      response => {
        console.log('Выбранные оценки удалены:', response);
        this.assessmentResults = this.assessmentResults.filter(result => !this.selectedAssessments.includes(result.id));
        this.selectedAssessments = [];
      },
      error => {
        console.error('Ошибка при удалении выбранных оценок:', error);
      }
    );
  }
}



