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

  


  constructor(public getSourcesService: GetSourcesService, private localStorageService: LocalStorageService) {
  }



  // lesson: Lesson = {
  //   id: "1",
  //   content:
  //     `test`,
    

  // }
  lessonData: Lesson[] = [];
  // sourceTextLesson: string = "";
  
  
  //Temporary Values for adding lessons and generating lbl text.
  lessonTextAreaValue: string = "Initial Value";
  ltitle: string = "No Title";
  ldate: string = "";
  // lblLesson: string = "";

  // translatedLesson?: string;
  // translatedLine?: string = "Not Translated Yet";
  // lessonArray: string[] = [];
  rate: number = .7;
  selectedLanguage = 'en-CA';
  
  isBlogPost: boolean = false;
  ttsSupported: boolean = false;


  ngOnInit() {

    

    this.getSourcesService.sourceText$.subscribe(lesson => {
      this.lessonTextAreaValue = lesson.content;
      // this.onGenerate();
    })

    this.localStorageService.lessons$.subscribe(lessons => {
      this.lessonData = lessons;
      //this.localStorageService.setItem('lessons', JSON.stringify(this.lessonData));
    })

    let data = document.getElementById(this.getSourcesService.sourceTextId);
    if (data && data.textContent) {
      this.lessonTextAreaValue = data.textContent
      this.isBlogPost = true;
      // this.onGenerate();
    } 

    if ('speechSynthesis' in window) {
      this.ttsSupported = true;
      console.log("TTS supported.");
    }

    const lessonsString = this.localStorageService.getItem('lessons');
    if (lessonsString) {
      const data: Lesson[] = JSON.parse(lessonsString);
      // this.lessons = lessonData;
      this.localStorageService.updateLessons(data);
    } else console.log('No lessons in Local Storage');
  }

  addLesson(): void {
    let newLesson: Lesson = { id: '1', content: 'To be Added' };
    newLesson.id = Date.now().toString(36);
    newLesson.content = this.lessonTextAreaValue;
    newLesson.title = this.ltitle;
    newLesson.date = new Date();
    
    const updatedLessons = [...this.lessonData, newLesson];
    this.localStorageService.setItem('lessons', JSON.stringify(updatedLessons));
    
    let saved = document.getElementById('saved');
    saved?.setAttribute('open', 'true');
  }

  removeLessons(key: string) {
    if (confirm('Are you sure you want to remove all items from localStorage?')) {
      this.localStorageService.removeItem(key);
      this.localStorageService.updateLessons([]);
    }
    // this.lesson.content = "All Clear";
    this.lessonData = [];
  }


  // onGenerate(): void {
  //   // this.lesson = data;
  //   // this.lesson.content = lessonTextArea;
  //   this.lblLesson = this.lessonTextAreaValue;
  //   // this.translatedLesson = this.copyContent(this.lesson);
  //   console.log("onGenerate ran", this.lessonTextAreaValue);
  // }

  // copyContent(lesson: Lesson): string {
  //   return this.lesson.content;
  // }


  pasteText(): void {
    // console.log(this.lesson);
    // this.addLesson();
    this.lessonTextAreaValue = "";
    navigator.clipboard.readText().then(
      text => {
        // assign the text to a variable or use it to update the textarea
        let newText = addLineBreaks(text);
        this.lessonTextAreaValue = newText;
        // this.onGenerate();
      }
    ).catch(error => {
      console.error('Cannot read clipboard text: ', error);
    });
  }


  clearText(): void {
    this.lessonTextAreaValue = "";
    // this.getSourcesService.lessonID = "";
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

