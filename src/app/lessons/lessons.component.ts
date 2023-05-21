import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson';
import { addLineBreaks } from '../utils';
import { GetSourcesService } from '../get-sources.service';
// import { Firestore, setDoc, getDoc, doc, collection, collectionData } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
// import { LblComponent } from '../lbl/lbl.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessons: Lesson[] = [{
    id: "0",
    content:
      `Default Content 1`

  },
  {
    id: "1",
    content:
      `Default Content 2`

  }];


  constructor(public getSourcesService: GetSourcesService, private localStorageService: LocalStorageService) {
    // const lessonCollection = collection(this.firestore, 'lessons');
    // this.lesson$ = collectionData(lessonCollection, { idField: 'id'}) as Observable<Lesson[]>;
    // this.getSourcesService.sourceText$.subscribe(lesson => {
    //   this.onGenerate(lesson);
    // });


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

    console.log('lessons array initial', this.lessons);
    const lessonsString = this.localStorageService.getItem('lessons');
    if (lessonsString) {
      const lessonData: Lesson[] = JSON.parse(lessonsString);
      this.lessons = lessonData;
      console.log('lessons array:', this.lessons);
    } else console.log('No lessons in Local Storage');
  }

  addLesson(): void {
    let newLesson: Lesson = {id: '1', content: 'To be Added'};
    newLesson.id = this.lessons.length.toString();
    newLesson.content = this.lesson.content;
    console.log('lessonData pass to addLesson', newLesson);
    this.lessons.push(newLesson);
    console.log(this.lessons);
    this.localStorageService.setItem('lessons', JSON.stringify(this.lessons));
    console.log('lessons from addLessson', this.lessons);

  }

  removeLessons(key: string) {
    if (confirm('Are you sure you want to remove all items from localStorage?')) {
      this.localStorageService.removeItem(key);
    }
    this.lesson.content = "All Clear";
    this.lessons = [];
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
    this.getSourcesService.lessonID = "";
  }

  // async addLesson() {
  // let newText = "";
  // let lessonID = this.getSourcesService.lessonID;
  // let textAreaText = document.getElementById('lessonContent');
  // (textAreaText && textAreaText.textContent) ? newText = textAreaText.textContent : newText="Empty";
  // console.log(newText);
  // console.log("ID", this.getSourcesService.lessonID);
  // const lessonCollection = collection(this.firestore, 'lessons');
  // let lessonDoc;
  // let lessonData: Lesson = {id: '', content: newText};
  // if (this.getSourcesService.lessonID) {
  //   lessonDoc = doc(lessonCollection, lessonID);
  //   const lessonSnapshot = await getDoc(lessonDoc);
  //   lessonData = lessonSnapshot.data() as Lesson;
  //   lessonData.content = newText;
  // } else lessonDoc = doc(lessonCollection);
  // // lessonData.content = newText;
  // await setDoc(lessonDoc, lessonData);
  // }


}

