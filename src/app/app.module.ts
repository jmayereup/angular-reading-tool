import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LblComponent } from './lbl/lbl.component';
import { VocabComponent } from './vocab/vocab.component';
import { MatchingGameComponent } from './matching-game/matching-game.component';

export function windowProvider() {
  return window;
}

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    LblComponent,
    VocabComponent,
    MatchingGameComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    { provide: 'window', useFactory: windowProvider }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector)  {
    const el = createCustomElement(AppComponent, {injector});
    customElements.define('reading-tool', el);
  }
}
