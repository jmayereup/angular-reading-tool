import { Component, Input, OnInit } from '@angular/core';
import { GetSourcesService } from './get-sources.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Line-by-Line Reading Tool';
  @Input() sourceText: string = "source-text";
  @Input() vocabList: string = "vocab-list";
  sourceTextContent: string = "";

  constructor(private getSourcesService: GetSourcesService) {}

  ngOnInit() {
    const sourceElement = document.getElementById(this.sourceText);
    sourceElement ? this.sourceTextContent = sourceElement.innerText : this.sourceTextContent = "";
    this.getSourcesService.setIds(this.sourceText, this.vocabList);
    console.log("app-component initialized");
  }
  
}
