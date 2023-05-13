import { Component, Input, OnChanges } from '@angular/core';
import { SpeakService } from '../speak.service';
import { splitByLineBreaks, addLineBreaks, removeLineBreaks} from '../utils';

@Component({
  selector: 'app-lbl',
  templateUrl: './lbl.component.html',
  styleUrls: ['./lbl.component.css']
})
export class LblComponent {
  constructor(public speakService: SpeakService) {};

  @Input() rate: number = 1;
  @Input() selectedLanguage: string = "";
  @Input() originalText: string = "";
  lessonArray: string[]= [];
  translatedLine: string = "";
  fulltext: string = "";
  showTranslation: boolean = true;

  ngOnChanges() {
    let lblText : string = addLineBreaks(this.originalText);
    this.lessonArray = splitByLineBreaks(lblText) ;
    this.fulltext = removeLineBreaks(this.originalText);
  }
  
  copyLine(line: string): string {
    this.translatedLine = line;
    return this.translatedLine;
  }

//   splitByLineBreaks(str: string): string[] {
//     if (!str) {
//       return [];
//     }
//     let regex = /\r?\n|\r/g;
//     let result = str.split(regex);
//     return result;
//   }

//   addLineBreaks(text: string): string {
//     return text.replace(/([.?!])\s*(?=[A-Z])/g, '$1\n');
//   }

//   removeLineBreaks(str: string): string {
//     return str.replace(/(\r\n|\n|\r)/gm, '');
//   }
}
