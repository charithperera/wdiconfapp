import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PresentersPage } from '../pages/presenters/presenters';
import { PresenterDetailsPage } from '../pages/presenter-details/presenter-details';
import { WdiconfPresenters } from '../providers/wdiconf-presenters';

@NgModule({
  declarations: [
    MyApp,
    PresentersPage,
    PresenterDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PresentersPage,
    PresenterDetailsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WdiconfPresenters
  ]
})
export class AppModule {}
