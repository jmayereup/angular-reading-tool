import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from './lesson';

@Injectable({
  providedIn: 'root'
})
export class GetSourcesService {

  private sourceTextSubject = new BehaviorSubject<Lesson>({id: 'notset', content: `This is a sample lesson. 
Each sentence should be divided by lines. 
Then choose the translation language.
Click Generate Lesson.`});
  sourceText$ = this.sourceTextSubject.asObservable();

  constructor() { }
  vocabListId: string = "vocab-list";
  sourceTextId: string = "source-text";
  vocablist: Array<string> = [];
  lessonID: string = "";
  // sourceText: string = "";

  setIds(sourceText: string, vocabList?: string){
    this.sourceTextId = sourceText;
    (vocabList) ? this.vocabListId = vocabList : console.log("no vocab list param provided");
    
  }

  getVocab(divContent: string) {
    let el = document.getElementById(this.vocabListId);
    if (el && el.textContent) {
      
    }
  }

  setLesson(lessonText: Lesson) {
    this.sourceTextSubject.next(lessonText);
    console.log("sourceText$ observable set", lessonText);
  }

  // getLesson(): string {
  //   return this.sourceText;
  // }
}
