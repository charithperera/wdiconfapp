import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PresentersPage } from '../pages/presenters/presenters';
import { PresenterDetailsPage } from '../pages/presenter-details/presenter-details';
import { VenuesPage } from '../pages/venues/venues';
import { VenueDetailsPage } from '../pages/venue-details/venue-details';
import { WdiconfVenues } from '../providers/wdiconf-venues';
import { WdiconfPresenters } from '../providers/wdiconf-presenters';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    PresentersPage,
    PresenterDetailsPage,
    VenuesPage,
    VenueDetailsPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PresentersPage,
    PresenterDetailsPage,
    VenuesPage,
    VenueDetailsPage,
    AboutPage

  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WdiconfVenues,
    WdiconfPresenters
  ]
})
export class AppModule {}
