import { Component, Input, OnChanges } from '@angular/core';
import { SpeakService } from '../speak.service';
import { splitByLineBreaks, addLineBreaks, removeLineBreaks} from '../utils';

@Component({
  selector: 'app-lbl',
  templateUrl: './lbl.component.html',
  styleUrls: ['./lbl.component.css']
})
export class LblComponent implements OnChanges {
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

}
