import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent {

  lesson: Lesson = {
    id: 1,
    content: 
`The is a sample lesson. 
It should be divided by lines. 
I will add translations and TTS.`
  }

  originalLesson? : string;
  translatedLesson? : string;
  lessonArray? : string[];
  
    onGenerate(lesson: Lesson): void {
    this.lessonArray = this.splitByLineBreaks(lesson.content);
    this.originalLesson = this.copyContent(lesson);
    this.translatedLesson = this.copyContent(lesson);
  }

  splitByLineBreaks(str: string): string[] {
    if (!str) {
      return [];
    }
    let regex = /\r?\n|\r/g;
    let result = str.split(regex);
    return result;
  }

  copyContent(lesson : Lesson): string {
    return this.lesson.content;
  }

  
}

