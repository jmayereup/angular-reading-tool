import { Component } from '@angular/core';
import { Lesson } from '../lesson';
// import { Firestore, doc, collection, collectionData, deleteDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { GetSourcesService } from '../get-sources.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent {

  constructor(private getSourceService: GetSourcesService) {
    
  }

  lessonData: Lesson[] = [];
  removeLesson(lessonId: string) {
  }

  async loadLesson(lessonId: string) {
    // this.lessonID = lessonId;
    this.getSourceService.lessonID = lessonId;
    console.log("id loaded", lessonId);
    
    // if (lessonData) {
    //   console.log(lessonData);
    //   this.getSourceService.setLesson(lessonData);
    // } else {
    //   alert("No Lesson Found")
    // }
  }

    
  }

