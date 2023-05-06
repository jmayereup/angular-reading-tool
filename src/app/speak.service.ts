import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakService {

  constructor(@Inject('window') private window: Window) { }
  isPlaying: boolean = false;


  readUtterance(line: string, rate: number, lang?: string): void {
    if (this.isPlaying) {
      speechSynthesis.cancel();
      this.isPlaying = false;
    } else {
      this.isPlaying = true;

      console.log("readtext called", line, lang, rate);
      let currentLang = document.documentElement.lang;
      console.log(currentLang);
      if (rate == null) rate = 1;

      let utterance = new SpeechSynthesisUtterance(line);
      utterance.lang = "en-CA";
      if (!lang) {
        lang = currentLang;
      } else utterance.lang = lang;
      utterance.rate = rate;
      utterance.lang = lang;
      console.log("readtext called", line, utterance.lang, utterance.rate);
      
      utterance.onend = () => {
        this.isPlaying = false;
      };

      window.speechSynthesis.speak(utterance);
    }
  }
}
