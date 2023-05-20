import { Component } from '@angular/core';
import { Lesson } from '../lesson';
import { Firestore, doc, collection, collectionData, deleteDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { GetSourcesService } from '../get-sources.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent {

  constructor(private firestore: Firestore, private getSourceService: GetSourcesService) {
    const lessonCollection = collection(this.firestore, 'lessons');
    this.lessonText$ = collectionData(lessonCollection, { idField: 'id' }) as Observable<Lesson[]>;
  }

  lessonText$: Observable<Lesson[]>;
  lessonID: string = '';

  removeLesson(lessonId: string) {
    const lessonDoc = doc(this.firestore, 'lessons', lessonId);
    deleteDoc(lessonDoc);
  }

  async loadLesson(lessonId: string) {
    // this.lessonID = lessonId;
    this.getSourceService.lessonID = lessonId;
    console.log("id loaded", this.lessonID);
    const lessonDoc = doc(this.firestore, 'lessons', lessonId);
    const lessonSnapshot = await getDoc(lessonDoc);
    const lessonData = lessonSnapshot.data() as Lesson;
    if (lessonData) {
      console.log(lessonData);
      this.getSourceService.setLesson(lessonData);
    } else {
      alert("No Lesson Found")
    }
  }

    
  }

