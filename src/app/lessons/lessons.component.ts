import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../lesson';
import { addLineBreaks } from '../utils';
import { GetSourcesService } from '../get-sources.service';
import { LocalStorageService } from '../local-storage.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  constructor(public getSourcesService: GetSourcesService,
    private localStorageService: LocalStorageService,
    @Inject('window') private window: Window) { }

  lessonData: Lesson[] = [];

  //Temporary Values for adding lessons and generating lbl text.
  lessonTextAreaValue: string = "Initial Value";
  ltitle: string = "No Title";
  ldate: string = "";

  //Values to pass to LBL Component for speech synthesis
  rate: number = .7;
  selectedLanguage = 'en-CA';


  isBlogPost: boolean = false;  //True removes input interface for blog post embeds
  ttsSupported: boolean = false; //Triggers advice to open link in a supported browser
  thisURL: string = this.window.location.href;


  ngOnInit() {

    this.getSourcesService.sourceText$.subscribe(lesson => {
      this.lessonTextAreaValue = lesson.content;
      lesson.title ? this.ltitle = lesson.title : null;
    })  // Loads the sourceText div for blogs posts

    this.localStorageService.lessons$.subscribe(lessons => {
      this.lessonData = lessons;
    }) //Retrieves saved lessons from local storage

    let data = document.getElementById(this.getSourcesService.sourceTextId);
    if (data && data.textContent) {
      this.lessonTextAreaValue = data.textContent
      this.isBlogPost = true;
    } //Checks to see if this is post or the standalone reading-tool

    if ('speechSynthesis' in window) {
      this.ttsSupported = true;
      console.log("TTS supported.");
    }

    const lessonsString = this.localStorageService.getItem('lessons');
    if (lessonsString) {
      const data: Lesson[] = JSON.parse(lessonsString);
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
    this.lessonData = [];
  }

  updateLesson() {
    this.getSourcesService.lesson.content = this.lessonTextAreaValue;
    this.getSourcesService.lesson.title = this.ltitle;
    this.localStorageService.updateLessonById(this.getSourcesService.lesson.id, this.getSourcesService.lesson);
  }

  pasteText(): void {
    this.lessonTextAreaValue = "";
    navigator.clipboard.readText().then(
      text => {
        let newText = addLineBreaks(text);
        this.lessonTextAreaValue = newText;
      }
    ).catch(error => {
      console.error('Cannot read clipboard text: ', error);
    });
  }


  clearText(): void {
    this.lessonTextAreaValue = "";
  }

  copyUrl(data: string): void {
      navigator.clipboard.writeText(data)
      .then(() => {
        alert("successfully copied");
      })
    } 

  }


