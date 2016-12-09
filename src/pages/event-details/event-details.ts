import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WdiconfEvents } from '../../providers/wdiconf-events';
import { WdiconfVenues } from '../../providers/wdiconf-venues';
import { WdiconfPresenters } from '../../providers/wdiconf-presenters';
import { Event } from '../../models/event';
import { Venue } from '../../models/venue';
import { Presenter } from '../../models/presenter';
import { PresenterDetailsPage } from '../presenter-details/presenter-details';




/*
  Generated class for the EventDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {
  event: Event;
  event_id: number;
  venue: Venue;
  eventPresenters: Presenter[];

  constructor(public navCtrl: NavController, private navParams: NavParams, private wdiconfEvents: WdiconfEvents, private wdiconfVenue: WdiconfVenues, private wdiconfPresenters: WdiconfPresenters) {
    this.event_id = navParams.get('id');
    var self = this;
    wdiconfEvents.loadDetails(this.event_id).subscribe(event => {
      this.event = event;
      wdiconfVenue.loadDetails(this.event.venue_id).subscribe(venue => {
        self.venue = venue[0];
      });
    });

    wdiconfPresenters.loadForEvent(this.event_id).subscribe(presenters => {
      this.eventPresenters = presenters;
    })

  }

  ionViewDidLoad() {
    console.log('Hello EventDetailsPage Page');
  }

  goToPresenter(id: string) {
    this.navCtrl.push(PresenterDetailsPage, {id});
  }

}
