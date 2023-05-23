import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from './lesson';

@Injectable({
  providedIn: 'root'
})
export class GetSourcesService {

  private sourceTextSubject = new BehaviorSubject<Lesson>({id: 'notset', content: `This is a sample lesson. 
Choose the translation language.
You can manually
split long sentences
onto new lines`});

  sourceText$ = this.sourceTextSubject.asObservable();

  constructor() { }
  vocabListId: string = "vocab-list";
  sourceTextId: string = "source-text";
  // vocablist: Array<string> = [];
  lesson: Lesson = {id:"0", content:"0"};

  setIds(sourceTextID: string, vocabListID: string){
    this.sourceTextId = sourceTextID;
    this.vocabListId = vocabListID;
  }

  // getVocab(divContent: string) {
  //   let el = document.getElementById(this.vocabListId);
  //   if (el && el.textContent) {
  //   }
  // }

  setLesson(lessonText: Lesson) {
    this.sourceTextSubject.next(lessonText);
    console.log("sourceText$ observable set", lessonText);
    // this.lessonID = lessonText.id;
    this.lesson = lessonText;
  }

}
