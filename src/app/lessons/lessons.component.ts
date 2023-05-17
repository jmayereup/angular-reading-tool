import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson';
import { addLineBreaks } from '../utils';
import { GetSourcesService } from '../get-sources.service';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { LblComponent } from '../lbl/lbl.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessonText$: Observable<Lesson[]>;


  constructor(private getSourcesService: GetSourcesService, private firestore: Firestore) {
    const lessonCollection = collection(this.firestore, 'lessons');
    this.lessonText$ = collectionData(lessonCollection) as Observable<Lesson[]>;
    this.getSourcesService.sourceText$.subscribe(lesson => {
      this.onGenerate(lesson);
    });

  }



  lesson: Lesson = {
    id: "1",
    content:
      `test`

  }

  sourceTextLesson: string = "";
  originalLesson: string = "";
  translatedLesson?: string;
  translatedLine?: string = "Not Translated Yet";
  lessonArray: string[] = [];
  rate: number = .7;
  selectedLanguage = 'en-CA';
  isBlogPost: boolean = false;
  ttsSupported: boolean = false;


  ngOnInit() {
    let data = document.getElementById(this.getSourcesService.sourceTextId);
    if (data && data.textContent) {
      this.lesson.content = data.textContent
      this.isBlogPost = true;
      this.onGenerate(this.lesson);
    } else this.onGenerate(this.lesson);

    if ('speechSynthesis' in window) {
      this.ttsSupported = true;
      console.log("TTS supported.");
    }
  }

  addLesson(lessonData: Lesson) {
    const lessonCollection = collection(this.firestore, 'lessons');
    addDoc(lessonCollection, lessonData);
  }


  onGenerate(data: Lesson): void {
    this.lesson = data;
    this.originalLesson = this.copyContent(this.lesson);
    this.translatedLesson = this.copyContent(this.lesson);
    console.log("onGenerate ran", this.lesson);
  }

  copyContent(lesson: Lesson): string {
    return this.lesson.content;
  }


  pasteText(): void {
    this.lesson.content = "";
    navigator.clipboard.readText().then(
      text => {
        // assign the text to a variable or use it to update the textarea
        let newText = addLineBreaks(text);
        this.lesson.content = newText;
        this.onGenerate(this.lesson);
      }
    ).catch(error => {
      console.error('Cannot read clipboard text: ', error);
    });
  }


  clearText(): void {
    this.lesson.content = "";
  }


}

