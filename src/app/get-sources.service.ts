import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSourcesService {

  constructor() { }
  vocabListId: string = "vocab-list";
  sourceTextId: string = "source-text";

  setIds(sourceText: string, vocabList?: string){
    this.sourceTextId = sourceText;
    (vocabList) ? this.vocabListId = vocabList : console.log("no vocab list param provided");
    
  }
}
