import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WdiconfEvents } from '../../providers/wdiconf-events';
import { WdiconfVenues } from '../../providers/wdiconf-venues';
import { Event } from '../../models/event';
import { Venue } from '../../models/venue';



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

  constructor(public navCtrl: NavController, private navParams: NavParams, private wdiconfEvents: WdiconfEvents, private wdiconfVenue: WdiconfVenues) {
    this.event_id = navParams.get('id');
    var self = this;
    wdiconfEvents.loadDetails(this.event_id).subscribe(event => {
      this.event = event;
      wdiconfVenue.loadDetails(this.event.venue_id).subscribe(venue => {
        self.venue = venue[0];
      });
    });

  }

  ionViewDidLoad() {
    console.log('Hello EventDetailsPage Page');
  }

}
