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
// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
//import { environment } from '../environments/environment';
// import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
// import { ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
// import { provideAuth,getAuth } from '@angular/fire/auth';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LessonListComponent } from './lesson-list/lesson-list.component';
// import { MatchGameMaker } from './assets/match-game.js';

export function windowProvider() {
  return window;
}

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    LblComponent,
    VocabComponent,
    MatchingGameComponent,
    LessonListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAnalytics(() => getAnalytics()),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: 'window', useFactory: windowProvider },
    // ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector)  {
    const el = createCustomElement(AppComponent, {injector});
    customElements.define('reading-tool', el);
  }


}
