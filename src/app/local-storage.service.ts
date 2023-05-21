import { Injectable } from '@angular/core';
import { Lesson } from './lesson';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  private lessonsSubject = new BehaviorSubject<Lesson[]>([{
    id: "0",
    content:
      `Default Content 1`

  },
  {
    id: "1",
    content:
      `Default Content 2`

  }]);

  lessons$ = this.lessonsSubject.asObservable();

  updateLessons(newLessons: Lesson[]) {
    this.lessonsSubject.next(newLessons);
  }



  public setItem(key: string, data: string): void {
    localStorage.setItem(key, JSON.stringify(data));
    const lessons: Lesson[] = JSON.parse(data);
    this.updateLessons(lessons);

  }

  public getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeItem(key: string): void {
    const updatedLessons = this.lessonsSubject.value.filter(lesson => lesson.id !==key);
    this.setItem('lessons', JSON.stringify(updatedLessons));
  }

  public clear() {
    localStorage.clear();
  }

}
