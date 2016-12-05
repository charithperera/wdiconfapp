import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Venue } from '../../models/venue';
import { Event } from '../../models/event';

import { WdiconfVenues } from '../../providers/wdiconf-venues';
import { WdiconfEvents } from '../../providers/wdiconf-events';

import { EventDetailsPage } from '../event-details/event-details';


@Component({
  selector: 'page-venue-details',
  templateUrl: 'venue-details.html'
})
export class VenueDetailsPage {
  venue: Venue;
  venueEvents: Event[];

  venueId: number;

  ionViewDidLoad() {
    console.log('Hello UserDetails Page');
  }
  constructor(public navCtrl: NavController, private navParams: NavParams, private wdiconfVenues: WdiconfVenues, private wdiconfEvents: WdiconfEvents) {

    this.venueId = navParams.get('id');

    wdiconfVenues.loadDetails(this.venueId).subscribe(venue => {

      this.venue = venue[0];
    })

    wdiconfEvents.loadForEvents(this.venueId).subscribe(events => {
      this.venueEvents = events;
      console.log(events)
    })


    wdiconfEvents.loadForVenue(this.venueId).subscribe(events => {
      this.venueEvents = events;
    })
  }

  goToEvent(id: string) {
    this.navCtrl.push(EventDetailsPage, {id});

  }

}
