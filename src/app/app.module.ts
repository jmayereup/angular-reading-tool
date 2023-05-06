import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LblComponent } from './lbl/lbl.component';

export function windowProvider() {
  return window;
}

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    LblComponent
  ],
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
    const el = createCustomElement(LessonsComponent, {injector});
    customElements.define('reading-tool', el);
  }
}
