import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson';
import { GetSourcesService } from '../get-sources.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {

  constructor(private getSourceService: GetSourcesService, private localStorageService: LocalStorageService) {
    
  }

  lessonData: Lesson[] = this.localStorageService.getItem('lessons');
  
  ngOnInit(): void {     
    this.localStorageService.lessons$.subscribe(lessons => {
      this.lessonData = lessons;
      //this.localStorageService.setItem('lessons', JSON.stringify(this.lessonData));
    })
  }
  
  removeLesson(lessonId: string) {
    if (confirm('Are you sure you want to delete this lesson?')) {
    this.localStorageService.removeItem(lessonId);
    }
  }

  loadLesson(lesson: Lesson) {
  this.getSourceService.setLesson(lesson);
  }

    
  }

