import { Component, Input, OnInit } from '@angular/core';
import { SpeakService } from '../speak.service';
import { GetSourcesService } from '../get-sources.service';
import { splitByLineBreaks } from '../utils';

@Component({
  selector: 'app-vocab',
  templateUrl: './vocab.component.html',
  styleUrls: ['./vocab.component.css']
})
export class VocabComponent implements OnInit {

  constructor(public speakService: SpeakService, private getSourcesService: GetSourcesService ) { };
 

  list: string = "";
  @Input() rate: number = 1;
  @Input() selectedLanguage: string = "";
  sourceText: string = "";
  hasVocab: boolean = true;

  vocabArray: Array<string> = [];

  ngOnInit() {
    this.sourceText = this.getSourcesService.vocabListId;
    console.log(this.sourceText);
    const sourceElement = document.getElementById(this.sourceText);
    console.log(sourceElement?.innerText);
    if (sourceElement && sourceElement.textContent) {
     
    this.list = sourceElement.textContent;
    }
    else this.hasVocab = false;
    this.vocabArray = splitByLineBreaks(this.list);
    console.log(this.vocabArray);
  }
  extractWord(line: string) {
    let lineArray: Array<string> = line.split(/:|-/);
    return lineArray;
  }


}
