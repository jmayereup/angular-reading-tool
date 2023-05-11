import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson';
import { LblComponent } from '../lbl/lbl.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  

  lesson: Lesson = {
    id: 1,
    content: 
`This is a sample lesson. 
Each sentence should be divided by lines. 
Then choose the translation language.
Click Generate Lesson.`
  
  }

  originalLesson : string = "";
  translatedLesson? : string;
  translatedLine? : string = "Not Translated Yet";
  lessonArray : string[] = [];
  rate: number = .7;
  selectedLanguage = 'en-CA';
  isBlogPost : boolean = false;
  ttsSupported : boolean = false;
  // utterance? : SpeechSynthesisUtterance;

  
  ngOnInit() {
    const sourceTextElement = document.getElementById('source-text');
    if (sourceTextElement?.textContent) {
      this.lesson.content = sourceTextElement.textContent;
      this.isBlogPost = true;
      this.onGenerate(this.lesson);
    } else this.onGenerate(this.lesson);
  
    if ('speechSynthesis' in window) {
      this.ttsSupported = true;
      console.log("TTS supported.");
    }
  }  

  onGenerate(lesson: Lesson): void {
    // this.lessonArray = this.splitByLineBreaks(lesson.content);
    this.originalLesson = this.copyContent(lesson);
    this.translatedLesson = this.copyContent(lesson);
    console.log(this.lessonArray);
  }

  copyContent(lesson : Lesson): string {
    return this.lesson.content;
  }

 
  addLineBreaks(text: string): string {
    return text.replace(/([.?!])\s*(?=[A-Z])/g, '$1\n');
  }

  pasteText(): void {
    this.lesson.content = "";
    navigator.clipboard.readText().then(
      text => {
        // assign the text to a variable or use it to update the textarea
        let newText = this.addLineBreaks(text);
        this.lesson.content = newText;
      }   
    ).catch(error => {
      console.error('Cannot read clipboard text: ', error);
    });
  }


  clearText(): void {
    this.lesson.content = "";
  }

  // readUtterance(line: string, lang?: string): void {
  //   console.log("readtext called", line);
  //   let currentLang = document.documentElement.lang;

  //   let utterance = new SpeechSynthesisUtterance(line);
  //   utterance.lang = "en-US";
  //   if (!lang) {
  //     utterance.lang = currentLang;
  //   } else utterance.lang = lang;
  //   utterance.rate = this.rate;
  //   window.speechSynthesis.speak(utterance);
    
  // }

  

  
}

