import { Component, Input, OnInit } from '@angular/core';
// import { limitToLast } from '@firebase/firestore';

@Component({
  selector: 'app-matching-game',
  templateUrl: './matching-game.component.html',
  styleUrls: ['./matching-game.component.css']
})
export class MatchingGameComponent implements OnInit {

@Input() matchList: string[][] = [];
matchListString: string = "";

ngOnInit(): void {
  
  this.matchListString = this.arrayToString(this.matchList);
  // console.log("matching game", this.matchListString); 
}

arrayToString(data: string[][]): string {
  const arrayofArrays = data;
  const separator = " :";
  const myString = arrayofArrays.map(subArray => subArray.map(str => str.trimStart()).join(separator)).join('\n');
  return myString;


}

}
