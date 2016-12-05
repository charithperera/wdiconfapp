import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Venue } from '../../models/venue';
import { Event } from '../../models/event';

import { WdiconfVenues } from '../../providers/wdiconf-venues';
import { WdiconfEvents } from '../../providers/wdiconf-events';

/*
  Generated class for the VenueDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-venue-details',
  templateUrl: 'venue-details.html'
})
export class VenueDetailsPage {
  venue: Venue;
  venueEvents: Event[];
  venue_id: number;

  ionViewDidLoad() {
    console.log('Hello UserDetails Page');
  }
  constructor(public navCtrl: NavController, private navParams: NavParams, private wdiconfVenues: WdiconfVenues, private wdiconfEvents: WdiconfEvents) {
    this.venue_id = navParams.get('id');
    console.log(this.venue);
    wdiconfVenues.loadDetails(this.venue_id).subscribe(venue => {
      this.venue = venue[0];
      console.log(venue)
    })
    wdiconfEvents.loadForEvents(this.venue_id).subscribe(events => {
      this.venueEvents = events;
      console.log(events)
    })
  }

}
