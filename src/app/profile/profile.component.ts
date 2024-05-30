import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataUploadService } from '../data-upload.service';
import { concatMap, map } from 'rxjs/operators';
import {from, Observable} from "rxjs";

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
    this.userService.getUserData().pipe(
      concatMap((data: any) => {
        console.log('Данные пользователя:', data);
        this.userData = data;
        return this.fetchAssessmentResults(); // Возвращаем результат вызова функции fetchAssessmentResults()
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
        // Используем reverse() чтобы начать с конца массива ids
        ids.reverse();
        // Используем from для последовательной обработки каждого id
        return from(ids).pipe(
          concatMap((id: number) => {
            return this.dataUploadService.getAssessmentResult(id).pipe(
              map((result: any) => {
                console.log('Результат оценки', id, ':', result);
                this.assessmentResults.push({
                  id: id,
                  data: result,
                  expanded: false // Начально все результаты свернуты
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
      this.expandedResultId = null; // Свернуть результат, если уже открыт
    } else {
      this.expandedResultId = id; // Раскрыть результат
    }
  }

}


